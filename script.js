let tiles = [];
let emptyIndex = 8;
const gridSize = 3;

function startGame() {
  const board = document.getElementById('game-board');
  board.innerHTML = '';
  tiles = [];

  const selectedImage = document.getElementById("image-select").value;

  for (let i = 0; i < 9; i++) {
    let tile = document.createElement('div');
    tile.classList.add('tile');
    tile.style.backgroundImage = `url(images/${selectedImage})`;
    tile.style.backgroundPosition = `${-(i % 3) * 100}px ${-Math.floor(i / 3) * 100}px`;
    tile.dataset.index = i;

    tile.addEventListener('click', () => moveTile(i));
    tiles.push(tile);
  }

  shuffleTiles();
  renderBoard();
}

function renderBoard() {
  const board = document.getElementById('game-board');
  board.innerHTML = '';
  tiles.forEach((tile, i) => {
    if (i !== emptyIndex) {
      board.appendChild(tile);
    } else {
      let empty = document.createElement('div');
      empty.className = 'tile';
      empty.style.background = '#ddd';
      board.appendChild(empty);
    }
  });
}

function moveTile(index) {
  if (isAdjacent(index, emptyIndex)) {
    [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
    emptyIndex = index;
    renderBoard();
    checkWin();
  }
}

function isAdjacent(i, j) {
  const x1 = i % 3, y1 = Math.floor(i / 3);
  const x2 = j % 3, y2 = Math.floor(j / 3);
  return (Math.abs(x1 - x2) + Math.abs(y1 - y2)) === 1;
}

function shuffleTiles() {
  for (let i = 0; i < 100; i++) {
    const movable = [emptyIndex - 1, emptyIndex + 1, emptyIndex - 3, emptyIndex + 3].filter(
      i => i >= 0 && i < 9 && isAdjacent(i, emptyIndex)
    );
    const move = movable[Math.floor(Math.random() * movable.length)];
    moveTile(move);
  }
}

function checkWin() {
  let won = true;
  for (let i = 0; i < 9; i++) {
    if (tiles[i].dataset.index != i && i !== emptyIndex) {
      won = false;
      break;
    }
  }
  if (won) {
    document.getElementById('status').innerText = '🎉 You solved the puzzle!';
  }
}
