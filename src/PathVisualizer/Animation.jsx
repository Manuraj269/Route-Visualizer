import React from "react";

export function animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
  for (let i = 0; i <= visitedNodesInOrder.length; i++) {
    if (i === visitedNodesInOrder.length) {
      setTimeout(() => {
        animateShortestPath(nodesInShortestPathOrder);
      }, 15 * i);
      return;
    } else {
      const node = visitedNodesInOrder[i];

      setTimeout(() => {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  }
}

export function animateVisitedAndShortestPath(
  visitedNodesInOrder,
  nodesInShortestPathOrder
) {
  for (let i = 0; i <= visitedNodesInOrder.length; i++) {
    if (i === visitedNodesInOrder.length) {
      setTimeout(() => {
        animateShortestPath(nodesInShortestPathOrder);
      }, 15 * i);
      return;
    } else {
      const node = visitedNodesInOrder[i];

      setTimeout(() => {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  }
}

export function animateShortestPath(nodesInShortestPathOrder) {
  for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
    const node = nodesInShortestPathOrder[i];

    setTimeout(() => {
      document.getElementById(`node-${node.row}-${node.col}`).className =
        "node node-shortest-path";
    }, 50 * i);
  }
}

export function animateVisited(visited) {
  let i = 0;
  visited.forEach((node) => {
    setTimeout(() => {
      document.getElementById(`node-${node.row}-${node.col}`).className =
        "node node-visited";
    }, i * 10);
    i++;
  });
}

export function animateBombVisited(visited) {
  let i = 0;
  visited.forEach((node) => {
    setTimeout(() => {
      document.getElementById(`node-${node.row}-${node.col}`).className =
        "node node-bomb-visited";
    }, i * 10);
    i++;
  });
}

export function animateWalls(walls, grid) {
  const temp = grid;
  for (let i = 0; i < walls.length; i++) {
    let node = grid[walls[i][0]][walls[i][1]];
    temp[walls[i][0]][walls[i][1]].isWall = true;
    setTimeout(() => {
      document.getElementById(`node-${node.row}-${node.col}`).className =
        "node node-wall";
    }, i * 10);
  }
  return temp;
}
