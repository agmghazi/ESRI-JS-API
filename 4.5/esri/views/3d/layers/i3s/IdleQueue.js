// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define(["require","exports","dojo/Deferred"],function(c,d,e){Object.defineProperty(d,"__esModule",{value:!0});c=function(){function a(){this._queue=[]}a.prototype.push=function(){var b=new e;this._queue.push(b);return b.promise};a.prototype.length=function(){return this._queue.length};a.prototype.process=function(){this._queue.shift().resolve()};a.prototype.cancelAll=function(){for(var b=0,a=this._queue;b<a.length;b++)a[b].cancel();this._queue.length=0};return a}();d.IdleQueue=c});