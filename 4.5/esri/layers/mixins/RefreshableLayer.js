// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/accessorSupport/decorators ../../core/Accessor".split(" "),function(g,h,e,d,b,f){return function(c){function a(){var a=null!==c&&c.apply(this,arguments)||this;a.refreshInterval=0;return a}e(a,c);a.prototype.refresh=function(){this.emit("refresh")};d([b.property({json:{read:{source:"refreshInterval"},write:{target:"refreshInterval"},origins:{webScene:{read:!1,write:!1}}}})],a.prototype,
"refreshInterval",void 0);return a=d([b.subclass("esri.layers.mixins.RefreshableLayer")],a)}(b.declared(f))});