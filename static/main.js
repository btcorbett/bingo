const phraseTiles = document.querySelectorAll('.phrase');
let bingoResult = false;

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
      let isBingo = checkForBingo();
      if (isBingo && isBingo != bingoResult) {
        phraseTiles.forEach(phraseTile => {
          phraseTile.classList.add('bingo');
        });
      } else if (!isBingo && isBingo != bingoResult) {
        phraseTiles.forEach(phraseTile => {
          phraseTile.addEventListener('webkitAnimationIteration', (e) => {
            e.target.classList.remove('bingo');
          }, {once: true});
        });
      };
      bingoResult = isBingo;
    });
  });
};

function checkForBingo() {
  let tileEntries = Object.entries(statusOfTiles);
  let isBingo = false;
  for (let i = 0; i < 5; i++) {
    let rowTiles = tileEntries.filter(tile => {
      return (new RegExp(`[0-9].${i}`).test(tile[0]) && tile[1]);
    });
    let colTiles = tileEntries.filter(tile => {
      return (new RegExp(`${i}.[0-9]`).test(tile[0]) && tile[1]);
    });
    if (rowTiles.length == 5 || colTiles.length == 5) {
      isBingo = true;
      break;
    }
  };
  return isBingo;
};