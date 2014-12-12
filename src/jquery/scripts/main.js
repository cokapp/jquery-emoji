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