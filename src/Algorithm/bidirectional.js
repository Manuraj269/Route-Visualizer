// export function biDirectionalSearch(startRow, startCol, endRow, endCol, grid) {
//     const numRows = grid.length;
//     const numCols = grid[0].length;
//     const visitedForward = new Array(numRows).fill().map(() => new Array(numCols).fill(false));
//     const visitedBackward = new Array(numRows).fill().map(() => new Array(numCols).fill(false));
//     const queueForward = [[startRow, startCol]];
//     const queueBackward = [[endRow, endCol]];
//     const visitedNodes = [];

//     visitedForward[startRow][startCol] = true;
//     visitedBackward[endRow][endCol] = true;

//     while (queueForward.length > 0 && queueBackward.length > 0) {
//       const [currentRowForward, currentColForward] = queueForward.shift();
//       const [currentRowBackward, currentColBackward] = queueBackward.shift();

//       visitedNodes.push([currentRowForward, currentColForward]);
//       visitedNodes.push([currentRowBackward, currentColBackward]);

//       // Check if we have visited this node in both directions
//       if (visitedForward[currentRowForward][currentColForward] && visitedBackward[currentRowForward][currentColForward]) {
//         return visitedNodes;
//       }
//       if (visitedForward[currentRowBackward][currentColBackward] && visitedBackward[currentRowBackward][currentColBackward]) {
//         return visitedNodes;
//       }

//       // Expand nodes in forward direction
//       const neighborsForward = getNeighbors(currentRowForward, currentColForward, numRows, numCols, grid);
//       for (const [neighborRow, neighborCol] of neighborsForward) {
//         if (!visitedForward[neighborRow][neighborCol]) {
//           visitedForward[neighborRow][neighborCol] = true;
//           queueForward.push([neighborRow, neighborCol]);
//         }
//       }

//       // Expand nodes in backward direction
//       const neighborsBackward = getNeighbors(currentRowBackward, currentColBackward, numRows, numCols, grid);
//       for (const [neighborRow, neighborCol] of neighborsBackward) {
//         if (!visitedBackward[neighborRow][neighborCol]) {
//           visitedBackward[neighborRow][neighborCol] = true;
//           queueBackward.push([neighborRow, neighborCol]);
//         }
//       }
//     }

//     // If we reach here, there is no path between start and end nodes
//     return null;
//   }

//   function getNeighbors(row, col, numRows, numCols, grid) {
//     const neighbors = [];
//     if (row > 0 && !grid[row - 1][col].isWall) {
//       neighbors.push([row - 1, col]);
//     }
//     if (row < numRows - 1 && !grid[row + 1][col].isWall) {
//       neighbors.push([row + 1, col]);
//     }
//     if (col > 0 && !grid[row][col - 1].isWall) {
//       neighbors.push([row, col - 1]);
//     }
//     if (col < numCols - 1 && !grid[row][col + 1].isWall) {
//       neighbors.push([row, col + 1]);
//     }
//     return neighbors;
//   }

