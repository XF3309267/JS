### [如何解决跨域问题](https://zhuanlan.zhihu.com/p/66484450?utm_source=wechat_session&utm_medium=social&utm_oi=1186241741178527744)

- **因为  同源的策略  ， 不能与 不同源的 服务器 进行沟通**
- **同源：**  相同协议  相同域名 相同的端口号

  - 例如：`http://abc.com/test1`  与以下做同源检测
  - `https://abc.com/test2`    (协议不同 http / https)
  - `http://abc.com:81/test3` (端口不同 80 / 81)
  - `http://abc.com/test4`   同源 
  - **IE 的 “同源策略” 不包括端口号**`http://abc.com:81/test3` 也为同源
- **解决跨域的三种思路**
  1. 客户端浏览器解除跨域限制 （不现实）
  2. 发送JSONP请求替代XHR请求  （不推荐）
  3. 修改服务器端
- **判断一个请求是不是跨域请求**
  -  **非跨域请求**，在请求头中会只包含请求的主机名。 
  -  **跨域请求**，在请求头中会既包含要请求的主机名还包括当前的源主机名，如果这两者不一致，那就是跨域请求了。 
- 浏览器对请求分类
- **GET 、 POST 、 PUT、 DELETE、 HEAD、TRACE、OPTIONS、CONNECT**

## [使用 ` JSONP ` 实现跨域](https://zhuanlan.zhihu.com/p/24390509)

- **如何使用：**(假如现在本页面在   `http://123.1.1.1:8090/jsopn/index.html`)

  - ```html
    // 使用 script 标签引用   或者  js 代码动态 建立 script 标签，然后引用
    <script type="text/javascript" src="http://123.1.1.1:8080/jsonp.do">   </script>
    ```

  - **注意事项：因为使用  script 标签请求数据，就像引入 JS 脚本一样，会直接执行里面的内容。执行 数据会报语法错误**
  
  - **我们只需要将返回的数据设置为  `callbakc(result)`,我们事先写好  callback 函数，在 callback 函数中就能获取  result（服务端 发过来的数据），我们只要 在另一个脚本 写好 callback函数的具体内容，即对  数据的实际操作，如下：**
  
    - ```js
      function callback( result ){
          let data = result.data
          for(let i = 0;i < data.length;i++){
              let ele = data[i]
              for(key in ele){
                  if(ele.hasOwnproperty(key)){
      				console.log(ele[key])
                  }
              }
          }
      }
      ```
  
- **<font color=red> ``JSONP 缺点：</font>**

  1. 只支持 GET 方法请求，不管 AJAX 中实际的请求方法  是不是 GET
  2. 服务端还需要修改代码
  3. 发送的不是 XHR 请求，无法使用 XHR 对象
  4. **<font color=blue> 不推荐使用 JSONP 实现跨域 </font>**

### 后端使用 `CORS` 跨域

- `cors`   是 w3c 的一个标准，全称  ”跨域资源共享”（Cross-origin resource sharing） 
- 只要服务器实现了CORS 接口，当我们跨域请求数据时，就会自动添加一些附加的信息在头部。

### 在应用服务器增加指定字段

-  对于不带 Cookie 的跨域请求，设置允许跨域的原始域名为任意域名，“Access-Control-Allow-Origin”: “*”，*
- *设置允许跨域的方法为任意方法，“Access-Control-Allow-Methods”: “*”，
- 但是这样的星号设置不能满足带 Cookie 的跨域请求 
-  对于带 Cookie 的跨域请求，要指名允许跨域请求的调用方主机名 ，
- **而使用 Spring Boot 框架，只需要在 Controller 类上加上 @CrossOrigin 注解就可以轻松解决跨域问题了。 **

###  **在 HTTP 服务器增加指定字段** 

###  调用方修改 

-  调用方的解决思路是反向代理，也即是将被调用方的域名代理到调用方域名下，这样就符合同源策略了，也就解决了跨域问题。 

