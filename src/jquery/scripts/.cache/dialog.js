/*TMODJS:{"version":1,"md5":"d34bd5ceca27db38999eec5e375b188f"}*/
template('dialog',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,tabs=$data.tabs,tab=$data.tab,index=$data.index,$escape=$utils.$escape,smilies=$data.smilies,smily=$data.smily,basePath=$data.basePath,image=$data.image,$out='';$out+=' <div class="cok-smilies-wrapper"> <ul class="tab-nav"> ';
$each(tabs,function(tab,index){
$out+=' <li class="tab-item active"> <a href="javascript:;" hidefocus="true">';
$out+=$escape(tab.title);
$out+='</a> </li> ';
});
$out+=' <li class="tab-placeholder"></li> </ul> <div class="tab-content"> ';
$each(tabs,function(tab,index){
$out+=' <div class="tab-pane active" data-tab="';
$out+=$escape(tab.name);
$out+='"> <ul class="smilies"> ';
$each(smilies[tab.name],function(smily,index){
$out+=' <li data-emoji="';
$out+=$escape(smily.emoji);
$out+='"> <img src="';
$out+=$escape(basePath);
$out+='/';
$out+=$escape(smily.image);
$out+='" alt="';
$out+=$escape(image.title);
$out+='" title="';
$out+=$escape(image.title);
$out+='"> </li> ';
});
$out+=' </ul> </div> ';
});
$out+=' </div> </div> ';
return new String($out);
});