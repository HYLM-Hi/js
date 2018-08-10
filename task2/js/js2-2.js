var data = document.getElementById('datas');//获取玩家人数表格节点
var lattice = document.getElementById('lattice');//获取玩家人数框节点
var killer=document.getElementsByClassName("killer");//获取杀手人数节点
var civilian = document.getElementsByClassName("civilian");//获取平民人数节点
var simple = document.getElementById("simple");//跳转下一个页面
var returns = document.getElementById("returns");//跳转上个页面
 function print(){  
   if (data.value>=4&&data.value<=18) {
   	lattice.value=data.value;
   } //判断，当人数为4~18人时关联进度条
   else{
   	alert("玩家人数只能在4~18人之间")               
   	data.value = 4;
   	lattice.value=data.value;
   }
}  //判断，当人数为4~18人时关联进度条，否则出现警告框提示
function puls() {
	lattice.value++;
	data.value=lattice.value;
}//+号滚动条增加人数
function reduce() {
	lattice.value--;
	data.value=lattice.value;
}//-号滚动条减少人数
function doge() {
	data.value=lattice.value;
}//进度条关联到人数框
if (true) {}
function numbersetting() {
  var empty =[];//保存杀手平民的数组
  for (var i = 0; i < Math.ceil(data.value*2/3); i++) {
  empty.push("平民");
  }
  for (var i = 0; i < Math.floor(data.value/3); i++) {
  empty.push("杀手");
  }
	killer[0].innerHTML = Math.floor(data.value/3);//杀手人数
	civilian[0].innerHTML = Math.ceil(data.value*2/3);//平民人数
  	~function shuffle() {
        for (var i=empty.length-1; i>=0; i--) {
        	var a = Math.floor(Math.random()*(i+1));
        	var b = empty[a];
        	empty[a] = empty[i];
        	empty[i] = b;
        }
    }()//洗牌
    sessionStorage.setItem("killer",JSON.stringify(Math.floor(data.value/3)));// 保存杀手人数
    sessionStorage.setItem("civilian",JSON.stringify(Math.ceil(data.value*2/3))); // 保存平民人数
  	sessionStorage.setItem("killercivilian",JSON.stringify(empty));  // 保存杀手平民人数
    simple.onclick=function(){
  if (empty.length==data.value) {
    location.href="js2-3.html";
    }//跳转到页面三
  else{
    alert("请确认玩家人数是否与设置一致");
  }
}
}
 returns.onclick=function(){
    location.href="js2-1.html";
}//跳转到页面一

