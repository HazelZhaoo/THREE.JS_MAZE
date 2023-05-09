class Maze extends THREE.Object3D {
  constructor(numrow, numcol) {
    super();
    this.rows = numrow;
    this.cols = numcol;
    this.grid = new Array(numrow);
    const cellSize = 40;
    for (let i = 0; i < numrow; i++) {
      this.grid[i] = new Array(numcol);
      for (let j = 0; j < numcol; j++) {
        const cell = new Cell(i * cellSize, 0, j * cellSize, cellSize);
        floor_3D.add(cell);
        this.grid[i][j] = cell;
      }
    }
  }
  getIndex(cell) {
    let index = [];
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (this.grid[i][j] === cell) {
          index.push(i);
          index.push(j);
        }
      }
    }
    return index;
  }

  getUnvisited(cell)
    {
      const unvisited_ = [];
      let index = this.getIndex(cell);
      // console.log(index); //debug statement
      const row = index[0];
      const col = index[1];
      const neighbors = [];

      if (row > 0) {
        neighbors.push(this.grid[row - 1][col]);
      }
      if (row < this.rows - 1) {
        neighbors.push(this.grid[row + 1][col]);
      }
      if (col > 0) {
        neighbors.push(this.grid[row][col - 1]);
      }
      if (col < this.cols - 1) {
        neighbors.push(this.grid[row][col + 1]);
      }

      for (let i = 0; i < neighbors.length; i++) {
        if (!neighbors[i].visited) {
          unvisited_.push(neighbors[i]);
          console.log(unvisited_[i]);
        }
      }

      return unvisited_; //an array of unvisited cells is returned
    }

    DFS(start_cell) {
      
      const cell_stack = new Stack(); //create a stack to store visited cells
      cell_stack.push(start_cell);
      start_cell.visited = true; //set the cell as visited
     
       let random_cell;
      while (!cell_stack.empty()) {
        const current_cell = cell_stack.pop();
        const current_index = this.getIndex(current_cell);
    
        const unvisited = this.getUnvisited(current_cell); //will return the cells that are not visited
        
        if (unvisited.length > 0) {
          const random_num = Math.floor(Math.random() * unvisited.length);
          random_cell = unvisited[random_num]; //pick a random neighbor
    
          //get the index to determine the direction of the wall to be removed//
          const chosen_index = this.getIndex(random_cell); 
          const y_diff = chosen_index[0] - current_index[0];
          const x_diff = chosen_index[1] - current_index[1];
    
          if (y_diff === 1) {
            current_cell.removeWall("backPlane");
            random_cell.removeWall("frontPlane");
          } else if (y_diff === -1) {
            current_cell.removeWall("frontPlane");
            random_cell.removeWall("backPlane");
          } else if (x_diff === 1) {
            current_cell.removeWall("rightPlane");
            random_cell.removeWall("leftPlane");
          } else if (x_diff === -1) {
            current_cell.removeWall("leftPlane");
            random_cell.removeWall("rightPlane");
          }
          
          random_cell.visited = true; //set the random neighbor as visited
          
          cell_stack.push(random_cell); // Push the random neighbor onto the stack
        }
      }
    }
  }
