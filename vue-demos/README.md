# frontend 前端开发说明

# TODOs
- [ ] 水波图实现
- [ ] 类微信的图片查看，切换，视频播放组件
- [ ] 三角函数和缓动动画的研究
- [ ] canvas translate补充
- [ ] vue 动态组件和异步组件的研究

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
    |-build             # webpack编译配置目录
    |-config            # webapck基本配置目录
    |-dist              # watch,build命令运行后，生成的实际输出文件夹
    |-src               # 源码目录
    |---apis            # apis相关，url配置等
    |---assets          # 静态资源相关
    |-----images        # 项目用到的图片资源
    |-----js            # 项目用到的js文件
    |-----styles        # 样式目录。style.scss等
    |---components      # 组件目录
    |---entry           # 入口js目录, 多模板输入输出时，相应模板的入口js文件定义在这里
    |---pages           # 路由组件目录
    |---mock            # mock相关文件
    |---router          # 前端路由配置
    |---store           # 全局store，EventBus
    |-static            # 静态资源(不进行webpack处理的文件)
    |---js
    |-_assets.php       # 输出模板文件
```

## 2 实际开发
### 1 通过*webpack-dev-server*访问项目。

运行
```bash
$ yarn dev
```
浏览器打开 *http://localhost:8080*即可访问页面

> dev 模式说明：
1. 此模式下，可以快速进行开发调试前端相关(.vue组件，样式等)，接口需要mock。
2. api请求。dev 模式下，不能进行正常的*api*请求，需要mock接口。
frontend项目本身使用[*mockjs*](https://github.com/nuysoft/Mock/tree/refactoring)，来做接口mock.
mock 目录位于： `frontend/src/mock`. 
3. Preload组件中，无法请求`manifest.json`文件, 所以`fetch`参数只能为false。

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
```bash
$ yarn build
```

> watch/build 模式说明：
- apis请求。可以正常通过PHP服务器进行请求。
- 静态资源文件输出在`public/dist/`目录下，包含了`manifest.json`webpack打包生成的资源文件列表，可用于Preload组件预加载.

## 通用
- 组件中引入图片等资源时，可以使用`require('path/to/img')`动态引入，或者使用相对路径引入。
- `src/components/Test.vue`,为参考组件。包含图片引入，全局store访问/获取，接口请求等。实际组件编写时可以参考。
- `src/store/index.js` 全局store说明：`commit(type, data)`方法为修改全局store时唯一可调用的方法，
mutations对应相应数据变更时的方法。
- 添加新的路由时，修改路由配置文件`src/router/index.js`. 相应的路由组件在`pages/`目录下定义。
- `src/assets/js/utils.js`为工具函数集合文件，目前包含了基本的邮箱，手机号验证，数据类型验证。组件中实际需要用到别的方法时
可以在这个文件中添加。并在组件内引入。
- 样式的说明。`src/assets/style/share.scss`为公共样式表，该公共样式表只需要在入口文件如：`src/entry/main.js`中导入一次即可，
此时，当前入口下的所有page共享公共样式表中的所有规则，不需要再page中引入。`src/assets/util.scss`为公共函数/变量/mixin。
当多个page多人同时编写时，为避免提交时冲突，可以拆分成各自的`style`，如：`page1.style`.该文件中需要用到的工具函数/变量/mixin，可以在文件头部使用
`@import "./util.scss"`导入。然后在样式文件中使用即可.
- 部分常用组件已内置，page中可以直接使用。已安装好的组件包括：`GSwiper`,`GSlider`,`InputWrapper`,`PopUp`, `Preload`...
- 新增一个单独入口/Page
  - 1  首先，`src/entry/newEntry.js`目录下，新建入口文件，
  - 2  增加新的路由配置文件,`src/router/newRouter.js`， 
  - 3  `src/page/newPage.vue`新建page组件,
  - 4  `assets/styles/newStyle.scss`新建样式文件并在`newPage.vue`中引入,
  - 5  `frontend/build/webpack.base.conf.js`中，引入新的入口文件
  
      ```
         entry: {
             _viewport: './static/js/flexible.js',
             _vendor: [
               'babel-polyfill',
               'vue'
             ],
             app: './src/entry/main.js',
             newEntry: './src/entry/newEntry.js'
           }
       ```
  - 8.6 修改输出模板文件
  
      ```
        <?php
          return [
            'vendor' => '<%= htmlWebpackPlugin.files.chunks._vendor.entry %>',
        
            'app_css' => '<%= htmlWebpackPlugin.files.chunks.app.css %>',
            'app_js' => '<%= htmlWebpackPlugin.files.chunks.app.entry %>',
        
            'new_css' => '<%= htmlWebpackPlugin.files.chunks.newEntry.css %>',
            'new_js' => '<%= htmlWebpackPlugin.files.chunks.newEntry.entry %>',
          ];
      ```
  - 8.7 `resource/views/new.blade.php` 模板中，引入编译出的`css/js`文件      
      ```
        @extends('layouts.main')
        
        @section('title')
          
        @endsection
        
        @section('styles')
          @parent
          <link rel="stylesheet" href="{{ asset(config('_assets.new_css')) }}">
        @endsection
        
        @section('body')
          <div id="root"></div>
        @endsection
        
        @section('scripts')
          @parent
          <script src="{{ asset(config('_assets.vendor')) }}"></script>
          <script src="{{ asset(config('_assets.new_js')) }}"></script>
        @endsection
      ```
- Preload的一些说明。小文件如小于10kb的图片，后续需要从Preload中读取以便在canvas中操作的图片，Adobe Animate 导出的
序列帧资源，最好放置在`static/`目录下。
