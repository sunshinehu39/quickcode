import Vue from 'vue'
import InfoComponent from './info.vue'

// 基于封装好的组件info.vue 用Vue.extend()创建一个Vue子类构造器
const Info = Vue.extend(InfoComponent)

// 为构造器Info自定义 install 方法（install可以自定义为任意方法名）
Info.install = function(options, type) {
    // 倘若直接传入字符串或数字，则重新封装为对象，并将传入的内容放入content属性
    //  若传入两个参数，则第二个参数用于指定消息类型，默认为成功消息
    if (typeof options === 'string' || typeof options === 'number') {
        options = {
            content: options,
            type: type ? type : 'ok'
        }
    }

    // 根据构造器Info创建一个实例instance，并在内存中渲染
    // $mount()不带参数，会将组件在内存中渲染
    // $mount()带参数，会将组件渲染后，替换掉参数对应的元素，如$mount('#app')
    let instance = new Info({
        data: options
    }).$mount()

    // 将实例instance手动挂载到body标签的末尾
    document.body.appendChild(instance.$el)

    // 待所有DOM节点加载完成后，将实例instance的show变量设置为true，确保组件能正常显示
    Vue.nextTick(() => {
        instance.show = true
    })
}

// 对外输出构造器Info
export default Info