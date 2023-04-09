import React from "react";
import "./Node.css";

function Node(props) {
  const {
    isStart,
    isFinish,
    isVisited,
    isWall,
    isBomb,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
    row,
    col,
  } = props;

  const extraClassName = isFinish
    ? "node-finish"
    : isStart
    ? "node-start blinking-text"
    : isVisited
    ? "node-visited"
    : isWall
    ? "node-wall"
    : isBomb
    ? "node-bomb"
    :"";

  const source = isStart
    ? "https://cdn-icons-png.flaticon.com/512/4939/4939961.png"
    : isFinish
    ? "https://cdn-icons-png.flaticon.com/512/9440/9440304.png"
    : isBomb
    ? "https://cdn-icons-png.flaticon.com/512/9327/9327420.png"
    :"";

  return (
    <div
      className={`node ${extraClassName}`}
      id={`node-${row}-${col}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp(row,col)}
    >
      {(isStart || isFinish || isBomb) ? <img src={source} alt="Image description" className="image blinking-image img-fluid" /> : null}

      {/* {(isBomb) ? <img src={source} alt="Image description" className="image blinking-image img-fluid" /> : null} */}
    </div>
  );
}

export default Node;
