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
## 安装element-ui
`npm i element-ui -s`
1. 引入（样式）
