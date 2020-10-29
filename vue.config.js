const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/autoops/'
        : '/'
    ,
    outputDir: "dist",
    lintOnSave: false,//eslint代码检测
    assetsDir: "static",//放静态资源的目录
    devServer: {
        open: false,//设置自动打开
        host: "0.0.0.0",
        port: 8083,
        hot: true,//hot配置是否启用模块的热替换功能 实时刷新
        proxy: {
            "/api": {
                target: "httP://127.0.0.1:8083/",
                ws: true,
                secure: false,//如果是http接口，需要配置此参数
                changeOrigin: true,
                pathRewrite: {
                    "^api/": ""
                }
            }
        }
    },
    //配置webpack选项
    configureWebpack: config => {
        if (process.env.NODE_ENV === "development") {
            config.devtool = 'source-map'
        } else {
            config.plugins.push(new CompressionWebpackPlugin({
                algorithm: 'gzip',
                test: new RegExp(`\\.(${productionGzipExtensions.join('|')})$`),
                threshold: 10240,
                minRatio: 0.8,
            }));
        }
        config.module.rules.push(
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader'
                    },
                    {
                        loader: 'iview-loader',
                        options: {
                            prefix: true
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('node_modules/webpack-dev-server/client')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                }
            },
            {
                test: /\.s[a|c]ss$/,
                loader: 'style!css!sass'
            },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader",
            }
        )
    },
    chainWebpack: config => {
        config.resolve.alias
            .set("@", resolve("src"))
            .set("views", resolve("src/views"))
            .set("assets", resolve("src/assets"))
            .set("components", resolve("src/components"))
    },
    css: {
        //生产环境下是 true，开发环境下是 false
        //是否将组件中的 CSS 提取至一个独立的 CSS 文件中 
        extract: true,
        sourceMap: false,
        loaderOptions: {
            css: {},
            postcss: {}
        },
        modules: false
    }
}