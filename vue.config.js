   devServer: {
        proxy: {
            '/api': {//代理api
                target: "http://35.236.184.115",// 代理接口(注意只要域名就够了)
                changeOrigin: true,//是否跨域
                ws: true, // proxy websockets
                pathRewrite: {//重写路径
                    "^/api": ''//代理路径
                }
            }
        }
    }