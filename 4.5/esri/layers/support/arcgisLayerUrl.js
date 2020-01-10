// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define(["require","exports","../../core/urlUtils"],function(k,d,h){function e(a){var b=h.urlToObject(a).path.match(d.match);if(!b)return null;a=b[1];var c=b[2],e=b[3],b=b[4],g=c.indexOf("/");return{title:f(-1!==g?c.slice(g+1):c),serverType:e,sublayer:null!=b&&""!==b?parseInt(b,10):null,url:{path:a}}}function f(a){a=a.replace(/\s*[/_]+\s*/g," ");return a[0].toUpperCase()+a.slice(1)}Object.defineProperty(d,"__esModule",{value:!0});d.serverTypes="MapServer ImageServer FeatureServer SceneServer StreamServer VectorTileServer".split(" ");
d.match=new RegExp("^((?:https?:)?\\/\\/\\S+?\\/rest\\/services\\/(.+?)\\/("+d.serverTypes.join("|")+"))(?:\\/(?:layers\\/)?(\\d+))?","i");d.test=function(a){return!!d.match.test(a)};d.parse=e;d.cleanTitle=f;d.titleFromUrlAndName=function(a,b){var c=[];a&&(a=e(a))&&a.title&&c.push(a.title);b&&(b=f(b),c.push(b));if(2===c.length){if(-1!==c[0].toLowerCase().indexOf(c[1].toLowerCase()))return c[0];if(-1!==c[1].toLowerCase().indexOf(c[0].toLowerCase()))return c[1]}return c.join(" - ")};d.isHostedAgolService=
function(a){if(!a)return!1;a=a.toLowerCase();var b=-1!==a.indexOf(".arcgis.com/");a=-1!==a.indexOf("//services")||-1!==a.indexOf("//tiles")||-1!==a.indexOf("//features");return b&&a};d.isHostedSecuredProxyService=function(a,b){return b&&a&&-1!==a.toLowerCase().indexOf(b.toLowerCase())}});