var killercivilian = JSON.parse(sessionStorage.getItem("killercivilian")); //取出杀手人数，将字符串需要转化成数组
var cklive = JSON.parse(sessionStorage.getItem("cklive")); //取出杀手人数，将字符串需要转化成数组
for (num = 1; num < killercivilian.length+1; num++) {
	var addhtml="<div class=\"main-box\">\n"+
        		"<div class=\"main-box-1\">"+killercivilian[num-1]+"</div>\n"+
        		"<div class=\"main-box-2\">"+num+"号</div>\n"+
    			"</div>";
    			$("main").append(addhtml);//根据玩家的人数来确定添加几张身份牌
}

for (var i = 0; i < killercivilian.length; i++) {
        if (cklive[i].state === "killed" || cklive[i].state === "voted") {
            index = cklive[i].num-1;  // 获取被杀和投死角色的数组号
            $(".main-box-1").eq(index).css("background-color","#83b09a");
        }
    }//与js页面六判断死亡状态框一样

deal.onclick=function(){
    location.href="js2-5.html";
}//跳转到页面五
