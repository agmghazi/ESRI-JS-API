// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define(["require","exports","./tsSupport/extendsHelper","./Message","./lang"],function(a,l,g,h,k){a=function(a){function b(c,d,e){var f=a.call(this,c,d,e)||this;return f instanceof b?f:new b(c,d,e)}g(b,a);b.prototype.toJSON=function(){return{name:this.name,message:this.message,details:k.clone(this.details)}};b.fromJSON=function(a){return new b(a.name,a.message,a.details)};return b}(h);a.prototype.type="error";return a});