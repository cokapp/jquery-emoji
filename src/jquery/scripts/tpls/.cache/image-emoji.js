/*TMODJS:{"version":1,"md5":"a95261476f097722e89748ce37935009"}*/
template('image-emoji',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,image=$data.image,title=$data.title,$out='';$out+='<img src="';
$out+=$escape(image);
$out+='" title="';
$out+=$escape(title);
$out+='" />';
return new String($out);
});