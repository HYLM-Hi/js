app.controller('loginCtrl', function ($scope, $http, $state) {
    $scope.tohome = function (){
        $http({
            // 请求的方式
            method: 'POST',
            // 请求的地址
            url: '/carrots-admin-ajax/a/login',
            // 提交的数据
            params: {
                name: $scope.name,
                pwd: $scope.pwd
            },
        }).then (function successCallback(response) {
            if (response.data.code === 0) {
                sessionStorage.setItem('name',$scope.name);
                $state.go("home");
            }
            else {
                $scope.txt = response.data.message;
            }
        });
    };
});
