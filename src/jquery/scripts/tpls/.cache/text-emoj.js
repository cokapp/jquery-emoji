/*TMODJS:{"version":1,"md5":"0e421fb8263cffe14f3a7dbd0307071f"}*/
template('text-emoj',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,text=$data.text,$out='';$out+=$escape(text);
return new String($out);
});