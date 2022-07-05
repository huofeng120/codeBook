
// 导入express模块
const express = require('express')
// 调用express()
const app = express()

// 给app挂载路由 接收客户端发送的get请求 处理
app.get('/jsonp', (req, res) => {
    // 接收客户端发送的过来的查询字符串  得到回调函数的名字
    const callback = req.query.callback
    // 或者使用解构对象
    // const {callback}=req.query
    const data = {
        uname: 'ls',
        age: 20
    }
    // res.send(`fn(参数)`)  参数为json字符串格式

    // 返回客户端一个函数调用的形式 接收跨域接口响应回的数据
    res.send(`${callback}(${JSON.stringify(data)})`)
})

app.listen(80, () => {
    console.log('http://127.0.0.1');
})