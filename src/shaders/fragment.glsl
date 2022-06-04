uniform float uTime;

varying vec2 vUv;

void main()
{
    vec3 col1=vec3(.53,.8,.74);
    vec3 col2=vec3(.2,.256,.61);
    float pi=3.14159265358979323846264;
    float fline=sin(vUv.y*6.*pi);
    float threshold=.005;
    
    float fline_a=abs(fline);
    
    float k=0.;
    float sk=0.;
    
    if(fline<0.){
        k=-1.;
    }else{
        k=1.;
    }
    
    if(fline_a<threshold){
        sk=(threshold-fline_a)/threshold;
        
        k=k*(1.-sk)+fline_a*sk;
    }
    
    k=(k+1.)/2.;
    
    gl_FragColor=vec4(vUv,1.,1.);
}