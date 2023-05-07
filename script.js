class Stack {
    constructor() {
      this.items = [];
    }
  
    push(element) {
      this.items.push(element);
    }
  
    pop() {
      if (this.items.length == 0) {
        return "Underflow";
      }
      return this.items.pop();
    }
  
    top() {
      return this.items[this.items.length - 1];
    }
  
    empty() {
      return this.items.length == 0;
    }
  }

class Cell extends THREE.Object3D 
{
    constructor(x, y, size, color) 
    {
      super(); //the super constructor that inherit every feature from the parent class//
      this.x = x;
      this.y = y;
      this.size = size;
      const material = new THREE.MeshBasicMaterial({color});
  
      const frontWall = new THREE.Mesh(new THREE.PlaneGeometry(size, size), material);
      frontWall.position.z = size / 2;
      this.add(frontWall);
  
      const backWall = new THREE.Mesh(new THREE.PlaneGeometry(size, size),material);
      backWall.position.z = -size / 2;
      backWall.rotateY(Math.PI);
      this.add(backWall);
  
      const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(size, size), material);
      leftWall.position.x = -size / 2;
      leftWall.rotateY(-Math.PI / 2);
      this.add(leftWall);
  
      const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(size, size),material);
      rightWall.position.x = size / 2;
      rightWall.rotateY(Math.PI / 2);
      this.add(rightWall);
    }
  
    removeWall(direction) {
      const wall = this.children.find(child => child.name === direction);
      if (wall) {
        this.remove(wall);
        wall.geometry.dispose();
        wall.material.dispose();
      }
    }
  }
  
  
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

document.addEventListener('DOMContentLoaded', function() 
{
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#e4cae4");
  
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 10, 100);
  
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

  //the floor //
    const floorGeometry = new THREE.PlaneGeometry(100, 100, 10, 10);
    const floorMaterial = new THREE.MeshBasicMaterial({
      color: "#f6edf6",
      side: THREE.DoubleSide
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2; // rotate the floor to be flat
    const floor_3D = new THREE.Object3D();
    floor_3D.add(floor);
   
    const cell = new Cell(0 , 0 , 10 ,"green");
    scene.add(cell);
     
    

    
//hierarchical modelling to add the objects to the group//
   const group = new THREE.Group();
    scene.add(group);
    group.add(floor_3D);
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
  
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(0, 10, 10);
    scene.add(pointLight);
  
    const hemisphereLight = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
    hemisphereLight.position.set(0.5, 1, 0.75);
    scene.add(hemisphereLight);

    const control = new THREE.OrbitControls(camera , renderer.domElement);
    scene.add(control);
    controls.addEventListener("change", render);
  
    function animate() {
      requestAnimationFrame(animate);
      floor_3D.rotation.y += 0.01; // rotate the floor_3D object around the y-axis
      renderer.render(scene, camera);
    }
  
    animate();
});

