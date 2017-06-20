const REG_EXPRESSION = {
    tel: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9]|17[7|8])\d{8}$/,
    pwd: /^[a-zA-Z0-9._]{6,15}$/  //数字字母组成6-15
}
// JavaScript RegExp 对象
// RegExp 对象
// RegExp 对象表示正则表达式，它是对字符串执行模式匹配的强大工具。
//common方法
// 定义正则表达方式的方式有两种，（1）var 变量名 =new RegExp("正则表达式模式")
// （2） var 变量名 = / 正则表达式模式/
let common = {

    show: function (...objs) {
        objs.forEach(obj => {
            obj.style.display = 'block';
        })
    },
    hide: function (...objs) {
        objs.forEach(obj => {
            obj.style.display = 'none';
        })
    }
}


//选择城市
let chooseCity = {
    cancelBtn: document.querySelector('.btn-cancel'),//取消按钮
    countryContainer: document.querySelector('.country-container'),//所有城市
    showCountry: document.querySelector('.icon_cirarr'),//下拉显示城市
    codeResult: document.getElementById('select-cycode-result'),//所选城市
    init: function () {
        this.attachEvent()
    },
    attachEvent: function () {
        this.cancelBtn.addEventListener('click', () => {
            common.hide(this.countryContainer)
        })
        this.showCountry.addEventListener('click', () => {
            common.show(this.countryContainer)
        })
        this.countryContainer.addEventListener('click', (event) => {
            let ele = event.target;
            if (ele.tagName == 'SPAN') {
                // console.log(ele.innerHTML,ele.getAttribute('data-code'))
                this.codeResult.innerHTML = `${ele.innerHTML}(${ele.getAttribute('data-code')})`;
                common.hide(this.countryContainer)
            }
        })

    }
}


//验证注册
let checkSignUp = {
    tel: document.querySelector('input[name="phone"]'),
    pwd: document.querySelector('input[name="pwd"]'),
    telTip: document.querySelector('.telTip'),
    pwdTip: document.querySelector('.pwdTip'),
    submit: document.querySelector('.submit-step'),
    init: function () {
        this.attachEvent();
    },
    checkPhone: function (phoneNum) {
        if (REG_EXPRESSION.tel.test(phoneNum)) {
          // RegExp 对象方法test() 方法用于检测一个字符串是否匹配某个模式.返回true或false
            return true;
        } else {
            return false;
        }

    },
    checkPwd: function (pwd) {
        if (REG_EXPRESSION.pwd.test(pwd)) {
            return true;
        } else {
            return false;
        }

    },
    attachEvent: function () {
        this.tel.addEventListener('input', () => {
            let phoneNum = this.tel.value.trim()
            if (this.checkPhone(phoneNum)) {
                common.hide(this.telTip)
            } else {
                common.show(this.telTip)
            }
        }, false)
        this.pwd.addEventListener('input', () => {
            let pwd = this.pwd.value.trim()
            if (this.checkPwd(pwd)) {
                common.hide(this.pwdTip)
            } else {
                common.show(this.pwdTip)
            }
        }, false)
        this.submit.addEventListener('click', () => {
            let phoneNum = this.tel.value.trim()
            let pwd = this.pwd.value.trim()
            if (this.checkPhone(phoneNum) && this.checkPwd(pwd)) {
                let obj = { phoneNum, pwd }
                localStorage.setItem('userData', JSON.stringify(obj))
                if(window.confirm('注册成功！返回登陆?')){
                    window.location.href='signin'
                }
            }else{
                alert('检查输入');
            }

        }, false)

    }

}



//验证登陆
let checkSignIn = {
    loginButton: document.querySelector('#login-button'),
    showPwdBtn: document.querySelector('.eye'),
    isShowPwd: false,
    user: document.querySelector('input[name="user"]'),
    hidepwd: document.querySelector('input[name="hidepwd"]'),
    showpwd: document.querySelector('input[name="showpwd"]'),
    getNowPwd: function () {
        if (this.showPwdBtn.classList.contains('chk')) {
            return this.showpwd;
        } else {
            return this.hidepwd;
        }

    },
    getUserData: function () {
        let userData = localStorage.getItem('userData')
        if (userData) {
            userData = JSON.parse(localStorage.getItem('userData'))
            return userData;
        }else{
            return false;
        }

    },

    init: function () {
        this.attachEvent();
    },
    attachEvent: function () {
        this.loginButton.addEventListener('click', () => {
            let user = this.user.value.trim();
            let pwd = this.getNowPwd().value.trim();
            let userData=this.getUserData()
            if(user==userData.phoneNum&&pwd==userData.pwd) {
                // alert('login success')
                setTimeout(function() {
                    //跳转首页
                    location.href='/';
                }, 1500);
            }else{
                alert('登陆失败')
            }

        }, false)
        this.showPwdBtn.addEventListener('click', () => {
            if (!this.isShowPwd) {
                this.showPwdBtn.classList.add('chk')
                this.isShowPwd = !this.isShowPwd
                common.hide(this.hidepwd)
                common.show(this.showpwd)
            } else {
                this.showPwdBtn.classList.remove('chk')
                this.isShowPwd = !this.isShowPwd
                common.show(this.hidepwd)
                common.hide(this.showpwd)
            }

        }, false)


    }
}
//二维码面板显示隐藏
let codePannel={
    closeBtn:document.querySelector('#qrcode-close'),
    codePannel:document.querySelector('.ercode_pannel'),
    showBtn:document.querySelector('.ercode'),
    init:function(){
        this.attachEvent();
    },
    attachEvent:function(){
        this.closeBtn.addEventListener('click',()=>{
            common.hide(this.codePannel);
              common.show(
                document.querySelector('.login-code'),
                document.querySelector('.login-header'),
                document.querySelector('.login_area'),
                document.querySelector('.other_login_type'),
                document.querySelector('.n_links_area')
            );
        }, false)
        this.showBtn.addEventListener('click', ()=>{
            common.hide(
                document.querySelector('.login-code'),
                document.querySelector('.login-header'),
                document.querySelector('.login_area'),
                document.querySelector('.other_login_type'),
                document.querySelector('.n_links_area')
            );
            common.show(this.codePannel)
        }, false)
    }
}
