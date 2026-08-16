(() => {
    const iframes = document.querySelectorAll("iframe[data-auto-height]");

    if (iframes.length === 0) {
        return;
    }

    iframes.forEach((iframe) => {
        let resizeObserver;
        let animationFrame;

        const resizeIframe = () => {
            cancelAnimationFrame(animationFrame);
            animationFrame = requestAnimationFrame(() => {
                try {
                    const iframeDocument = iframe.contentDocument;

                    if (!iframeDocument) {
                        return;
                    }

                    const height = Math.max(
                        iframeDocument.documentElement.scrollHeight,
                        iframeDocument.body?.scrollHeight ?? 0
                    );

                    if (height > 0) {
                        iframe.style.height = `${height}px`;
                    }
                } catch (error) {
                    console.warn(`Unable to resize iframe ${iframe.src}.`, error);
                }
            });
        };

        const startAutoResize = () => {
            resizeObserver?.disconnect();
            resizeIframe();

            const iframeDocument = iframe.contentDocument;
            if (iframeDocument && "ResizeObserver" in window) {
                resizeObserver = new ResizeObserver(resizeIframe);
                resizeObserver.observe(iframeDocument.documentElement);
            }
        };

        iframe.addEventListener("load", startAutoResize);

        if (iframe.contentDocument?.readyState === "complete") {
            startAutoResize();
        }

        window.addEventListener("resize", resizeIframe);
    });
})();
