// Utility function to generate random colors
import { generateRandomColor } from './utils/colors.js';

// DOM Elements
const colorButton = document.getElementById('colorButton');
const featureCards = document.querySelectorAll('.feature-card');

// Event Listeners
colorButton.addEventListener('click', () => {
  // Change background color of feature cards
  featureCards.forEach(card => {
    card.style.backgroundColor = generateRandomColor();
  });
});

// Initialize any features
function init() {
  console.log('Application initialized!');
}

// Start the application
init();