const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

const scene = new THREE.Scene();
scene.background = new THREE.Color("black");

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 10, 100);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0xD8BFD8, side: THREE.DoubleSide });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2; // rotate the floor to be flat
scene.add(floor);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(0, 10, 10);
scene.add(pointLight);

const hemisphereLight = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
hemisphereLight.position.set(0.5, 1, 0.75);
scene.add(hemisphereLight);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
