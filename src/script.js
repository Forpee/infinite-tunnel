import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';
import gsap from 'gsap';
/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Test mesh
 */
// Geometry
let shape = new THREE.Shape();
// shape.moveTo(0.5, 0.5);
// shape.lineTo(0.5, -0.5);
// shape.lineTo(-0.5, -0.5);
// shape.lineTo(-0.5, 0.5);
// shape.lineTo(0.5, 0.5);
let n = 10;
for (let i = 0; i <= n; i++) {
    let theta = 2 * Math.PI * i / n;
    let x = Math.sin(theta);
    let y = Math.cos(theta);
    shape.lineTo(x, y);

}

let extrudeSettings = {
    steps: 2,
    depth: 40,
    bevelEnabled: false,
};
let extrudeGeo = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
const geometry = new THREE.PlaneBufferGeometry(1, 1, 32, 32);
let normMat = new THREE.MeshNormalMaterial({
    side: THREE.DoubleSide,
});
// Material
const material = new THREE.ShaderMaterial({
    uniforms: {
        uTime: { value: 0 },
        playHead: { value: 0 },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    side: THREE.DoubleSide
});

// Mesh
const mesh = new THREE.Mesh(extrudeGeo, material);
scene.add(mesh);

mesh.position.z = -1;

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Orthographic camera
// const camera = new THREE.OrthographicCamera(-1/2, 1/2, 1/2, -1/2, 0.1, 100)

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0, 0, -1);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
    // Update controls
    controls.update();

    // Get elapsedtime
    const elapsedTime = clock.getElapsedTime();
    let playHead = elapsedTime % 4;
    mesh.position.z = -1 - playHead * 2;
    // Update uniforms
    material.uniforms.uTime.value = elapsedTime;
    material.uniforms.playHead.value = playHead;

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();