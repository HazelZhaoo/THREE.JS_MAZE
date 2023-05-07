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
   export {Cell}
