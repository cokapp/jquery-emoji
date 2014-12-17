---
layout: page
title: "AngularJS"
category: tut
date: 2014-12-16 08:55:36
order: 1
---


####引入文件

```html
	<script src="http://apps.bdimg.com/libs/jquery/2.1.1/jquery.min.js" type="text/javascript"></script>
	<script src="http://apps.bdimg.com/libs/angular.js/1.2.9/angular.min.js" type="text/javascript"></script>
	<link rel="stylesheet" href="{{ site.baseurl }}/libs/jquery.emoji.css">
	<script src="{{ site.baseurl }}/libs/angular.emoji.js" type="text/javascript"></script>
```

####初始化

```html
<div id="demo-angular" ng-app="myApp">
	<a href="javascript:;" emoji-switcher="cokemoji1" emoji-bind="emoji">颜文字</a>
	<hr>
	<b>原始数据：</b>
	<textarea cols="30" rows="5" ng-model="emoji"></textarea>
	<hr>
	<b>解析成图片：</b>
	<div emoji-parser="cokemoji1" emoji-bind="emoji" emoji-parseto="image"></div>
	<hr>
</div>

<script type="text/javascript">
	angular.module('myApp', ['cokjs.emoji']);
</script>

```

####Enjoy

