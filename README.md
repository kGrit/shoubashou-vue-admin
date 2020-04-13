# vue-admin
## 安装node，npm
- 使用`node -v`进行判断node是否装好
- 使用`npm -v`进行判断node是否装好
- 使用`npm install -g @vue/cli` 全局安装脚手架，查看版本号`vue -V`注意这个V是大写得
## 创建仓库，查看分支
1. 拷贝项目: `git clone`
2. 创建分支: `git branch`
3. 创建并进入分支：`git checkout -b`
4. 查看状态：`git status`
5. 添加所有文件： `git add .`
6. 提交: `git commit -m "说明"`
7. 拉取: `git pull`
8. 推送: `git push`
9. 查看分支: `git branch  --list`
10. 查看分支（包括远程）：`git branch -a`
## 创建项目
`vue create vue-admin`
## vue.config.js文件(此文件重启才能生效)
### css预设
在css中得loaderOptions 中设置css预设
`prependData: '@import "./src/styles/main.scss";'`
### lintOnSave
选择是否打开eslint
## 安装依赖得时候nodesass安装不成功
解决方法，执行`npm install sass-loader --save-dev`
`npm install node-sass --save-dev`这两条命令

## 文件目录
### styles目录
在main.scss中引入基本样式normalize
`@import './normalize';`
### APP.vue
在app.vue得style中保留#app{}, 使得默认样式渲染
### login目录
> 在view中创建
- login目录得引入两种方式
1. 先引入，再使用
```js
import Login from '../views/Login/login'
 {
    path: '/login',
    name: 'Login',
    component: Login
  }
```
2. 使用得时候直接引入
```js
 {
    path: '/login',
    name: 'Login',
    // 注意箭头函数
    component: () => import('../views/Login/login')
  }
```
- 网页重定向(redirect)
```js
  {
    path: '/',
    redirect: 'login'
  }
```
## 页面渲染
public中得index.html 进入之后去找main.js,挂载了#app,去找APP.vue
## 安装依赖的时候node-sass问题
执行以下两条命令
1. npm install sass-loader --save-dev
2. npm install node-sass --save-dev

## 安装element-ui
`npm i element-ui -S`
1. 在 main.js中引入（样式）
```js
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
```
## login页面
### 设置基础
- 高度又内容撑开时，想要全屏高度，两种方法
1. vh
> vh是指可视区域得高度
```css
.login {
    --themeColor: #344a5f;
    background-color: var(--themeColor);
    height: 100vh;
}
```
2. 100%
设置`height:100%`,由于100%是继承父级高度，所以也要设置#app,body,html高度为100%
### class绑定得方式
1. 最简单得方式
`:class="{'active':isActive}"`
2. 判断是否绑定一个active
`:class="{'active':isActive ==1}"`或者`:class="{'active':isActive === index}"`
3. 绑定并判断多个
- 第一种（用逗号隔开）
`:class="{'active':isActive,'sort':isSort}`
- 第二种（放在data中）
```js
:class ="classObject"
data() {
    return {
        classObject: {active: true,sort:false}
    }
}
```
- 第三种（使用computed属性）
```js
:class ="classObject"
data() {
    return {
        isActive: true,
        isSort: false,
    }
},
computed: {
    classObject: function() {
        return {
            active: this.isActive,
            sort: this.isSort
        }
    }
}
```
### 登录，注册切换
-  第一种方式
1. 点击的时候，将此时的Index传入
2. 利用map函数,遍历data中的值
3. 将index和传入的Index比较的值赋给高亮的值
```js
@click="toggleMenu(i)"
toggleMenu (i) {
      // 遍历每一项（使isCurrent的值为遍历的值）
      // 这里用forEach,map均可
      this.menu.map((el, index) => {
        el.isCurrent = (index === i)
      })
    }
```
- 第二种方式
1. 点击的时候，遍历data中的数据
2. 让每一项都变为false
3. 让点击的项变为true
```js
@click="toggleMenu(item)"
    toggleMenu (item) {
      // 将item传进来
      // 这里用forEach,map均可
      this.menu.forEach(e => {
        // 将所有的都变为false
        e.isCurrent = false
      })
      item.isCurrent = true
    }
```
### 表单
1. 直接复制element-ui中的自定义表单，对样式和校验规则进行修改
2. 在验证码中使用  `<el-row :gutter="10">` ` <el-col :span="15">`调节样式布局，:gutrrer是指中间隔得距离
### 检验
1. 将校验规则封装(utils文件夹中的validate.js)
```js
export function valiUsername (str) {
  // 如果校验规则中有eslint阻止转义的可以添加注释帮助解决
  // eslint-disable-next-line no-useless-escape
  const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
  return reg.test(str)
}
```
2. 使用import导入
 ```js
 // 这里的@需要在vue.config.js中的alis进行配置
 import { valiUsername} from '@/utils/validates'
 ```
### 重复密码校验
1. 只有在注册的时候才会显示重复密码的校验
2. 使用v-show或者v-if完成
` v-show="model === 'register'"`
v-if可以直接提交没有问题
v-show只是将重复密码隐藏了，本身的校验还是存在的，所以要在校验中单独判断
```js
// 这样写就可以直接通过验证，相当于return了，后面不在执行
 if (this.model === 'login') { callback() }
 ```

 ## 封装request 
 > 在utils文件夹中的request文件放封装的axios请求
 1. 安装axios 
 2. 添加请求拦截器和响应拦截器

 ## 测试分支