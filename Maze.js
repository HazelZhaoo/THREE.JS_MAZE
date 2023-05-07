class Maze extends THREE.Object3D
{
    constructor(numrow, numcol, scene) {
      super();
      this.rows = numrow;
      this.cols = numcol;
      this.grid = new Array(numrow);
     
      for (let i = 0; i < numcol; i++) {
        this.grid[i] = new Array(numcol);
        for (let j = 0; j < numrow; j++) {
          this.grid[i][j] = 0;
        }
      }
    }
  
    DFS() {
        const visited = new Set(); // create a new set to store the visited cells
        const cell_stack = new Stack();
        //const stack = [{row: 0, col: 0}]; // and a stack of object
      
        while (!cell_stack.empty())
        {
          const current_cell = cell_stack.pop();
          const position = current_cell.row * this.cols + current_cell.col;
      
          if (visited.has(position)) 
          {
            continue;
          }
      
          visited.add(position);
      
          const unvisited = this.getUnvisited(current_cell, visited);
      
          if (unvisited.length > 0) {
            stack.push(current_cell);
          }
      
          const random = Math.floor(Math.random() * unvisited.length);
          const chosen_neigh = unvisited[random];
      
          if (current_cell.row === chosen_neigh.row)
        {
            if (current_cell.col < chosen_neigh.col) {
              this.grid[current_cell.row][current_cell.col + 1] |= 1;
            } else {
              this.grid[current_cell.row][current_cell.col] |= 1;
            }
          } else {
            if (current_cell.row < chosen_neigh.row) {
              this.grid[current_cell.row + 1][current_cell.col] |= 2;
            } else {
              this.grid[current_cell.row][current_cell.col] |= 2;
            }
          }
      
          stack.push(chosen_neigh);
        }
      }
      
      getUnvisited(cell, visited) {
        const unvisited_ = [];
      
        if (cell.col > 0) {
          const neigh = {row: cell.row, col: cell.col - 1};
          if (!visited.has(neigh.row * this.cols + neigh.col)) {
            unvisited_.push(neigh);
          }
        }
      
        if (cell.row > 0) {
          const neigh = {row: cell.row - 1, col: cell.col};
          if (!visited.has(neigh.row * this.cols + neigh.col)) {
            unvisited_.push(neigh);
          }
        }
      
        if (cell.col < this.cols - 1) {
          const neigh = {row: cell.row, col: cell.col + 1};
          if (!visited.has(neigh.row * this.cols + neigh.col)) {
            unvisited_.push(neigh);
          }
        }
      
        if (cell.row < this.rows - 1) {
          const neigh = {row: cell.row + 1, col: cell.col};
          if (!visited.has(neigh.row * this.cols + neigh.col)) {
            unvisited_.push(neigh);
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

export {Maze}
