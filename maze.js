import { Cell } from './cell.js';
import { Stack } from './stack.js';
import * as THREE from 'three';


class Maze {
  constructor(numrow, numcol , scene) 
  {
    this.rows = numrow;
    this.cols = numcol;
    this.grid = new Array(numcol);
    const box = new THREE.BoxGeometry(10 , 10 , 10);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
   
    
    for (let i = 0; i < numcol; i++) 
    {
      this.grid[i] = new Array(numrow);
      for (let j = 0; j < numrow; j++) 
      {
        this.grid[i][j] = new Cell(i, j);
         const cube = new THREE.Mesh(box , material);
        cube.position.set(i * 10 , 0 , j* 10);
        scene.add(cube);
          
      }
    }
    this.path = this.grid;

  }

  getNeighbours(cell) 
  {
    const x = cell.x;
    const y = cell.y;
    const neighbours = [];
    if (x === 0 && y === 0) {
        if (x + 1 < this.cols) neighbours.push(this.grid[x + 1][y]);
        if (y + 1 < this.rows) neighbours.push(this.grid[x][y + 1]);
    } else if (x === 0 && y === this.rows - 1) {
        if (x + 1 < this.cols) neighbours.push(this.grid[x + 1][y]);
        if (y - 1 >= 0) neighbours.push(this.grid[x][y - 1]);
    } else if (x === this.cols - 1 && y === 0) {
        if (x - 1 >= 0) neighbours.push(this.grid[x - 1][y]);
        if (y + 1 < this.rows) neighbours.push(this.grid[x][y + 1]);
    } else if (x === this.cols - 1 && y === this.rows - 1) {
        if (x - 1 >= 0) neighbours.push(this.grid[x - 1][y]);
        if (y - 1 >= 0) neighbours.push(this.grid[x][y - 1]);
    } else {
        if (x - 1 >= 0) neighbours.push(this.grid[x - 1][y]);
        if (x + 1 < this.cols) neighbours.push(this.grid[x + 1][y]);
        if (y + 1 < this.rows) neighbours.push(this.grid[x][y + 1]);
        if (y - 1 >= 0) neighbours.push(this.grid[x][y - 1]);
    }
    console.log(`Neighbours of cell (${x},${y}): `);
    for (let i = 0; i < neighbours.length; i++) {
        console.log(`(${neighbours[i].x},${neighbours[i].y})`);
    }
    return neighbours;
}

  getIndex(cell)
  {
    const index_array = [cell.x , cell.y];
    
    return index_array;
  }

  DFS(start_cell) 
  {
  const cell_stack = new Stack();
  start_cell.setVisited();

  cell_stack.push(start_cell);
  while (!cell_stack.empty()) 
  {
    let current_cell = cell_stack.top();
    cell_stack.pop();

    let neigh_array = this.getNeighbours(current_cell);
    for (let i = 0; i < neigh_array.length; i++) 
    {
      let random = Math.floor(Math.random() * neigh_array.length);
      let index = this.getIndex(neigh_array[random]);
      if (neigh_array[random].visited == false) 
      {
        this.path[index[0]][index[1]] = true;
        cell_stack.push(neigh_array[random]);
        neigh_array[random].setVisited();
      } 
      else if (this.path[index[0]][index[1]] == true) 
      {
        continue;
      } else 
      {
        i--;
      }
    }
  }
}

}
