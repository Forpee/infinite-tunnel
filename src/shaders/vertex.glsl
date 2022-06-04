varying vec2 vUv;
varying vec3 vPosition;

vec2 rotate(vec2 v,float a){
    float s=sin(a);
    float c=cos(a);
    mat2 m=mat2(c,-s,s,c);
    return m*v;
}

void main()
{
    vPosition=position;
    vec3 newpos=position;
    newpos.xy=rotate(newpos.xy,position.z/2.);
    // vec4 mvPosition=modelViewMatrix*vec4(position,1.);
    // gl_PointSize=100.*(1./-mvPosition.z);
    
    gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);
    
    vUv=uv;
}