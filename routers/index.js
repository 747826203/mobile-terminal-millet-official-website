const express = require('express')
const url = require('url')
const router = express.Router()
router.get('/', function(req, res){
    res.render('index')

})
router.get('/view', function(req, res){//url 变为 /view.... 时出发回调函数
    let srcArr= url.parse(req.url).search.split('id=');
    //url.parse()方法 将一个URL字符串转换成对象并返回，search是这个对象的一个属性
    //split() 方法用于把一个字符串分割成字符串数组。
    let len = srcArr.length;
    console.log(srcArr[len-1])
    res.render('view',{
        src:srcArr[len-1]//传递参数给 view.ejs
    })
})
router.get('/cart', function(req, res){//url 变为/cart时触发回调函数
    res.render('cart')
})
router.get('/signin', function(req, res){
    res.render('signin')
})
router.get('/signup', function(req, res){
    res.render('signup')
})
router.get('/user',function(req,res){
  res.render('user')
})
module.exports = router;
