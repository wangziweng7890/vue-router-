let Vue
class router {
    //步骤一
    static install(_Vue) {
        Vue = _Vue
        Vue.mixin({
            //在此阶段将router挂载到vue原型上去
            beforeCreate() {
                if (this.$options.router) {
                    Vue.prototype.$router = this.$options.router
                    //然后进行router配置初始化操作
                    this.$options.router.init();
                }
            }
        })
    }
    //步骤二
    constructor(options) {
        //routes的配置
        this.$options = options
        //路由映射，从地址到组件
        this.routeMap = {}
        //使用vue的相应机制，路由切换时，做一些响应
        this.app = new Vue(
            {
                data: {
                    //当前目录。默认根目录
                    current: '/'
                }
            }
        )
    }
    //步骤三
    init() {
        //1.监听hashchange事件
        this.bindEvents()
        //2.处理路由表
        this.createRouteMap()
        //3.初始化组件
        this.initComponent()
    }
    bindEvents() {
        //1.1绑定事件
        window.addEventListener('hashchange', this.onHashChange.bind(this))
        // window.addEventListener('load', this.onHashChange.bind(this))
    }
    onHashChange(e) {
        //1.2hash改变事件
        //获取当前hash值
        let hash = window.location.hash.slice(1) || '/'
        //获取路由对象
        let router = this.routeMap[hash]
        //获取from to 
        let { from, to } = this.getForm(e)

        if (router.beforeEnter) {
            router.beforeEnter(from, to, () => {
                this.app.current = hash
            })
        } else {
            this.app.current = hash
        }
    }
    getForm(e) {
        //1.3
        let from, to
        if (e.newURL) {
            from = e.oldURL.split('#')[1]
            to = e.newURL.split('#')[1]
        } else {
            from = ''
            to = window.location.hash.slice(1) || '/'
        }
        return { from, to }
    }
    push(url) {
        //hash模式直接复制
        window.location.hash = url
        //history模式，使用pushState
    }
    //2.处理路由表
    createRouteMap() {
        this.$options.routes.forEach(item => {
            this.routeMap[item.path] = item
        })
    }
    //3.组件初始化
    initComponent() {
        Vue.component('router-view', {
            render: h => {
                const component = this.routeMap[this.app.current].component
                //使用H新建一个虚拟dom
                return h(component)
            }
        })
        Vue.component('router-link', {
            props: {
                to: String
            },
            render(h) {
                // h == createElement
                // h三个参数，
                // 组件名
                // 参数
                // 子元素
                return h('a', {
                    attrs: {
                        href: '#' + this.to
                    },
                },
                    [this.$slots.default]
                )
            }
        })
    }
}
export default router