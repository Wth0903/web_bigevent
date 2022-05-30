//每次调用get post 或ajax的时候，会先调用ajaxPrefilter这个函数。
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter((options) => {
    options.url = `http://www.liulongbin.top:3007` + options.url;
    //为/my/相关接口 注入 token
    if (options.url.includes('/my/')) {
        options.headers = {
            Authorization: localStorage.getItem('token')
        };
    }

    //每次发完请求回来校验token是否存在，或者是过期
    options.complete = (res) => {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //强制清空token
            localStorage.removeItem('token')
            location.href = '/login.html';
        }
    }
});