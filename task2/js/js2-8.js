var civilian = JSON.parse(sessionStorage.getItem("civilian"));//取出平民人数
var killer = JSON.parse(sessionStorage.getItem("killer"));//取出杀手人数
var avote = JSON.parse(sessionStorage.getItem("avote"));//取出投死的数据
var killerlist = JSON.parse(sessionStorage.getItem("killerlist"));//取出杀死的数据
var day = JSON.parse(sessionStorage.getItem("day")); //取出天数

if (killer===0) {//判断胜利。条件：杀手为0平民胜利
	$(".win").text("平民胜利");
}
else {
	$(".win").text("杀手胜利");
}

$(".killer-1").text(killer);//显示杀手剩余人数
$(".civilian-1").text(civilian);//显示平民剩余人数

for (var i = 0; i < day; i++) {
        var days = i + 1;
        if (!avote[i]) {//表示从杀人页面跳转过来的
            var addhtml ="<div class=\"day\">第" + days + "天</div>\n"+
   						"<div class=\"night\">晚上：" + killerlist[i].num + "号被杀手杀死，真实身份是" + killerlist[i].role + "</div>\n"+
   						"<div class=\"noon\"></div>";
        } else {
            var addhtml = "<div class=\"day\">第" + days + "天</div>\n"+
   						"<div class=\"night\">晚上：" + killerlist[i].num + "号被杀手杀死，真实身份是" + killerlist[i].role + "</div>\n"+
   						"<div class=\"noon\">白天：" + avote[i].num + "号被投票投死，真实身份是" + avote[i].role + "</div>";
        }
        // 为页面添加html结构
        $("main").append(addhtml);
        if (killerlist[i].num === "noo") {
            $(".night").eq(i).text("晚上：没有人被杀");
        }
    }

again.onclick=function(){
    var ii = confirm("确定要退出吗？");
                if (ii == true) {
    location.href="js2-1.html";
    }//再来一局
}
slose.onclick=function(){
    var ii = confirm("确定要退出吗？");
                if (ii == true) {
    location.href="js2-1.html";
    }
}//跳转到页面一

