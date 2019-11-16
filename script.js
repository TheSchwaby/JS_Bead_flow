//initial levels
const easyTable = [
  [0, 0, 0, 2, 0],
  [0, 1, 0, 0, 0],
  [0, 0, 2, 0, 0],
  [3, 0, 0, 3, 0],
  [1, 0, 0, 0, 0]
]

const mediumTable = [
  [2, 0, 0, 9, 0, 0, 0, 5, 0],
  [1, 0, 0, 8, 0, 11, 0, 0, 5],
  [0, 2, 0, 0, 6, 0, 7, 0, 0],
  [0, 0, 0, 0, 0, 11, 0, 10, 0],
  [0, 0, 0, 7, 0, 0, 0, 0, 0],
  [0, 0, 0, 4, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 3, 6],
  [0, 9, 0, 4, 8, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 10, 3]
]

const hardTable = [
  [1, 0, 0, 0, 3, 0, 5, 0, 2],
  [0, 0, 0, 0, 0, 0, 8, 5, 0],
  [7, 4, 0, 6, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 2],
  [0, 0, 4, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 7, 0, 0, 0, 0, 3, 0, 0],
  [0, 0, 0, 6, 0, 0, 0, 0, 8]
]

//global variables
var currentID = -1;
var mouseIsDown = false;
var previousCell = null;

//level selection event handlers
function selectEasy(e) {
  drowTable(easyTable);
}

function selectMedium(e) {
  drowTable(mediumTable);
}

function selectHard(e) {
  drowTable(hardTable);
}


//mouse event handlers
function mouseDown(e) {
  id = parseInt(this.getAttribute('class'));
  if (id < 0) return;
  currentID = id;

  mouseIsDown = true;
  event.preventDefault();
}



function mouseMove(e) {
  if (!mouseIsDown || parseInt(this.getAttribute('class')) !== 0) return;
  console.log(previousCell.getAttribute('class'));
 // if (isNeighbour(e.currentTarget)) {
    this.setAttribute('class', 0 - currentID);
 // }

  event.preventDefault();
}



function mouseUp(e) {
  if (currentID !== parseInt(this.getAttribute('class'))) {
    clearLine(currentID);
  } else {
    if (checkWin()) {
      alert("You Win");
    }
  }
  mouseIsDown = false;
}

function mouseOut(e) {
  previousCell = event.relatedTarget;
}

//functions

//clearing illegal line by id
function clearLine(id) {
  table = document.querySelector('tbody');

  for (let row of table.rows) {
    for (let cell of row.cells) {
      if (parseInt(cell.getAttribute('class')) === 0 - id) {
        cell.setAttribute('class', 0);
      }
    }
  }
}

//checking win condition
function checkWin() {
  for (let row of table.rows) {
    for (let cell of row.cells) {
      if (parseInt(cell.getAttribute('class')) === 0) {
        return false;
      }
    }
  }
  return true;
}

function isNeighbour(from){
  
}

//drowing table
function drowTable(tableData) {
  //creating the table element
  var table = document.createElement('table');
  var tableBody = document.createElement('tbody');
  //populating with data
  for (let rowData of tableData) {
    var row = document.createElement('tr');
    for (let cellData of rowData) {
      var cell = document.createElement('td');
      cell.appendChild(document.createTextNode(''));
      cell.addEventListener('mousedown', mouseDown, false);
      cell.addEventListener('mousemove', mouseMove, false);
      cell.addEventListener('mouseup', mouseUp, false);
      cell.addEventListener('mouseout', mouseOut, false);
      row.appendChild(cell);
      cell.setAttribute('class', cellData);
    }
    tableBody.appendChild(row);
  }
  table.appendChild(tableBody);
  //isnerting table at de game div
  document.querySelector('#game').appendChild(table);
}

//init
window.onload = function () {
  //adding event listeners for menu items
  document.querySelector("#easy").addEventListener("click", selectEasy);
  document.querySelector('#medium').addEventListener('click', selectMedium);
  document.querySelector('#hard').addEventListener('click', selectHard);
}