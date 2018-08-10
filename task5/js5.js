//js Ajax方法实现
// document.getElementById("btn").onclick = function() {
//     var name = document.getElementById("name").value; //获取账号
//     var pwd = document.getElementById("pwd").value; //获取密码
//     //创建一个XMLHttpRequest对象，用于在后台与服务器交换数据，它可以在不重新加载整个网页的情况下，对网页的某部分进行重新更新。
//     var aa = new XMLHttpRequest();
//     // 表单内容用setRequestHeader() 来添加 HTTP 头。然后在 send() 方法中规定您希望发送的数据
//     aa.open("post", "/carrots-admin-ajax/a/login", true);
//     aa.setRequestHeader("content-type", "application/x-www-form-urlencoded");
//     aa.send("name=" + name + "&pwd=" + pwd);
//     //监听事件
//     aa.onreadystatechange = function() {
//         if (aa.readyState == 4) {
//             if (aa.status == 200) {
//                 var a = JSON.parse(aa.responseText);
//                 if (a.message == "success") {
//                     window.location.href = "http://dev.admin.carrots.ptteng.com";
//                 } else {
//                     document.getElementById("txt").innerHTML = a.message;
//                 }
//             }
//         }
//     }
// }


//js JQ方法实现
//设置点击事件
$("#btn").click(function() {
    var name = $("#name").val(); //获取账号
    var pwd = $("#pwd").val(); //获取密码
    $.ajax({ //ajax访问接口
        url: "/carrots-admin-ajax/a/login", //规定把请求发送到哪个 URL。
        data: { //映射或字符串值。规定连同请求发送到服务器的数据。
            name: name,
            pwd: pwd
        },
        type: "post", //post请求
        cache: false, //异步
        dataType: "json", //返回数据为json类型数据
        success: function(data) { //回调函数
            if (data.message == "success") {
                location.href = "http://dev.admin.carrots.ptteng.com";
            } else {
                $("#txt").text(data.message);
            }
        }
    })
});