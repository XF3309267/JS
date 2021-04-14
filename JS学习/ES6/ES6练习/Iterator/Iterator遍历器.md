# Iterator    遍历器对象

1. ###### **是一种接口，为不同的  数据接口 提供统一的访问方式**

2. <font color="orange"> 任何数据结构  只要部署  Iterator 接口，就可以完成遍历操作，即依次处理数据结构的成员（ 只要。。。。就。。。。，表示疑问 ）</font>

3. **作用**

   1. 为各种数据结构 提供 统一的  简便的访问接口
   2. 使得到的数据结构的 成员 能够按某种次序排列

4. 使用

   1. ```js
      // 指针对象的next方法，用来移动指针。开始时，指针指向数组的开始位置。然后，每次调用next方法，指针就会指向数组的下一个成员。
      
      // next() 方法 返回一个对象
      // {value:  ,done: }
      // value: 循环遍历得到的元素
      // done： 遍历是否结束
      
      var it = makeIterator(['a', 'b']);
      
      it.next() // { value: "a", done: false }
      it.next() // { value: "b", done: false }
      it.next() // { value: undefined, done: true }
      
      function makeIterator(array) {
        var nextIndex = 0;
        return {
          next: function() {
            return nextIndex < array.length ?
              {value: array[nextIndex++], done: false} :
              {value: undefined, done: true};
          }
        };
      }
      ```
      
   2. **使用：(自我总结，这里是本人自行总结，比较通俗易懂)   **

      1. 首先 数据结构要有 ` [Symbol.iterator]`  属性 ，且在 ` [Symbol.iterator]`  属性 上部署了遍历器生成方法。

      2.  

         ```js
         const obj = {
           [Symbol.iterator] : function () {
             return {
               next: function () {
                 return {
                   value: 1,
                   done: true
                 };
               }
             };
           }
         };
         // 	1. 要有数据结构（一个对象）中  [Symbol.iterator] 属性
         //	2. [Symbol.iterator] 属性 是一个方法，方法返回一个 对象 {next:function(){}}
         //  3. next 属性是一个方法 ，该方法返回一个对象：{done: ,value: }
         //	4. value：表示当前成员的值，  done: 表示 是否遍历结束
         //  5. ----  当 done 的值为 true 时， 循环结束，且 {done:true} 不会展示
         //  6. ----  对象 满足上述 5 点，仅仅是 for of 遍历能够遍历 这个对象。
         //  7. ----  要想 得到 遍历器对象，必须调用 [Symbol.iterator] 方法（返回一个遍历器对象）
         //  8. 遍历器对象基本特征：具有 next 方法，每次调用 next 方法，返回用一个 {value: ,done:} 对象
         //	9. 自行部署遍历器生成方法时，得严格按照原生的 [Symbol.iterator] 属性定义去编辑
         //	   9.1. 当遍历到最后一个元素时，再往下遍历，就只会返回 {value:undefined,done:true} 
         ```

         

5. 默认的 **Iterator** 接口

   1.  ES6 规定，默认的 Iterator 接口部署在数据结构的`Symbol.iterator`属性，或者说，一个数据结构只要具有`Symbol.iterator`属性，就可以认为是“可遍历的”（iterable）。`Symbol.iterator`属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。执行这个函数，就会返回一个遍历器。 

   2. **有些数据结构 就有 Iterator 接口 （ 如： 数组）**，凡是部署了 `Symbol.iterator` 属性的数据结构，就称为部署了  遍历器接口。

      ```js
      let arr = [1,12,3]
      let iter = arr[Symbol.iterator]()
      // 部署了  Symbol.iterator 的数据结构，调用  Symbol.iterator 属性， 就会得到遍历器对象
      iter.next()    	 // 1
      iter.next()		// 12
      ```

   3. **使用  遍历器 实现链表结构**

      1. ```js
         // 实现链表结构很简单
         // 但是 因为 对象没有 Iterator 接口，无法使用 for of 循环遍历 对象

         function Obj(value){
             this.value = value
             this.next = null
             this[Symbol.iterator] = function(){
                 let iterator = {next:nextFun}
                 let current = this
                 function nextFun(){
                    
                     if(current){
                     	let v = current.value
                         current = current.next
                         return { value:v,done:false }
                     }
                     return{
                         value:undefined,
                         done:true
                     }
                 }
             return iterator
             }
         }
         ```
         
   
6. **其他小知识点**

   1.  使用 B 的 ` [Symbol.iterator]`  属性，**覆盖  A** 的 `[Symbol.iterator]` 属性

       1.  **自我觉得： 覆盖，是要数据结构类似。主要看 自行创建的   ` [Symbol.iterator]`   方法是否通用。 ` [Symbol.iterator]`   方法 返回遍历器对象**

   2.  **字符串也有  iterator  接口**

       1.  字符串调用  `for of`  循环，会正确识别  32 位  UTF-16  字符

           ```js
           for (let x of 'a\uD83D\uDC0A') {
             console.log(x);
           }
           // 'a'
           // '\uD83D\uDC0A'
           ```

           

