class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    this.values.push({ val, priority });
    this.sort();
  }

  dequeue() {
    return this.values.shift();
  }

  changePriority(val, priority) {
    const index = this.values.findIndex(v => v.val === val);
    this.values[index].priority = priority;
    this.sort();
  }

  contains(val) {
    return this.values.some(v => v.val === val);
  }

  isEmpty() {
    return !this.values.length;
  }

  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }
}


export function aStar(startNode, endNode,grid ) {
  // Create a set to keep track of visited nodes
  const visited = new Set();
  
  // Create a priority queue to keep track of nodes to visit
  const queue = new PriorityQueue();
  const totVisited=[];

  // Set the fScore and gScore of the start node to 0
  startNode.fScore = 0;
  startNode.gScore = 0;
  let i=0;
  // Add the start node to the queue
  queue.enqueue(startNode, startNode.fScore);
  
  while (!queue.isEmpty()) {
    console.log(i);
    i++;
    // Dequeue the node with the lowest fScore
    const currentNode = queue.dequeue();
    totVisited.push(currentNode.val);
    // If we've reached the end node, return the path to it
    if (currentNode.val === endNode) {
      return totVisited;
    }
    
    // Mark the node as visited
    visited.add(currentNode.val);
    console.log(visited);
    // Explore the neighbors of the current node
    for (let neighbor of getNeighbors(currentNode.val, grid)) {
      if (!visited.has(neighbor)) {
        // Calculate the tentative gScore for the neighbor
        const tentativeGScore = currentNode.val.gScore + 1;
        
        if (!queue.contains(neighbor)) {
          // This is the first time we're seeing the neighbor, so set its fScore
          // and add it to the queue
          neighbor.fScore = tentativeGScore + heuristic(neighbor, endNode);
          neighbor.gScore = tentativeGScore;
          neighbor.previousNode = currentNode.val;
          queue.enqueue(neighbor, neighbor.fScore);
        } else if (tentativeGScore < neighbor.gScore) {
          // We've already seen the neighbor, but this path to it is better than
          // what we've seen before, so update its gScore and fScore
          neighbor.gScore = tentativeGScore;
          neighbor.fScore = tentativeGScore + heuristic(neighbor, endNode);
          neighbor.previousNode = currentNode.val;
          queue.changePriority(neighbor, neighbor.fScore);
        }
      }
    }
  }
  
  // If we've explored all reachable nodes and haven't found the end node, return null
  return null;
}

function getPath(node) {
  // Starting from the end node, follow the isPrevious links to build the path
  const path = [node];
  while (node.previousNode) {
    path.unshift(node.previousNode);
    node = node.previousNode;
  }
  return path;
}

function getNeighbors(node, grid) {
  const neighbors = [];
  const {row, col} = node;
  
  if (row > 0 && !grid[row - 1][col].isWall) {
    neighbors.push(grid[row - 1][col]);
  }
  if (col < grid[0].length - 1 && !grid[row][col + 1].isWall) {
    neighbors.push(grid[row][col + 1]);
  }
  if (row < grid.length - 1 && !grid[row + 1][col].isWall) {
    neighbors.push(grid[row + 1][col]);
  }
  if (col > 0 && !grid[row][col - 1].isWall) {
    neighbors.push(grid[row][col - 1]);
  }
  
  return neighbors;
}

function heuristic(nodeA, nodeB) {
  // Calculate the Manhattan distance between the nodes
  return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
}
