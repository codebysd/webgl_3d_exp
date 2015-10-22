var BABYLON = require('babylonjs');
var lodash = require('lodash');

/**
 * Create a grass cover.
 * @param {Ground} ground - ground
 * @param {Object} scene - scene
 * @constructor
 */
function Grass(ground, scene) {

    // we'll be using 3 types of grass
    this.spriteManager1 = new BABYLON.SpriteManager('grass_manager1','images/grass1.png',1000,256,scene);
    this.spriteManager2 = new BABYLON.SpriteManager('grass_manager2','images/grass2.png',1000,256,scene);
    this.spriteManager3 = new BABYLON.SpriteManager('grass_manager3','images/grass3.png',1000,256,scene);
    this.sprites = [];

    var self = this;
    var loaded = false;

    // wait for scene to load ground mesh
    scene.executeWhenReady(function () {

        // and don't run this more than once
        if (loaded) {
            return;
        }
        loaded = true;

        // get ground mesh vertices
        var data = ground.mesh.getVerticesData(BABYLON.VertexBuffer.PositionKind);

        if (lodash.isArray(data) && data.length >= 3 && data.length % 3 === 0) {
            // grass type sample array, type 1 is dominant
            var managers = [
                self.spriteManager1,
                self.spriteManager1,
                self.spriteManager1,
                self.spriteManager2,
                self.spriteManager3];

            // populate some shrubs at some ground vertices
            for(var i = 0 ; i < 3000; i++){
                // index of a vertex position trio
                var index = lodash.random(0,data.length/3);

                // make a sprite
                var sprite = new BABYLON.Sprite('grass_sprite_'+i,managers[lodash.random(0,4)]);
                sprite.size = 5;

                // set to vertex position, with some adjustments
                sprite.position.x = data[index*3];
                sprite.position.y = data[index*3 + 1] - 48;
                sprite.position.z = data[index*3 + 2];

                // save sprites
                self.sprites.push(sprite);
            }
        }
    });
}

module.exports = Grass;