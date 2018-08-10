var killercivilian = JSON.parse(sessionStorage.getItem("killercivilian")); //取出杀手人数，将字符串需要转化成数组
var cklive = JSON.parse(sessionStorage.getItem("cklive")); // 取出玩家状态
var killerlist = JSON.parse(sessionStorage.getItem("killerlist"));//取出杀手清单
var killer = parseInt(sessionStorage.getItem("killer"));  // 取出保存在killer中杀手人数
var civilian = parseInt(sessionStorage.getItem("civilian")); // 取出保存在civilian中平民人数
var round = JSON.parse(sessionStorage.getItem("round")); //取出杀手清单
var avote = JSON.parse(sessionStorage.getItem("avote")); //取出投死名单
var day = JSON.parse(sessionStorage.getItem("day")); //取出天数
var stars =0;//判断是否选中玩家
var index;//创建储存玩家位置的变量

for (num = 1; num < killercivilian.length+1; num++) {
	var addhtml= "<div class=\"main-box\">\n"+
				"<div class=\"main-box-0\">\n"+
        		"<div class=\"main-box-1\">"+killercivilian[num-1]+"</div>\n"+
        		"<div class=\"main-box-2\">"+num+"号</div>\n"+
        		"</div>\n"+
        		"<div class=\"main-box-3\"><div class=\"main-box-4\"><img src=\"../img/q.png\"></div>\n"+
    			"</div>";
$("main").append(addhtml);
}//根据玩家的人数来确定添加几张身份牌

$(".main-box-0").click(function(){
	$(".main-box-3").hide();
	$(this).next().show();//点击身份框出现小刀~~
	index = $(".main-box-0").index(this);//储存玩家下标的序号位置
	stars = 1;//标记事件标1
});
for (var i = 0; i < killercivilian.length; i++) {
        if (cklive[i].state === "killed" || cklive[i].state === "voted") {
            index = cklive[i].num-1;  // 获取被杀角色的数组号
            $(".main-box-1").eq(index).css("background-color","#83b09a");
        }
    }
if (round=="vote") {
	$(".little").text("投票");
	$(".header-middle").text("投票");
	$(".declaration").text("发言讨论结束，大家请投票");
	$(".declaration-2").text("点击得票数最多的人的头像");
}

deal.onclick=function(){//点击按钮件事
	if (round=="dead") {//表示从杀人按钮跳转过来的
		sessionStorage.setItem("step","die");//改变状态机状态
	if (stars===0) {//表示本轮未标记
		var qq = confirm("确定本轮不杀人吗？");//如果不杀人，进入条件判断
		if (qq == true) {
			killerlist.push({num:"noo"});//若无人被杀则显示为NO
			sessionStorage.setItem("killerlist",JSON.stringify(killerlist));
			location.href="js2-5.html";//跳转到页面五
		}
	}
	else if (stars===1){//表示本轮选中1位玩家
		if (cklive[index].role != "杀手"){
			if (cklive[index].state != "killed"&&cklive[index].state != "voted") {
				var ww = confirm("确定要杀死他吗？");//如果杀人，进入条件判断
				if (ww == true) {
					cklive[index].state = "killed";//标记被杀状态
					sessionStorage.setItem("cklive",JSON.stringify(cklive));//储存被杀人
					killerlist.push(cklive[index]);//加入死亡清单
					sessionStorage.setItem("killerlist",JSON.stringify(killerlist));//储存死亡信息
					civilian--;//平民数减1
					sessionStorage.setItem("civilian",civilian);//平民数重新刷新,储存
					if (civilian==killer) {//如果杀手人数等于平民人数，那么杀手胜利
						alert("杀手胜利");
						location.href="js2-8.html";//跳转到页面八
					} 
					else{
					location.href="js2-5.html";//跳转到页面五
					}
				}
			} 
			else {
				alert("他已经死了!");
			}
		}
		else
			alert("请不要杀你的同伙儿!");
	}
}
	else if (round=="vote") {//表示从投票按钮跳转过来的
		if (stars===0) {//表示本轮未标记
			var tt = confirm("请点击得票数最多的人的头像");
		}
		else if (stars===1){//表示本轮选中1位玩家
			if (cklive[index].state != "killed"&&cklive[index].state != "voted") {//判断是否已经被杀死或投死
				var ii = confirm("确定要投死他吗？");
				if (ii == true) {
					cklive[index].state = "voted";//标记被投死状态
					sessionStorage.setItem("cklive",JSON.stringify(cklive));//储存被投人信息
					avote.push(cklive[index]);//加入被投死清单
					sessionStorage.setItem("avote",JSON.stringify(avote));//储存被投死信息
					if (cklive[index].role=="平民") {
						civilian--;//平民数减1
						sessionStorage.setItem("civilian",civilian);//平民数重新刷新,储存
						if (civilian == killer) {//如果平民人数减1等于杀手人数，那么杀手胜利
						alert("杀手胜利");
						location.href="js2-8.html";//跳转到页面八
						} 
						else{
							day++
							sessionStorage.setItem("day",JSON.stringify(day));//储存天数+1
							location.href="js2-5.html";//跳转到页面五
							sessionStorage.setItem("step","none"); // 初始化步骤
						}
					}
					else if (cklive[index].role=="杀手") {
						killer--;//杀手数减1
						sessionStorage.setItem("killer",killer);//平民数重新刷新,储存
						if (killer == 0) {//如果杀手人数等于平民人数，那么杀手胜利
							alert("平民胜利");
							location.href="js2-8.html";//跳转到页面八
						} 
						else{
							day++
							sessionStorage.setItem("day",JSON.stringify(day));//储存天数+1
							location.href="js2-5.html";//跳转到页面五
							sessionStorage.setItem("step","none"); // 初始化步骤
						}
					}
				}
			}
			else {
				alert("他已经死了!");
			}
		}
	}
}

slose.onclick=function(){
    var ii = confirm("确定要退出吗？");
                if (ii == true) {
    location.href="js2-1.html";
    }
}//跳转到页面一

