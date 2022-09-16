window.onload = (event) => {
  let numberTiles = document.querySelectorAll('span.number');
  numberTiles.forEach(tile => {
    tile.addEventListener('click', function(e) {
      tile.classList.toggle('matched');
    });
  });
};