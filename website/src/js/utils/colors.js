/**
 * Generates a random hex color
 * @returns {string} A random hex color code
 */
export function generateRandomColor() {
  return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
}