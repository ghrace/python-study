let express = require('express')
let proxy = require('http-proxy-middleware')
let app = express()

app.use('/api', proxy({
    // 代理跨域目标接口
    target: 'http://www.test1.com',
    changeOrigin: true,

    // 修改响应头信息，实现跨域并允许带cookie
    onProxyRes: function(proxyRes, req, res) {
        res.header('Access-Control-Allow-Origin', 'http://www.test.com')
        res.header('Access-Control-Allow-Credentials', 'true')
    },

    // 修改响应信息中的cookie域名，为false时，表示不修改
    cookieDomainRewrite: 'http://www.test.com'
}))

app.listen(3000)
