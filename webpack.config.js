const path= require('path');//webpack的一个基本包 处理绝对路径
const isDev=process.env.NODE_ENV==='development' //process.env 一个对象判断该变量是不是为true(dev-server来启动)
const HTMLPlugin=require('html-webpack-plugin')
const webpack=require('webpack')//引入webpack
const config={
    entry:path.join(__dirname,'src/index.js'),
    output:{
        filename:'bundle.js',
        path:path.join(__dirname,'dist')
    },
    module:{//组件，模块；模数
        // target:'web',
        rules:[
            {
                test:/.vue$/,//加载.vue文件
                loader:'vue-loader'//配置loader
            },
            {
                test:/.css$/,//加载.css文件
                use:[ //换一种声明方式 可填数组
                    'style-loader',//可将css代码写到html页里
                    'css-loader'  //.css文件也可引用
                ]
            },
            {
              test:/\.styl/,//css预编译处理工具
                use:[
                    'style-loader',
                    'css-loader',
                    'stylus-loader'
                ]
            },
            {
                test:/\.(gif|jpg|jpeg|png|svg)$/,//加载图像文件
                use:[
                    {
                        loader:'url-loader',//
                        options:{ //传参数给loader 文件大小小于1024
                            limit:1024,
                            name:'[name]-aaa.[ext]'

                        }
                    }

                ]
            }
        ]
    },
    //调用时 process.env.NODE_ENV=development
    plugins:[ //插件
        new webpack.DefinePlugin({//给webpack编译时 在这里定义 在js里可以引用到他
            'process.env':{
                NODE_ENV:isDev?'"development"':'"production"'
            }
        }),
       new HTMLPlugin() 
    ]
};
if(isDev){
    config.devServer={
        port:9000,//通过localhost来访问
        host:'0.0.0.0',
        overlay:{
            errors:true,
        },
        hot:true,//开发单页应用时 不会让整个页面重新加载 而只会刷新当前组件的数据
        // historyFallback:{}
        // open:true //自动打开页面
    }

}
module.exports=config

