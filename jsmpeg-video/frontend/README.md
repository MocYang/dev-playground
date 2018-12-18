# frontend 前端开发说明

## 1 准备
进入*frontend*目录，安装依赖包
```bash
$ cd projectName/frontend
```

```bash
$ yarn install
```
或者
```bash
$ npm install
```

## 2 目录结构说明
```bash
 .
 │  .browserslistrc             # 浏览器兼容配置
 │  .env.watch                  # watch 模式下，编译的环境变量配置
 │  .eslintrc.js                # lint配置文件
 │  .gitignore                  # git，忽略的目录和文件
 │  babel.config.js             # babel配置文件
 │  package.json                # 项目依赖
 │  postcss.config.js
 │  README.md                   # 说明文档
 │  vue.config.js               # 自定义编译的配置，vue cli配置和webpack配置
 │  yarn.lock
 │  _assets.php                 # 模板输入文件，可以是任何非json文件
 │
 ├─public                       # 主要用于dev环境时的静态资源，而不经过webpack处理
 │  │  favicon.ico              # 且public目录下的所有文件都会直接打包到输入目录
 │  │  index.html               # dev时，打开的html文件
 │  │
 │  ├─css
 │  │      normalize.css
 │  │
 │  └─js
 │          flexible.js
 │
 ├─src
 │  │  App.vue                  # 入口组件，一般不需要修改
 │  │  public-path.js           # 配置webpack 的publicPath, 处理全局对象app,添加对应的环境变量，以便组件中直接使用，这个文件最好不要修改，除非你熟悉webpack
 │  ├─assets                    # 静态资源相关
 │  │  │  logo.png
 │  │  ├─fonts                  # 字体资源
 │  │  │      .gitkeep
 │  │  ├─images                 # 图片资源
 │  │  │      .gitkeep
 │  │  │      bigecho-logo.png
 │  │  ├─js                     # js文件
 │  │  │      utils.js
 │  │  ├─media                  # 媒体资源
 │  │  │      .gitkeep
 │  │  └─styles                 # 样式目录。style.scss等
 │  │          share.scss       # 通用的css样式，这个文件最好只写css
 │  │          style.scss       # 组件中引入实际使用的样式
 │  │          util.scss        # scss变量和工具
 │  ├─components                # 组件目录，以下组件已经全局注册，可以直接使用
 │  │  ├─BtnBgm                 # 背景音乐组件
 │  │  │      index.vue
 │  │  ├─GSwiper                # Swiper组件
 │  │  │      GSlide.vue
 │  │  │      GSwiper.vue
 │  │  ├─InputWrapper           # 处理输入框被弹出的软键盘遮挡的组件，只针对Android
 │  │  │      InputWrapper.vue
 │  │  ├─Popup                  # 请求时的loading组件
 │  │  │      index.js
 │  │  │      Popup.vue
 │  │  └─Preload                # 预加载组件
 │  │          Index.vue
 │  ├─entry                     # 入口目录, 多模板输入输出时，相应模板的入口js文件定义在这里
 │  │      main.js
 │  ├─pages                     # 页面vue放在这里
 │  │      Index.vue
 │  ├─routes                    # 路由
 │  │      router.js
 │  └─store                     # 全局可用的event bus，已经全局注册，组件中可以直接使用
 │          EventBus.js
 │          index.js
 └─static                       # 其他的静态资源
     │  .gitkeep
     └─js
             createjs.min.js       
```

## 2 实际开发
### 1 通过*webpack-dev-server*访问项目。

运行
```bash
$ yarn dev
```
浏览器打开 *http://localhost:8080*即可访问页面

