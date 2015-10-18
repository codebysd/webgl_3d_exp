var BABYLON = require('babylonjs');
require('handjs'); // poly-fill for touch and pointer input support

/**
 * Scene's default camera.
 * @param {Object} canvas - canvas to listen input events on.
 * @param {scene} scene - scene
 * @constructor
 */
function Cam(canvas,scene){
    // default camera
    this.camera = new BABYLON.ArcRotateCamera('main_cam',0,1.4,30,new BABYLON.Vector3.Zero(),scene);

    // limit vertical orbit
    this.camera.upperBetaLimit = Math.PI/2 - 0.05;

    // limit zoom
    this.camera.lowerRadiusLimit = 15;
    this.camera.upperRadiusLimit = 50;

    // attach to canvas
    this.camera.attachControl(canvas);
}

module.exports = Cam;