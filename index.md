---
layout: default
title: "首页"
---

###这是什么
简单易用的Web表情发送插件

###为什么有这个
最近一个Web项目需要发送表情，查找一圈只发现了这个[jquery.qqFace.js](http://www.baidu.com/s?wd=jquery.qqFace.js)，但是我感觉不够强大。

###预览
基本上，就是这个样子：

![屏幕截图]({{ site.baseurl }}/static/screen.png)

###特性
1. 开箱即用 [如何使用？](http://cokapp.github.io/jquery-emoji/tut/use)

2. 支持订制 [如何订制？](http://cokapp.github.io/jquery-emoji/tut/custom)

###快速开始
####引入文件

```html
<script src="http://apps.bdimg.com/libs/jquery/2.1.1/jquery.min.js" type="text/javascript"></script>

<link rel="stylesheet" href="http://cokapp.github.io/jquery-emoji/libs/jquery.emoji.min.css">
<script src="http://cokapp.github.io/jquery-emoji/libs/jquery.emoji.min.js" type="text/javascript"></script>
```

####初始化

```html
<a id="emoji" href="javascript:;" title="颜文字">颜文字</a>
<div id="content"></div>
<script type="text/javascript">
	$(document).ready(function(){
		$('a#emoji').cokEmoji({
			appendto: '#content',
			autoparse: 'image',
			position: 'right'
		});
	});
</script>
```

###阅读更多
[在线文档](http://cokapp.github.io/jquery-emoji)