/*TMODJS:{"version":"1.0.0"}*/
!function(){function a(a,b){return(/string|function/.test(typeof b)?h:g)(a,b)}function b(a,c){return"string"!=typeof a&&(c=typeof a,"number"===c?a+="":a="function"===c?b(a.call(a)):""),a}function c(a){return l[a]}function d(a){return b(a).replace(/&(?![\w#]+;)|[<>"']/g,c)}function e(a,b){if(m(a))for(var c=0,d=a.length;d>c;c++)b.call(a,a[c],c,a);else for(c in a)b.call(a,a[c],c)}function f(a,b){var c=/(\/)[^/]+\1\.\.\1/,d=("./"+a).replace(/[^/]+$/,""),e=d+b;for(e=e.replace(/\/\.\//g,"/");e.match(c);)e=e.replace(c,"/");return e}function g(b,c){var d=a.get(b)||i({filename:b,name:"Render Error",message:"Template not found"});return c?d(c):d}function h(a,b){if("string"==typeof b){var c=b;b=function(){return new k(c)}}var d=j[a]=function(c){try{return new b(c,a)+""}catch(d){return i(d)()}};return d.prototype=b.prototype=n,d.toString=function(){return b+""},d}function i(a){var b="{Template Error}",c=a.stack||"";if(c)c=c.split("\n").slice(0,2).join("\n");else for(var d in a)c+="<"+d+">\n"+a[d]+"\n\n";return function(){return"object"==typeof console&&console.error(b+"\n\n"+c),b}}var j=a.cache={},k=this.String,l={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},m=Array.isArray||function(a){return"[object Array]"==={}.toString.call(a)},n=a.utils={$helpers:{},$include:function(a,b,c){return a=f(c,a),g(a,b)},$string:b,$escape:d,$each:e},o=a.helpers=n.$helpers;a.get=function(a){return j[a.replace(/^\.\//,"")]},a.helper=function(a,b){o[a]=b},"function"==typeof define?define(function(){return a}):"undefined"!=typeof exports?module.exports=a:this.template=a,/*v:39*/
a("dialog",function(a){"use strict";var b=this,c=(b.$helpers,b.$each),d=a.tabs,e=(a.tab,a.tabIndex,b.$escape),f=a.smilies,g=(a.smily,a.smilyIndex,a.basePath),h="";return h+=' <div class="cok-emoji-wrapper cok-hidden"> <div class="caret-up"> <div></div> </div> <ul class="tab-nav cok-clearfix"> ',c(d,function(a,b){h+=' <li class="tab-item ',0==b&&(h+=" active "),h+='" data-tab="',h+=e(a.name),h+='"> <a href="javascript:;" hidefocus="true">',h+=e(a.title),h+="</a> </li> "}),h+=' </ul> <div class="tab-content"> ',c(d,function(a,b){h+=' <div class="tab-pane ',0==b&&(h+=" active "),h+='" data-tab="',h+=e(a.name),h+='"> <table class="emojis"> <tbody> <tr> ',c(f[a.name],function(b,c){h+=" ",0!=c&&c!=f[a.name].length&&0===c%10&&(h+=" </tr><tr> "),h+=" ",b.name?(h+=' <td data-name="',h+=e(b.name),h+='" class="emoji"> <img data-src="',h+=e(g),h+=e(b.image),h+='" alt="',h+=e(b.title),h+='" title="',h+=e(b.title),h+='"> </td> '):h+=" <td></td> ",h+=" "}),h+=" </tr> </tbody> </table> </div> "}),h+=" </div> </div> ",new k(h)}),/*v:2*/
a("image-emoji",function(a){"use strict";var b=this,c=(b.$helpers,b.$escape),d=a.basePath,e=a.image,f=a.title,g="";return g+='<img src="',g+=c(d),g+=c(e),g+='" title="',g+=c(f),g+='" />',new k(g)}),/*v:1*/
a("text-emoj",function(a){"use strict";var b=this,c=(b.$helpers,b.$escape),d=a.text,e="";return e+=c(d),new k(e)})}();