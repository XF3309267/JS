# JS  ajax

### 什么是 Ajax

**Ajax(Asynchronous  JavaScript and XML ) 异步 JavaScript 和 XML**

1. Ajax 实际上是下面几种技术的融合：
   1.  XHTML 和 CSS 的基于标准的表示技术
   2. DOM 进行动态显示 和 交互
   3. XML 和 XSLT 进行数据交换 和 处理
   4. XMLHttpRequest 进行异步数据检索
   5.  JavasScript  将以上的技术 融合在一起
2. **客户端可以在 不必刷新整个浏览器的情况下，与服务器进行异步通讯的技术**

### 为什么  需要  Ajax

1. 因为 Ajax 可以局部刷新，降低性能，不中断 用户操作页面

### XMLHttpRequest

1. **使用 Ajax 时，  浏览器先把请求发送到 XMLHttpRequest 异步对象中，异步对象 对 请求进行封装，然后再发送给  服务器。服务器并不是以 转发的 方式响应，而是 以流的方式   把数据返回给 浏览器**

2. **XMLHttpRequest 异步对象 不停监听 服务器状态变化，得到 服务器返回的数据，就返回给浏览器**

3. **创建  XMLHttpRequest**

   - ```js
     function createHttp(){
         let http = new XMLHttpRequest()
         if(window.ActiveXObject){
             http = new ActiveXObject()         // IE6
         }
     }
     ```

4. **XMLHttpRequest  常用方法**

   - **open( method, url , booleanAsync,username,password)**
     - method:  请求的方法
     - url： 指定要提交的 地址
     - booleanAsync： true: 异步， false： 同步
     - username:  ( 可选 )  http 认证的时候会用到
     - password： ( 可选 )  http 认证的时候会用到
   - **setRequestHeader( header, value )   设置消息头 （get 方法不需要设置）**
     - 例子：xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencode')
   - **send( content ) 发送请求给服务器**
     - get 方法， content 不需要填写
     - post 方法，content  需要填写