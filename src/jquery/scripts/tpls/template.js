/*TMODJS:{"version":"1.0.0"}*/
!function(){function a(a,b){return(/string|function/.test(typeof b)?h:g)(a,b)}function b(a,c){return"string"!=typeof a&&(c=typeof a,"number"===c?a+="":a="function"===c?b(a.call(a)):""),a}function c(a){return l[a]}function d(a){return b(a).replace(/&(?![\w#]+;)|[<>"']/g,c)}function e(a,b){if(m(a))for(var c=0,d=a.length;d>c;c++)b.call(a,a[c],c,a);else for(c in a)b.call(a,a[c],c)}function f(a,b){var c=/(\/)[^/]+\1\.\.\1/,d=("./"+a).replace(/[^/]+$/,""),e=d+b;for(e=e.replace(/\/\.\//g,"/");e.match(c);)e=e.replace(c,"/");return e}function g(b,c){var d=a.get(b)||i({filename:b,name:"Render Error",message:"Template not found"});return c?d(c):d}function h(a,b){if("string"==typeof b){var c=b;b=function(){return new k(c)}}var d=j[a]=function(c){try{return new b(c,a)+""}catch(d){return i(d)()}};return d.prototype=b.prototype=n,d.toString=function(){return b+""},d}function i(a){var b="{Template Error}",c=a.stack||"";if(c)c=c.split("\n").slice(0,2).join("\n");else for(var d in a)c+="<"+d+">\n"+a[d]+"\n\n";return function(){return"object"==typeof console&&console.error(b+"\n\n"+c),b}}var j=a.cache={},k=this.String,l={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},m=Array.isArray||function(a){return"[object Array]"==={}.toString.call(a)},n=a.utils={$helpers:{},$include:function(a,b,c){return a=f(c,a),g(a,b)},$string:b,$escape:d,$each:e},o=a.helpers=n.$helpers;a.get=function(a){return j[a.replace(/^\.\//,"")]},a.helper=function(a,b){o[a]=b},"function"==typeof define?define(function(){return a}):"undefined"!=typeof exports?module.exports=a:this.template=a,/*v:43*/
a("dialog",function(a){"use strict";var b=this,c=(b.$helpers,b.$escape),d=a.position,e=b.$each,f=a.tabs,g=(a.tab,a.tabIndex,a.smilies),h=(a.smily,a.smilyIndex,a.fullpath),i="";return i+=' <div class="cok-emoji-wrapper cok-hidden"> <div class="caret caret-',i+=c(d),i+='"> <div></div> </div> <ul class="tab-nav cok-clearfix"> ',e(f,function(a,b){i+=' <li class="tab-item ',0==b&&(i+=" active "),i+='" data-tab="',i+=c(a.name),i+='"> <a href="javascript:;" hidefocus="true">',i+=c(a.title),i+="</a> </li> "}),i+=' </ul> <div class="tab-content"> ',e(f,function(a,b){i+=' <div class="tab-pane ',0==b&&(i+=" active "),i+='" data-tab="',i+=c(a.name),i+='"> <table class="emojis"> <tbody> <tr> ',e(g[a.name],function(b,d){i+=" ",0!=d&&d!=g[a.name].length&&0===d%10&&(i+=" </tr><tr> "),i+=" ",b.name?(i+=' <td data-name="',i+=c(b.name),i+='" class="emoji"> <img data-src="',i+=c(h),i+=c(b.image),i+='" alt="',i+=c(b.title),i+='" title="',i+=c(b.title),i+='"> </td> '):i+=" <td></td> ",i+=" "}),i+=" </tr> </tbody> </table> </div> "}),i+=" </div> </div> ",new k(i)}),/*v:4*/
a("image-emoji",function(a){"use strict";var b=this,c=(b.$helpers,b.$escape),d=a.fullpath,e=a.image,f=a.title,g="";return g+='<img src="',g+=c(d),g+=c(e),g+='" title="',g+=c(f),g+='" />',new k(g)}),/*v:1*/
a("text-emoj",function(a){"use strict";var b=this,c=(b.$helpers,b.$escape),d=a.text,e="";return e+=c(d),new k(e)})}();