#### Object  `valueOf`     `toString`

1. `valueOf`    `toString`  除了  `undefined`   `null` ，其他数据类型的 原型链上都有的函数

2. **作用：  值运算  和 显示的时候，隐式类型转换的时候  会 自动调用这两个函数**

3. **这两个函数  调用的 顺序，及  何时会调用**

   - 只涉及单纯 显示  值 的时候，`toString`  方法 优先于  `valueOf`
     - **解释： 即 要将 对象 转化为字符串的时候  `toString`  优先**
   - 涉及 到操作符的问题，   `valueOf`       方法 优先于   `toString`
     - **解释： 即 在没有  只单独  重定义过  `toString`   的情况下，除了 很明了的要将  对象转化为 字符串形式，其他都会  调用 `valueOf`  。**

4. **当重写   这两个方法时，就会有所改变**

   1. **只重写   `toString` 方法， 一般就只会 调用  `toString` 不管是否涉及到  操作符**
   2. **只重写   `valueOf`  或   同时 重写了   `toString`    `valueOf` ,调用顺序不变**

5. **`valueOf` :  返回原始值**   

   - **`toString`：  普通类型的值（包括 function  Array）  返回对应的  字符串。对于 对象类型的值 返回    `"[object Object]"`**

6. ```js
   a==1 && a==2 && a==3   // 使其的结果为  true
   
   var a = {
   	i: 1,
   	valueOf: function() {
   		return a.i++
   	}
   }
   a==1 && a==2 && a==3 //返回true
   
   // 或  
   var val = 1
   Object.defineProperty(window, 'a', {
   	get() {
   		return val++
   	}
   })
   a==1 && a==2 && a==3 //同样返回true
   ```

##  总结 `valueOf`   与  `toString`

### 1.  对象只涉及到  显示数据  或 打印数据时，调用  `toString()`

### 2.  对象 涉及到操作符时，调用 `valueOf()`

### 3.  一旦 修改了  ` toString()`  对象就只会 调用   ` toString()`  