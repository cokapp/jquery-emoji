/*TMODJS:{"version":5,"md5":"89014eed0defe5ae2f4e91448abf6ce1"}*/
template('image-emoji',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,fullpath=$data.fullpath,image=$data.image,title=$data.title,$out='';$out+='<img src="';
$out+=$escape(fullpath);
$out+=$escape(image);
$out+='" title="';
$out+=$escape(title);
$out+='" />';
return new String($out);
});