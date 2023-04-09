import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {
  visualizeDijsktra,
  clearGrid,
  visualizeBiDirectional,
  visualizeDFS,
  visualizeAstar,
  createBomb,
  createMaze,
} from "./Functions";

import { animateWalls } from "./Animation";

function NavBar(props) {
  const {
    handleDijsktra,
    handleClearGrid,
    handleBiDirectional,
    handleCreateMaze,
    handleDFS,
    handleAstar,
    handleCreateBomb,
    grid,
    setGrid,
  } = props;

  const genMaze = (grid) => {
    const walls = createMaze(grid);
    console.log(walls);
    const temp = animateWalls(walls, grid);
    setGrid(temp);
  };

  const clrGrid = (grid) => {
    const temp = grid;
    for (let i = 0; i < 30; i++) {
      for (let j = 0; j < 70; j++) {
        document.getElementById(`node-${i}-${j}`).className = "node";
        grid[i][j].isWall= false;
      }
    }
    setGrid(temp);
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      style={{ marginBottom: "20px" }}
    >
      <Navbar.Brand
        href="#home"
        style={{ marginRight: "100px", marginLeft: "20px" }}
      >
        Route Visualizer
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown
            title="Algorithms"
            id="basic-nav-dropdown"
            style={{ marginRight: "100px" }}
          >
            <NavDropdown.Item
              onClick={() => visualizeDijsktra(grid)}
              style={{ marginRight: "10px" }}
            >
              Visualize Dijkstra Algorithm
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => visualizeBiDirectional(grid)}
              style={{ marginRight: "10px" }}
            >
              Visualize Bidirectional Algorithm
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => visualizeDFS(grid)}
              style={{ marginRight: "10px" }}
            >
              Visualize DFS
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => visualizeAstar(grid)}
              style={{ marginRight: "10px" }}
            >
              Visualize A*
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link
            onClick={() => genMaze(grid)}
            style={{ marginRight: "100px" }}
          >
            Create Maze
          </Nav.Link>

          <Nav.Link
            onClick={() => clrGrid(grid)}
            style={{ marginRight: "100px" }}
          >
            Clear Board
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
