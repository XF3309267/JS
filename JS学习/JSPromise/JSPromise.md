# JS Promise

## 1. 创建  Promise  对象

1. `let pro = new Promise( test )`

2. ```js
   // 上述的 test 是一个函数,该函数  一般 都要有  两个方法 作为参数
   function test(resolve,reject){
       // test 函数体内 有 异步操作
       // 而 异步操作就必须有回调函数来获取  异步操作的结果
       //  resolve  一般是用来  异步操作成功时，调用的
       //  reject   				失败时， 调用的
       
   }
   ```

   