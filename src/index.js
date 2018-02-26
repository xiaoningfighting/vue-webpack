//入口文件
import Vue from  'vue'//引用类库
import App from './app.vue'
import './assets/styles/test.css'
import './assets/styles/test-stylus.styl'
import './assets/images/bg1.jpg'
const root=document.createElement('div')
document.body.appendChild(root)
new Vue({
	render:(h)=>h(App)
}).$mount(root) //挂载
