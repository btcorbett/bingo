let statusOfTiles = {};
for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
    statusOfTiles[`${j}.${i}`] = false;
  };
}

window.onload = (event) => {
  let numberTiles = document.querySelectorAll('span.number');
  numberTiles.forEach(tile => {
    tile.addEventListener('click', function(e) {
      tile.classList.toggle('matched');
      statusOfTiles[tile.id] = !statusOfTiles[tile.id];
    });
  });
};