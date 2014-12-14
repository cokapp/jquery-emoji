/*TMODJS:{"version":2,"md5":"2245a8118f10fc17d7f6818f7cf8cd61"}*/
template('image-emoji',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,basePath=$data.basePath,image=$data.image,title=$data.title,$out='';$out+='<img src="';
$out+=$escape(basePath);
$out+=$escape(image);
$out+='" title="';
$out+=$escape(title);
$out+='" />';
return new String($out);
});