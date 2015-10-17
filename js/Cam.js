var BABYLON = require('babylonjs');
require('handjs');

function Cam(canvas,scene){
    // default camera
    this.camera = new BABYLON.ArcRotateCamera('main_cam',0,1.4,30,new BABYLON.Vector3.Zero(),scene);
    this.camera.upperBetaLimit = Math.PI/2 - 0.05;
    this.camera.lowerRadiusLimit = 15;
    this.camera.upperRadiusLimit = 50;
    this.camera.attachControl(canvas);
}

module.exports = Cam;