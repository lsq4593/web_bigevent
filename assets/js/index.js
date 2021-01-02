$(function () {
    // 调用getUserInfo
    getUserInfo()
    // 点击退出按钮时
    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        // 提示用户是否确认退出
        layer.confirm('确定要退出么？', { icon: 3, tilte: '提示' },
            function (index) {
                // 1.清空本地存储中的 token
                localStorage.removeItem('token')
                // 2.重新跳转到登录页面
                location.href = '/login.html'

                // 关闭询问框
                layer.close(index)
            })
    })
})

// 获取用户信息
function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        // header请求头
        header: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            renderAvatar(res.data)
        },


        // 无论成功还是失败，最终都会调用 complete 回调函数
        // complete: function (res) {
        //     // console.log('执行了complete回调函数');
        //     // console.log(res);

        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 1.强制清空 token
        //         localStorage.removeItem('token')
        //         // 2.强制跳转到登录页面
        //         localStorage.href = '/login.html'
        //     }
        // }
    })
}

// 调用用户的头像
function renderAvatar(user) {
    // 1.获取用户昵称
    var name = user.nickname || user.username
    // 2.设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 3.按需渲染用户头像
    if (user.user_pic !== null) {
        // 3.1渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 3.2渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}