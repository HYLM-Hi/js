var killercivilian = JSON.parse(sessionStorage.getItem("killercivilian")); //取出杀手人数，将字符串需要转化成数组
var returns = document.getElementById("returns");//跳转上个页面
var control =1;//将初始值设为1
var num = 1;//将初始值设为1
var kc=[];//储存字符串转化成数组的数据
console.log(killercivilian);
 $(".deal").click(function () {
        if (num < killercivilian.length+1) {
            if (control === 1) { // 此时为显示角色界面
                $(".show").hide();//隐藏图像一
                $(".hide").show();//显示图像二
                $(".content-bottom span").text(killercivilian[num-1]);//显示身份
                num++;
                if (num<killercivilian.length) {//如果数字小于杀手平民数组长度则继续+1
                $(".deal").html("隐藏并传递给" + num + "号");
                }
                else if (num===killercivilian.length+1) {//如果数字等于玩家总人数则显示法官查看按钮
        		$(".deal").html("法官查看").click(function(){//点击法官按钮
        			location.href="js2-4.html";//跳转页面四
        		})
        		}
                control = 0;  // 改为隐藏状态
            } 
            else if (control === 0) {   // 此时为皇上翻牌界面
                $(".show").show();//显示图像一
                $(".hide").hide();//隐藏图像二
                $(".content-top").text(num);  // 修改圆圈内的数字
                $(".deal").html("查看" + num + "号身份");
                control = 1; // 改为显示状态
            }
        }
    });
returns.onclick=function(){
    location.href="js2-2.html";
}//跳转到页面二

slose.onclick=function(){
    var ii = confirm("确定要退出吗？");
                if (ii == true) {
    location.href="js2-1.html";
    }
}//跳转到页面一




