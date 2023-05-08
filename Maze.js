class Maze extends THREE.Object3D
{
  constructor(numrow, numcol) 
  {
        super();
        this.rows = numrow;
        this.cols = numcol;
        this.grid = new Array(numrow);
        const cellSize = 20;
        for (let i = 0; i < numrow; i++) {
          this.grid[i] = new Array(numcol);
          for (let j = 0; j < numcol; j++) {
            const cell = new Cell(i * cellSize, 0, j * cellSize, cellSize);
            floor_3D.add(cell);
            this.grid[i][j] = cell;
          }
        }
      }
    


      DFS(start_cell) {
        const visited = new Set();
        const cell_stack = new Stack();
        cell_stack.push(start_cell);
        const start_index = this.getIndex(start_cell);
        console.log(start_index); //debug statement
        visited.add(start_index);
    
        while (!cell_stack.empty()) {
          const current_cell = cell_stack.pop();
          const current_index = this.getIndex(current_cell);
          console.log(current_index); //debug statement
          if (visited.has(current_index)) {
            continue;
          }
    
          visited.add(current_index);
    
          const unvisited = this.getUnvisited(current_cell, visited);
    
          if (unvisited.length > 0) {
            cell_stack.push(current_cell);
          }
    
          const random = Math.floor(Math.random() * unvisited.length);
          const chosen_neigh = unvisited[random];
          const chosen_index = this.getIndex(chosen_neigh);
    
          // Determine direction of wall to remove based on indices
          const y_diff = chosen_index[0] - current_index[0];
          const x_diff = chosen_index[1] - current_index[1];
          if (y_diff === 1) {
            // remove wall to bottom
            current_cell.removeWall("backPlane");
            chosen_neigh.removeWall("frontPlane");
          } else if (y_diff === -1) {
            // remove wall to top
            current_cell.removeWall("frontPlane");
            chosen_neigh.removeWall("backPlane");
          } else if (x_diff === 1) {
            // remove wall to right
            current_cell.removeWall("rightPlane");
            chosen_neigh.removeWall("leftPlane");
          } else if (x_diff === -1) {
            // remove wall to left
            current_cell.removeWall("leftPlane");
            chosen_neigh.removeWall("rightPlane");
          }
    
          cell_stack.push(chosen_neigh);
        }
    }
      

      
 getIndex(cell) 
  {
    let index = [];
    for (let i = 0; i < this.rows; i++) 
    {
      for (let j = 0; j < this.cols; j++) 
      {
        if (this.grid[i][j] === cell) {
          index = [i, j];
        }
      }
  }
  return index;
}

    getUnvisited(cell, visited) 
  {
      const unvisited_ = [];
      let index = this.getIndex(cell);
      console.log(index); //debug statement
      const row = index[0];
      const col = index[1];
      const neighbors = [];

      if (row > 0) 
      {
        neighbors.push(this.grid[row - 1][col]);
      }
      if (row < this.rows - 1) 
      {
        neighbors.push(this.grid[row + 1][col]);
      }
      if (col > 0) 
      {
        neighbors.push(this.grid[row][col - 1]);
      }
      if (col < this.cols - 1)
      {
        neighbors.push(this.grid[row][col + 1]);
      }

      for (let i = 0; i < neighbors.length; i++) 
      {
        if (!visited.has(neighbors[i])) {
          unvisited_.push(neighbors[i]);
        }
      }
  
  return unvisited_;
}



      toString() {
        let result = "";
        for (let i = 0; i < this.numRows; i++) {
          result += this.grid[i].map(cell => cell.toString(2).padStart(2, "0")).join(" ") + "\n";
        }
        return result;
      }
    }

 
