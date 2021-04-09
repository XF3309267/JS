# Vue  组件中 name [作用](https://www.jb51.net/article/140702.htm)

## 1. 在使用了  keep-alive 时

- keep-alive 组件用来 [缓存状态](https://juejin.cn/post/6844903918313406472#heading-0)

  - 被 keep-alive  组件包含的 组件 不会再次初始化，不会重走 生命周期函数

  - 被 keep-alive  组件包含的 组件 ，组件中 会多出 两个生命周期函数

    1. `activated`          组件再次渲染时触发
    2. `deactivated`        组件被销毁时触发

  - keep-alive 接收 3 个属性

    1. `include`       哪些组件会被缓存 （字符串   数组   正则表达式
    2. `exclude`       哪些组件不会被缓存
    3. `max`              缓存组件的个数
    4. **exclude    优先级  高于 include**
    5. include  和  exclude  首先会匹配 被 keep-alive 包含的组件 的  name  字段， 如果 `name` 不可用，则匹配当前组件 `components` 配置中的注册名称。 
    6. **当 缓存组件数 超出限制时，删除第一个缓存的组件**
       - ？？？？？？？？？？？？？？？？？？？？？？

  - ```vue
    <keep-alive>
    	<demo/>
    </keep-alive>
    ```

- 组件被   `keep-alive` 组件包含，然而又不想被 缓存

  1. `keep-alive`  中  exclude ，exclude=" 组件的name "
  2. 组件在  `actived`  中  重新获取一次数据

## 2. 在组件  调用 自身时

- ```vue
  <div>
      <div v-for="(item,index) of list" :key="index">
        <div>
          <span class="item-title-icon"></span>
          {{item.title}}
        </div>
        <div v-if="item.children" >
          <detail-list :list="item.children"></detail-list>
        </div>
      </div>
   </div>
  <script>
  export default {
    name:'DetailList',//递归组件是指组件自身调用自身
    props:{
      list:Array
    }
  }
  </script>
  ```

  