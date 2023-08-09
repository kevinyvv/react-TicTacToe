import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculatewin(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }
  const winner = calculatewin(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (isfull(squares)) {
    status = "Draw";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status"> {status} </div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}>
          {" "}
        </Square>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}>
          {" "}
        </Square>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}>
          {" "}
        </Square>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}>
          {" "}
        </Square>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}>
          {" "}
        </Square>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}>
          {" "}
        </Square>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}>
          {" "}
        </Square>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}>
          {" "}
        </Square>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}>
          {" "}
        </Square>
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentmove, setcurrentmove] = useState(0);
  const xIsNext = currentmove % 2 === 0;
  const currentSquares = history[currentmove];

  function handlePlay(nextSquares) {
    const nexthistory = [...history.slice(0, currentmove + 1), nextSquares];
    //spread notation is ...; numbers the values in the array
    setHistory(nexthistory);
    setcurrentmove(nexthistory.length - 1);
  }

  function jumpto(nextmove) {
    setcurrentmove(nextmove);
  }
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "go to move #" + move;
    } else {
      description = "go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpto(move)}> {description} </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol> {moves} </ol>
      </div>
    </div>
  );
}

function isfull(squares) {
  let a = 0;
  for (let i = 0; i < 9; i++) {
    if (squares[i] == null) {
      return false;
    } else {
      a++;
    }
  }
  if (a == 9) {
    return true;
  }
}

function calculatewin(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
