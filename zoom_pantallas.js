
    // Define breakpoints and their corresponding zoom levels in a structured array
    // Sorted from largest screen width to smallest for correct matching
    const zoomBreakpoints = [
        // --- EXTREMELY LARGE & FUTURE-PROOF DISPLAYS ---
        { width: 7680, zoom: 3.0 }, // 8K displays (7680px wide) and above
        { width: 5120, zoom: 2.5 }, // 5K displays (5120px wide) and very large ultra-wides
        { width: 4096, zoom: 2.0 }, // DCI 4K (common for professional displays/cinema)
        { width: 3840, zoom: 1.8 }, // Standard 4K UHD (3840px wide)
        { width: 3440, zoom: 1.6 }, // Common ultra-wide (3440x1440)
        { width: 3000, zoom: 1.4 }, // In-between large desktop sizes
        { width: 2800, zoom: 1.3 }, // Slightly smaller ultra-wides / large dual-monitor setups

        // --- LARGE DESKTOP & GAMING MONITORS ---
        { width: 2560, zoom: 1.2 }, // QHD (2560x1440) / WUXGA (2560x1600) / smaller ultra-wides
        { width: 2048, zoom: 1.1 }, // 2K displays (2048px wide)
        { width: 1920, zoom: 1.0 }, // Full HD (1920x1080) - often considered 100% baseline

        // --- MEDIUM DESKTOP & LARGER LAPTOPS ---
        { width: 1680, zoom: 0.95 }, // Common older desktop / larger laptop resolutions
        { width: 1600, zoom: 0.9 },  // Standard smaller desktop / larger laptop
        { width: 1440, zoom: 0.85 }, // MacBook Pro Retina (scaled resolutions) / higher-res laptops
        { width: 1366, zoom: 0.8 },  // Very common standard laptop resolution
        { width: 1280, zoom: 0.75 }, // Older laptops / small desktop monitors
    ];

    // Define the initial zoom level based on screen width
    function getInitialZoomLevel() {
        const screenWidth = window.innerWidth;

        // Loop through the breakpoints to find the matching zoom level
        // Starts from largest width and returns the first match
        for (const breakpoint of zoomBreakpoints) {
            if (screenWidth >= breakpoint.width) {
                return breakpoint.zoom;
            }
        }
        // Fallback, though the last breakpoint (width: 0) ensures this is always caught
        return 1.0;
    }

    // Function to apply the zoom and ensure it's used by zoom prevention
function applyInitialZoom() {
    // Solo aplica zoom si NO es móvil
    if (window.innerWidth > 900) {
        const initialZoom = getInitialZoomLevel();
        document.body.style.zoom = initialZoom;
        document.body.dataset.initialZoom = initialZoom;
    } else {
        document.body.style.zoom = 1;
        document.body.dataset.initialZoom = 1;
    }
}

    // Event listeners for wheel and keydown
    document.addEventListener('wheel', function(event) {
        if (event.ctrlKey) {
            event.preventDefault();
            let currentZoom = parseFloat(document.body.style.zoom || 1);
            let zoomFactor = 0.05;

            if (event.deltaY < 0) {
                // Zoom in
                document.body.style.zoom = currentZoom + zoomFactor;
            } else {
                // Zoom out
                const initialZoomLevel = parseFloat(document.body.dataset.initialZoom || 1); // Get the dynamic initial zoom
                if (currentZoom > initialZoomLevel) {
                    document.body.style.zoom = Math.max(initialZoomLevel, currentZoom - zoomFactor);
                } else {
                    document.body.style.zoom = initialZoomLevel;
                }
            }
        }
    }, { passive: false });

    document.addEventListener('keydown', function(event) {
        // Permitir Ctrl+C, Ctrl+V, Ctrl+A, Ctrl+X
        if (
            (event.ctrlKey && ['c', 'v', 'a', 'x'].includes(event.key.toLowerCase())) ||
            // Permitir AltGr (que es Ctrl+Alt) para el arroba y otros símbolos
            (event.ctrlKey && event.altKey)
        ) {
            return; // No bloquear estos atajos
        }
        // Si tienes prevención de zoom, solo bloquea Ctrl + rueda o Ctrl + +/-,
        // pero NO bloquees otras combinaciones
        // ...aquí tu lógica de zoom si la necesitas...
    });

    // Apply the initial zoom when the DOM is fully loaded
    document.addEventListener('DOMContentLoaded', applyInitialZoom);

    // Re-apply initial zoom if the window is resized (e.g., user rotates phone, or resizes browser)
    window.addEventListener('resize', applyInitialZoom);
