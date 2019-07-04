// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define(["require","exports","dojo/has","../../core/requireUtils"],function(b,e,f,g){Object.defineProperty(e,"__esModule",{value:!0});e.href=function(a){var c=b.toUrl("./symbol-defs.svg");a="#"+a;return 7!==f("trident")?""+c+a:a};(function(){7!==f("trident")||document.getElementById("esri-widget__symbol-defs")||g.when(b,["dojo/text!./symbol-defs.svg","dojo/domReady!"]).then(function(a){a=a[0];var c=document.body,b=c.firstChild,d=document.createElement("div");d.id="esri-widget__symbol-defs";d.innerHTML=
a;b?c.insertBefore(d,b):c.appendChild(d)})})()});