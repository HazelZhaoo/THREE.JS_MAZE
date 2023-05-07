import {Stack} from './stack.js'
import {Cell} from './cell.js'
import {Maze} from './Maze.js'

let scene, camera, renderer, floor_3D;

function createWorld() {
  //the floor //
  const floorGeometry = new THREE.PlaneGeometry(100, 100, 10, 10);
  const floorMaterial = new THREE.MeshBasicMaterial({
    color: "#f6edf6",
    side: THREE.DoubleSide
  });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2; // rotate the floor to be flat
  floor_3D = new THREE.Object3D();
  floor_3D.add(floor);

  const cell = new Cell(0 , 0 , 10 ,"green");
  scene.add(cell);
  const group = new THREE.Group();
  scene.add(group);
  group.add(floor_3D);
}

function init() {
  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  scene = new THREE.Scene();
  scene.background = new THREE.Color("#e4cae4");

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.set(0, 10, 100);

  renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 1, 100);
  pointLight.position.set(0, 10, 10);
  scene.add(pointLight);

  const hemisphereLight = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
  hemisphereLight.position.set(0.5, 1, 0.75);
  scene.add(hemisphereLight);

  createWorld();

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  floor_3D.rotation.y += 0.01; // rotate the floor_3D object around the y-axis
  renderer.render(scene, camera);
}

window.onload = init;
