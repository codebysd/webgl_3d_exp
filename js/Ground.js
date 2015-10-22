var BABYLON = require('babylonjs');

/**
 * Ground plane.
 * @param {Object} scene - scene
 * @constructor
 */
function Ground(scene){
    // mesh, deform with a heightmap
    this.mesh = BABYLON.Mesh.CreateGroundFromHeightMap('ground_mesh','images/heightmap.png',500,500,100,0,50,scene);
    this.mesh.receiveShadows = true;
    this.mesh.position.y = -50; // keep all heightmap below origin

    // material
    this.material = new BABYLON.StandardMaterial('ground_mat',scene);

    // rough surface
    this.material.specularColor = new BABYLON.Color3(0.5,0.5,0.5);
    this.material.specularPower = 0.7;

    // texture
    this.texture = new BABYLON.Texture("images/ground.png",scene);
    this.texture.uScale = 50;
    this.texture.vScale = 50;

    // assign
    this.material.diffuseTexture = this.texture;
    this.mesh.material = this.material;

}

module.exports = Ground;