var BABYLON = require('babylonjs');

// cache mesh
var robotMesh;

function Bot(mesh) {
    // mesh
    this.mesh = mesh;
    this.mesh.position = new BABYLON.Vector3(0,-6.9,0);
    this.mesh.rotate(BABYLON.Axis.Z,-1,BABYLON.Space.LOCAL);
    this.mesh.scaling = new BABYLON.Vector3(3,3,3);
    this.cameraTarget = new BABYLON.Vector3(0,-2,0);
}

Bot.load = function(assetManager,callback){

    if(robotMesh){
        callback(undefined, new Bot(robotMesh));
    }else{
        assetManager.addMeshTask('task_robot', '', 'models/', 'bot.babylon').onSuccess = function(task){
            if(task.loadedMeshes && task.loadedMeshes.length > 0){
                robotMesh = task.loadedMeshes[0];
                callback(undefined,new Bot(robotMesh))
            }else{
                callback(new Error('Unable to load Bot mesh'));
            }
        };
    }
};

module.exports = Bot;