//每次调用get post 或ajax的时候，会先调用ajaxPrefilter这个函数。
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter((options) => {
    options.url = `http://www.liulongbin.top:3007` + options.url;
})