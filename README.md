Grunt
=====

使用[Grunt](http://gruntjs.com)构建kissy项目

## 什么是Grunt？

建立在Node.js之上，Grunt是一个基于命令行的工具，用于加快工作流程，减少用于生前之前所做的准备。它可以结速工作与自动编译一同进行。基本上，你可以使用Grunt的大部分任务来帮你处理你认为乏味的，通常需要手工配置和运行的工作。

## Grunt能干些什么？

按任务目标大致可分为四类：

*  文件操作型：比如合并、压缩js和css文件等（包括）
*  预编译型：比如编译less、sass、coffeescript等
*  类库项目构建型：比如 angular、ember、backbone等（这种推荐使用yeoman）
*  工程质量保障型：比如jshint、jasmine、mocha等

除此之外还有像 watch （监听文件改变，自动触发构建）等功能。

## 安装Grunt

grunt依赖[NodeJs](http://nodejs.org)和[npm](https://npmjs.org)，请确保你的计算机已经安装该环境。
特别留意下grunt是有二个版本：服务器端版本（grunt）和客户端版本（grunt-cli），我们需要安装的是客户端版本。

```html
npm install -g grunt-cli
```

如果你不慎安装了服务器端版，请现予以卸载：

```html
npm uninstall -g grunt
```
为了确保Grunt已经正确安装，你可以运行下面的命令：

```html
grunt --version
```

## 创建package.json文件

JSON文件使我们能跟踪和安装我们所有开发所依赖的信息。然后，对项目工作的人会拥有当前开发依赖性，最终有助于保持同步的开发环境。
在项目的根目录下创建package.json文件。package.json用于配置你需要拉取的grunt插件信息:

```javascript
{
	"name":"grunt", // 项目名称
	"version":"0.1.0", // 项目版本
	"author":"dawncc", // 项目依赖
	"devDependencies":{
		"grunt-kmc":"*", //kmc插件
		"grunt-contrib-uglify": "~0.2.0" 
	}
}
```
其中devDependencies字段，定义你要拉取的依赖模块，上面的代码，拉取grunt-contrib-uglify插件（用于压缩js），字段的值~0.2.0，指明需要模块的版本号，“~”是至少的意思。同时拉取grunt-kmc的所有插件。

在工程根目录启动命令行工具，运行：

```html
npm install
```

通过package.json依赖关系将其中定义的插件安装在node_modules目录中。

这个时候，你的项目的根目录下会新增加一个node_modules的目录。

## 创建Gruntfile.js文件

Gruntfile.js本质上是一个函数，而且他的参数是grunt。它是用于配置或者定义Grunt任务和加载Grunt插件的。

在工程根目录下放个Gruntfile.js，文件内容如下：

```javascript
module.exports = function(grunt) {
   
    // 构建任务配置
    grunt.initConfig({
        //读取package.json的内容，形成个json数据
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            //文件头部输出信息
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            //具体任务配置
           <!--  build: {
                //源文件
                src: 'src/index.js',
                //目标文件
                dest: 'build/index-min.js'
            } -->
            build: {
                files: {
                    'build/index-min.js': ['src/index.js']
                }
            },
        }
    });
    
    // 加载指定插件任务
    grunt.loadNpmTasks('grunt-contrib-uglify');
    
    // 默认执行的任务  不定义默认任务会出现 >Task "default" not found. Use --force to continue. 
    grunt.registerTask('default', ['uglify']);
};
```

在根目录下执行`grunt`命令：
“Done,without error”，说明已经构建成功，且没有错误，你可以看到grunt是非常迅速的！
来看下目录，你就会看到build下出现了hello-grunt-min.js，文件内容如下：

```javascript
/*! demo 2013-07-13 */
!function(a){var b="<p>hello grunt!</p>";a("body").append(b)}(jQuery);
```

已经使用uglify压缩成功！

