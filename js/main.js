var BABYLON = require('babylonjs');

// scene objects
var Sky = require('./Sky');
var Ground = require('./Ground');
var Grass = require('./Grass');
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
var grass = new Grass(ground,scene);

// setup lens effects
// var lensEffect = new BABYLON.LensRenderingPipeline('lens', {
//     edge_blur: 1.0,
//     chromatic_aberration: 1.0,
//     distortion: 1.0,
//     dof_focus_distance: cam.camera.radius,
//     dof_aperture: 1.0,
//     grain_amount: 0,
//     dof_pentagon: true,
//     dof_gain: 1.0,
//     dof_threshold: 1.0,
//     dof_darken: 0.25
// }, scene, 1.0, cam.camera);

// setup hrd rendering
// var hdr = new BABYLON.HDRRenderingPipeline("hdr", scene, 1.0, null, cam.camera);
// hdr.brightThreshold = 1.0;
// hdr.gaussCoeff = 0.3;
// hdr.gaussMean = 1.0;
// hdr.gaussStandDev = 6.0;
// hdr.minimumLuminance = 0.5;
// hdr.luminanceDecreaseRate = 0.5;
// hdr.luminanceIncreaserate = 0.5;
// hdr.exposure = 2;

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

            // update depth of field
            // lensEffect.setFocusDistance(cam.camera.radius);

            // render the scene
            scene.render();
        });
    }
});

// load bot assets
loader.load();




