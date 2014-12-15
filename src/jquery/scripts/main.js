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
            cokEmoji.EL.css({ top: top + 'px', left: left + 'px'});
        }
        var autoHide = function(){
            var childA = cokEmoji.EL.find('a')
                ,childUL = cokEmoji.EL.find('ul')
                ,childDiv = cokEmoji.EL.find('div');

            $(document).on('click', function(e){
                e = window.event || e; // 兼容IE7
                obj = $(e.srcElement || e.target);
                var notHide = obj.is(J_target) 
                    || obj.is(cokEmoji.EL) 
                    || obj.is(childA)
                    || obj.is(childUL)
                    || obj.is(childDiv);
                if (!notHide){
                    cokEmoji.hide();
                }
            });
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

            if(cokEmoji.options.onselected){
                if(cokEmoji.options.autoparse === 'image'){
                    content = cokEmoji.translate(emjText);
                }else if (cokEmoji.options.autoparse === 'text'){
                    content = cokEmoji.translate(emjText, true);
                }else{
                    content = emjText;
                }
                cokEmoji.options.onselected.call(cokEmoji, content, emj);
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
            cokEmoji.EL.focus();
		}
		cokEmoji.hide = function(){
			cokEmoji.EL.removeClass('cok-show');
			cokEmoji.EL.addClass('cok-hidden');
		}
        //将包含Emoji的源字符串替换为image或text
        cokEmoji.translate = function(input, isText){
            
            var output = input.replace(emojiRegex, function(text, name){
                var emoji = util.findEmoji(name, cokEmoji.options);
                emoji.basepath = cokEmoji.options.basepath;

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
        autoHide();
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

            $.cokEmoji.cache(cokEmoji.options.name, cokEmoji);
            return cokEmoji;
        });
    };


    $.cokEmoji = {};

    $.cokEmoji.cacheStore = {};
    $.cokEmoji.cache = function(key, val){
        if(val != undefined && val != null){
            $.cokEmoji.cacheStore[key] = val;
        }else{
            return $.cokEmoji.cacheStore[key];
        }
    }

    $.cokEmoji.options = {
		basepath: 'images/smilies/',
        //image、text、emoji or none
    	autoparse: 'emoji',
		appendto: 'textArea',
        onselected: function(emjtext, emj){
            var cokEmoji = this;
            if(cokEmoji.options.autoparse === 'none'){
                return;
            }
            var J_appendto = $(cokEmoji.options.appendto);
            if(J_appendto.length === 0){
                return;
            }
            J_appendto.append(emjtext);
        }
    };

    //在grunt任务replace中进行替换
    $.cokEmoji.config = smiliesConfig;



}(jQuery));