/*TMODJS:{"version":22,"md5":"eac9124a6ec1987971fc1f1d9cfff7ac"}*/
template('dialog',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,tabs=$data.tabs,tab=$data.tab,tabIndex=$data.tabIndex,$escape=$utils.$escape,smilies=$data.smilies,smily=$data.smily,smilyIndex=$data.smilyIndex,basePath=$data.basePath,$out='';$out+=' <div class="cok-emoji-wrapper cok-hidden"> <ul class="tab-nav"> ';
$each(tabs,function(tab,tabIndex){
$out+=' <li class="tab-item ';
if(tabIndex==0){
$out+=' active ';
}
$out+='"> <a href="javascript:;" hidefocus="true">';
$out+=$escape(tab.title);
$out+='</a> </li> ';
});
$out+=' <li class="tab-placeholder cok-clearfix"></li> </ul> <div class="tab-content"> ';
$each(tabs,function(tab,tabIndex){
$out+=' <div class="tab-pane ';
if(tabIndex==0){
$out+=' active ';
}
$out+='" data-tab="';
$out+=$escape(tab.name);
$out+='"> <ul class="emojis"> ';
$each(smilies[tab.name],function(smily,smilyIndex){
$out+=' ';
if(smily.emoji){
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
}else{
$out+=' <li> </li> ';
}
$out+=' ';
});
$out+=' <li class="cok-clearfix"></li> </ul> </div> ';
});
$out+=' </div> </div> ';
return new String($out);
});