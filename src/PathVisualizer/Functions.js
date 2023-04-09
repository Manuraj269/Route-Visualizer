import { dijkstra, getNodesInShortestPathOrder } from "../Algorithm/dijsktra";
import { biDirectionalSearch, getPath } from "../Algorithm/bidirectional";
import {
  animateDijkstra,
  animateShortestPath,
  animateVisited,
  animateVisitedAndShortestPath,
  animateBombVisited,
  animateWalls
} from "./Animation";
import { createMazeRecursiveDivision } from "../Algorithm/recursiveMaze";
import { dfs, getShortestPath } from "../Algorithm/DFS";
import { aStar } from "../Algorithm/A-star";
import { recursiveDivisionMaze } from "../Algorithm/recursiveMaze";

let START_NODE_ROW = 14;
let START_NODE_COL = 19;
const FINISH_NODE_ROW = 14;
let FINISH_NODE_COL = 50;

export const visualizeDijsktra = (grid) => {
  const temp = grid;
  const startNode = temp[START_NODE_ROW][START_NODE_COL];
  const finishNode = temp[FINISH_NODE_ROW][FINISH_NODE_COL];
  const visitedNodesInOrder = dijkstra(temp, startNode, finishNode);
  const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
  console.log(nodesInShortestPathOrder);

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
};

export const visualizeBiDirectional = (grid) => {
  const startNode = grid[START_NODE_ROW][START_NODE_COL];
  const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
  const a = biDirectionalSearch(startNode, finishNode, grid);
  console.log(a.totalVisited);

  animateDijkstra(a.totalVisited, a.shortestPath);
};

export const clearGrid = () => {
  for (let i = 0; i < 30; i++) {
    for (let j = 0; j < 70; j++) {
      document.getElementById(`node-${i}-${j}`).className = "node";
    }
  }
};


export const visualizeDFS = (grid) => {
  let path = dfs(
    grid,
    grid[START_NODE_ROW][START_NODE_COL],
    grid[FINISH_NODE_ROW][FINISH_NODE_COL]
  );
  const shortPath = getShortestPath(grid[FINISH_NODE_ROW][FINISH_NODE_COL]);
  animateDijkstra(path, shortPath);
};

export const visualizeAstar = (grid) => {
  const startNode = grid[START_NODE_ROW][START_NODE_COL];
  const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
  const a = aStar(startNode, finishNode, grid);
  const shortPath = getShortestPath(grid[FINISH_NODE_ROW][FINISH_NODE_COL]);
  animateDijkstra(a, shortPath);
};

export const createMaze = (grid) => {
  const startNode = grid[START_NODE_ROW][START_NODE_COL];
  const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
  const walls= recursiveDivisionMaze(grid,startNode,finishNode);
  return walls;

};
