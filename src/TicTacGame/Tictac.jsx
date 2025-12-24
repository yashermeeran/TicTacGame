import React, { useState } from "react";
import Button from "./button";
import "./Tictac.css";

export default function Tictac() {
  const [xNext, setXNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;

    const nextSquares = [...squares];
    nextSquares[i] = xNext ? "x" : "o";
    setSquares(nextSquares);
    setXNext(!xNext);
  }

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every((square) => square !== null);

  let status;
  if (winner === "x") { 
    status = "Player A has won the game!";
  } else if (winner === "o") {
    status = "Player B has won the game!";
  } else if (isDraw) {
    status = "Match has been drawn!";
  } else {
    status = `Next Turn : Player ${xNext ? "A (X)" : "B (O)"}`;
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXNext(true);
  }

  return (
    <div className="game">
      <h2 className="title">TIC TAC GAME</h2>
      <p className="status">{status}</p>

      <div className="board">
        {[0, 1, 2].map((row) => (
          <div className="row" key={row}>
            {[0, 1, 2].map((col) => {
              const index = row * 3 + col;
              return (
                <Button
                  key={index}
                  value={squares[index]}
                  onSquareClick={() => handleClick(index)}
                />
              );
            })}
          </div>
        ))}
      </div>

      <button className="reset" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}
