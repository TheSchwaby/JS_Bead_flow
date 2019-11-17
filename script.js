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
var firstCell = null;
var selectedTable = null;

//level selection event handlers
function selectEasy(e) {
  if (selectedTable !== null) {
    clearTable();
  }
  drowTable(easyTable);
  selectedTable = 'easy';
}

function selectMedium(e) {
  if (selectedTable !== null) {
    clearTable();
  }
  drowTable(mediumTable);
  selectedTable = 'medium';
}

function selectHard(e) {
  if (selectedTable !== null) {
    clearTable();
  }
  drowTable(hardTable);
  selectedTable = 'hard';
}

function loadEasy() {
  clearTable();
  var toDrowTMP = sessionStorage.getItem("easy")
  toDrow = JSON.parse(toDrowTMP);
  console.log(toDrow);
  if (toDrow === null) {
    drowTable(easyTable);
  } else {
    drowTable(toDrow);
  }
  selectedTable = 'easy';
}
function loadMedium() {
  clearTable();
  var toDrowTMP = sessionStorage.getItem("medium")
  toDrow = JSON.parse(toDrowTMP);
  if (toDrow === null) {
    drowTable(mediumTable);
  } else {
    drowTable(toDrow);
  }
  selectedTable = 'medium';
}
function loadHard() {
  clearTable();
  var toDrowTMP = sessionStorage.getItem("hard")
  toDrow = JSON.parse(toDrowTMP);
  if (toDrow === null) {
    drowTable(hardTable);
  } else {
    drowTable(toDrow);
  }
  selectedTable = 'hard';
}



function save() {
  var tableSaved = new Array;
  var cellID;
  table = document.querySelector('table');

  if (sessionStorage.getItem(selectedTable) !== null) {
    if (window.confirm("Már van mentett állás az adott pályára.\nFelülírja?")) {

      for (i = 0; i < table.rows.length; i++) {
        var arr = new Array;
        for (j = 0; j < table.rows[i].cells.length; j++) {
          cellID = parseInt(table.rows[i].cells[j].getAttribute('class'))
          arr.push(cellID)
        }
        tableSaved.push(arr);
      }
      saved = JSON.stringify(tableSaved);
      sessionStorage.setItem(selectedTable, saved);
    }
  } else {
    for (i = 0; i < table.rows.length; i++) {
      var arr = new Array;
      for (j = 0; j < table.rows[i].cells.length; j++) {
        cellID = parseInt(table.rows[i].cells[j].getAttribute('class'))
        arr.push(cellID)
      }
      tableSaved.push(arr);
    }
    saved = JSON.stringify(tableSaved);
    sessionStorage.setItem(selectedTable, saved);
  }

}


//mouse event handlers
function mouseDown(e) {
  id = parseInt(this.getAttribute('class'));
  if (id < 0) return;
  currentID = id;
  firstCell = this;
  mouseIsDown = true;
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
  if (!mouseIsDown) return;
  if (isLegalMove(previousCell, this)) {
    if (parseInt(this.getAttribute('class')) === 0) {
      this.setAttribute('class', 0 - currentID);
    } else {
      backtrack(this);
    }
  }
  event.preventDefault();
}

function mouseRight(e) {
  var toRemove = parseInt(this.getAttribute('class'));
  if (toRemove > 0) {
    clearLine(toRemove);
  } else {
    clearLine(2 * toRemove);
  }
  event.preventDefault();
}

//functions

//removeing color on backtrack
function backtrack(target) {
  if (parseInt(target.getAttribute('class')) === 0 - currentID &&
      parseInt(previousCell.getAttribute('class')) === 0 - currentID || target === firstCell) {
    previousCell.setAttribute('class', 0)
  }
}

//clearing illegal line by id
function clearLine(id) {
  table = document.querySelector('table');

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
  table = document.querySelector('table');
  for (let row of table.rows) {
    for (let cell of row.cells) {
      if (parseInt(cell.getAttribute('class')) === 0) {
        return false;
      }
    }
  }
  return true;
}

//Checking if the route is legal
function isLegalMove(from, to) {
  i = from.cellIndex;
  j = from.parentElement.rowIndex;
  k = to.cellIndex;
  l = to.parentElement.rowIndex;
  return (parseInt(from.getAttribute('class')) === currentID ||
    parseInt(from.getAttribute('class')) === 0 - currentID) &&
    Math.abs(i - k) + Math.abs(j - l) <= 1
}

function drowTable(tableToDraw) {

  var table = document.createElement('table');
  for (i = 0; i < tableToDraw.length; i++) {
    var row = document.createElement('tr');
    var rowData = tableToDraw[i];
    for (j = 0; j < rowData.length; j++) {
      var cell = document.createElement('td');
      cell.appendChild(document.createTextNode(''));
      //adding event listeners
      cell.addEventListener('mousedown', mouseDown, false);
      cell.addEventListener('mouseup', mouseUp, false);
      cell.addEventListener('mouseover', mouseOut, false);
      cell.addEventListener('contextmenu', mouseRight, false);
      row.appendChild(cell);
      cell.setAttribute('class', rowData[j]);
    }
    table.appendChild(row);
  }
  //isnerting table at de game div
  document.querySelector('#game').appendChild(table);

  //creating Save button
  button = document.createElement('button');
  button.setAttribute('class', 'save');
  button.addEventListener('click', save);
  button.innerHTML = "Mentés"
  document.querySelector('#game').appendChild(button);
}

//clearing table
function clearTable() {
  document.querySelector('#game').innerHTML = '';
}

//init
window.onload = function () {
  //clearing session storage for easy testing. 
  //If game would ment to be an actual game, localStorage would been used insted, and no cleanup on start
  sessionStorage.clear();
  //adding event listeners for menu items
  document.querySelector("#easy").addEventListener("click", selectEasy);
  document.querySelector('#medium').addEventListener('click', selectMedium);
  document.querySelector('#hard').addEventListener('click', selectHard);
  document.querySelector("#easyLoad").addEventListener("click", loadEasy);
  document.querySelector('#mediumLoad').addEventListener('click', loadMedium);
  document.querySelector('#hardLoad').addEventListener('click', loadHard);
}