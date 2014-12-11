/*TMODJS:{"version":15,"md5":"f6e1d4e68bffe8b9ae5a4c23b27a3837"}*/
template('dialog',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,tabs=$data.tabs,tab=$data.tab,index=$data.index,$escape=$utils.$escape,smilies=$data.smilies,smily=$data.smily,basePath=$data.basePath,$out='';$out+=' <div class="cok-emoji-wrapper cok-hidden"> <ul class="tab-nav"> ';
$each(tabs,function(tab,index){
$out+=' <li class="tab-item active"> <a href="javascript:;" hidefocus="true">';
$out+=$escape(tab.title);
$out+='</a> </li> ';
});
$out+=' <li class="tab-placeholder"></li> </ul> <div class="tab-content"> ';
$each(tabs,function(tab,index){
$out+=' <div class="tab-pane active" data-tab="';
$out+=$escape(tab.name);
$out+='"> <ul class="emojis"> ';
$each(smilies[tab.name],function(smily,index){
$out+=' <li data-emoji="';
$out+=$escape(smily.emoji);
$out+='" class="emoji"> <img src="';
$out+=$escape(basePath);
$out+='/';
$out+=$escape(smily.image);
$out+='" alt="';
$out+=$escape(smily.title);
$out+='" title="';
$out+=$escape(smily.title);
$out+='"> </li> ';
});
$out+=' </ul> </div> ';
});
$out+=' </div> </div> ';
return new String($out);
});