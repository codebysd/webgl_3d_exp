precision highp float;

// Attributes
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

// Uniforms
uniform mat4 world;
uniform mat4 worldView;
uniform mat4 worldViewProjection;
uniform vec3 cameraPosition;

// Varying
varying vec3 vPositionW;
varying vec3 vNormalW;
varying vec4 vPosition;
varying vec3 vNormal;

void main() {

    vPosition = vec4( position, 1. );
    vNormal = normal;

    vPositionW = vec3(world * vec4(position, 1.0));
    vNormalW = normalize(vec3(world * vec4(normal, 0.0)));

    gl_Position = worldViewProjection * vPosition;

}