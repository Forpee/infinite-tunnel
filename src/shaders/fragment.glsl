uniform float uTime;

varying vec2 vUv;

void main()
{
    vec3 col1=vec3(.53,.8,.74);
    vec3 col2=vec3(.2,.256,.61);
    gl_FragColor=vec4(vUv,1.,1.);
}