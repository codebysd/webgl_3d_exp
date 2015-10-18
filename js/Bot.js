var BABYLON = require('babylonjs');

// cache the robot mesh
var robotMesh;

/**
 * Robot model.
 * @param {Object} scene - scene
 * @param {Object} mesh - robot mesh
 * @constructor
 */
function Bot(scene,mesh) {
    // mesh
    this.mesh = mesh;
    this.mesh.position = new BABYLON.Vector3(0,-6.9,0);
    this.mesh.rotate(BABYLON.Axis.Z,-1,BABYLON.Space.LOCAL);
    this.mesh.scaling = new BABYLON.Vector3(3,3,3);
    this.cameraTarget = new BABYLON.Vector3(0,-2,0);

    // material
    this.material = new BABYLON.ShaderMaterial("mat_bot",
        scene, './shaders/botmetal',
        {
            attributes: ["position", "normal", "uv"],
            uniforms: ["world", "worldView", "worldViewProjection", "view", "projection","cameraPosition","lightPosition"]
        });
    this.material.backFaceCulling = false;

    // reflective texture
    this.refTexture = new BABYLON.Texture("images/envmap.png",scene);
    this.refTexture.wrapU = BABYLON.Texture.CLAMP_ADDRESSMODE;
    this.refTexture.wrapV = BABYLON.Texture.CLAMP_ADDRESSMODE;

    // set values for shader
    this.material.setTexture("refSampler",this.refTexture);
    this.material.setVector3("cameraPosition", BABYLON.Vector3.Zero());

    // assign
    this.mesh.material = this.material;
}

/**
 * Loads the robot model. Either from cached mesh, or by running a mesh task on asset manager.
 * @param {Object} scene - scene.
 * @param {Object} assetManager - asset manager instance. load() should be called on asset manager afterwards.
 * @param {function(Error,Bot)} callback - callback function.
 */
Bot.load = function(scene,assetManager,callback){

    if(robotMesh){
        callback(undefined, new Bot(scene,robotMesh));
    }else{
        assetManager.addMeshTask('task_robot', '', 'models/', 'bot.babylon').onSuccess = function(task){
            if(task.loadedMeshes && task.loadedMeshes.length > 0){
                robotMesh = task.loadedMeshes[0];
                callback(undefined,new Bot(scene,robotMesh))
            }else{
                callback(new Error('Unable to load Bot mesh'));
            }
        };
    }
};

module.exports = Bot;