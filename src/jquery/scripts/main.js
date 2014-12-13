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
            var tabs = cokEmoji.EL.find('.tab-item');
            var tab = $(this);
            tabs.removeClass('active');
            tab.addClass('active');

            var panels = cokEmoji.EL.find('.tab-pane');
            panels.each(function(){
                var panel = $(this);
                if(panel.data('tab')===tab.data('tab')){
                    panel.addClass('active');
                }else{
                    panel.removeClass('active');
                }
            });
        });

		//注入
		J_target.data('cokEmoji', cokEmoji);



        //API
		cokEmoji.show = function(){
			cokEmoji.EL.removeClass('cok-hidden');
			cokEmoji.EL.addClass('cok-show');
		}
		cokEmoji.hide = function(){
			cokEmoji.EL.removeClass('cok-show');
			cokEmoji.EL.addClass('cok-hidden');
		}
        //将包含Emoji的源字符串替换为image或text
        cokEmoji.translate = function(input, isText){
            
            var output = input.replace(emojiRegex, function(name){
                var emoji = util.findEmoji(name, cokEmoji.options);
                if(isText){
                    return template('text-emoji', emoji);
                }else{
                    return template('image-emoji', emoji);
                }
            });

            return output;
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

            return cokEmoji;
        });
    };
    $.cokEmoji = {};

    $.cokEmoji.options = {
		basePath: 'images/smilies/',
    	autoParse: false,
		appendTo: 'textArea',
        onSelected: function(emjtext, emj){
            var cokEmoji = this;
            $(cokEmoji.options.appendTo).append(emjtext);
        }
    };

    //在grunt任务replace中进行替换
    $.cokEmoji.config = smiliesConfig;



}(jQuery));