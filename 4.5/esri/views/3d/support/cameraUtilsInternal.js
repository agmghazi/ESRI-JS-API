// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define(["./mathUtils","../lib/glMatrix"],function(g,l){var a=l.vec3d,n=a.create(),h=a.create();return{directionToHeadingTilt:function(d,c,k,e,m){var b=n;a.normalize(d,b);var f=a.dot(b,e),l=0<f,f=Math.abs(f);.99<f&&(f=Math.abs(a.dot(c,e)),.99>f?(a.set(c,b),l&&a.scale(b,-1)):b=null);c=0;b&&(a.scale(e,a.dot(e,b),h),a.subtract(b,h),c=a.dot(b,m)/(a.length(b)*a.length(m)),a.cross(b,m,h),c=(0<a.dot(h,e)?1:-1)*g.rad2deg(g.acos(c)));d=g.rad2deg(g.acos(-a.dot(e,d)/a.length(d)));return k?(k.heading=c,k.tilt=
d,k):{heading:c,tilt:d}}}});