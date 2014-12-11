/*TMODJS:{"version":2,"md5":"95ebd668d2061d938c10eb6245400f24"}*/
template('dialog',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,tabs=$data.tabs,tab=$data.tab,index=$data.index,$escape=$utils.$escape,smilies=$data.smilies,smily=$data.smily,basePath=$data.basePath,image=$data.image,$out='';$out+='<!--\r\n表情显示模板\r\n数据：\r\n\r\nvar config = {\r\n    basePath: \'images/smilies/\',\r\n    tabs: [{\r\n        name: \'ywz\',\r\n        title: \'颜文字\'\r\n    }, {\r\n        name: \'tsj\',\r\n        title: \'兔斯基\'\r\n    }],\r\n    smilies: {\r\n        ywz: [{\r\n            emoji: \':biggrin:\',\r\n            title: \'大笑\',\r\n            image: \'emoji/biggrin.png\'\r\n        }, {\r\n            emoji: \':confused:\',\r\n            title: \'反对\',\r\n            image: \'emoji/confused.png\'\r\n        }, {\r\n            emoji: \':cool:\',\r\n            title: \'超酷\',\r\n            image: \'emoji/cool.png\'\r\n        }],\r\n        tsj: [{\r\n            emoji: \':t_0001:\',\r\n            title: \'滚蛋\',\r\n            image: \'tsj/t_0001.gif\'\r\n        }, {\r\n            emoji: \':t_0002:\',\r\n            title: \'神马\',\r\n            image: \'tsj/t_0002.gif\'\r\n        }]\r\n    }\r\n}\r\n\r\n-->\r\n\r\n\r\n<div class="cok-emoji-wrapper cok-hidden">\r\n    <ul class="tab-nav">\r\n    	';
$each(tabs,function(tab,index){
$out+='\r\n 		<li class="tab-item active">\r\n 			<a href="javascript:;" hidefocus="true">';
$out+=$escape(tab.title);
$out+='</a>\r\n        </li>\r\n    	';
});
$out+='\r\n        <li class="tab-placeholder"></li>\r\n    </ul>\r\n    <div class="tab-content">\r\n    	';
$each(tabs,function(tab,index){
$out+='\r\n        	<div class="tab-pane active" data-tab="';
$out+=$escape(tab.name);
$out+='">\r\n        		<ul class="emojis">\r\n                	';
$each(smilies[tab.name],function(smily,index){
$out+='\r\n                		 <li data-emoji="';
$out+=$escape(smily.emoji);
$out+='" >\r\n                		 	<img src="';
$out+=$escape(basePath);
$out+='/';
$out+=$escape(smily.image);
$out+='" alt="';
$out+=$escape(image.title);
$out+='" title="';
$out+=$escape(image.title);
$out+='">\r\n                		 </li>\r\n                	';
});
$out+='\r\n        		</ul>\r\n        	</div>\r\n    	';
});
$out+='\r\n    </div>\r\n</div>\r\n';
return new String($out);
});