const path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');//导入生成html文件的插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin") //独立打包css文件插件

//向外暴露一个配置对象，commonjs规范（因为webpack是基于node构建）
//webpack默认只能打包处理.js后缀的文件，像.jpg .vue等文件无法主动处理，所以需要配置第三方loader
module.exports = {
    mode: 'development', //development  production ( 生产环境会将代码压缩 )
    //在webpack4中有一大特性是约定大于配置，默认打包入口路径是'src/index.js'，打包输出路径是'dist/main.js'
    entry: path.resolve(__dirname, 'src/Root.jsx'),

    output: {
        path: __dirname + "/build",
        filename: "bundle.js",
    },
    //解析配置，简化引入文件书写
    resolve:{
    // 解析模块请求的选项
    // （不适用于对 loader 解析）
        // 使用的扩展名
        extensions:['*', '.js','.jsx'],//自动解析的后缀名
        alias:{
            // 模块别名列表
            $Static:path.resolve(__dirname,'src/static/'),
            $Pubilc:path.resolve(__dirname,'src/public/'),
            $Containers:path.resolve(__dirname,'src/containers/'),
            $Components:path.resolve(__dirname,'src/components/'),
        }
    },

    plugins: [
        //模板插件
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.tmpl.html'),//模板文件
            filename: 'index.html'//生成文件名
        }),
        new MiniCssExtractPlugin({//选项与htmlPlugin类似
            filename: "index.css"
        }),
        new webpack.ProvidePlugin({
            $:"jquery",
            jQuery:"jquery",
            "window.jQuery":"jquery"
        }),
        new webpack.optimize.SplitChunksPlugin({
            chunks: "all",
            minSize: 20000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true
        }),
        
    ],

    module: {//第三方loader
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/ // 在使用babel-loader时候一定要加上exclude,排除node_modules文件夹 
            },
            {   //css/less打包
                test: /\.(css|less)$/,
                include: [
                    path.resolve(__dirname, "src")
                ],
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
                /*Loader必须严格按照这个顺序，不然会报错。解析顺序是从右到左*/
                use: [
                    'css-hot-loader',
                    MiniCssExtractPlugin.loader,    //style-loader
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                require("autoprefixer"), /*在这里添加*/
                                require('postcss-flexbugs-fixes'),
                            ]
                        }
                    },
                    {
                        loader: "less-loader",
                        options: {
                            javascriptEnabled: true     //less-loader 4以上版本需要设置此项
                        }
                    }
                ]
            },
            {   //防止antd冲突的配置
                test: /\.css$/,
                exclude: /(src)/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [{
                        loader:'url-loader',
                        options:{ // 这里的options选项参数可以定义多大的图片转换为base64
                            name: '[name].[ext]',
                            limit: 50000, // 表示小于10kb的图片转为base64,大于50kb的是路径，因为如果转为base64,那么会占据js大小，使得加载js变慢
                            outputPath: 'images' //定义输出的图片文件夹
                        }
                    },
                    {   //压缩图片要在file-loader之后使用
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true
                        }
                    }
                ]
            },
            {
                test: /\.(htm|html)$/i,     //为了支持html里或img标签直接使用src属性插入图片，比如模板页标题图标就无法使用require
                use: ['html-withimg-loader']
            }

        ]
    },

    devServer: {
        disableHostCheck: true
    },

    devtool: "source-map"//配置映射，打包后不方便调试，配置此项后可以看到源码，方便调试
    //     eval： 生成代码 每个模块都被eval执行，并且存在@sourceURL
    // cheap-eval-source-map： 转换代码（行内） 每个模块被eval执行，并且sourcemap作为eval的一个dataurl
    // cheap-module-eval-source-map： 原始代码（只有行内） 同样道理，但是更高的质量和更低的性能
    // eval-source-map： 原始代码 同样道理，但是最高的质量和最低的性能
    // cheap-source-map： 转换代码（行内） 生成的sourcemap没有列映射，从loaders生成的sourcemap没有被使用
    // cheap-module-source-map： 原始代码（只有行内） 与上面一样除了每行特点的从loader中进行映射
    // source-map： 原始代码 最好的sourcemap质量有完整的结果，但是会很慢
}
