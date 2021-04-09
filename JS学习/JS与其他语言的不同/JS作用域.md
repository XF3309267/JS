### JS 的块级作用域   （      https://zhuanlan.zhihu.com/p/28140450     ）

[^]: 1.  let 声明的变量的作用域是  块级的；  
[^]: 2. let 不能重复声明已存在的变量； 
[^]: 3. let 有暂死区域不会被提升

1. **<font color=red> JS 没有块级作用域，只有函数作用域</font>**

   ```js
   function demo(str){
       if(str){
           var val = true
       }
   }
   // 不管  str 是否为  true，  val 都会声明
   // var 声明变量会 提升到 自身所在域的顶部（即 变量声明提升），
   //  因为 没有 块级作用域，所以 val 是 demo 的私有变量
   
   // 块级作用域的用途:  强化对变量生命周期的控制，防止变量的污染
   // 块级声明的变量，只能在当前域中使用，域之外不能访问
   
   ```

2. **let   定义块级变量**

   - let  没有变量声明提前，**let  var 声明的变量可以进行更改，而  const 声明的变量不可以**

   - let    不会  也  不允许 在同一作用域中   声明两个相同的变量

   - ```js
     function  demo(){
     	var arg = 4;
     	let arg = 5;
     	// 报错
     }
     function demo(){
         var arg = 4;
         {
             let arg = 5;
         }
         // 不报错
     }
     ```

   
