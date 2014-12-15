/*TMODJS:{"version":40,"md5":"429ce11b80da9705ecef2dcec7b11743"}*/
template('dialog',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,tabs=$data.tabs,tab=$data.tab,tabIndex=$data.tabIndex,$escape=$utils.$escape,smilies=$data.smilies,smily=$data.smily,smilyIndex=$data.smilyIndex,basepath=$data.basepath,$out='';$out+=' <div class="cok-emoji-wrapper cok-hidden"> <div class="caret-up"> <div></div> </div> <ul class="tab-nav cok-clearfix"> ';
$each(tabs,function(tab,tabIndex){
$out+=' <li class="tab-item ';
if(tabIndex==0){
$out+=' active ';
}
$out+='" data-tab="';
$out+=$escape(tab.name);
$out+='"> <a href="javascript:;" hidefocus="true">';
$out+=$escape(tab.title);
$out+='</a> </li> ';
});
$out+=' </ul> <div class="tab-content"> ';
$each(tabs,function(tab,tabIndex){
$out+=' <div class="tab-pane ';
if(tabIndex==0){
$out+=' active ';
}
$out+='" data-tab="';
$out+=$escape(tab.name);
$out+='"> <table class="emojis"> <tbody> <tr> ';
$each(smilies[tab.name],function(smily,smilyIndex){
$out+=' ';
if(smilyIndex!=0 && smilyIndex!=smilies[tab.name].length && smilyIndex%10===0){
$out+=' </tr><tr> ';
}
$out+=' ';
if(smily.name){
$out+=' <td data-name="';
$out+=$escape(smily.name);
$out+='" class="emoji"> <img data-src="';
$out+=$escape(basepath);
$out+=$escape(smily.image);
$out+='" alt="';
$out+=$escape(smily.title);
$out+='" title="';
$out+=$escape(smily.title);
$out+='"> </td> ';
}else{
$out+=' <td></td> ';
}
$out+=' ';
});
$out+=' </tr> </tbody> </table> </div> ';
});
$out+=' </div> </div> ';
return new String($out);
});