export function biDirectionalSearch(start, end, grid) {
  const unvisitedNodeStart = [start];
  const unvisitedNodesFinish = [end];
  const visitedStart = new Set();
  const visitedEnd = new Set();

 
  
  start.distance = 0;
  end.distance = 0;
  const totVisited = [];
  let i = 0;

  while (unvisitedNodeStart.length > 0 && unvisitedNodesFinish.length > 0) {
    console.log(i);
    i++;
    const currentStart = unvisitedNodeStart.shift();
    const currentEnd = unvisitedNodesFinish.shift();
    currentStart.isVisited = true;
    currentEnd.isVisited = true;

    totVisited.push(currentStart);
    totVisited.push(currentEnd);

    visitedStart.add(currentStart);
    visitedEnd.add(currentEnd);

    if (isNeighbour(currentStart, currentEnd)) {
      // found intersection, return path
      console.log(currentStart);
      const path = getPath(currentStart, currentEnd);
      return {
        visited: visitedStart,
        shortestPath: path,
        totalVisited: totVisited,
      };
    }

    const neighborsStart = getNeighbors(currentStart, grid);
    const neighborsEnd = getNeighbors(currentEnd, grid);

    for (const neighbor of neighborsStart) {
      if (visitedStart.has(neighbor)) continue;
      if (neighbor.isWall) continue;

      if (!neighbourNotInUnvisitedNodes(neighbor, unvisitedNodesFinish)) {
        const path = getPath(currentStart, neighbor);

        totVisited.push(neighbor);
        return {
          visited: visitedEnd,
          shortestPath: path,
          totalVisited: totVisited,
        };
      }
      const newDistance = currentStart.distance + 1;

      if (neighbourNotInUnvisitedNodes(neighbor, unvisitedNodeStart)) {
        unvisitedNodeStart.unshift(neighbor);
        neighbor.distance = newDistance;
        neighbor.previousNode = currentStart;
      } else if (newDistance < neighbor.distance) {
        neighbor.distance = newDistance;
        neighbor.previousNode = currentStart;
      }
    }

    for (const neighbor of neighborsEnd) {
      if (visitedEnd.has(neighbor)) continue;
      if (neighbor.isWall) continue;

      if (!neighbourNotInUnvisitedNodes(neighbor, unvisitedNodeStart)) {
        const path = getPath(neighbor, currentEnd);

        totVisited.push(neighbor);
        return {
          visited: visitedEnd,
          shortestPath: path,
          totalVisited: totVisited,
        };
      }

      const newDistance = currentStart.distance + 1;

      if (neighbourNotInUnvisitedNodes(neighbor, unvisitedNodesFinish)) {
        unvisitedNodesFinish.unshift(neighbor);
        neighbor.distance = newDistance;
        neighbor.previousNode = currentEnd;
      } else if (newDistance < neighbor.distance) {
        neighbor.distance = newDistance;
        neighbor.previousNode = currentEnd;
      }
    }

    unvisitedNodeStart.sort((a, b) => a.distance - b.distance);
    unvisitedNodesFinish.sort((a, b) => a.distance - b.distance);
  }

  // no path found
  return {
    visited: visitedStart,
    totalVisited: totVisited,
    shortestPath: [],
  };
}

function getNeighbors(node, grid) {
  const neighbors = [];

  const dx = [0, 0, 1, -1];
  const dy = [1, -1, 0, 0];

  for (let i = 0; i < 4; i++) {
    const x = node.row + dx[i];
    const y = node.col + dy[i];

    if (x < 0 || x >= grid.length || y < 0 || y >= grid[0].length) continue;

    neighbors.push(grid[x][y]);
  }

  return neighbors;
}

export function getPath(start, end) {
  const path = [];
  console.log("STARTCOL and ENDCOL" + start.col + " " + end.col);
  while (true) {
    path.push(start);
    if (start.previousNode === null) break;
    start = start.previousNode;
  }
  while (true) {
    path.push(end);
    if (end.previousNode === null) break;
    end = end.previousNode;
  }

  return path.reverse();
}

function isNeighbour(closestNodeStart, closestNodeFinish) {
  let rowStart = closestNodeStart.row;
  let colStart = closestNodeStart.col;
  let rowFinish = closestNodeFinish.row;
  let colFinish = closestNodeFinish.col;
  if (rowFinish === rowStart - 1 && colFinish === colStart) return true;
  if (rowFinish === rowStart && colFinish === colStart + 1) return true;
  if (rowFinish === rowStart + 1 && colFinish === colStart) return true;
  if (rowFinish === rowStart && colFinish === colStart - 1) return true;
  return false;
}

function neighbourNotInUnvisitedNodes(neighbour, unvisitedNodes) {
  for (let node of unvisitedNodes) {
    if (node.row === neighbour.row && node.col === neighbour.col) {
      return false;
    }
  }
  return true;
}
