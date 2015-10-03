var THREE = require('three');

var skyCubeImages = [
    'px', 'nx',
    'py', 'ny',
    'pz', 'nz'
].map(function (v) {
        return 'images/sky_' + v + '.png'
    });

var skyTexture = THREE.ImageUtils.loadTextureCube(skyCubeImages);

var shader = THREE.ShaderLib["cube"];
var uniforms = THREE.UniformsUtils.clone(shader.uniforms);
uniforms["tCube"].value = skyTexture;

var skyMat = new THREE.ShaderMaterial({
    fragmentShader: shader.fragmentShader,
    vertexShader: shader.vertexShader,
    uniforms: uniforms
});

skyMat.side = THREE.BackSide;

var skyGeom = new THREE.BoxGeometry(1000, 1000, 1000, 1, 1, 1);
var skyMesh = new THREE.Mesh(skyGeom, skyMat);
skyMesh.doubleSided = true;

module.exports = skyMesh;