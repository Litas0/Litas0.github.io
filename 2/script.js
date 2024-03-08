let origBoard;
const HUMAN_PLAYER = 'O';
const AI_PLAYER    = 'X';
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  
  [0, 4, 8],
  [2, 4, 6]
];
const cells = document.getElementsByClassName('cell');
var players;
var difficulty;

var p = document.getElementById("players");
p.addEventListener('change', (e) => {
  const value = e.target.value;
  if(value === '1') { 
    players = 1;

    document.getElementById("start").style.display = 'none';

    document.getElementById("diff1").style.display = 'flex';
    document.getElementById("diff2").style.display = 'inherit';
  }
  if(value === '2') {
    players = 2;

    document.getElementById("diff1").style.display = 'none';
    document.getElementById("diff2").style.display = 'none';

    document.getElementById("start").style.display = 'inherit';
  }
});

var d = document.getElementById("diff");
d.addEventListener('change', (f) => {
  const value = f.target.value;
  if(value === '1' || value === '2' || value === '3') { 
    difficulty = value;
    document.getElementById("start").style.display = 'inherit';
  }
});

function onStartGame () {
  console.log('Starting Game');
  document.querySelector('.setup').style.display = 'none';
  document.querySelector('.end-game').style.display = 'none';
  document.getElementById("board").style.display = 'inherit';
  origBoard = Array.from(Array(9).keys());
  for(let i=0; i< cells.length; i++) {
    cells[i].innerText = '';
    cells[i].style.removeProperty('background-color');
    cells[i].addEventListener('click', onTurnClick, false)
  }
};

function onTurnClick (e) {
  const { id:squareId } = e.target;
  if (typeof origBoard[squareId] === 'number') {
    onTurn(squareId, HUMAN_PLAYER);
    if (!onCheckGameTie()) {
      onTurn(botPicksSpot(), AI_PLAYER)
    }
  } else {
    var audio = new Audio('wronganswer.mp3');
    audio.play();
  }
}

function onTurn (squareId, player) {
  origBoard[squareId] = player;
  document.getElementById(squareId).innerText = player;
  let isGameWon = onCheckWin(origBoard, player);
  if (isGameWon) {
    onGameOver(isGameWon);
  }
}

function onCheckWin (board, player) {
  let plays = board.reduce((a, e, i) => {
    return (e === player) ? a.concat(i) : a;
  }, []);
  let gameWon = false;
  for (let [index, win] of winCombos.entries()) {
    if (win.every(elem => plays.indexOf(elem) > -1)) { 
      gameWon = { 
        index: index,
        player: player
      };
      break;
    }
  }
  return gameWon;
}

function onGameOver ({ index, player }) {
  for (let i = 0; i < cells.length; i++) {
    cells[i].removeEventListener('click', onTurnClick, false)
  }

  const result = (player === HUMAN_PLAYER) ? 'Wygrałeś' : 'Przegrałeś';
  onDeclareWinner(result);
}

function onDeclareWinner (who) {
  document.getElementById("restart").style.display = 'block';
  document.querySelector('.end-game').style.display = 'block';
  document.querySelector('.end-game .text').innerText = `Wynik: ${who}`;
}

function onCheckGameTie () {
  if (emptySquares().length === 0) {
    for (let i = 0; i < cells.length; i++) {
      cells[i].removeEventListener('click', onTurnClick, false)
    }
    onDeclareWinner('Remis');
    return true;
  } else {
    return false;
  }
}

function emptySquares () {
  return origBoard.filter(item => typeof item === 'number');
}

function botPicksSpot () {
  if(difficulty === '1')
  {
    return emptySquares()[getRandomInt(0,emptySquares().length)];
  }
  else if (difficulty === '2')
  {
    if(getRandomInt(0,2) === '0')
    return emptySquares()[getRandomInt(0,emptySquares().length)];
    else
    return minimax(origBoard, AI_PLAYER).index;
  }
  else 
  {
    return minimax(origBoard, AI_PLAYER).index;
  }
}

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

function minimax(newBoard, player) {
  let availableSpots = emptySquares();

  if (onCheckWin(newBoard, HUMAN_PLAYER)) {
    return { score: -10 }
  } else if (onCheckWin(newBoard, AI_PLAYER)) {
    return { score: 10 }
  } else if (availableSpots.length === 0) {
    return { score: 0 }
  }
  let moves = [];
  for (let i=0; i<availableSpots.length; i++) {
    let move = {};
    move.index = newBoard[availableSpots[i]];
    newBoard[availableSpots[i]] = player;

    if (player === AI_PLAYER) {
      let result = minimax(newBoard, HUMAN_PLAYER);
      move.score = result.score;
    } else {
      let result = minimax(newBoard, AI_PLAYER);
      move.score = result.score;
    }

    newBoard[availableSpots[i]] = move.index;
    moves.push(move);
  }
  let bestMove;
  if (player === AI_PLAYER) {
    let bestScore = -10000;
    for (let i=0; i<moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } 
  else {
    let bestScore = 10000;
    for (let i=0; i<moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  return moves[bestMove];
}