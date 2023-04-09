export function dfs(grid, startNode, endNode) {
  const stack = [startNode];
  const path = [startNode];

  const visited = new Set();
  let i = 0;
  while (stack.length > 0) {
    const currentNode = stack.pop();

    visited.add(currentNode);
    path.push(currentNode);
    // setTimeout(() => {
    //   document.getElementById(`node-${currentNode.row}-${currentNode.col}`).className ="node node-visited";
    // }, 25 * i);

    if (currentNode === endNode) {
      return getDFSPath(endNode);
    }

    for (let neighbor of getNeighbors(currentNode, grid)) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        stack.push(neighbor);

        neighbor.previousNode = currentNode;
      }
    }
  }

  return null;
}

export function getDFSPath(node) {
  const path = [node];
  while (node.previousNode) {
    path.unshift(node.previousNode);
    node = node.previousNode;
  }
  return path;
}

function getNeighbors(node, grid) {
  const neighbors = [];
  const { row, col } = node;

  if (col > 0 && !grid[row][col - 1].isWall) {
    neighbors.push(grid[row][col - 1]);
  }
  if (row < grid.length - 1 && !grid[row + 1][col].isWall) {
    neighbors.push(grid[row + 1][col]);
  }
  if (col < grid[0].length - 1 && !grid[row][col + 1].isWall) {
    neighbors.push(grid[row][col + 1]);
  }
  if (row > 0 && !grid[row - 1][col].isWall) {
    neighbors.push(grid[row - 1][col]);
  }

  return neighbors;
}

export function getShortestPath(end) {
  const path = [];
  while (end.previousNode) {
    path.push(end);
    end = end.previousNode;
  }
  path.push(end);
  return path.reverse();
}
