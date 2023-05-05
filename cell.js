class Cell
  {
    constructor(row_in , col_in)
    {
      this.x = col_in;
      this.y = row_in;
      this.visited = false; 
      this.walls = [true , true , true , true]; //left , right , front , back
    }

    removeWall(adjacent_cell)
    {
      x_diff = adjacent_cell.x - this.x;
      y_diff = adjacent_cell.y - this.y;
       if(x_diff === -1)
       {
          this.walls[0] = false; //remove left wall and right wall of adjacent
          adjacent_cell.walls[1] = false;
       }
       else if(x_diff === 1)
       {
         this.walls[1] = false; //remove right wall and left wall of ad
         adjacent_cell.walls[0] = false;
       }
      else if(y_diff === -1)
      {
        this.walls[2] = false; //remove front wall and back wall of ad
        adjacent_cell.walls[3] = false;
      }
      else if(y_diff === 1)
      {
        this.walls[3] = false; //remove back wall and front wall of ad
        adjacent_cell.walls[2] = false;
      }
      else throw new Error("Invalid index");
      
    }

    setVisited()
    {
      this.visited = true;
    }

    hasWall(direction)
    {
      if(direction === "left")
        return this.walls[0];
      else if(direction === "right")
        return this.walls[1];
      else if(direction === "front")
        return this.walls[2];
      else if(direction === "back")
        return this.walls[3];
      else throw new Error("Invalid direction");
    }
  }

export { Cell };
