//created by wangziweng
在路由这个对象里，主要组成为以下三部分

1. 静态方法install进行混入处理。将路由对象挂载到各个组件。
2. 构造方法constructor进行路由配置获取，初始化路由对象，创建响应式数据current。
3. 实例方法init()进行初始化操作。
   - 监听hashchange事件
   - 处理路由表
   - 初始化组件 //router-view 与 router-link
   - 生命周期路由守卫

路由的流程可以简单理解为
router-link去改变url值-》触发hashchange事件-》拿到最新url赋值到响应式式数据current里-》响应式数据改变触发router-view的渲染watcher重新执行
