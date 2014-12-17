/*TMODJS:{"version":4,"md5":"72fbe564edefd76a096cc2c1a4bddc5e"}*/
template('image-emoji',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,fullpath=$data.fullpath,image=$data.image,title=$data.title,$out='';$out+='<img src="';
$out+=$escape(fullpath);
$out+=$escape(image);
$out+='" title="';
$out+=$escape(title);
$out+='" />';
return new String($out);
});