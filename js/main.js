var BABYLON = require('babylonjs');

// scene objects
var Sky = require('./Sky');
var Ground = require('./Ground');
var Cam = require('./Cam');
var Bot = require('./Bot');

// init rendering
var canvas = document.getElementById('canvas');
var engine = new BABYLON.Engine(canvas,true);
var scene = new BABYLON.Scene(engine);

// handle window resize
window.addEventListener('resize',function(){
    engine.resize();
});

// add sky, ground and camera
var sky = new Sky(scene);
var cam = new Cam(canvas,scene);
var ground = new Ground(scene);


// load bot model
var loader = new BABYLON.AssetsManager(scene);
Bot.load(scene,loader,function(err,bot){
    if(err){
        console.error(err);
    }else{

        // bot casts a shadow
        sky.shadowRenderList.push(bot.mesh);

        // camera looks at the bot
        cam.camera.setTarget(bot.cameraTarget);

        // set light position, bot material's pixel shader needs this for specular reflections
        bot.material.setVector3("lightPosition", new BABYLON.Vector3(30,10,0));

        // finally, start rendering
        engine.runRenderLoop(function(){
            cam.camera.alpha += 0.001; // orbit camera every frame

            // update camera position, bot material's shader needs this for calculations
            bot.material.setVector3("cameraPosition", cam.camera.position);

            // render the scene
            scene.render();
        });
    }
});

// load bot assets
loader.load();


