var BABYLON = require('babylonjs');

function Ground(scene){
    // mesh
    this.mesh = BABYLON.Mesh.CreateGroundFromHeightMap('ground_mesh','images/heightmap.png',1000,1000,100,0,50,scene);
    this.mesh.receiveShadows = true;
    this.mesh.position.y = -50;

    // material
    this.material = new BABYLON.StandardMaterial('ground_mat',scene);
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