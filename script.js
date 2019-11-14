const easyTable = [
    [0,0,0,2,0],
    [0,1,0,0,0],
    [0,0,2,0,0],
    [3,0,0,3,0],
    [1,0,0,0,0]
]

const mediumTable = [
    [2,0,0,9,0,0,0,5,0],
    [1,0,0,8,0,11,0,0,5],
    [0,2,0,0,6,0,7,0,0],
    [0,0,0,0,0,11,0,10,0],
    [0,0,0,7,0,0,0,0,0],
    [0,0,0,4,0,0,0,0,0],
    [0,0,0,0,0,0,0,3,6],
    [0,9,0,4,8,0,0,0,0],
    [0,1,0,0,0,0,0,10,3]
]

const hardTable = [
    [1,0,0,0,3,0,5,0,2],
    [0,0,0,0,0,0,8,5,0],
    [7,4,0,6,0,0,0,0,0],
    [0,0,0,0,0,0,1,0,0],
    [0,0,0,0,0,0,0,0,2],
    [0,0,4,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,7,0,0,0,0,3,0,0],
    [0,0,0,6,0,0,0,0,8]
]

function selectEasy(e){
  drowTable(easyTable);
}

function selectMedium(e){
  drowTable(easyTable);
}

function selectHard(e){
  drowTable(easyTable);
}


function drowTable(tableData){
  var table = document.createElement('table');
  var tableBody = document.createElement('tbody');

  for(let rowData of tableData){
    var row = document.createElement('tr');
    for(let cellData of rowData){
      var cell = document.createElement('td');
      cell.appendChild(document.createTextNode(cellData));
      row.appendChild(cell);
    }
    tableBody.appendChild(row);
  }
  table.appendChild(tableBody);
  document.querySelector('#game').appendChild(table);
}


window.onload = function(){
document.querySelector("#easy").addEventListener("click", selectEasy);
document.querySelector('#medium').addEventListener('click', selectMedium);
document.querySelector('#hard').addEventListener('click', selectHard);
}