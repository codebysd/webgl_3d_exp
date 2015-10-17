var BABYLON = require('babylonjs');

function Sky(scene){
    // sky box
    this.mesh = BABYLON.Mesh.CreateBox('sky_mesh_box',10000,scene);
    this.mesh.infiniteDistance = true;

    // sky box material
    this.material = new BABYLON.StandardMaterial('sky_mat',scene);
    this.material.backFaceCulling = false;
    this.material.disableLighting = true;
    this.material.diffuseColor = BABYLON.Color3.Black();
    this.material.specularColor = BABYLON.Color3.Black();
    this.material.ambientColor = BABYLON.Color3.Black();
    this.material.specularPower = 0;

    // sky box texture
    this.texture = new BABYLON.CubeTexture("images/sky/",scene,Sky.IMAGES);
    this.texture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;

    // sky lights
    this.hemiLight = new BABYLON.HemisphericLight('sky_light_above',new BABYLON.Vector3(0,1,0),scene);
    this.hemiLight.diffuse = new BABYLON.Color3(0.3,0.3,0.3);
    this.hemiLight.specular = BABYLON.Color3.Black();
    this.hemiLight.groundColor = BABYLON.Color3.Black();

    this.sunLight = new BABYLON.DirectionalLight('sky_light_sun',new BABYLON.Vector3(-10,-10,2),scene);
    this.sunLight.diffuse = new BABYLON.Color3(0.9,0.9,0.9);
    this.sunLight.specular = new BABYLON.Color3(0.9,0.9,0.9);
    this.sunLight.setDirectionToTarget(BABYLON.Vector3.Zero());

    // shadow generator for sun
    this.shadowGenerator = new BABYLON.ShadowGenerator(1024, this.sunLight);
    this.shadowRenderList = this.shadowGenerator.getShadowMap().renderList;

    // assign
    this.material.reflectionTexture = this.texture;
    this.mesh.material = this.material;
}

Sky.IMAGES =['pn_xyz','py2','pn_xyz','pn_xyz','ny2','pn_xyz'].map(function(v){return 'sky_' + v + '.png'});

module.exports = Sky;