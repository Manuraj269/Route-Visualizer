import React, { useState, useEffect } from "react";
import Node from "./Node/Node";
import "./PathFindingVisualizer.css";

import {
  visualizeDijsktra,
  visualizeBiDirectional,
  visualizeAstar,
  visualizeDFS,
  clearGrid,
} from "./Functions";
import NavBar from "./Navbar";

let START_NODE_ROW = 14;
let START_NODE_COL = 19;
const FINISH_NODE_ROW = 14;
let FINISH_NODE_COL = 50;

function PathFindingVisualizer() {

  const createNode = (col, row) => {
    return {
      col,
      row,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      isBomb: false,
      isVisited: false,
      isWall: false,
      previousNode: null,
      fScore: 0,
      gScore: 0,
    };
  };

  const getInitialGrid = () => {
    const temp = [];
    for (let row = 0; row < 30; row++) {
      const currentRow = [];
      for (let col = 0; col < 70; col++) {
        currentRow.push(createNode(col, row));
      }
      temp.push(currentRow);
    }
    return temp;
  };

  const tempi = getInitialGrid();

  const [grid, setGrid] = useState(tempi);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [isStartNodeLifted, setisStartNodeLifted] = useState(false);
  const [states, setStates] = useState(false);
  const [bomb, setBomb] = useState(false);

  const handleMouseDown = (row, col) => {
    if (row === START_NODE_ROW && col === START_NODE_COL) {
      setisStartNodeLifted(true);
      setStates(true);
    } else {
      const tempGrid = grid.slice();
      const newGrid = getNewGridWithWallToggled(tempGrid, row, col);
      setGrid(newGrid);
      setMouseIsPressed(true);
    }
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    const tempGrid = grid.slice();
    const newGrid = getNewGridWithWallToggled(tempGrid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = (row, col) => {
    setMouseIsPressed(false);
  };

  useEffect(() => {
    if (!mouseIsPressed) {
      setisStartNodeLifted(false);
    }
  }, [mouseIsPressed]);

  const getNewGridWithWallToggled = (tempGrid, row, col) => {
    const newGrid = tempGrid.slice();
    const node = newGrid[row][col];
    console.log(grid[row][col]);
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  return (
    <>
      <div className="whole">
        <NavBar
          handleDijsktra={visualizeDijsktra}
          handleClearGrid={clearGrid}
          handleBiDirectional={visualizeBiDirectional}
          handleDFS={visualizeDFS}
          handleAstar={visualizeAstar}
          grid={grid}
          setGrid={setGrid}
        />
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx} className="rowz">
                {row.map((node, rowIdx) => {
                  const {
                    row,
                    col,
                    isStart,
                    isFinish,
                    isVisited,
                    isWall,
                    isBomb,
                  } = node;
                  return (
                    <Node
                      row={row}
                      col={col}
                      key={rowIdx}
                      isStart={isStart}
                      isFinish={isFinish}
                      isVisited={isVisited}
                      isWall={isWall}
                      isBomb={isBomb}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => handleMouseDown(row, col)}
                      onMouseUp={(row, col) => handleMouseUp(row, col)}
                      onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default PathFindingVisualizer;
