precision highp float;

// uniforms
uniform mat4 world;
uniform mat4 worldView;
uniform mat4 worldViewProjection;
uniform vec3 cameraPosition;
uniform vec3 lightPosition;

uniform sampler2D textureSampler;
uniform sampler2D refSampler;

// varying
varying vec4 vPosition;
varying vec3 vNormal;
varying vec3 vPositionW;
varying vec3 vNormalW;


void main(void) {

    // reflection color
    vec3 e = normalize( vec3( worldView * vPosition ) );
    vec3 n = normalize( worldView * vec4(vNormal, 0.0) ).xyz;

    vec3 r = reflect( e, n );

    float m = 2. * sqrt(
        pow( r.x, 2. ) +
        pow( r.y, 2. ) +
        pow( r.z + 1., 2. )
    );

    vec2 vN = r.xy / m + .5;

    vec3 refColor = texture2D( refSampler, vN).rgb;

    // fresnel amount
    vec3 viewDirectionW = normalize(cameraPosition - vPositionW);
    float fresAmount = dot(viewDirectionW, vNormalW);
    fresAmount = clamp(1.0 - fresAmount, 0., 1.);

    // light
    vec3 lightVectorW = normalize(lightPosition - vPositionW);

    // diffuse
    float diffuseAmount = max(0., dot(vNormalW, lightVectorW));
    vec3 diffuseColor = mix(vec3(0.2,0.2,0.2),vec3(0.8,0.8,0.8),diffuseAmount);

    // specular
    vec3 angleW = normalize(viewDirectionW + lightVectorW);
    float specularAmount = max(0., dot(vNormalW, angleW));
    specularAmount = pow(specularAmount, max(1., 64.)) * 2.;
    vec3 specularColor = mix(vec3(0,0,0),vec3(1,1,1),specularAmount);

    // specular plus a distribution of diffuse and reflection color
    gl_FragColor = vec4(specularColor + mix(diffuseColor,refColor,fresAmount) ,1. );
}