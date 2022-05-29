# CNNVD-NodeCrawler
基于jsdom的HTML解析，实现CNNVD快速爬虫【对付呆瓜课设】

杂谈：

在更加熟悉前端后，我对所谓的爬虫有了更多的理解，以前感觉爬虫很牛逼，现在感觉它貌似也就那么回事？

对于前后端分离的项目，我们完全直接怼着接口来，那就没爬虫什么事情了。

爬虫的场景应该是那些服务端动态渲染的场景，就比如这次课设要求我们爬取的网站[国家信息安全漏洞库](http://www.cnnvd.org.cn/web/xxk/ldxqById.tag?CNNVD=CNNVD-201709-1260)

![image](https://tvax2.sinaimg.cn/large/007YVyKcly1h2pn22rvw9j30za0qbakb.jpg)

它是直接返回渲染好的html的，那么我们的思路也很简单，就去解析htlm文本嘛，这里我用到了[jsdom](https://www.npmjs.com/package/jsdom)

具体实例如下。

```js
const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
console.log(dom.window.document.querySelector("p").textContent); // "Hello world"
```

它能够解析一段HTML文本，之后就能直接使用我们熟悉的类选择器来选择元素了。

这次还学到一个新技能，在元素审查里直接右键元素，能够赋值Selector，即我们需要的选择器。

![](https://tvax1.sinaimg.cn/large/007YVyKcly1h2pn7grraxj30m00fn43w.jpg)

之前用过scrapy来爬虫，那还是太重了，对于普通的需求，我们完全可以用JS来解决，毕竟html啥的就是前端嘛。

程序运行结果

![image](https://tva2.sinaimg.cn/large/007YVyKcly1h2pn9ggy1xj313j0k44cj.jpg)

![image](https://tva1.sinaimg.cn/large/007YVyKcly1h2pna58xdoj31d20kw7iz.jpg)