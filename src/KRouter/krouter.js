let Vue
class KRouter{
    static install(_Vue){
        Vue=_Vue;
        Vue.mixin({
            beforeCreate() {
                if(this.$options.router){
                    console.log(this.$options);
                    Vue.prototype.$Krouter = this.$options.router;
                    this.$options.router.init()
                }
            },
        })
    }
    constructor(options){
        this.$options = options
        this.routeMap={}
        this.app=new Vue({
            data:{
                current:'/'
            }
        })
    }
    //初始化
    init=()=>{
        //1.启动监听事件
        this.bindEvents()
        //2。处理路由表
        this.createRouteMap()
        //3.初始化组件
        this.initComponent()
    }
    initComponent(){
        console.log('初始化组件');
        
        Vue.component('router-view',{
            render:h=>{
                const component = this.routeMap[this.app.current].component
                return h(component)
            }
        })
        Vue.component('router-link',{
            props:{
                to:String
            },
            render(h){
                return h('a',{
                    attrs:{
                        href:'#'+this.to
                    },
                },
                [this.$slots.default]
                )
            }
        })
    }
    createRouteMap=()=>{
        
        console.log(this.$options.routes);
        
        this.$options.routes.forEach(item=>{
            this.routeMap[item.path]=item
        })
    }
    bindEvents(){
        console.log('绑定事件');
        
        window.addEventListener('hashchange',this.onHashChange.bind(this))
        window.addEventListener('load',this.onHashChange.bind(this))
    }
    onHashChange(e){
        console.log(e+"----hash变了");   
        let hash = window.location.hash.slice(1)||'/';
        this.app.current = hash;

    }
}
export default KRouter