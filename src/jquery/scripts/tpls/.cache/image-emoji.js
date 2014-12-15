/*TMODJS:{"version":3,"md5":"c2953fc147be22c761d3e852ca5a7014"}*/
template('image-emoji',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,basepath=$data.basepath,image=$data.image,title=$data.title,$out='';$out+='<img src="';
$out+=$escape(basepath);
$out+=$escape(image);
$out+='" title="';
$out+=$escape(title);
$out+='" />';
return new String($out);
});