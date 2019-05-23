//created by wangziweng
在路由这个对象里，主要由

1. 静态方法install进行混入处理。将路由对象挂载到各个组件。
2. 构造方法constructor进行路由配置获取
3. 实例方法init()进行初始化操作。
   - 监听hashchange事件
   - 处理路由表
   - 初始化组件 //router-view 与 router-link
   - 生命周期路由守卫
