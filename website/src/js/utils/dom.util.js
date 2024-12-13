// DOM manipulation utilities
export const domUtils = {
    createElement: (tag, className, content = '') => {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (content) element.textContent = content;
        return element;
    },

    getElement: (selector) => document.querySelector(selector),
    
    getAllElements: (selector) => document.querySelectorAll(selector)
};