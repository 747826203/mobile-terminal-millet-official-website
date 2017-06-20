const localStorage = require('localStorage')
const express = require('express')
const path = require('path')
const app = express()

const router = require('./routers')

app.set('views', path.join( __dirname+'/views'))// __dirname变量值代表程序运行的根目录。
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))// 将静态文件目录设置为项目根目录+/public
app.use(router)
app.listen(3000)
