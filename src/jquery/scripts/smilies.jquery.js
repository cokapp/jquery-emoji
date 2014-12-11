(function(){


	var showDialog = function(){
		var dialog = document.getElementById('cok-smilies-wrapper');
		if(dialog != undefined){
			
		}

	}

	var CokEmoji = function(options, J_target){
		var emj = this;
		emj.options = $.extend({}, $.cokEmoji.config, $.cokEmoji.options, options);
		emj.html = template('dialog', options);

		J_target.append(emj.html);
		emj.EL = J_target.find('.cok-smilies-wrapper');

		//注入
		J_target.data('cokEmoji', emj);

		emj.show = function(){
			emj.EL.removeClass('cok-hidden');
			emj.EL.addClass('cok-show');
		}
		emj.hide = function(){
			emj.EL.removeClass('cok-show');
			emj.EL.addClass('cok-hidden');
		}
	}




    $.fn.cokEmoji = function(options) {
        options = $.extend({}, $.cokEmoji.options, options);
        this.each(function() {
        	var J_target = $(this);

        	var emj = $(this).data('cokEmoji');
        	if(emj === undefined){
        		emj = new CokEmoji(options, J_target);
        	}

        	J_target.on('click', function(){
        		emj.show();
        	});

        });
    };

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