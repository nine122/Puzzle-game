var rows = 3;
var columns = 3;

var currTile;
var otherTile; //blank tile

var turns = 0;

var imgOrder = ["4", "2", "10", "8", "5", "1", "6", "9", "3"];

window.onload = function () {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement("img");
      tile.id = r.toString() + "-" + c.toString();
      tile.src = "./photo/" + imgOrder.shift() + ".jpg";

      tile.addEventListener("dragstart", dragStart);
      tile.addEventListener("dragover", dragOver);
      tile.addEventListener("dragenter", dragEnter);
      tile.addEventListener("dragleave", dragLeave);
      tile.addEventListener("drop", dragDrop);
      tile.addEventListener("dragend", dragEnd);

      document.getElementById("board").append(tile);
    }
  }
};

function dragStart() {
  currTile = this;
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
  otherTile = this;
}

function dragEnd() {
  if (!otherTile.src.includes("10.jpg")) {
    return;
  }

  let currCoords = currTile.id.split("-");
  let r = parseInt(currCoords[0]);
  let c = parseInt(currCoords[1]);

  let otherCoords = otherTile.id.split("-");
  let r2 = parseInt(otherCoords[0]);
  let c2 = parseInt(otherCoords[1]);

  let moveLeft = r == r2 && c2 == c - 1;
  let moveRight = r == r2 && c2 == c + 1;
  let moveUp = c == c2 && r2 == r - 1;
  let moveDown = c == c2 && r2 == r + 1;

  let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

  if (isAdjacent) {
    let currImg = currTile.src;
    let otherImg = otherTile.src;

    currTile.src = otherImg;
    otherTile.src = currImg;

    turns += 1;
    document.getElementById("turns").innerText = turns;
  }
}

// Function to move the tile to the left
function moveLeft() {
  let emptyTile = document.querySelector('[src$="10.jpg"]');
  let emptyTileCoords = emptyTile.id.split("-");
  let emptyRow = parseInt(emptyTileCoords[0]);
  let emptyCol = parseInt(emptyTileCoords[1]);

  if (emptyCol === columns - 1) {
    return;
  }

  let tileToMove = document.getElementById(`${emptyRow}-${emptyCol + 1}`);
  swapTiles(emptyTile, tileToMove);
}

// Function to move the tile to the right
function moveRight() {
  console.log("right");
  let emptyTile = document.querySelector('[src$="10.jpg"]');
  let emptyTileCoords = emptyTile.id.split("-");
  let emptyRow = parseInt(emptyTileCoords[0]);
  let emptyCol = parseInt(emptyTileCoords[1]);

  if (emptyCol === 0) {
    return; // Cannot move right if empty tile is already in the rightmost column
  }

  let tileToMove = document.getElementById(`${emptyRow}-${emptyCol - 1}`);
  swapTiles(emptyTile, tileToMove);
}

// Function to move the tile up
function moveUp() {
  let emptyTile = document.querySelector('[src$="10.jpg"]');
  let emptyTileCoords = emptyTile.id.split("-");
  let emptyRow = parseInt(emptyTileCoords[0]);
  let emptyCol = parseInt(emptyTileCoords[1]);

  if (emptyRow === rows - 1) {
    return; // Cannot move up if empty tile is already in the top row
  }

  let tileToMove = document.getElementById(`${emptyRow + 1}-${emptyCol}`);
  swapTiles(emptyTile, tileToMove);
}

// Function to move the tile down
function moveDown() {
  let emptyTile = document.querySelector('[src$="10.jpg"]');
  let emptyTileCoords = emptyTile.id.split("-");
  let emptyRow = parseInt(emptyTileCoords[0]);
  let emptyCol = parseInt(emptyTileCoords[1]);

  if (emptyRow === 0) {
    return; // Cannot move down if empty tile is already in the bottom row
  }

  let tileToMove = document.getElementById(`${emptyRow - 1}-${emptyCol}`);
  swapTiles(emptyTile, tileToMove);
}

// Function to swap two tiles
function swapTiles(tile1, tile2) {
  let tempSrc = tile1.src;
  tile1.src = tile2.src;
  tile2.src = tempSrc;

  turns += 1;
  document.getElementById("turns").innerText = turns;
}
