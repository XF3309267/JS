## let 、const

1. **let**
   
   - **暂时性 死区、  变量声明 不提前、  在有 let 的作用域块内 不能重复声明、不能使用 let 重复声明  函数的形参  、<font color=red> let  声明变量，其实是有提升的（因为有 暂时性 死区的存在）  </font>**
   
   - **为什么  for 循环中 使用  let 定义 循环变量**
   
      - 因为  使用 var 定义的 i ，所有的 i 是全局的 i，所有的 i 指向的是同一个 i；会被泄露成 全局变量（即在  for 循环之外  也能使用 i ）
   
         使用  let 定义的 i，每一轮 循环都会 新定义一个新的变量 i , JS 引擎内部会记住上一轮循环的值，在这基础上 定义 新的 i；
   
   - **关于使用  let  定义变量  进行 for 循环**
   
     - ```js
       var arr =[]
       for (let i = 0;i < 5;i++){
       	arr[i] = function(){
               console.log(i)
           }
           // arr = [0,1,2,3,4]
       }
       // 问： let 和 var 在 for 循环中一样，只是声明了一次，为什么不会是  5 个 5
       // 答： 因为  for(let i=0;i<5;i++) 中的  括号之间  有一个隐藏作用域
       //		而在在 循环体内 会隐式的实现:  let i = i;  后者的 i 是 隐藏作用域中的 i
       //		
       ```
   
   - **let  的暂时死区** ：即 在这个域内 使用了 let 声明变量。而且该变量 只有在 let 声明该变量之后才能使用。
   
     1. **问：let 声明变量 若没有提升，JS 是如何在 没有运行  let 语句，且知道  某些变量，不能输出**
   
   - **<font color=red> let 声明变量 有没有提升</font>**
   
     1. **切合  上述  ，我们应该知道， let  声明变量  应该是有  提升的**
   
   - ```js
     // 特殊例子
     // >>>>>>>>>>>>>>>>    下列写法 报错
     if(true) let x = 1;
     
     // >>>>>>>>>>>>>>>>		下列写法不报错
     if(true){
         let x = 1;
     }
     
     //  在严格模式下，函数声明只能在当前作用域的顶层
     // >>>>>>>>>>>>>>		严格模式下 
     //  报错
     if(true)
     	function f(){}
     
     // >>>>>>>>>>>>>>		严格模式下
     //  不报错
     if(true){
         function f(){}
     }
     
     //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
     // 使用  var 的弊端
     
     ```
   
   - **<font color=red> 使用 var 的弊端</font>**
   
     - ```js
       var temp = 'temp'
       function f(){
           consol.log(temp)
           if(false){
               var temp = 'hello,world'
           }
       }
       f(); 
       // undefined 
       
       // ES5 只有  全局作用域 和 函数作用域，没有块级作用域
       // var 的声明 和 function  的声明  都会 提升作用域的顶端（全局  函数）
       // 上述的  if   中的 temp 的声明会到 函数作用域的顶端（即 超出了 if 的块级作用域）
       // 
       ```
   
   - **在 块级作用域中  声明函数**
   
     - **在 ES6 中，允许在块级作用域内 声明函数， 与 let 声明变量相似**
   
     - **<font color=red> 但 在 ES6 的浏览器中，会有些浏览器不遵守此规定，有以下行为方式</font>**
   
       1. 允许在块级作用域内声明函数
       2. 函数声明 类似于 var
       3. 函数声明还会提升到所在的  块级作用域的  头部
       4. **所以一般在  块级作用域内 声明函数，应该将它看成  var 声明的函数**
   
     - **避免在 块级作用域内 声明函数，要的话，也只用 函数表达式**
   
       - ```js
         // 不建议
         {
             function f(){
                 return 'a'
             }
         }
         // 建议
         {
             let f = function(){
                 return 'a'
             }
         }
         ```
   
2. **const**

   - **const 与 let 相似，区别在于  const 定义的变量 不能更改**

     **不能更改：** <font color=red> 是指  变量指向的内存地址中的数据不能更改</font>

     1. const  定义的是 简单类型的数据(数值 、 字符串、布尔值 )，那就是这是数据不能更改
     2. const 定义的是 复合类型的数据（对象 、数组），const 只是保证 变量所指向的 是一个固定的地址（即 地址的数据不能被改变），所以 const  声明定义的对象  还是可以更改数据的；

   - **使用 freeze() 方法，对 const 声明的 引用类型 不能加以更改（上述的 对象可以）**

     - ```js
       const foo = Object.freeze({name:'Jack',age:23})
       foo.socre = 89 // 报错
       ```

       

     - **<font color=red> 使用 freeze( )冻结 对象 或 数组，只能冻结第一层（即 不能更改对象的属性值，但是 对象的属性的属性  还是可以修改） </font>**

     - ```js
       //定义一个函数时 引用类型的 变量彻底无法更改
       var constantize = (obj)=>{
           Object.freeze(obj);
           Object.keys(obj).forEach(key,i)=>{
               if(typeof obj[key] === 'object'){
                   constantize(obj[key]);
               }
           }
       }
       ```

3. ES6 声明变量的  6  种方法

   - var	function 	let	 const	 import	 class