var rows = 10;
var cols = 20;
var mines_count = 50;
var mines = [];

function makeGrid(){
  var table = $('<table>').attr('id','minesweeper');

  for(i=0;i<rows;i++){
    var a_row = $('<tr>');
    for(j=0;j<cols;j++){
      var a_col = $('<td>').addClass('unopened').data('row',i).data('col',j);
      a_row.append(a_col);
    }
    table.append(a_row);
  }
  return table;
}

function plantMine(){
  for(i=0;i<mines_count;i++){
    mines.push([Math.floor(Math.random() * rows),Math.floor(Math.random() * cols)]);
  }
}


function hasMine(row,col){
  mine = false;
  mines.forEach(function(e){
    if( e[0] == row && e[1] == col ){mine = true}
  });
  return mine;
}

function countNeighbornsMines(row,col){
  var count = 0;
  if(hasMine(row-1,col-1)){count++;};
  if(hasMine(row-1,col)){count++;};
  if(hasMine(row-1,col+1)){count++;};

  if(hasMine(row,col-1)){count++;};
  if(hasMine(row,col+1)){count++;};

  if(hasMine(row+1,col-1)){count++;};
  if(hasMine(row+1,col)){count++;};
  if(hasMine(row+1,col+1)){count++;};

  return count;
}




function openTile(td){
  row = td.data('row');
  col = td.data('col');
  console.log('click row=' + row + ' col=' + col);
  td.removeClass('unopened');

  if(hasMine(row,col)){
    td.addClass('mine');
  }
  else
  {
    count = countNeighbornsMines(row,col);
    if(count == 0){
      td.addClass('opened');
    }
    else{
     td.addClass('mine-neighbour-' + count);
    }

  }
}

$(document).ready(function(){
  plantMine();

  table = makeGrid();
  $('#game').append(table);

  $('#minesweeper td').click(function(event){
    openTile($(this));
  });

});