> dev 模式说明：
1. 此模式下，可以快速进行开发调试前端相关(.vue组件，样式等)，后台接口没有准备就绪时，需要mock。
2. api请求。dev 模式下，不能进行正常的*api*请求，需要mock接口。
frontend项目本身使用[*mockjs*](https://github.com/nuysoft/Mock/tree/refactoring)，来做接口mock.
3. 目前`mock`没有写入`package.json`，需要用到时，自行安装`yarn add --dev mockjs`

### 2 通过PHP服务器访问项目
1 进入虚拟机所在目录，启动虚拟机
```bash
$ vagrant up
```
浏览器打开*192.168.18.XXX:8088*导航到对应的项目即可。

2 进入项目*frontend*目录

```bash
$ cd projectName/frontend
```

开发时运行：
```bash
$ yarn watch
```

生产环境运行
1. 默认生成```/config/_assts.php```配置文件
```bash
$ yarn build
```
2. 生成静态index.html文件
```bash
$ yarn build:static
```
3. 生成带有sentry功能的输出，默认```/config/_assets.php```
```bash
$ yarn build:sentry
```

### watch/build 模式说明：
- apis请求。可以正常通过PHP服务器进行请求。
- 静态资源文件输出在`public/dist/`或`public/dist.watch`目录下，包含了`manifest.json`webpack打包生成的资源文件列表，可用于Preload组件预加载.
- 1. `yanr watch`命令，静态资源的输出文件为 */config/_assets_watch.php*和，*/public/dist.watch/*，
  2. *watch*模式输出的所有文件都被忽略，不会提交到*git*仓库。
  3. *watch*模式，编译时用到`/frontend/.env.watch`配置文件，内含相关环境变量，`NODE_EVN=development`和`VUE_APP_MODE=watch`,可自行添加需要的环境变量
- ```yarn build```静态资源的输出文件为 */config/_assets.php*和，*/public/dist/*，
*build*模式输出的所有文件都可以直接部署到服务器，会提交到*git*仓库。如果 `yarn build` 之后 */public/dist/* 有文件冲突，直接删掉该目录，重新执行`yarn build`并提交*push*即可。
打包出生产环境可用的静态文件后，如本地需要预览，需修改项目根目录*env*文件`APP_ENV=production```
- 4. ```yarn build:sentry```模式，打包生成的文件和 *yarn build* 一样，会额外启用Sentry监控服务，打包过程中自动上传map文件到Sentry服务器，
需要做的Sentry的配置如下：
    - 1. 到`https://sentry.bigecko.com/sentry/`, 新建一个sentry项目
    - 2. `frontend/.sentryclirc`文件中配置项目名称 ```project=your project name```,其他配置暂不需要修改
    - 3. `frontend/sentry/config.js`文件中修改dsn,dsn的值可以在新建的sentry项目设置中找到，项目主面板`Settings/Client Keys(DSN)`
- 5. ```yarn build:static```, 生成静态站点资源。index.html默认输出到```/public/index.html```, 这个编译模式下，也会生成_assets.php，以便同时支持PHP blade页面


## 通用
- 组件中引入图片等资源时，可以使用`require('path/to/img')`动态引入，或者使用相对路径引入。
- `src/store/index.js` 全局store说明：`commit(type, data)`方法为修改全局store时唯一可调用的方法，
mutations对应相应数据变更时的方法。详细的使用见下。
- 添加新的路由时，修改路由配置文件`src/router/index.js`. 相应的路由组件在`pages/`目录下定义。
- `src/assets/js/utils.js`为工具函数集合文件，目前包含了基本的邮箱，手机号验证，数据类型验证。组件中实际需要用到别的方法时
可以在这个文件中添加。并在组件内引入。
- 样式的说明。`src/assets/style/share.scss`为公共样式表，该公共样式表只需要在入口文件如：`src/entry/main.js`中导入一次即可，
此时，当前入口下的所有page共享公共样式表中的所有规则，不需要再page中引入。`src/assets/util.scss`为公共函数/变量/mixin。
当多个page多人同时编写时，为避免提交时冲突，可以拆分成各自的`scss`文件，如：`page1.scss`.该文件中需要用到的工具函数/变量/mixin，可以在文件头部使用
`@import "./util.scss"`导入。然后在样式文件中使用即可.
- 部分常用组件已内置，page中可以直接使用。已安装好的组件包括：`GSwiper`,`GSlider`,`InputWrapper`,`PopUp`, `Preload`...
- 新增一个单独入口/Page
  - 1  首先，`src/entry/newEntry.js`目录下，新建入口文件，
  - 2  增加新的路由配置文件,`src/router/newRouter.js`， 
  - 3  `src/page/newPage.vue`新建page组件,
  - 4  `assets/styles/newStyle.scss`新建样式文件并在`newPage.vue`中引入,
  - 5  `frontend/vue.config.js`中，引入新的入口文件
  
      ```
         const pages = {
           index: {
             entry: 'src/entry/main.js',
             template: 'public/index.html',
             filename: 'index.html',
           },
           // 另一个单独的入口
           // dev 下访问app：localhost:8080/app.html
           // app: {
           //   entry: 'src/entry/app.js',
           //   template: 'public/app.html',
           //   filename: 'app.html',
           // },
         }
       ```
  - 8.6 修改输出模板文件`frontend/_assets.php`
  
      ```
        <?php
        return [
          'vendors_css' => '<%= htmlWebpackPlugin.files.chunks.vendors.css %>',
          'vendors_js' => '<%= htmlWebpackPlugin.files.chunks.vendors.entry %>',
        
          'index_css' => '<%= htmlWebpackPlugin.files.chunks.index.css %>',
          'index_js' => '<%= htmlWebpackPlugin.files.chunks.index.entry %>',
        
          'app_css' => '<%= htmlWebpackPlugin.files.chunks.app.css %>',
          'app_js' => '<%= htmlWebpackPlugin.files.chunks.app.entry %>'
        ];
      ```
  - 8.7 `resource/views/new.blade.php` 模板中，引入编译出的`css/js`文件      
      ```
        @extends('layouts.main')
        
        @section('styles')
          @parent
          @if (config('app.env') == 'production')
            <link rel="stylesheet" href="{{ asset(config('_assets.vendors_css')) }}">
            <link rel="stylesheet" href="{{ asset(config('_assets.index_css')) }}">
          @else
            <link rel="stylesheet" href="{{ asset(config('_assets_watch.vendors_css')) }}">
            <link rel="stylesheet" href="{{ asset(config('_assets_watch.index_css')) }}">
          @endif
        @endsection
        
        @section('body')
          <div id="app"></div>
        @endsection
        
        @section('scripts')
          @parent
          @if (config('app.env') == 'production')
            <script src="{{ asset(config('_assets.vendors_js')) }}"></script>
            <script src="{{ asset(config('_assets.index_js')) }}"></script>
          @else
            <script src="{{ asset(config('_assets_watch.vendors_js')) }}"></script>
            <script src="{{ asset(config('_assets_watch.index_js')) }}"></script>
          @endif
        @endsection
      ```


---

### EventBus 的使用说明
文件说明
##### 数据和`mutations`存储在`store/index.js`，`store/EventBus.js`不需要修改，这个文件只简单的导入`./index.js`，导出一个`vue`实例

```js
// 全局store
export default {
  // 所有的操作，更新值，获取值，都只能通过commit
  // type 为定义的mutation, data为传给mutation的参数
  commit (type, data) {
    this.mutations[type].call(this.state, data)
  },
  state: {
    name: 'ABC',
    age: 12,
    // 其他的数据。。。
  },
  mutations: {
    setName (name) {
      this.name = name
    },
    setAge (age) {
      this.age = age
    },
    getName () {
      return this.name
    },
    getAge () {
      return this.age
    }
    // 更多的action。。。
  }
}
```
##### 在组件中，通过`this.$Bus`来引用全局的`EventBus`

3. 简单的实例

```js
export  default {
  // .....
  created () {
    // 监听事件的变化
    this.$Bus.$on('topOneChange', (info) => {
      // 做其他事情
    })
  } 
  // ...
}
```

其他组件中触发mutations

```js
export  default {
  // .....
  methods: {
    someFunc () {
      // 更新某个值
      this.$Bus.commit('setName', '比如来自用户输入')
    },
    someFunc2 () {
      // 获取某个值
      const age = this.$Bus.commit('getAge')
    },
    someFunc3 () {
      // 触发某事件
      this.$Bus.$emit('nameChange', '比如来自接口的数据')
    }
  }
  // ...
}
```
