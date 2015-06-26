/*TMODJS:{"version":1,"md5":"18b5abf088f2c4305d2583cc0b88e554"}*/
template('text-emoji',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,text=$data.text,$out='';$out+=$escape(text);
return new String($out);
});