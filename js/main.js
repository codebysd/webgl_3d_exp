var THREE = require('three');
var OrbitControls = require('three-orbit-controls')(THREE);
var skybox = require('./skybox');

var canvas = document.getElementById('canvas');
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
var renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.autoClear = false;

camera.position.z = 5;
var camControl = new OrbitControls(camera);
camControl.noPan = true;
camControl.autoRotate = true;
camControl.noKeys = true;

scene.add(skybox);

function resize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
}

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

resize();
window.addEventListener('resize', resize);
render();