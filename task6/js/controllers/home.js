app.controller('homeCtrl', function ($scope, $http, $state, sideBar) {
    var theOneName = sessionStorage.getItem('name');

    if (theOneName){
        // 显示欢迎信息
        $scope.hello = 'hello world!';

        // 取出constant.js常量中的数据，渲染到侧栏上去
        $scope.sideBar = sideBar;

        // 将title的index跟content的name存入sessionStorage
        $scope.ggtitle = sessionStorage.getItem('theTitle');//一级图标当前展开状态
        $scope.ggcontent = sessionStorage.getItem('theContent');//二级图标高亮状态

        // 一级菜单
        $scope.getHomeTitle = function (e){
            $scope.ggtitle = ($scope.ggtitle == e) ? undefined : e;//三元运算符
        };

        // 二级菜单
        $scope.getHomeContent = function (z, index){
            $scope.ggcontent = z;
            sessionStorage.setItem('theTitle', index);
            sessionStorage.setItem('theContent', z);
        };


        // 退出按钮，退出的同时将sessionStorage值清除
        $scope.toback =function () {
            $http({
                method:"post",
                url:"/carrots-admin-ajax/a/logout"
            }).then(function (response) {
                if (response.data.code==0){
                sessionStorage.clear();//清除数据
                $state.go("login");
            }else{
                alert("请求错误");
                }
            })
        }
    }else {
        $state.go("login")
    }
});