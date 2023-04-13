import "./style.css";
import * as t from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const scene = new t.Scene();
const spaceTexture = new t.TextureLoader().load("omeganebula1.png");

scene.background = spaceTexture;

const starContainer = new t.Object3D();

scene.add(starContainer);

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

const geometry = new t.CylinderGeometry(10, 10, 20, 100, 100, false, 90, 8);
const material = new t.MeshStandardMaterial({
  color: 0xff3456,
});

const meshh = new t.Mesh(geometry, material);

const pointLight = new t.PointLight(0xffffff);
pointLight.position.set(10, 10, 10);

const ambientLight = new t.AmbientLight(0xffffff);

const controls = new OrbitControls(camera, renderer.domElement);

scene.add(pointLight, ambientLight, meshh);
meshh.position.setZ(-100);

function addStar() {
  const geometry = new t.SphereGeometry(1, 10, 10);
  const material = new t.MeshStandardMaterial({
    color:
      "#" +
      t.MathUtils.randInt(0, 9) +
      t.MathUtils.randInt(0, 9) +
      t.MathUtils.randInt(0, 9) +
      t.MathUtils.randInt(0, 9) +
      t.MathUtils.randInt(0, 9) +
      t.MathUtils.randInt(0, 9),
  });
  const star = new t.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => t.MathUtils.randFloatSpread(1000));
  star.position.set(x, y, z);
  starContainer.add(star);
}

Array(2000).fill().forEach(addStar);

const loader = new GLTFLoader();
const phoneContainer = new t.Object3D();

scene.add(phoneContainer);
loader.load("phone.gltf", function (gltf) {
  phoneContainer.add(gltf.scene);
});

phoneContainer.position.set(10, 0, 60);

function moveCamera() {
  const tt = document.body.getBoundingClientRect().top;
  phoneContainer.rotation.x += 0.1;
  camera.position.z = 100 + tt * -0.05;
  camera.position.x = tt * -0.05;
  camera.position.y = tt * -0.05;
}

document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame(animate);
  meshh.rotation.x += 0.02;
  starContainer.rotation.x += 0.0006;
  controls.update();
  renderer.render(scene, camera);
}

animate();

window.addEventListener("unload", function (e) {
  window.scrollTo(0, 0);
});
