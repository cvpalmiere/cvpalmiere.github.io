// ============================================================
// TEXTSPHERE.JS — Esfera 3D de texto com Canvas
// ============================================================

function TextSphere({
    word = "Carla Palmiere",
    color = "#D4A574",
    font = {
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 500,
        fontSize: 16,
    },
    speed = 7,
    rotationSide = "counterclockwise",
    twist = 23,
    letterSpacing = 160,
} = {}) {
    const VIEWBOX_SIZE = 720;
    const SILHOUETTE_RADIUS = 286;
    const FULL_ROTATION = Math.PI * 2;
    const MAX_GLYPHS = 6000;
    const CAMERA_DISTANCE = 6.1;
    const EQUATOR_BULGE = 0.28;
    const SPARSE_SPACING_RATIO = 1.92;
    const LINE_GAP_WEIGHT = 4;
    const CUSTOM_GAP_WEIGHT = 19;
    const SEAM_GAP_WEIGHT = 13;

    const DENSE_FACE_GAPS = [
        "line", "line", "line", "custom", "line", "line", "line", "line",
        "line", "line", "line", "line", "custom", "line", "line", "line"
    ];

    const SPARSE_FACE_GAPS = [
        "line", "custom", "line", "line", "line", "custom", "line", "line"
    ];

    const BAND_GAPS = [...DENSE_FACE_GAPS, "seam", ...SPARSE_FACE_GAPS, "seam"];
    const DENSE_BAND_COUNT = DENSE_FACE_GAPS.length + 1;

    const SPHERE_RADIUS =
        SILHOUETTE_RADIUS /
        (CAMERA_DISTANCE / Math.sqrt(CAMERA_DISTANCE * CAMERA_DISTANCE - 1));

    const BAND_LONGITUDES = (() => {
        const intervalWeights = BAND_GAPS.map((gapKind) => {
            if (gapKind === "custom") return CUSTOM_GAP_WEIGHT;
            if (gapKind === "seam") return SEAM_GAP_WEIGHT;
            return LINE_GAP_WEIGHT;
        });
        const totalWeight = intervalWeights.reduce((total, w) => total + w, 0);
        let travelledWeight = 0;
        return BAND_GAPS.map((_, bandIndex) => {
            if (bandIndex > 0) travelledWeight += intervalWeights[bandIndex - 1] ?? 0;
            return (travelledWeight / totalWeight) * FULL_ROTATION;
        });
    })();

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
    const getDeterministicVariation = (index, salt) => {
        const value = Math.sin((index + 1) * 12.9898 + salt * 78.233) * 43758.5453;
        return value - Math.floor(value);
    };
    const wrapLongitude = (longitude) => ((longitude % FULL_ROTATION) + FULL_ROTATION) % FULL_ROTATION;

    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';

    const ctx = canvas.getContext('2d');
    let disposed = false;
    let frameScheduled = false;
    let canvasWidth = 0;
    let canvasHeight = 0;
    let previousTimestamp = null;
    let rotationElapsed = 0;
    let geometry = [];
    let geometrySignature = '';

    const characters = Array.from(word || "Carla Palmiere");
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const buildGeometry = () => {
        const fontSizeNum = typeof font.fontSize === 'number' ? font.fontSize : parseInt(font.fontSize, 10) || 18;

        const settings = {
            fontFamily: font.fontFamily || "'Space Grotesk', sans-serif",
            fontSize: Math.max(fontSizeNum, 4),
            fontWeight: font.fontWeight || 400,
            letterSpacing: Math.max(letterSpacing, 40) / 100,
            word: word,
        };
        const twistValue = twist / 10;
        const signature = JSON.stringify([settings, twistValue]);
        if (signature === geometrySignature) return;
        geometrySignature = signature;

        const previousFont = ctx.font;
        ctx.font = `${settings.fontWeight} ${settings.fontSize}px ${settings.fontFamily}`;
        const characterWidths = characters.map((c) => ctx.measureText(c).width);
        ctx.font = previousFont;

        const glyphs = [];
        let charIndex = 0;
        const avgWidth = characterWidths.reduce((t, w) => t + w, 0) / Math.max(characterWidths.length, 1);
        const poleStagger = (avgWidth * settings.letterSpacing) / SPHERE_RADIUS;

        const walkBand = (startLongitude, startPolarAngle, spacing, twistVal, startCharIndex, seed) => {
            let polarAngle = startPolarAngle;
            let charIdx = startCharIndex;
            while (polarAngle < Math.PI && glyphs.length < MAX_GLYPHS) {
                const slot = charIdx % characters.length;
                const character = characters[slot] || 'd';
                const advancePixels = Math.max(characterWidths[slot] * spacing, settings.fontSize * 0.25);
                const advanceRadians = advancePixels / SPHERE_RADIUS;
                if (character.trim().length > 0) {
                    glyphs.push({
                        character,
                        longitude: wrapLongitude(startLongitude + twistVal * polarAngle + EQUATOR_BULGE * Math.sin(polarAngle)),
                        opacityVariation: 0.82 + getDeterministicVariation(glyphs.length, seed) * 0.18,
                        polarAngle,
                    });
                }
                const arcStretch = Math.sqrt(1 + twistVal * twistVal * Math.sin(polarAngle) * Math.sin(polarAngle));
                polarAngle += advanceRadians / arcStretch;
                charIdx += 1;
            }
            return charIdx;
        };

        BAND_LONGITUDES.forEach((startLongitude, bandIndex) => {
            const spacing = bandIndex < DENSE_BAND_COUNT
                ? settings.letterSpacing
                : settings.letterSpacing * SPARSE_SPACING_RATIO;
            charIndex = walkBand(
                startLongitude,
                (bandIndex / BAND_LONGITUDES.length) * poleStagger,
                spacing,
                twistValue,
                charIndex,
                bandIndex
            );
        });

        geometry = glyphs;
    };

    const renderFrame = (timestamp) => {
        frameScheduled = false;
        if (disposed || canvasWidth === 0 || canvasHeight === 0) return;

        if (previousTimestamp !== null && !reducedMotionQuery.matches) {
            rotationElapsed += timestamp - previousTimestamp;
        }
        previousTimestamp = timestamp;

        buildGeometry();

        const safeDuration = (60 / Math.max(speed, 0.1)) * 1000;
        const sideMultiplier = rotationSide === 'counterclockwise' ? -1 : 1;
        const angle = reducedMotionQuery.matches
            ? 0
            : (rotationElapsed / safeDuration) * FULL_ROTATION * sideMultiplier;

        const cosSpin = Math.cos(angle);
        const sinSpin = Math.sin(angle);

        const projected = geometry.map((glyph) => {
            const ringRadius = Math.sin(glyph.polarAngle);
            const modelX = ringRadius * Math.cos(glyph.longitude);
            const modelY = Math.cos(glyph.polarAngle);
            const modelZ = ringRadius * Math.sin(glyph.longitude);

            const spunX = modelX * cosSpin + modelZ * sinSpin;
            const spunZ = -modelX * sinSpin + modelZ * cosSpin;

            const perspective = CAMERA_DISTANCE / (CAMERA_DISTANCE - spunZ);

            return {
                character: glyph.character,
                depth: (spunZ + 1) / 2,
                opacityVariation: glyph.opacityVariation,
                scale: perspective,
                x: VIEWBOX_SIZE / 2 + spunX * SPHERE_RADIUS * perspective,
                y: VIEWBOX_SIZE / 2 - modelY * SPHERE_RADIUS * perspective,
            };
        });

        projected.sort((a, b) => a.depth - b.depth);

        const logicalScale = Math.min(canvasWidth, canvasHeight) / VIEWBOX_SIZE;
        const horizontalOffset = (canvasWidth - VIEWBOX_SIZE * logicalScale) / 2;
        const verticalOffset = (canvasHeight - VIEWBOX_SIZE * logicalScale) / 2;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.fillStyle = color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const fontFamily = font.fontFamily || "'Space Grotesk', sans-serif";
        const fontWeight = font.fontWeight || 400;
        const baseFontSize = typeof font.fontSize === 'number' ? font.fontSize : parseInt(font.fontSize, 10) || 18;
        let activeFont = '';

        projected.forEach((glyph) => {
            const rawSize = baseFontSize * glyph.scale * logicalScale;
            const fontSize = Math.max(1, Math.round(rawSize * 2) / 2);
            const opacity = clamp((0.12 + Math.pow(glyph.depth, 1.35) * 0.88) * glyph.opacityVariation, 0.04, 1);

            ctx.globalAlpha = opacity;
            const nextFont = `${fontWeight} ${fontSize.toFixed(1)}px ${fontFamily}`;
            if (nextFont !== activeFont) {
                activeFont = nextFont;
                ctx.font = nextFont;
            }

            ctx.fillText(
                glyph.character,
                horizontalOffset + glyph.x * logicalScale,
                verticalOffset + glyph.y * logicalScale
            );
        });

        ctx.globalAlpha = 1;

        if (reducedMotionQuery.matches || disposed) return;
        frameScheduled = true;
        requestAnimationFrame(renderFrame);
    };

    const scheduleFrame = () => {
        if (disposed || frameScheduled) return;
        frameScheduled = true;
        requestAnimationFrame(renderFrame);
    };

    const syncCanvasSize = () => {
        const rect = canvas.parentElement?.getBoundingClientRect() || { width: 400, height: 400 };
        canvasWidth = rect.width || 400;
        canvasHeight = rect.height || 400;
        const dpr = window.devicePixelRatio || 1;
        canvas.width = Math.round(canvasWidth * dpr);
        canvas.height = Math.round(canvasHeight * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        scheduleFrame();
    };

    const resizeObserver = new ResizeObserver(syncCanvasSize);
    const intersectionObserver = new IntersectionObserver(
        ([entry]) => {
            if (entry?.isIntersecting) {
                previousTimestamp = null;
                scheduleFrame();
            }
        },
        { rootMargin: '100px' }
    );

    const handleReducedMotionChange = () => {
        previousTimestamp = null;
        scheduleFrame();
    };

    syncCanvasSize();
    setTimeout(() => {
        syncCanvasSize();
        scheduleFrame();
    }, 100);

    let mounted = false;

    const mount = (container) => {
        if (mounted) return;
        mounted = true;
        container.appendChild(canvas);
        resizeObserver.observe(container);
        intersectionObserver.observe(canvas);
        reducedMotionQuery.addEventListener('change', handleReducedMotionChange);
        scheduleFrame();
    };

    const render = (container) => {
        if (container) {
            mount(container);
        }
        return canvas;
    };

    const destroy = () => {
        disposed = true;
        resizeObserver.disconnect();
        intersectionObserver.disconnect();
        reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
        if (canvas.parentNode) {
            canvas.parentNode.removeChild(canvas);
        }
        mounted = false;
    };

    return {
        render,
        destroy,
        canvas,
    };
}