---
layout: page
title: "AngularJS"
category: tut
date: 2014-12-16 08:55:36
order: 1
---


####引入文件

```html
<script src="http://apps.bdimg.com/libs/angular.js/1.2.9/angular.min.js" type="text/javascript"></script>

<link rel="stylesheet" href="http://cokapp.github.io/jquery-emoji/libs/jquery.emoji.min.css">
<script src="http://cokapp.github.io/jquery-emoji/libs/angular.emoji.min.js" type="text/javascript"></script>
```

####初始化

```html
<div ng-app="emojiApp">
	<div emoji-parser="cokemoji1" emoji-bind="emoji" emoji-parseto="image">
	</div>
	<div ng-bind="emoji"></div>
	<a emoji-switcher="cokemoji1" emoji-bind="emoji">颜文字</a>
</div>

<script type="text/javascript">
	angular.module('emojiApp', ['cokjs.emoji']);
</script>

```

####Enjoy

