import "./style.css";

import * as t from "three";

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new t.Scene();

const camera = new t.PerspectiveCamera(
  30,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new t.WebGL1Renderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(100);

const geometry = new t.CylinderGeometry(10, 10, 20, 100, 100, false, 90, 8);
const material = new t.MeshStandardMaterial({
  color: 0xff3456,
});

const meshh = new t.Mesh(geometry, material);

//scene.add(meshh);

const pointLight = new t.PointLight(0xffffff);
pointLight.position.set(10, 10, 10);

const ambientLight = new t.AmbientLight(0xffffff);

const controls = new OrbitControls(camera, renderer.domElement);

scene.add(pointLight, ambientLight);

function addStar() {
  const geometry = new t.SphereGeometry(0.25, 10, 10);
  const material = new t.MeshStandardMaterial({ color: 0xffffff });
  const star = new t.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => t.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

const loader = new GLTFLoader();

loader.load("nothing.glb", function (gltf) {
  scene.add(gltf.scene);
});

Array(200).fill().forEach(addStar);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
