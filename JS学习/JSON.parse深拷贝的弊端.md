# JSON.parse 深拷贝的弊端

1. JSON.parse  实现深拷贝

   ```js
   let obj = {name:'obj1',hobby:['basketball','football']}
   let obj2 = JSON.parse(JSON.stringify(obj))
   // 此时 obj  和  obj2  已经是两个  互不相干的对象了
   
   ```

   - **JSON.stringify**
     - 将对象  序列化
     - 即， 将对象的内容 转换成 字符串的形式 再保存再磁盘上
   - **JSON.parse**
     - 将对象  反序列化
     - 将 被序列化的对象字符串 转换成 对象

2. **JSON.parse   使用的弊端 （ 或者说：无法实现深拷贝的情况 ） **

   1. **深拷贝中有  时间对象 **

      时间对象 被 转换成了 字符串

      ```js
      var test = {
           name: 'a',
           date: [new Date(1536627600000), new Date(1540047600000)],
         };
      
         let b;
         b = JSON.parse(JSON.stringify(test))
      
      ```

   2. **深拷贝中 有  正则对象 、error 对象**

      转换后 变成了 空对象

   3. **深拷贝中有  函数 、undefined**

      转换后  丢失 函数  和 undefined  属性

   4. **NaN 、 Infinity  和 -Infinity  转换后结果变成了  null**

   5. 对象中有 使用 自定义构造函数生成的 对象时，转换后 对象的  constructor 属性丢失，变成 Object