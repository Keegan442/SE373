function generateColorGrid(gridSize) {
  const colors = [];

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const rgb = [
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256),
      ];

      const black = rgb.map(value => value > 128 ? 0 : 255);
      const white = rgb.map(value => value > 128 ? 255 : 0);

      colors.push({
        rgb: `rgb(${rgb.join(',')})`,
        hex: rgbToHex(rgb),
        black: `rgb(${black.join(',')})`,
        white: `rgb(${white.join(',')})`,
      });
    }
  }

  return colors;
}

// Function to convert RGB to Hex
function rgbToHex(rgb) {
  return `#${rgb.map(value => value.toString(16).padStart(2, '0')).join('')}`;
}

module.exports = generateColorGrid;