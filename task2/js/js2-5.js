var killercivilian = JSON.parse(sessionStorage.getItem("killercivilian")); //取出杀手人数，将字符串需要转化成数组
var killerlist = JSON.parse(sessionStorage.getItem("killerlist")); //取出杀手清单
var avote = JSON.parse(sessionStorage.getItem("avote")); //取出投死名单
var day = JSON.parse(sessionStorage.getItem("day")); //取出天数
var round = [];//存放选择杀手页面或投票页面的状态

//状态机
var ztj = {
	state:sessionStorage.getItem("step"),
	killerStep:function(){
		switch(ztj.state){
			case "none":
			sessionStorage.setItem("step","killer");
			round = "dead";
			sessionStorage.setItem("round",JSON.stringify(round));//储存进入杀手页面状态
			location.href="js2-6.html";
			break;
			case "die":
			alert("请勿重复操作");
			break;
			case "speak":
			case "kill":
			alert("请按照游戏步骤进行");
			break;
		}
	},
	deadStep:function(){
		switch(ztj.state){
			case "none":
			case "killer":
			case "kill":
			alert("请按照游戏步骤进行");
			break;
			case "speak":
			alert("请勿重复操作");
			break;
			case "die":
			alert("请死者亮明身份并发表遗言");
			ztj.state = "speak";
			sessionStorage.setItem("step",ztj.state);
			$(".subject-middle-2 .subject-middle-1s").css("border-right", "19px solid #83b09a");
            $(".subject-middle-2 .subject-middle-2ss").css("background-color", "#83b09a");
            console.log(ztj.state);
            break;
		}
	},
	speakStep:function(){
		switch(ztj.state){
			case "none":
			case "killer":
			case "die":
			alert("请按照游戏步骤进行");
			break;
			case "kill":
			alert("请勿重复操作");
			break;
			case "speak":
			alert("请玩家依次发言讨论");
			ztj.state = "kill";
			sessionStorage.setItem("step",ztj.state);
			$(".subject-middle-3 .subject-middle-1s").css("border-right", "19px solid #83b09a");
            $(".subject-middle-3 .subject-middle-3ss").css("background-color", "#83b09a");
            console.log(ztj.state);
            break;
		}
	},
	voteStep:function(){
		switch(ztj.state){
			case "none":
			case "killer":
			case "die":
			alert("请按照游戏步骤进行");
			break;
			case "kill":
			round = "vote";
			sessionStorage.setItem("round",JSON.stringify(round));//储存进入投票页面状态	
			location.href="js2-6.html";
			break;
		}
	}
};
$("#killer").click(function () {
        ztj.killerStep();//状态机点击事件1
    })
$("#dead").click(function () {
        ztj.deadStep();//状态机点击事件2
    })
$("#speak").click(function () {
        ztj.speakStep();//状态机点击事件3
    })
$("#vote").click(function () {
        ztj.voteStep();//状态机点击事件4
    })
switch(ztj.state){//1、跳出杀手杀人页面时判断状态机状态，保持变色。2、判断昨晚杀人的情况，以文字形式返回到台本
		case "die":
		case "speak":
		case "vote":
		case "kill":
		$(".subject-middle-1 .subject-middle-1s").css("border-right", "19px solid #83b09a");
		$(".subject-middle-1 .subject-middle-1ss").css("background-color", "#83b09a");
		$(".subject-middle-1p").removeClass("hide");  // 显示被杀者的信息
    if (killerlist.slice(-1)[0].num == "noo") {
        $(".subject-middle-1p").text("昨晚没有人被杀");// 昨晚没有人被杀
    } 
    else {
        $(".subject-middle-1p span:first").text(killerlist.slice(-1)[0].num).next("span").text(killerlist.slice(-1)[0].role);// 昨晚有人被杀
    }
}
switch(ztj.state){
		case "vote":
		case "speak":
		case "kill":
		$(".subject-middle-2 .subject-middle-1s").css("border-right", "19px solid #83b09a");
        $(".subject-middle-2 .subject-middle-2ss").css("background-color", "#83b09a");
}
switch(ztj.state){
        case "vote":
        case "kill":
        $(".subject-middle-3 .subject-middle-1s").css("border-right", "19px solid #83b09a");
        $(".subject-middle-3 .subject-middle-3ss").css("background-color", "#83b09a");
}

$(".subject-top").text("第"+day+"天");
if (day>1) {
	for (var i = 0; i < day-1; i++) {
	var days =i+1;
	var addhtml ="<div class=\"subject\">\n" +
           " <div class=\"subject-top\">第" + (days) + "天</div>\n" +
           " <div class=\"subject-middle-0\">\n" +
           "     <div class=\"subject-middle-one-0\">\n" +
           "     <div class=\"subject-middle-1-0\">\n" +
           "         <div class=\"icon1\"><img src=\"08.png\"></div>\n" +
           "         <div class=\"subject-middle-1s-0\"></div>\n" +
           "         <div class=\"subject-middle-1ss-0\">杀手杀人</div>\n" +
           "     </div>\n" +
           "     <div class=\"subject-middle-1p-0\"><span></span>号被杀手杀死，真实身份是<span></span></div>\n" +
           "     <div class=\"subject-middle-2-0\">\n" +
           "         <div class=\"icon2\"><img src=\"09.png\"></div> \n" +
           "         <div class=\"subject-middle-1s-0\"></div>\n" +
           "         <div class=\"subject-middle-2ss-0\">亡灵发表遗言</div>\n" +
           "     </div>\n" +
           "     <div class=\"subject-middle-3-0\">\n" +
           "         <div class=\"subject-middle-1s-0\"></div>\n" +
           "         <div class=\"subject-middle-3ss-0\">玩家依次发言</div>\n" +
           "     </div>\n" +
           "     <div class=\"subject-middle-4-0\">\n" +
           "         <div class=\"subject-middle-1s-0\"></div>\n" +
           "         <div class=\"subject-middle-4ss-0\">全民投票</div>\n" +
           "     </div>\n" +
           "     <div class=\"subject-middle-4p-0\">号被投票投死，真实身份是</div>\n" +
           " </div>\n" +
           " </div>\n" +
           "</div>";
           //给html添加过去天数
    $(".subject").eq(-1).before(addhtml);
    $(".subject-middle-0").hide();
    if (killerlist[i].num != "noo") {
         $(".subject-middle-1p-0").eq(i).text(killerlist[i].num + "号被杀手杀死，真实身份是" + killerlist[i].role);
    }
    else {
       $(".subject-middle-1p-0").eq(i).text("昨晚没有人被杀");
    }
    $(".subject-middle-4p-0").eq(i).text(avote[i].num + "号被投票投死，真实身份是" + avote[i].role);
    }
    console.log(killerlist);
}
$(".subject-top").click(function(){
	$(this).next().toggle(500);
});//日期点击事件

slose.onclick=function(){
    var ii = confirm("确定要退出吗？");
                if (ii == true) {
    location.href="js2-1.html";
    }
}//跳转到页面一
over.onclick=function(){
    var ii = confirm("确定要退出吗？");
                if (ii == true) {
    location.href="js2-1.html";
	}
}//跳转到页面一
returns.onclick=function(){
    location.href="js2-4.html";
}//跳转到页面四
diary.onclick=function(){
    location.href="js2-7.html";
}//跳转到页面七