7. **哪些 原生 `API` 调用了  `Iterator` 接口**

   1.  结构赋值

       ```js
       let set = new Set().add('a').add('b').add('c');
       
       let [x,y] = set;
       // x='a'; y='b'
       
       let [first, ...rest] = set;
       // first='a'; rest=['b''c'];
       ```

   2.  扩展运算符

       ```js
       // 例一
       var str = 'hello';
       [...str] //  ['h','e','l','l','o']
       
       // 例二
       let arr = ['b', 'c'];
       ['a', ...arr, 'd']
       // ['a', 'b', 'c', 'd']
       ```

        **可以将任何部署了 Iterator 接口的数据结构，转为数组。也就是说，只要某个数据结构部署了 Iterator 接口，就可以对它使用扩展运算符，将其转为数组。** 

   3.  `yield*`   后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。 

       ```js
       let generator = function* () {
         yield 1;
         yield* [2,3,4];
         yield 5;
       };
       
       var iterator = generator();
       
       iterator.next() // { value: 1, done: false }
       iterator.next() // { value: 2, done: false }
       iterator.next() // { value: 3, done: false }
       iterator.next() // { value: 4, done: false }
       iterator.next() // { value: 5, done: false }
       iterator.next() // { value: undefined, done: true }
       ```

   4.  由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合，其实都调用了遍历器接口。下面是一些例子。

       - for...of
       - Array.from()
       - Map(), Set(), WeakMap(), WeakSet()（比如`new Map([['a',1],['b',2]])`）
       - Promise.all()
       - Promise.race()

   5.  **总结：**

       1.  对于上述 许多方法都使用到了  Iterator 接口，所以一旦 修改了 数据接口的  `[Symbol.iterator]` 属性 返回的  Iterator 对象，使用到 Iterator 的地方，返回的数据就可以自定义。

8. **Generator  + yield  快速定义  `[Symbol.iterator]` 方法**

   ```js
   let myIterator = {
       [Symbol.iterator]:function* (){
           yield 1;
           yield [2,3];
           yield 4;
       }
   }
   [...myIterator]  // [1,2,3,4]
   ```

9. ###### 遍历器对象的 return()，throw()    （ ？？？？？？？？？？ ）

   遍历器对象除了具有`next()`方法，还可以具有`return()`方法和`throw()`方法。如果你自己写遍历器对象生成函数，那么`next()`方法是必须部署的，`return()`方法和`throw()`方法是否部署是可选的。

   `return()`方法的使用场合是，如果`for...of`循环提前退出（通常是因为出错，或者有`break`语句），就会调用`return()`方法。如果一个对象在完成遍历前，需要清理或释放资源，就可以部署`return()`方法。

   ```javascript
   function readLinesSync(file) {
     return {
       [Symbol.iterator]() {
         return {
           next() {
             return { done: false };
           },
           return() {
             file.close();
             return { done: true };
           }
         };
       },
     };
   }
   ```

   上面代码中，函数`readLinesSync`接受一个文件对象作为参数，返回一个遍历器对象，其中除了`next()`方法，还部署了`return()`方法。下面的两种情况，都会触发执行`return()`方法。

   ```javascript
   // 情况一
   for (let line of readLinesSync(fileName)) {
     console.log(line);
     break;
   }
   
   // 情况二
   for (let line of readLinesSync(fileName)) {
     console.log(line);
     throw new Error();
   }
   ```

   上面代码中，情况一输出文件的第一行以后，就会执行`return()`方法，关闭这个文件；情况二会在执行`return()`方法关闭文件之后，再抛出错误。

   注意，`return()`方法必须返回一个对象，这是 Generator 语法决定的。

10. **`for of` 循环 **

    1. `for of `  循环内部调用的是  数据结构的   `Symbol.iterator`

    2. `for of`  可使用范围: 数组 、 set 和 Map 、类似数组的对象（arguments 对象、DOM NodeList 对象）、Generator 对象、字符串。

    3. **`for of`  关于 数组**

       1. 数组的 `foEach` 不能临时中断

       2. 数组的 `  in` 遍历数组的键名（索引）

          ```js
          let arr = [3,5,7]
          arr.foo = 'demo'
          for(let i in arr){
              console.log(i)
              // 0
              // 1
              // 2
              // foo
          }
          for(let j of arr){
              console.log(j)
              // 3
              // 5
              // 7
          }
          ```

       3. `for of`  相比较与 其他 数组遍历方法的优点

          1. 对于 `forEach` 。`forEach  `不能使用  `continue`  `return`  `break` ;`for of`  可以
          2. 对于 `for in` 。 循环键名，也会循环  手动添加在 数据结构上的属性。

    4. 调用方法返回  遍历器对象,( 有如下方法 )

       1. `entries()`     返回键值对
       2. `keys()`           返回键名
       3. `values()`       返回键值