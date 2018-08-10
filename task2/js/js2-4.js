var killercivilian = JSON.parse(sessionStorage.getItem("killercivilian")); //取出杀手人数，将字符串需要转化成数组
var cklive = [];//存放玩家信息数组
var killerlist = [];//杀手清单
var avote = [];//存放被投死玩家
var day =1;//天数
sessionStorage.setItem("day",JSON.stringify(day));//储存天数
sessionStorage.setItem("killerlist",JSON.stringify(killerlist));//储存死亡信息
sessionStorage.setItem("avote",JSON.stringify(avote));//储存被投死玩家
sessionStorage.setItem("step","none");//状态机初始值
for (num = 1; num < killercivilian.length+1; num++) {
	var addhtml="<div class=\"main-box\">\n"+
        		"<div class=\"main-box-1\">"+killercivilian[num-1]+"</div>\n"+
        		"<div class=\"main-box-2\">"+num+"号</div>\n"+
    			"</div>";
    			$("main").append(addhtml);//根据玩家的人数来确定添加几张身份牌
    			cklive[num-1] = {
    				role:killercivilian[num-1],
    				state:"live",
    				num:num
    			}//将角色的身份、死活、编号信息存入cklive数组中
}
sessionStorage.setItem("cklive",JSON.stringify(cklive));
slose.onclick=function(){
    var ii = confirm("确定要退出吗？");
                if (ii == true) {
    location.href="js2-1.html";
    }
}//跳转到页面一
returns.onclick=function(){
    location.href="js2-3.html";
}//跳转到页面三
deal.onclick=function(){
    location.href="js2-5.html";
}//跳转到页面五

