/*!
 * Jquery Emoji 1.1.0
 * Copyright 2014 cokapp (http://cokapp.com)
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */
!function(){function a(a,b){return(/string|function/.test(typeof b)?h:g)(a,b)}function b(a,c){return"string"!=typeof a&&(c=typeof a,"number"===c?a+="":a="function"===c?b(a.call(a)):""),a}function c(a){return l[a]}function d(a){return b(a).replace(/&(?![\w#]+;)|[<>"']/g,c)}function e(a,b){if(m(a))for(var c=0,d=a.length;d>c;c++)b.call(a,a[c],c,a);else for(c in a)b.call(a,a[c],c)}function f(a,b){var c=/(\/)[^/]+\1\.\.\1/,d=("./"+a).replace(/[^/]+$/,""),e=d+b;for(e=e.replace(/\/\.\//g,"/");e.match(c);)e=e.replace(c,"/");return e}function g(b,c){var d=a.get(b)||i({filename:b,name:"Render Error",message:"Template not found"});return c?d(c):d}function h(a,b){if("string"==typeof b){var c=b;b=function(){return new k(c)}}var d=j[a]=function(c){try{return new b(c,a)+""}catch(d){return i(d)()}};return d.prototype=b.prototype=n,d.toString=function(){return b+""},d}function i(a){var b="{Template Error}",c=a.stack||"";if(c)c=c.split("\n").slice(0,2).join("\n");else for(var d in a)c+="<"+d+">\n"+a[d]+"\n\n";return function(){return"object"==typeof console&&console.error(b+"\n\n"+c),b}}var j=a.cache={},k=this.String,l={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},m=Array.isArray||function(a){return"[object Array]"==={}.toString.call(a)},n=a.utils={$helpers:{},$include:function(a,b,c){return a=f(c,a),g(a,b)},$string:b,$escape:d,$each:e},o=a.helpers=n.$helpers;a.get=function(a){return j[a.replace(/^\.\//,"")]},a.helper=function(a,b){o[a]=b},"function"==typeof define?define(function(){return a}):"undefined"!=typeof exports?module.exports=a:this.template=a,/*v:22*/
a("dialog",function(a){"use strict";var b=this,c=(b.$helpers,b.$each),d=a.tabs,e=(a.tab,a.tabIndex,b.$escape),f=a.smilies,g=(a.smily,a.smilyIndex,a.basePath),h="";return h+=' <div class="cok-emoji-wrapper cok-hidden"> <ul class="tab-nav"> ',c(d,function(a,b){h+=' <li class="tab-item ',0==b&&(h+=" active "),h+='"> <a href="javascript:;" hidefocus="true">',h+=e(a.title),h+="</a> </li> "}),h+=' <li class="tab-placeholder cok-clearfix"></li> </ul> <div class="tab-content"> ',c(d,function(a,b){h+=' <div class="tab-pane ',0==b&&(h+=" active "),h+='" data-tab="',h+=e(a.name),h+='"> <ul class="emojis"> ',c(f[a.name],function(a){h+=" ",a.emoji?(h+=' <li data-emoji="',h+=e(a.emoji),h+='" class="emoji"> <img src="',h+=e(g),h+="/",h+=e(a.image),h+='" alt="',h+=e(a.title),h+='" title="',h+=e(a.title),h+='"> </li> '):h+=" <li> </li> ",h+=" "}),h+=' <li class="cok-clearfix"></li> </ul> </div> '}),h+=" </div> </div> ",new k(h)})}();
(function(){

    var util = {};
    util.fillSmilies = function(options){
        for(var i in options.smilies){
            var smilies = options.smilies[i];
            var mod = smilies.length % 10;
            if(mod == 0){
                continue;
            }
            var needPush = 10 - mod;
            console.log('needPush = ' + needPush);
            while(needPush!=0){
                smilies.push({
                    emoji: false
                });
                needPush = needPush - 1;
            }
        }
    }


	var CokEmoji = function(options, J_target){
		var cokEmoji = this;
		cokEmoji.html = template('dialog', options);
        util.fillSmilies(options);

		J_target.append(cokEmoji.html);
		cokEmoji.EL = J_target.find('.cok-emoji-wrapper');

        cokEmoji.EL.find('.emoji').on('click', function(){
            var emj = $(this);
            console.log('颜文字：'+emj.data('emoji')+'已选中！');
            cokEmoji.hide();
            //终止事件传递
            return false;
        });

		//注入
		J_target.data('cokEmoji', cokEmoji);




		cokEmoji.show = function(){
			cokEmoji.EL.removeClass('cok-hidden');
			cokEmoji.EL.addClass('cok-show');
		}
		cokEmoji.hide = function(){
			cokEmoji.EL.removeClass('cok-show');
			cokEmoji.EL.addClass('cok-hidden');
		}
	}




    $.fn.cokEmoji = function(options) {
        options = $.extend({}, $.cokEmoji.config, $.cokEmoji.options, options);
        this.each(function() {
        	var J_target = $(this);

        	var cokEmoji = J_target.data('cokEmoji');
        	if(cokEmoji === undefined){
        		cokEmoji = new CokEmoji(options, J_target);
        	}

        	J_target.on('click', function(){
        		cokEmoji.show();
        	});

        });
    };
    $.cokEmoji = {};

    $.cokEmoji.options = {
		basePath: 'images/smilies/',
    	autoParse: false,
		appendTo: 'textArea'
    };

    $.cokEmoji.config = {
        tabs: [{
            name: 'ywz',
            title: '颜文字'
        }, {
            name: 'tsj',
            title: '兔斯基'
        }],
        smilies: {
            ywz: [{
                emoji: ':biggrin:',
                title: '大笑',
                image: 'emoji/biggrin.png'
            }, {
                emoji: ':confused:',
                title: '反对',
                image: 'emoji/confused.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }, {
                emoji: ':cool:',
                title: '超酷',
                image: 'emoji/cool.png'
            }],
            tsj: [{
                emoji: ':t_0001:',
                title: '滚蛋',
                image: 'tsj/t_0001.gif'
            }, {
                emoji: ':t_0002:',
                title: '神马',
                image: 'tsj/t_0002.gif'
            }]
        }
    };



}(jQuery));