import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.module.js';

const isMobile = window.innerWidth < 768;
const canvas = document.getElementById('three-hero');
if (!canvas) return;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
  antialias: !isMobile,
  powerPreference: isMobile ? 'low-power' : 'high-performance'
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));

const geometry = new THREE.TorusKnotGeometry(
  isMobile ? 8 : 10,
  isMobile ? 2 : 3,
  isMobile ? 64 : 100,
  isMobile ? 8 : 16
);
const material = new THREE.MeshStandardMaterial({
  color: 0x4a90e2,
  metalness: 0.7,
  roughness: 0.2,
  transparent: true,
  opacity: 0.8
});
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(20, 20, 20);
scene.add(directionalLight);

camera.position.z = isMobile ? 25 : 30;

let animationId;
function animate() {
  animationId = requestAnimationFrame(animate);
  torusKnot.rotation.x += isMobile ? 0.005 : 0.01;
  torusKnot.rotation.y += isMobile ? 0.005 : 0.01;
  renderer.render(scene, camera);
}

function handleResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function handleVisibilityChange() {
  if (document.hidden) {
    cancelAnimationFrame(animationId);
  } else {
    animate();
  }
}

window.addEventListener('resize', handleResize);
document.addEventListener('visibilitychange', handleVisibilityChange);

animate();
