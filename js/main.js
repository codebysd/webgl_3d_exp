require('handjs');
var BABYLON = require('babylonjs');
var Sky = require('./Sky');
var Ground = require('./Ground');
var Cam = require('./Cam');
var Bot = require('./Bot');

// ready
var canvas = document.getElementById('canvas');
var engine = new BABYLON.Engine(canvas,true);
var scene = new BABYLON.Scene(engine);
scene.ambientColor = new BABYLON.Color3(0.3,0.3,0.3);


// environment
var sky = new Sky(scene);
var cam = new Cam(canvas,scene);
var ground = new Ground(scene);


// bot
var loader = new BABYLON.AssetsManager(scene);

Bot.load(loader,function(err,bot){
    if(err){
        console.error(err);
    }else{
        sky.shadowRenderList.push(bot.mesh);
        cam.camera.setTarget(bot.cameraTarget);
    }
});

loader.load();


// action
window.addEventListener('resize',function(){
    engine.resize();
});
engine.runRenderLoop(function(){
    cam.camera.alpha += 0.001;
    scene.render();
});