# ES6   set  、 WeakSet

## 1.set 基本概念

1. set 是一种数据结构（类似于 数组 ），Set 结构不会添加重复的值。Set 也是一个构造函数，用于生成  Set 数据结构。
2. Set 可以接受参数，快速创建具有数据的  Set 结构对象。参数： 具有 iterable 接口的数据结构 （如： 数组）
3. **Set  内部去除 重复的值，使用  `===`, 但是 Set 内部`NaN === NaN => true`** 
4. **当然 对于 对象 比较的当然是  指针地址**

## 2. set 实例的 属性 和 方法

- **属性**

  - `Set.prototype.constructor`：构造函数，默认就是`Set`函数。
  - `Set.prototype.size`：返回`Set`实例的成员总数。

- **方法**

  - `Set.prototype.add(value)`：添加某个值，返回 Set 结构本身。
  - `Set.prototype.delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功。
  - `Set.prototype.has(value)`：返回一个布尔值，表示该值是否为`Set`的成员。
  - `Set.prototype.clear()`：清除所有成员，没有返回值。

- **遍历方法**

  - `Set.prototype.keys()`：返回键名的遍历器

  - `Set.prototype.values()`：返回键值的遍历器

  - `Set.prototype.entries()`：返回键值对的遍历器

  - `Set.prototype.forEach()`：使用回调函数遍历每个成员

  - 使用 `...` 扩展运算符

  - **遍历时，得注意：Set 结构 只有键值，没有键名**

  - **别样的遍历方法：**

    - ```js
      //  使用  扩展运算符，将 set 结构 转为 数组
      //  然后使用  数组的方法进行遍历 加工
      ```

- **遍历的应用**

  - 使用 Set 实现 数组的 并集、交集、差集

    ```js
    let a = new Set([1, 2, 3]);
    let b = new Set([4, 3, 2]);
    
    // 并集
    let union = new Set([...a, ...b]);
    // Set {1, 2, 3, 4}
    
    // 交集
    let intersect = new Set([...a].filter(x => b.has(x)));
    // set {2, 3}
    
    // （a 相对于 b 的）差集
    let difference = new Set([...a].filter(x => !b.has(x)));
    // Set {1}
    ```

  ## 2.  weakSet

  1. weakSet 成员只能是对象，而不是其他类型的值

     ```js
     const ws = new WeakSet();
     ws.add(1)
     // TypeError: Invalid value used in weak set
     ws.add(Symbol())
     // TypeError: invalid value used in weak set
     
     // weakSet new 初始化 WeakSet数据结构 时,接受参数 
     //	参数：一个具有 Iterator 接口的数据结构， 且 成员类型是对象
     // let weakSetObj = new weakSet()
     
     ```

  2. **weakSet    属性  和 方法**

     - **WeakSet.prototype.add(value)**：向 WeakSet 实例添加一个新成员。
     - **WeakSet.prototype.delete(value)**：清除 WeakSet 实例的指定成员。
     - **WeakSet.prototype.has(value)**：返回一个布尔值，表示某个值是否在

  3. **WeakSet  没有  `size` 属性，没有  `forEach`**

     -  WeakSet 不能遍历，是因为成员都是弱引用，随时可能消失，遍历机制无法保证成员的存在，很可能刚刚遍历结束，成员就取不到了。WeakSet 的一个用处，是储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏。 

  4. **总结：**

     -  WeakSet 适合临时存放一组对象，以及存放跟对象绑定的信息。只要这些对象在外部消失，它在 WeakSet 里面的引用就会自动消失、
     - **准确的说， WeakSet  用以存放 一组指针地址 **，且仅仅只是存放 、删除 和 判断WeakSet 里面是否有该地址而已。

  ## 3. Map

  1. **基本概念**

     - 本质上是  键值对的集合，且是  “值 - 值 ”

     - Object 的键名只能是  字符串  的类型，且是 “字符串 - 值 ” 

     - ```js
       // 对于 Map new  初始化，所需要的参数
       // 参数要求：任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构（详见《Iterator》一章）都可以当作Map构造函数的参数
       
       // 双元素的数组 的 数据结构，第一个元素 Map 元素的键名，第二个元素 Map 元素的键值
       
       const map = new Map([
         ['name', '张三'],
         ['title', 'Author']
       ]);
       
       map.size // 2
       map.has('name') // true
       map.get('name') // "张三"
       map.has('title') // true
       map.get('title') // "Author"
       
       ```

     - **因为 Map 的数据结构是  “值 - 值 ”，所以再 取值时，必须注意  键名是否为对象（ 键名为对象，意味着 键名是  “指针地址” ） **

  2. **属性 和 方法**

     1. **size**
     2.  **Map.prototype.set(key, value)** 
     3.  **Map.prototype.get(key)** 
     4.  **Map.prototype.has(key)** 
     5.  **Map.prototype.delete(key)** 
     6.  **Map.prototype.clear()** 

  3. **遍历方法**

     1. `Map.prototype.keys()`：返回键名的遍历器。
     2. `Map.prototype.values()`：返回键值的遍历器。
     3. `Map.prototype.entries()`：返回所有成员的遍历器。
     4. `Map.prototype.forEach()`：遍历 Map 的所有成员。

  4. **Map 结构  与  数组结构互转**

     1. **Map  转  数组**   ( 转为数组，就可以使用 数组的一些遍历 截取方法 )

        ```js
        const map = new Map([
          [1, 'one'],
          [2, 'two'],
          [3, 'three'],
        ]);
        [...map.keys()]
        // [1, 2, 3]
        [...map.values()]
        // ['one', 'two', 'three']
        [...map.entries()]
        // [[1,'one'], [2, 'two'], [3, 'three']]
        [...map]
        // [[1,'one'], [2, 'two'], [3, 'three']]
        ```

     2. **forEach  方法可接受 第二个参数**

        ```js
        // 用来绑定 this
        const reporter = {
          report: function(key, value) {
            console.log("Key: %s, Value: %s", key, value);
          }
        };
        
        map.forEach(function(value, key, map) {
          this.report(key, value);
        }, reporter);
        ```

     3. **数组  转 Map**

        -  数组  转 Map  ，就必须按照  Map  new 实例时，所需要参数的形式代入

          ```js
          new Map([
            [true, 7],
            [{foo: 3}, ['abc']]
          ])
          // Map {
          //   true => 7,
          //   Object {foo: 3} => ['abc']
          // }
          ```

  5. **Map   和  对象的互转**

     - **Map 转为 对象**

       ```js
       function strMapToObj(strMap) {
           //  该方法 获得一个 Map 结构实例
           //  因为  Map 也是具有 Interator 结构
         let obj = Object.create(null);
         for (let [k,v] of strMap) {
           obj[k] = v;
         }
         return obj;
       }
       
       const myMap = new Map()
         .set('yes', true)
         .set('no', false);
       strMapToObj(myMap)
       // { yes: true, no: false }
       // 如果有非字符串的键名，那么这个键名会被转成字符串，再作为对象的键名。
       ```

     - **对象  转 Map**

       ```js
       // ------------------
       let obj = {"a":1, "b":2};
       // Object.entries(obj)  返回 键值对 数组 [['a':1],['b':2]]
       let map = new Map(Object.entries(obj));
       
       // ------------------
       function objToStrMap(obj) {
         let strMap = new Map();
         for (let k of Object.keys(obj)) {
           strMap.set(k, obj[k]);
         }
         return strMap;
       }
       objToStrMap({yes: true, no: false})
       // Map {"yes" => true, "no" => false}
       ```

  6. **JSON  对象   与  Map  的互转**

     - JSON  对象   与  Map  的互转,主要是  利用   对象作为  中间介

  ## WeakMap

  ### 含义 [§](https://es6.ruanyifeng.com/#docs/set-map#含义) [⇧](https://es6.ruanyifeng.com/#docs/set-map)

  `WeakMap`结构与`Map`结构类似，也是用于生成键值对的集合。

  ```javascript
  // WeakMap 可以使用 set 方法添加成员
  const wm1 = new WeakMap();
  const key = {foo: 1};
  wm1.set(key, 2);
  wm1.get(key) // 2
  
  // WeakMap 也可以接受一个数组，
  // 作为构造函数的参数
  const k1 = [1, 2, 3];
  const k2 = [4, 5, 6];
  const wm2 = new WeakMap([[k1, 'foo'], [k2, 'bar']]);
  wm2.get(k2) // "bar"
  ```

  `WeakMap`与`Map`的区别有两点。

  首先，`WeakMap`只接受对象作为键名（`null`除外），不接受其他类型的值作为键名。

  ```javascript
  const map = new WeakMap();
  map.set(1, 2)
  // TypeError: 1 is not an object!
  map.set(Symbol(), 2)
  // TypeError: Invalid value used as weak map key
  map.set(null, 2)
  // TypeError: Invalid value used as weak map key
  ```

  上面代码中，如果将数值`1`和`Symbol`值作为 WeakMap 的键名，都会报错。

  其次，`WeakMap`的键名所指向的对象，不计入垃圾回收机制。

  `WeakMap`的设计目的在于，有时我们想在某个对象上面存放一些数据，但是这会形成对于这个对象的引用。请看下面的例子。

  ```javascript
  const e1 = document.getElementById('foo');
  const e2 = document.getElementById('bar');
  const arr = [
    [e1, 'foo 元素'],
    [e2, 'bar 元素'],
  ];
  ```

  上面代码中，`e1`和`e2`是两个对象，我们通过`arr`数组对这两个对象添加一些文字说明。这就形成了`arr`对`e1`和`e2`的引用。

  一旦不再需要这两个对象，我们就必须手动删除这个引用，否则垃圾回收机制就不会释放`e1`和`e2`占用的内存。

  ```javascript
  // 不需要 e1 和 e2 的时候
  // 必须手动删除引用
  arr [0] = null;
  arr [1] = null;
  ```

  上面这样的写法显然很不方便。一旦忘了写，就会造成内存泄露。

  WeakMap 就是为了解决这个问题而诞生的，它的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内。因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。也就是说，一旦不再需要，WeakMap 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。

  基本上，如果你要往对象上添加数据，又不想干扰垃圾回收机制，就可以使用 WeakMap。一个典型应用场景是，在网页的 DOM 元素上添加数据，就可以使用`WeakMap`结构。当该 DOM 元素被清除，其所对应的`WeakMap`记录就会自动被移除。

  ```javascript
  const wm = new WeakMap();
  
  const element = document.getElementById('example');
  
  wm.set(element, 'some information');
  wm.get(element) // "some information"
  ```

  上面代码中，先新建一个 Weakmap 实例。然后，将一个 DOM 节点作为键名存入该实例，并将一些附加信息作为键值，一起存放在 WeakMap 里面。这时，WeakMap 里面对`element`的引用就是弱引用，不会被计入垃圾回收机制。

  也就是说，上面的 DOM 节点对象的引用计数是`1`，而不是`2`。这时，一旦消除对该节点的引用，它占用的内存就会被垃圾回收机制释放。Weakmap 保存的这个键值对，也会自动消失。

  总之，`WeakMap`的专用场合就是，它的键所对应的对象，可能会在将来消失。`WeakMap`结构有助于防止内存泄漏。

  注意，WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。

  ```javascript
  const wm = new WeakMap();
  let key = {};
  let obj = {foo: 1};
  
  wm.set(key, obj);
  obj = null;
  wm.get(key)
  // Object {foo: 1}
  ```

  上面代码中，键值`obj`是正常引用。所以，即使在 WeakMap 外部消除了`obj`的引用，WeakMap 内部的引用依然存在。

  ### WeakMap 的语法

  WeakMap 与 Map 在 API 上的区别主要是两个，一是没有遍历操作（即没有`keys()`、`values()`和`entries()`方法），也没有`size`属性。因为没有办法列出所有键名，某个键名是否存在完全不可预测，跟垃圾回收机制是否运行相关。这一刻可以取到键名，下一刻垃圾回收机制突然运行了，这个键名就没了，为了防止出现不确定性，就统一规定不能取到键名。二是无法清空，即不支持`clear`方法。因此，`WeakMap`只有四个方法可用：`get()`、`set()`、`has()`、`delete()`。

  ```javascript
  const wm = new WeakMap();
  
  // size、forEach、clear 方法都不存在
  wm.size // undefined
  wm.forEach // undefined
  wm.clear // undefined
  ```

  ### WeakMap 的示例

  WeakMap 的例子很难演示，因为无法观察它里面的引用会自动消失。此时，其他引用都解除了，已经没有引用指向 WeakMap 的键名了，导致无法证实那个键名是不是存在。

  贺师俊老师[提示](https://github.com/ruanyf/es6tutorial/issues/362#issuecomment-292109104)，如果引用所指向的值占用特别多的内存，就可以通过 Node 的`process.memoryUsage`方法看出来。根据这个思路，网友[vtxf](https://github.com/ruanyf/es6tutorial/issues/362#issuecomment-292451925)补充了下面的例子。

  首先，打开 Node 命令行。

  ```bash
  $ node --expose-gc
  ```

  上面代码中，`--expose-gc`参数表示允许手动执行垃圾回收机制。

  然后，执行下面的代码。

  ```javascript
  // 手动执行一次垃圾回收，保证获取的内存使用状态准确
  > global.gc();
  undefined
  
  // 查看内存占用的初始状态，heapUsed 为 4M 左右
  > process.memoryUsage();
  { rss: 21106688,
    heapTotal: 7376896,
    heapUsed: 4153936,
    external: 9059 }
  
  > let wm = new WeakMap();
  undefined
  
  // 新建一个变量 key，指向一个 5*1024*1024 的数组
  > let key = new Array(5 * 1024 * 1024);
  undefined
  
  // 设置 WeakMap 实例的键名，也指向 key 数组
  // 这时，key 数组实际被引用了两次，
  // 变量 key 引用一次，WeakMap 的键名引用了第二次
  // 但是，WeakMap 是弱引用，对于引擎来说，引用计数还是1
  > wm.set(key, 1);
  WeakMap {}
  
  > global.gc();
  undefined
  
  // 这时内存占用 heapUsed 增加到 45M 了
  > process.memoryUsage();
  { rss: 67538944,
    heapTotal: 7376896,
    heapUsed: 45782816,
    external: 8945 }
  
  // 清除变量 key 对数组的引用，
  // 但没有手动清除 WeakMap 实例的键名对数组的引用
  > key = null;
  null
  
  // 再次执行垃圾回收
  > global.gc();
  undefined
  
  // 内存占用 heapUsed 变回 4M 左右，
  // 可以看到 WeakMap 的键名引用没有阻止 gc 对内存的回收
  > process.memoryUsage();
  { rss: 20639744,
    heapTotal: 8425472,
    heapUsed: 3979792,
    external: 8956 }
  ```

  上面代码中，只要外部的引用消失，WeakMap 内部的引用，就会自动被垃圾回收清除。由此可见，有了 WeakMap 的帮助，解决内存泄漏就会简单很多。

  Chrome 浏览器的 Dev Tools 的 Memory 面板，有一个垃圾桶的按钮，可以强制垃圾回收（garbage collect）。这个按钮也能用来观察 WeakMap 里面的引用是否消失。

  ### WeakMap 的用途

  前文说过，WeakMap 应用的典型场合就是 DOM 节点作为键名。下面是一个例子。

  ```javascript
  let myWeakmap = new WeakMap();
  
  myWeakmap.set(
    document.getElementById('logo'),
    {timesClicked: 0})
  ;
  
  document.getElementById('logo').addEventListener('click', function() {
    let logoData = myWeakmap.get(document.getElementById('logo'));
    logoData.timesClicked++;
  }, false);
  ```

  上面代码中，`document.getElementById('logo')`是一个 DOM 节点，每当发生`click`事件，就更新一下状态。我们将这个状态作为键值放在 WeakMap 里，对应的键名就是这个节点对象。一旦这个 DOM 节点删除，该状态就会自动消失，不存在内存泄漏风险。

  WeakMap 的另一个用处是部署私有属性。

  ```javascript
  const _counter = new WeakMap();
  const _action = new WeakMap();
  
  class Countdown {
    constructor(counter, action) {
      _counter.set(this, counter);
      _action.set(this, action);
    }
    dec() {
      let counter = _counter.get(this);
      if (counter < 1) return;
      counter--;
      _counter.set(this, counter);
      if (counter === 0) {
        _action.get(this)();
      }
    }
  }
  
  const c = new Countdown(2, () => console.log('DONE'));
  
  c.dec()
  c.dec()
  // DONE
  ```

  上面代码中，`Countdown`类的两个内部属性`_counter`和`_action`，是实例的弱引用，所以如果删除实例，它们也就随之消失，不会造成内存泄漏。

