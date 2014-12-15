/*!
 * Jquery Emoji 1.1.0
 * Copyright 2014 cokapp (http://cokapp.com)
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */
!function(){function a(a,b){return(/string|function/.test(typeof b)?h:g)(a,b)}function b(a,c){return"string"!=typeof a&&(c=typeof a,"number"===c?a+="":a="function"===c?b(a.call(a)):""),a}function c(a){return l[a]}function d(a){return b(a).replace(/&(?![\w#]+;)|[<>"']/g,c)}function e(a,b){if(m(a))for(var c=0,d=a.length;d>c;c++)b.call(a,a[c],c,a);else for(c in a)b.call(a,a[c],c)}function f(a,b){var c=/(\/)[^/]+\1\.\.\1/,d=("./"+a).replace(/[^/]+$/,""),e=d+b;for(e=e.replace(/\/\.\//g,"/");e.match(c);)e=e.replace(c,"/");return e}function g(b,c){var d=a.get(b)||i({filename:b,name:"Render Error",message:"Template not found"});return c?d(c):d}function h(a,b){if("string"==typeof b){var c=b;b=function(){return new k(c)}}var d=j[a]=function(c){try{return new b(c,a)+""}catch(d){return i(d)()}};return d.prototype=b.prototype=n,d.toString=function(){return b+""},d}function i(a){var b="{Template Error}",c=a.stack||"";if(c)c=c.split("\n").slice(0,2).join("\n");else for(var d in a)c+="<"+d+">\n"+a[d]+"\n\n";return function(){return"object"==typeof console&&console.error(b+"\n\n"+c),b}}var j=a.cache={},k=this.String,l={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},m=Array.isArray||function(a){return"[object Array]"==={}.toString.call(a)},n=a.utils={$helpers:{},$include:function(a,b,c){return a=f(c,a),g(a,b)},$string:b,$escape:d,$each:e},o=a.helpers=n.$helpers;a.get=function(a){return j[a.replace(/^\.\//,"")]},a.helper=function(a,b){o[a]=b},"function"==typeof define?define(function(){return a}):"undefined"!=typeof exports?module.exports=a:this.template=a,/*v:39*/
a("dialog",function(a){"use strict";var b=this,c=(b.$helpers,b.$each),d=a.tabs,e=(a.tab,a.tabIndex,b.$escape),f=a.smilies,g=(a.smily,a.smilyIndex,a.basePath),h="";return h+=' <div class="cok-emoji-wrapper cok-hidden"> <div class="caret-up"> <div></div> </div> <ul class="tab-nav cok-clearfix"> ',c(d,function(a,b){h+=' <li class="tab-item ',0==b&&(h+=" active "),h+='" data-tab="',h+=e(a.name),h+='"> <a href="javascript:;" hidefocus="true">',h+=e(a.title),h+="</a> </li> "}),h+=' </ul> <div class="tab-content"> ',c(d,function(a,b){h+=' <div class="tab-pane ',0==b&&(h+=" active "),h+='" data-tab="',h+=e(a.name),h+='"> <table class="emojis"> <tbody> <tr> ',c(f[a.name],function(b,c){h+=" ",0!=c&&c!=f[a.name].length&&0===c%10&&(h+=" </tr><tr> "),h+=" ",b.name?(h+=' <td data-name="',h+=e(b.name),h+='" class="emoji"> <img data-src="',h+=e(g),h+=e(b.image),h+='" alt="',h+=e(b.title),h+='" title="',h+=e(b.title),h+='"> </td> '):h+=" <td></td> ",h+=" "}),h+=" </tr> </tbody> </table> </div> "}),h+=" </div> </div> ",new k(h)}),/*v:2*/
a("image-emoji",function(a){"use strict";var b=this,c=(b.$helpers,b.$escape),d=a.basePath,e=a.image,f=a.title,g="";return g+='<img src="',g+=c(d),g+=c(e),g+='" title="',g+=c(f),g+='" />',new k(g)}),/*v:1*/
a("text-emoj",function(a){"use strict";var b=this,c=(b.$helpers,b.$escape),d=a.text,e="";return e+=c(d),new k(e)})}();
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
            while(needPush!=0){
                smilies.push({
                    name: false
                });
                needPush = needPush - 1;
            }
        }
        return options;
    };
    util.findEmoji = function(name, options){
        return options.emojiMap[name];
    }

	var CokEmoji = function(options, J_target){
		var cokEmoji = this;

        cokEmoji.options = util.fillSmilies(options);
		cokEmoji.html = template('dialog', cokEmoji.options);

        //私有变量
        var emojiRegex = new RegExp(':(' + cokEmoji.options.emojies.join('|') + '):', 'g'); 

        //选中标签
        var selectTab = function(J_tab){

            var tabs = cokEmoji.EL.find('.tab-item');
            var tab = J_tab;
            tabs.removeClass('active');
            tab.addClass('active');

            var panels = cokEmoji.EL.find('.tab-pane');
            panels.each(function(){
                var panel = $(this);
                if(panel.data('tab')===tab.data('tab')){
                    panel.addClass('active');
                    //第一次展现时加载背景图片
                    if(!panel.data('loaded')){
                        panel.find('.emoji img').each(function(){
                            var J_img = $(this);
                            J_img.attr('src', J_img.data('src'));
                        });
                        panel.data('loaded', true);
                    }
                }else{
                    panel.removeClass('active');
                }
            });            
        }
        //定位，目前固定于触发元素的下方
        var rePosition = function(){
            var targetOffset = J_target.offset();
            var top = J_target.offset().top + J_target.height() + 10;
            var left = J_target.offset().left + J_target.width() / 2 - 20;
            console.log('top='+top);
            console.log('left='+left);
            cokEmoji.EL.css({ top: top + 'px', left: left + 'px'});
        }

        //DOM操作
		J_target.append(cokEmoji.html);
		cokEmoji.EL = J_target.find('.cok-emoji-wrapper');

        //表情选择
        cokEmoji.EL.find('.emoji').on('click', function(){
            var emjEL = $(this);
            var emjName = emjEL.data('name');
            var emj = util.findEmoji(emjName, cokEmoji.options);
            var emjText = ':' + emjName + ':';

            if(cokEmoji.options.onSelected){
                cokEmoji.options.onSelected.call(cokEmoji, emjText, emj);
            }

            cokEmoji.hide();
            //终止事件传递
            return false;
        });
        //页签改变
        cokEmoji.EL.find('.tab-item').on('click', function(){
            var J_tab = $(this);
            selectTab(J_tab);
        });

		//注入
		J_target.data('cokEmoji', cokEmoji);


        //API
		cokEmoji.show = function(){
            rePosition();
			cokEmoji.EL.removeClass('cok-hidden');
			cokEmoji.EL.addClass('cok-show');
		}
		cokEmoji.hide = function(){
			cokEmoji.EL.removeClass('cok-show');
			cokEmoji.EL.addClass('cok-hidden');
		}
        //将包含Emoji的源字符串替换为image或text
        cokEmoji.translate = function(input, isText){
            
            var output = input.replace(emojiRegex, function(text, name){
                var emoji = util.findEmoji(name, cokEmoji.options);
                emoji.basePath = cokEmoji.options.basePath;

                if(isText){
                    return template('text-emoji', emoji);
                }else{
                    return template('image-emoji', emoji);
                }
            });

            return output;
        }



        //初始化
        var firstTab = cokEmoji.EL.find('.tab-item:first');
        selectTab(firstTab);
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

            return cokEmoji;
        });
    };
    $.cokEmoji = {};

    $.cokEmoji.options = {
		basePath: 'images/smilies/',
        //image、text、emoji or none
    	autoParse: 'emoji',
		appendTo: 'textArea',
        onSelected: function(emjtext, emj){
            var cokEmoji = this;
            if(cokEmoji.options.autoParse === 'none'){
                return;
            }
            var J_appendTo = $(cokEmoji.options.appendTo);
            if(J_appendTo.length === 0){
                return;
            }

            var content = null;
            if(cokEmoji.options.autoParse === 'image'){
                content = cokEmoji.translate(emjtext);
            }else if (cokEmoji.options.autoParse === 'text'){
                content = cokEmoji.translate(emjtext, true);
            }else{
                content = emjtext;
            }

            J_appendTo.append(content);
        }
    };

    //在grunt任务replace中进行替换
    $.cokEmoji.config = {"tabs":[{"name":"emoji","title":"颜文字"},{"name":"face","title":"泡泡"},{"name":"tsj","title":"兔斯基"}],"smilies":{"emoji":[{"name":"biggrin","title":"biggrin","text":"biggrin","image":"emoji/biggrin.png"},{"name":"confused","title":"confused","text":"confused","image":"emoji/confused.png"},{"name":"cool","title":"cool","text":"cool","image":"emoji/cool.png"},{"name":"cry","title":"cry","text":"cry","image":"emoji/cry.png"},{"name":"eek","title":"eek","text":"eek","image":"emoji/eek.png"},{"name":"evil","title":"evil","text":"evil","image":"emoji/evil.png"},{"name":"like","title":"like","text":"like","image":"emoji/like.png"},{"name":"lol","title":"lol","text":"lol","image":"emoji/lol.png"},{"name":"love","title":"love","text":"love","image":"emoji/love.png"},{"name":"mad","title":"mad","text":"mad","image":"emoji/mad.png"},{"name":"mrgreen","title":"mrgreen","text":"mrgreen","image":"emoji/mrgreen.png"},{"name":"neutral","title":"neutral","text":"neutral","image":"emoji/neutral.png"},{"name":"question","title":"question","text":"question","image":"emoji/question.png"},{"name":"razz","title":"razz","text":"razz","image":"emoji/razz.png"},{"name":"redface","title":"redface","text":"redface","image":"emoji/redface.png"},{"name":"rolleyes","title":"rolleyes","text":"rolleyes","image":"emoji/rolleyes.png"},{"name":"sad","title":"sad","text":"sad","image":"emoji/sad.png"},{"name":"smile","title":"smile","text":"smile","image":"emoji/smile.png"},{"name":"surprised","title":"surprised","text":"surprised","image":"emoji/surprised.png"},{"name":"thumbdown","title":"thumbdown","text":"thumbdown","image":"emoji/thumbdown.png"},{"name":"thumbup","title":"thumbup","text":"thumbup","image":"emoji/thumbup.png"},{"name":"twisted","title":"twisted","text":"twisted","image":"emoji/twisted.png"},{"name":"wink","title":"wink","text":"wink","image":"emoji/wink.png"}],"face":[{"name":"i_f01","title":"i_f01","text":"i_f01","image":"face/i_f01.gif"},{"name":"i_f02","title":"i_f02","text":"i_f02","image":"face/i_f02.gif"},{"name":"i_f03","title":"i_f03","text":"i_f03","image":"face/i_f03.gif"},{"name":"i_f04","title":"i_f04","text":"i_f04","image":"face/i_f04.gif"},{"name":"i_f05","title":"i_f05","text":"i_f05","image":"face/i_f05.gif"},{"name":"i_f06","title":"i_f06","text":"i_f06","image":"face/i_f06.gif"},{"name":"i_f07","title":"i_f07","text":"i_f07","image":"face/i_f07.gif"},{"name":"i_f08","title":"i_f08","text":"i_f08","image":"face/i_f08.gif"},{"name":"i_f09","title":"i_f09","text":"i_f09","image":"face/i_f09.gif"},{"name":"i_f10","title":"i_f10","text":"i_f10","image":"face/i_f10.gif"},{"name":"i_f11","title":"i_f11","text":"i_f11","image":"face/i_f11.gif"},{"name":"i_f12","title":"i_f12","text":"i_f12","image":"face/i_f12.gif"},{"name":"i_f13","title":"i_f13","text":"i_f13","image":"face/i_f13.gif"},{"name":"i_f14","title":"i_f14","text":"i_f14","image":"face/i_f14.gif"},{"name":"i_f15","title":"i_f15","text":"i_f15","image":"face/i_f15.gif"},{"name":"i_f16","title":"i_f16","text":"i_f16","image":"face/i_f16.gif"},{"name":"i_f17","title":"i_f17","text":"i_f17","image":"face/i_f17.gif"},{"name":"i_f18","title":"i_f18","text":"i_f18","image":"face/i_f18.gif"},{"name":"i_f19","title":"i_f19","text":"i_f19","image":"face/i_f19.gif"},{"name":"i_f20","title":"i_f20","text":"i_f20","image":"face/i_f20.gif"},{"name":"i_f21","title":"i_f21","text":"i_f21","image":"face/i_f21.gif"},{"name":"i_f22","title":"i_f22","text":"i_f22","image":"face/i_f22.gif"},{"name":"i_f23","title":"i_f23","text":"i_f23","image":"face/i_f23.gif"},{"name":"i_f24","title":"i_f24","text":"i_f24","image":"face/i_f24.gif"},{"name":"i_f25","title":"i_f25","text":"i_f25","image":"face/i_f25.gif"},{"name":"i_f26","title":"i_f26","text":"i_f26","image":"face/i_f26.gif"},{"name":"i_f27","title":"i_f27","text":"i_f27","image":"face/i_f27.gif"},{"name":"i_f28","title":"i_f28","text":"i_f28","image":"face/i_f28.gif"},{"name":"i_f29","title":"i_f29","text":"i_f29","image":"face/i_f29.gif"},{"name":"i_f30","title":"i_f30","text":"i_f30","image":"face/i_f30.gif"},{"name":"i_f31","title":"i_f31","text":"i_f31","image":"face/i_f31.gif"},{"name":"i_f32","title":"i_f32","text":"i_f32","image":"face/i_f32.gif"},{"name":"i_f33","title":"i_f33","text":"i_f33","image":"face/i_f33.gif"},{"name":"i_f34","title":"i_f34","text":"i_f34","image":"face/i_f34.gif"},{"name":"i_f35","title":"i_f35","text":"i_f35","image":"face/i_f35.gif"},{"name":"i_f36","title":"i_f36","text":"i_f36","image":"face/i_f36.gif"},{"name":"i_f37","title":"i_f37","text":"i_f37","image":"face/i_f37.gif"},{"name":"i_f38","title":"i_f38","text":"i_f38","image":"face/i_f38.gif"},{"name":"i_f39","title":"i_f39","text":"i_f39","image":"face/i_f39.gif"},{"name":"i_f40","title":"i_f40","text":"i_f40","image":"face/i_f40.gif"},{"name":"i_f41","title":"i_f41","text":"i_f41","image":"face/i_f41.gif"},{"name":"i_f42","title":"i_f42","text":"i_f42","image":"face/i_f42.gif"},{"name":"i_f43","title":"i_f43","text":"i_f43","image":"face/i_f43.gif"},{"name":"i_f44","title":"i_f44","text":"i_f44","image":"face/i_f44.gif"},{"name":"i_f45","title":"i_f45","text":"i_f45","image":"face/i_f45.gif"},{"name":"i_f46","title":"i_f46","text":"i_f46","image":"face/i_f46.gif"},{"name":"i_f47","title":"i_f47","text":"i_f47","image":"face/i_f47.gif"},{"name":"i_f48","title":"i_f48","text":"i_f48","image":"face/i_f48.gif"},{"name":"i_f49","title":"i_f49","text":"i_f49","image":"face/i_f49.gif"},{"name":"i_f50","title":"i_f50","text":"i_f50","image":"face/i_f50.gif"}],"tsj":[{"name":"t_0001","title":"t_0001","text":"t_0001","image":"tsj/t_0001.gif"},{"name":"t_0002","title":"t_0002","text":"t_0002","image":"tsj/t_0002.gif"},{"name":"t_0003","title":"t_0003","text":"t_0003","image":"tsj/t_0003.gif"},{"name":"t_0004","title":"t_0004","text":"t_0004","image":"tsj/t_0004.gif"},{"name":"t_0005","title":"t_0005","text":"t_0005","image":"tsj/t_0005.gif"},{"name":"t_0006","title":"t_0006","text":"t_0006","image":"tsj/t_0006.gif"},{"name":"t_0007","title":"t_0007","text":"t_0007","image":"tsj/t_0007.gif"},{"name":"t_0008","title":"t_0008","text":"t_0008","image":"tsj/t_0008.gif"},{"name":"t_0009","title":"t_0009","text":"t_0009","image":"tsj/t_0009.gif"},{"name":"t_0010","title":"t_0010","text":"t_0010","image":"tsj/t_0010.gif"},{"name":"t_0011","title":"t_0011","text":"t_0011","image":"tsj/t_0011.gif"},{"name":"t_0012","title":"t_0012","text":"t_0012","image":"tsj/t_0012.gif"},{"name":"t_0013","title":"t_0013","text":"t_0013","image":"tsj/t_0013.gif"},{"name":"t_0014","title":"t_0014","text":"t_0014","image":"tsj/t_0014.gif"},{"name":"t_0015","title":"t_0015","text":"t_0015","image":"tsj/t_0015.gif"},{"name":"t_0016","title":"t_0016","text":"t_0016","image":"tsj/t_0016.gif"},{"name":"t_0017","title":"t_0017","text":"t_0017","image":"tsj/t_0017.gif"},{"name":"t_0018","title":"t_0018","text":"t_0018","image":"tsj/t_0018.gif"},{"name":"t_0019","title":"t_0019","text":"t_0019","image":"tsj/t_0019.gif"},{"name":"t_0020","title":"t_0020","text":"t_0020","image":"tsj/t_0020.gif"},{"name":"t_0021","title":"t_0021","text":"t_0021","image":"tsj/t_0021.gif"},{"name":"t_0022","title":"t_0022","text":"t_0022","image":"tsj/t_0022.gif"},{"name":"t_0023","title":"t_0023","text":"t_0023","image":"tsj/t_0023.gif"},{"name":"t_0024","title":"t_0024","text":"t_0024","image":"tsj/t_0024.gif"},{"name":"t_0025","title":"t_0025","text":"t_0025","image":"tsj/t_0025.gif"},{"name":"t_0026","title":"t_0026","text":"t_0026","image":"tsj/t_0026.gif"},{"name":"t_0027","title":"t_0027","text":"t_0027","image":"tsj/t_0027.gif"},{"name":"t_0028","title":"t_0028","text":"t_0028","image":"tsj/t_0028.gif"},{"name":"t_0029","title":"t_0029","text":"t_0029","image":"tsj/t_0029.gif"},{"name":"t_0030","title":"t_0030","text":"t_0030","image":"tsj/t_0030.gif"},{"name":"t_0031","title":"t_0031","text":"t_0031","image":"tsj/t_0031.gif"},{"name":"t_0032","title":"t_0032","text":"t_0032","image":"tsj/t_0032.gif"},{"name":"t_0033","title":"t_0033","text":"t_0033","image":"tsj/t_0033.gif"},{"name":"t_0034","title":"t_0034","text":"t_0034","image":"tsj/t_0034.gif"},{"name":"t_0035","title":"t_0035","text":"t_0035","image":"tsj/t_0035.gif"},{"name":"t_0036","title":"t_0036","text":"t_0036","image":"tsj/t_0036.gif"},{"name":"t_0037","title":"t_0037","text":"t_0037","image":"tsj/t_0037.gif"},{"name":"t_0038","title":"t_0038","text":"t_0038","image":"tsj/t_0038.gif"},{"name":"t_0039","title":"t_0039","text":"t_0039","image":"tsj/t_0039.gif"},{"name":"t_0040","title":"t_0040","text":"t_0040","image":"tsj/t_0040.gif"}]},"emojiMap":{"biggrin":{"name":"biggrin","title":"biggrin","text":"biggrin","image":"emoji/biggrin.png"},"confused":{"name":"confused","title":"confused","text":"confused","image":"emoji/confused.png"},"cool":{"name":"cool","title":"cool","text":"cool","image":"emoji/cool.png"},"cry":{"name":"cry","title":"cry","text":"cry","image":"emoji/cry.png"},"eek":{"name":"eek","title":"eek","text":"eek","image":"emoji/eek.png"},"evil":{"name":"evil","title":"evil","text":"evil","image":"emoji/evil.png"},"like":{"name":"like","title":"like","text":"like","image":"emoji/like.png"},"lol":{"name":"lol","title":"lol","text":"lol","image":"emoji/lol.png"},"love":{"name":"love","title":"love","text":"love","image":"emoji/love.png"},"mad":{"name":"mad","title":"mad","text":"mad","image":"emoji/mad.png"},"mrgreen":{"name":"mrgreen","title":"mrgreen","text":"mrgreen","image":"emoji/mrgreen.png"},"neutral":{"name":"neutral","title":"neutral","text":"neutral","image":"emoji/neutral.png"},"question":{"name":"question","title":"question","text":"question","image":"emoji/question.png"},"razz":{"name":"razz","title":"razz","text":"razz","image":"emoji/razz.png"},"redface":{"name":"redface","title":"redface","text":"redface","image":"emoji/redface.png"},"rolleyes":{"name":"rolleyes","title":"rolleyes","text":"rolleyes","image":"emoji/rolleyes.png"},"sad":{"name":"sad","title":"sad","text":"sad","image":"emoji/sad.png"},"smile":{"name":"smile","title":"smile","text":"smile","image":"emoji/smile.png"},"surprised":{"name":"surprised","title":"surprised","text":"surprised","image":"emoji/surprised.png"},"thumbdown":{"name":"thumbdown","title":"thumbdown","text":"thumbdown","image":"emoji/thumbdown.png"},"thumbup":{"name":"thumbup","title":"thumbup","text":"thumbup","image":"emoji/thumbup.png"},"twisted":{"name":"twisted","title":"twisted","text":"twisted","image":"emoji/twisted.png"},"wink":{"name":"wink","title":"wink","text":"wink","image":"emoji/wink.png"},"i_f01":{"name":"i_f01","title":"i_f01","text":"i_f01","image":"face/i_f01.gif"},"i_f02":{"name":"i_f02","title":"i_f02","text":"i_f02","image":"face/i_f02.gif"},"i_f03":{"name":"i_f03","title":"i_f03","text":"i_f03","image":"face/i_f03.gif"},"i_f04":{"name":"i_f04","title":"i_f04","text":"i_f04","image":"face/i_f04.gif"},"i_f05":{"name":"i_f05","title":"i_f05","text":"i_f05","image":"face/i_f05.gif"},"i_f06":{"name":"i_f06","title":"i_f06","text":"i_f06","image":"face/i_f06.gif"},"i_f07":{"name":"i_f07","title":"i_f07","text":"i_f07","image":"face/i_f07.gif"},"i_f08":{"name":"i_f08","title":"i_f08","text":"i_f08","image":"face/i_f08.gif"},"i_f09":{"name":"i_f09","title":"i_f09","text":"i_f09","image":"face/i_f09.gif"},"i_f10":{"name":"i_f10","title":"i_f10","text":"i_f10","image":"face/i_f10.gif"},"i_f11":{"name":"i_f11","title":"i_f11","text":"i_f11","image":"face/i_f11.gif"},"i_f12":{"name":"i_f12","title":"i_f12","text":"i_f12","image":"face/i_f12.gif"},"i_f13":{"name":"i_f13","title":"i_f13","text":"i_f13","image":"face/i_f13.gif"},"i_f14":{"name":"i_f14","title":"i_f14","text":"i_f14","image":"face/i_f14.gif"},"i_f15":{"name":"i_f15","title":"i_f15","text":"i_f15","image":"face/i_f15.gif"},"i_f16":{"name":"i_f16","title":"i_f16","text":"i_f16","image":"face/i_f16.gif"},"i_f17":{"name":"i_f17","title":"i_f17","text":"i_f17","image":"face/i_f17.gif"},"i_f18":{"name":"i_f18","title":"i_f18","text":"i_f18","image":"face/i_f18.gif"},"i_f19":{"name":"i_f19","title":"i_f19","text":"i_f19","image":"face/i_f19.gif"},"i_f20":{"name":"i_f20","title":"i_f20","text":"i_f20","image":"face/i_f20.gif"},"i_f21":{"name":"i_f21","title":"i_f21","text":"i_f21","image":"face/i_f21.gif"},"i_f22":{"name":"i_f22","title":"i_f22","text":"i_f22","image":"face/i_f22.gif"},"i_f23":{"name":"i_f23","title":"i_f23","text":"i_f23","image":"face/i_f23.gif"},"i_f24":{"name":"i_f24","title":"i_f24","text":"i_f24","image":"face/i_f24.gif"},"i_f25":{"name":"i_f25","title":"i_f25","text":"i_f25","image":"face/i_f25.gif"},"i_f26":{"name":"i_f26","title":"i_f26","text":"i_f26","image":"face/i_f26.gif"},"i_f27":{"name":"i_f27","title":"i_f27","text":"i_f27","image":"face/i_f27.gif"},"i_f28":{"name":"i_f28","title":"i_f28","text":"i_f28","image":"face/i_f28.gif"},"i_f29":{"name":"i_f29","title":"i_f29","text":"i_f29","image":"face/i_f29.gif"},"i_f30":{"name":"i_f30","title":"i_f30","text":"i_f30","image":"face/i_f30.gif"},"i_f31":{"name":"i_f31","title":"i_f31","text":"i_f31","image":"face/i_f31.gif"},"i_f32":{"name":"i_f32","title":"i_f32","text":"i_f32","image":"face/i_f32.gif"},"i_f33":{"name":"i_f33","title":"i_f33","text":"i_f33","image":"face/i_f33.gif"},"i_f34":{"name":"i_f34","title":"i_f34","text":"i_f34","image":"face/i_f34.gif"},"i_f35":{"name":"i_f35","title":"i_f35","text":"i_f35","image":"face/i_f35.gif"},"i_f36":{"name":"i_f36","title":"i_f36","text":"i_f36","image":"face/i_f36.gif"},"i_f37":{"name":"i_f37","title":"i_f37","text":"i_f37","image":"face/i_f37.gif"},"i_f38":{"name":"i_f38","title":"i_f38","text":"i_f38","image":"face/i_f38.gif"},"i_f39":{"name":"i_f39","title":"i_f39","text":"i_f39","image":"face/i_f39.gif"},"i_f40":{"name":"i_f40","title":"i_f40","text":"i_f40","image":"face/i_f40.gif"},"i_f41":{"name":"i_f41","title":"i_f41","text":"i_f41","image":"face/i_f41.gif"},"i_f42":{"name":"i_f42","title":"i_f42","text":"i_f42","image":"face/i_f42.gif"},"i_f43":{"name":"i_f43","title":"i_f43","text":"i_f43","image":"face/i_f43.gif"},"i_f44":{"name":"i_f44","title":"i_f44","text":"i_f44","image":"face/i_f44.gif"},"i_f45":{"name":"i_f45","title":"i_f45","text":"i_f45","image":"face/i_f45.gif"},"i_f46":{"name":"i_f46","title":"i_f46","text":"i_f46","image":"face/i_f46.gif"},"i_f47":{"name":"i_f47","title":"i_f47","text":"i_f47","image":"face/i_f47.gif"},"i_f48":{"name":"i_f48","title":"i_f48","text":"i_f48","image":"face/i_f48.gif"},"i_f49":{"name":"i_f49","title":"i_f49","text":"i_f49","image":"face/i_f49.gif"},"i_f50":{"name":"i_f50","title":"i_f50","text":"i_f50","image":"face/i_f50.gif"},"t_0001":{"name":"t_0001","title":"t_0001","text":"t_0001","image":"tsj/t_0001.gif"},"t_0002":{"name":"t_0002","title":"t_0002","text":"t_0002","image":"tsj/t_0002.gif"},"t_0003":{"name":"t_0003","title":"t_0003","text":"t_0003","image":"tsj/t_0003.gif"},"t_0004":{"name":"t_0004","title":"t_0004","text":"t_0004","image":"tsj/t_0004.gif"},"t_0005":{"name":"t_0005","title":"t_0005","text":"t_0005","image":"tsj/t_0005.gif"},"t_0006":{"name":"t_0006","title":"t_0006","text":"t_0006","image":"tsj/t_0006.gif"},"t_0007":{"name":"t_0007","title":"t_0007","text":"t_0007","image":"tsj/t_0007.gif"},"t_0008":{"name":"t_0008","title":"t_0008","text":"t_0008","image":"tsj/t_0008.gif"},"t_0009":{"name":"t_0009","title":"t_0009","text":"t_0009","image":"tsj/t_0009.gif"},"t_0010":{"name":"t_0010","title":"t_0010","text":"t_0010","image":"tsj/t_0010.gif"},"t_0011":{"name":"t_0011","title":"t_0011","text":"t_0011","image":"tsj/t_0011.gif"},"t_0012":{"name":"t_0012","title":"t_0012","text":"t_0012","image":"tsj/t_0012.gif"},"t_0013":{"name":"t_0013","title":"t_0013","text":"t_0013","image":"tsj/t_0013.gif"},"t_0014":{"name":"t_0014","title":"t_0014","text":"t_0014","image":"tsj/t_0014.gif"},"t_0015":{"name":"t_0015","title":"t_0015","text":"t_0015","image":"tsj/t_0015.gif"},"t_0016":{"name":"t_0016","title":"t_0016","text":"t_0016","image":"tsj/t_0016.gif"},"t_0017":{"name":"t_0017","title":"t_0017","text":"t_0017","image":"tsj/t_0017.gif"},"t_0018":{"name":"t_0018","title":"t_0018","text":"t_0018","image":"tsj/t_0018.gif"},"t_0019":{"name":"t_0019","title":"t_0019","text":"t_0019","image":"tsj/t_0019.gif"},"t_0020":{"name":"t_0020","title":"t_0020","text":"t_0020","image":"tsj/t_0020.gif"},"t_0021":{"name":"t_0021","title":"t_0021","text":"t_0021","image":"tsj/t_0021.gif"},"t_0022":{"name":"t_0022","title":"t_0022","text":"t_0022","image":"tsj/t_0022.gif"},"t_0023":{"name":"t_0023","title":"t_0023","text":"t_0023","image":"tsj/t_0023.gif"},"t_0024":{"name":"t_0024","title":"t_0024","text":"t_0024","image":"tsj/t_0024.gif"},"t_0025":{"name":"t_0025","title":"t_0025","text":"t_0025","image":"tsj/t_0025.gif"},"t_0026":{"name":"t_0026","title":"t_0026","text":"t_0026","image":"tsj/t_0026.gif"},"t_0027":{"name":"t_0027","title":"t_0027","text":"t_0027","image":"tsj/t_0027.gif"},"t_0028":{"name":"t_0028","title":"t_0028","text":"t_0028","image":"tsj/t_0028.gif"},"t_0029":{"name":"t_0029","title":"t_0029","text":"t_0029","image":"tsj/t_0029.gif"},"t_0030":{"name":"t_0030","title":"t_0030","text":"t_0030","image":"tsj/t_0030.gif"},"t_0031":{"name":"t_0031","title":"t_0031","text":"t_0031","image":"tsj/t_0031.gif"},"t_0032":{"name":"t_0032","title":"t_0032","text":"t_0032","image":"tsj/t_0032.gif"},"t_0033":{"name":"t_0033","title":"t_0033","text":"t_0033","image":"tsj/t_0033.gif"},"t_0034":{"name":"t_0034","title":"t_0034","text":"t_0034","image":"tsj/t_0034.gif"},"t_0035":{"name":"t_0035","title":"t_0035","text":"t_0035","image":"tsj/t_0035.gif"},"t_0036":{"name":"t_0036","title":"t_0036","text":"t_0036","image":"tsj/t_0036.gif"},"t_0037":{"name":"t_0037","title":"t_0037","text":"t_0037","image":"tsj/t_0037.gif"},"t_0038":{"name":"t_0038","title":"t_0038","text":"t_0038","image":"tsj/t_0038.gif"},"t_0039":{"name":"t_0039","title":"t_0039","text":"t_0039","image":"tsj/t_0039.gif"},"t_0040":{"name":"t_0040","title":"t_0040","text":"t_0040","image":"tsj/t_0040.gif"}},"emojies":["biggrin","confused","cool","cry","eek","evil","like","lol","love","mad","mrgreen","neutral","question","razz","redface","rolleyes","sad","smile","surprised","thumbdown","thumbup","twisted","wink","i_f01","i_f02","i_f03","i_f04","i_f05","i_f06","i_f07","i_f08","i_f09","i_f10","i_f11","i_f12","i_f13","i_f14","i_f15","i_f16","i_f17","i_f18","i_f19","i_f20","i_f21","i_f22","i_f23","i_f24","i_f25","i_f26","i_f27","i_f28","i_f29","i_f30","i_f31","i_f32","i_f33","i_f34","i_f35","i_f36","i_f37","i_f38","i_f39","i_f40","i_f41","i_f42","i_f43","i_f44","i_f45","i_f46","i_f47","i_f48","i_f49","i_f50","t_0001","t_0002","t_0003","t_0004","t_0005","t_0006","t_0007","t_0008","t_0009","t_0010","t_0011","t_0012","t_0013","t_0014","t_0015","t_0016","t_0017","t_0018","t_0019","t_0020","t_0021","t_0022","t_0023","t_0024","t_0025","t_0026","t_0027","t_0028","t_0029","t_0030","t_0031","t_0032","t_0033","t_0034","t_0035","t_0036","t_0037","t_0038","t_0039","t_0040"]};



}(jQuery));