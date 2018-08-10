Page({

  /**
   * 页面的初始数据
   */
  data: {
    currenTab:0,
    title:['职业门槛','难易程度','成长周期','求贤企业','入学基础','薪资待遇']
  },
  // function(e)中的e意思为当前事件，存了当前事件的信息。如鼠标点击事件，有鼠标的坐标信息等。
  navbarTap:function(e){
    this.setData({
      currenTab: e.currentTarget.dataset.id// e.currentTarget.dataset 固定写法，来捕获当前事件中的属性值
    });
    console.log(e);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var thevalue =JSON.parse(options.key);//将传递过来的参数用JSON转化成原始的数组格式
    var that=this;
    var newJob=[];
    var newSalary=[];
    var name=[];
    //先在data里面定义好变量名称，然后通过this.setData的方式来进行赋值

    // 发送请求
  wx.request({
    url: 'http://www.jnshu.com/a/occupation/list',//接口
    header:{
      'content-type':'application/json'//请求头默认值
    },
    // 回调函数
    success:function(res){
      if(res.data.code===0){
        for(var i=0;i<3;i++){
          newJob.push(res.data.data.occupations[thevalue[i]-1]);
          newSalary.push(JSON.parse(newJob[i].salary));
          name.push(newJob[i].name);
        }
        //通过this.setData的方式对变量进行赋值
        that.setData({
          newJob,newSalary,name
        })
      }
    }
  })
  }
})