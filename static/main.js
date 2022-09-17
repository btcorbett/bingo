const phraseTiles = document.querySelectorAll('.phrase');
let bingoResult = false;
let picked = [];

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
    };
  };
  if (isBingo) {return isBingo};
  let topLeftToBottomRight = ['0.0', '1.1', '2.2', '3.3', '4.4'];
  let bottomLeftToTopRight = ['0.4', '1.3', '2.2', '3.1', '4.0'];

  let topLeftToBottomRightTiles = tileEntries.filter(tile => {
    return (topLeftToBottomRight.includes(tile[0]) && tile[1]);
  });
   let bottomLeftToTopRightTiles = tileEntries.filter(tile => {
    return (bottomLeftToTopRight.includes(tile[0]) && tile[1]);
  });
  if (topLeftToBottomRightTiles.length == 5 || 
        bottomLeftToTopRightTiles.length == 5) {
      isBingo = true;
  };
  return isBingo;
};

function showPick(pElement) {
  pElement.innerText = '';
  pElement.setAttribute('data-content', makePick());
}

function makePick(pickedNumber = 0) {
  let possibleNumbers = [...Array(75).keys()].map(x => x + 1);
  possibleNumbers = possibleNumbers.filter(num => !picked.includes(num));
  if (possibleNumbers.length) {
    if (!pickedNumber) {
      pickedNumber = possibleNumbers[parseInt(Math.random() * possibleNumbers.length)];
    };
    let pickedCol = 'BINGO'.substr(parseInt((pickedNumber - 1) / 15), 1);
    picked.push(pickedNumber);
    return `${pickedCol}-${pickedNumber}`;
  } else {
    document.querySelector('#show-pick').removeAttribute('onclick');
    return 'All numbers have been chosen!';
  };
}