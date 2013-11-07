module.exports = function(grunt) {

    // 构建任务配置
    grunt.initConfig({
        //读取package.json的内容，形成个json数据
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            //文件头部输出信息
            options: {
                banner: '/*! <%= pkg.name %> <%= pkg.author %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            //具体任务配置
            // build: {
            //     //源文件
            //     src: 'src/index.js',
            //     //目标文件
            //     dest: 'build/index-min.js'
            // }
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