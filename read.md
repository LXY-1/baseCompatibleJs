#### 封装浏览器相关功能api的兼容性代码 

- dom事件绑定
- dom元素获取

   1.在做不同浏览器获取dom元素的兼容代码前需要了解有多少种获取dom元素的api:大体可以分成两类:querySelector(支持css选择器语法)与getElementById、getElementsByClassName、getElementsByTagName。（其中获取class元素还需要做进一步的兼容处理）

- dom属性操作

[jq源码分析系列-link1](https://www.hongweipeng.com/index.php/archives/941/)
[jq源码分析系列-link2](http://www.cnblogs.com/aaronjs/p/3279314.html)