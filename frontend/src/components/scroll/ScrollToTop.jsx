import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname, search, hash } = useLocation();

    useEffect(() => {
        // Skip scrolling if there's a hash (anchor link)
        if (hash) {
            return;
        }

        const scrollToTop = () => {
            // Try multiple methods to ensure it works

            // Method 1: Standard window scroll
            window.scrollTo(0, 0);

            // Method 2: Document element scroll
            if (document.documentElement) {
                document.documentElement.scrollTop = 0;
            }

            // Method 3: Body scroll (for older browsers)
            if (document.body) {
                document.body.scrollTop = 0;
            }

            // Method 4: Try to find and scroll main containers
            const mainContainers = [
                document.querySelector('main'),
                document.querySelector('[role="main"]'),
                document.querySelector('.main-content'),
                document.querySelector('#root'),
                document.querySelector('#app')
            ];

            mainContainers.forEach(container => {
                if (container) {
                    container.scrollTop = 0;
                }
            });
        };

        // Execute immediately
        scrollToTop();

        // Also execute after a small delay to handle lazy-loaded content
        const timeoutId = setTimeout(scrollToTop, 100);

        // And once more after animation frames complete
        requestAnimationFrame(() => {
            requestAnimationFrame(scrollToTop);
        });

        return () => clearTimeout(timeoutId);
    }, [pathname, search, hash]);

    return null;
};

export default ScrollToTop;