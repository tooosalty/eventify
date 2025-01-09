// Animation utility functions
export const animationUtils = {
    fadeIn: (element, delay = 0) => {
        setTimeout(() => {
            element.classList.add('animate-fade-in');
        }, delay);
    },

    slideIn: (element, delay = 0) => {
        setTimeout(() => {
            element.classList.add('animate-slide-in');
        }, delay);
    },

    createObserver: (callback, options = {}) => {
        return new IntersectionObserver(callback, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
            ...options
        });
    }
};