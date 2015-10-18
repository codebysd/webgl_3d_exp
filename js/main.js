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
Bot.load(scene,loader,function(err,bot){
    if(err){
        console.error(err);
    }else{
        sky.shadowRenderList.push(bot.mesh);
        cam.camera.setTarget(bot.cameraTarget);

        bot.material.setVector3("lightPosition", new BABYLON.Vector3(30,10,0));

        engine.runRenderLoop(function(){
            cam.camera.alpha += 0.001;
            bot.material.setVector3("cameraPosition", cam.camera.position);
            scene.render();
        });
    }
});

loader.load();


// resize
window.addEventListener('resize',function(){
    engine.resize();
});

