$(function () {
    $('#link_reg').click(function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    $('#link_login').click(function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    //引入form模块
    const form = layui.form;
    // 引入layer
    const layer = layui.layer;

    // 自定义检验规则
    form.verify({
        //密码校验规则
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位,且不能出现空格"],
        // 确认密码校验规则
        repwd: (value) => {
            // 1.获取当前输入的值
            // 2.获取密码框的值
            // 3.两者进行判断
            // 4.如果不一致弹出提醒消息
            const pwd = $('#form_reg [name=password]').val();
            if (pwd !== value) return '两次密码输入不一致'
        }
    });

    //设置根路径 
    const baseUrl = `http://www.liulongbin.top:3007`

    //注册功能
    $('#form_reg').on('submit', (e) => {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val(),
            },
            success: (res) => {
                if (res.status !== 0) return layer.msg('注册失败！')
                layer.msg('注册成功！')
                $('#link_login').click();
            }
        });
    });

    //登陆功能
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) return layer.msg('登陆失败')
                layer.msg('登陆成功')
                //登录成功后把token令牌存入本地
                localStorage.setItem('token', res.token);
                // 登录成功跳转到主页面
                location.href = '/index.html';
            }
        });
    });
})