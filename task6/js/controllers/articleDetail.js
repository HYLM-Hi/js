app.controller('detailCtrl', function ($scope, $http, $state,$stateParams,types,industry){
app.controller('detailCtrl', function ($scope, $http, $state,$stateParams,types,industry){
    var theThreeName = sessionStorage.getItem('name');
    if (theThreeName) {
        //取出constant里面的types、industry
        $scope.types = types;
        $scope.industry = industry;
        //初始化页面数据
        $scope.detailTheOptions = undefined;
        $scope.detailTheSecondOptions = undefined;
        $scope.article="新增Article";
    // 请求单个article{id}的data
    if ($stateParams.id){
        $http({
            method: 'get',
            url: '/carrots-admin-ajax/a/article/' + $stateParams.id
        }).then(function (response) {
            if (response.data.code == 0){
                $scope.detailTheTitle = response.data.data.article.title;//名称
                $scope.detailTheOptions = response.data.data.article.type;//类型
                $scope.detailTheSecondOptions = response.data.data.article.industry;//行业大图
                $scope.content = response.data.data.article.content;//说明
                $scope.detailTheLink = response.data.data.article.url;//连接
                $scope.detailTheCreateAt = response.data.data.article.createAt;//创建时间
                $scope.detailImgUrl = response.data.data.article.img;//图片
                // 将小图预览框隐藏
                $scope.detailSmallPic = true;
                // 将大图预览框显示
                $scope.detailBigPic = true;
                $scope.article="编辑Article";
            }else {
                console.log('请求失败');
            }
        });
    }

    // 立即上线
    $scope.detailToUp = function () {
        if ($state.params.id){
            //编辑
            $http({
                method: 'PUT'   ,
                url: '/carrots-admin-ajax/a/u/article/' + $state.params.id,
                params: {
                    title: $scope.detailTheTitle,//名称
                    type: $scope.detailTheOptions,//类型
                    industry: $scope.detailTheSecondOptions,//行业大图
                    status: 2,//状态上线
                    img: $scope.detailImgUrl,//图片
                    content: $scope.content,//说明
                    url: $scope.detailTheLink,//连接
                    createAt: $scope.detailTheCreateAt//创建时间
                }
            }).then(function (response) {
                if (response.data.code == 0){
                    $state.go('home.list');
                    bootbox.alert({
                        title:'提示',
                        message: "编辑成功",
                        backdrop: true
                    });
                    reload: true;
                }else {
                    bootbox.alert({
                        title:'提示',
                        message: "编辑失败",
                        backdrop: true
                    });
                }
            })
        }else {
            //新增
            $http({
                method: 'POST',
                url: '/carrots-admin-ajax/a/u/article',
                params: {
                    title: $scope.detailTheTitle,//名称
                    type: $scope.detailTheOptions,//类型
                    industry: $scope.detailTheSecondOptions,//行业大图
                    status: 2,//状态上线
                    img: $scope.detailImgUrl,//图片
                    content: $scope.content,//说明
                    url: $scope.detailTheLink,//连接
                }
            }).then(function (response) {
                if (response.data.code == 0){
                    $state.go('home.list');
                    bootbox.alert({
                        title:'提示',
                        message: "新增成功",
                        backdrop: true
                    });
                    reload: true;
                }else {
                    bootbox.alert({
                        title:'提示',
                        message: "新增失败",
                        backdrop: true
                    });
                }
            })
        }
    };

    // 存为草稿
    $scope.detailSave = function () {
        if ($state.params.id){
            //编辑
            $http({
                method: 'PUT',
                url: '/carrots-admin-ajax/a/u/article/' + $state.params.id,
                params: {
                    title: $scope.detailTheTitle,
                    type: $scope.detailTheOptions,
                    industry: $scope.detailTheSecondOptions,
                    status: 1,
                    img: $scope.detailImgUrl,
                    content: $scope.content,
                    url: $scope.detailTheLink,
                    createAt: $scope.detailTheCreateAt
                }
            }).then(function (response) {
                if (response.data.code == 0){
                    $state.go('home.list');
                    bootbox.alert({
                        title:'提示',
                        message: "编辑成功",
                        backdrop: true
                    });
                    reload: true;
                }else {
                    bootbox.alert({
                        title:'提示',
                        message: "编辑失败",
                        backdrop: true
                    });
                }
            })
        }else {
            //新增
            $http({
                method: 'POST',
                url: '/carrots-admin-ajax/a/u/article',
                params: {
                    title: $scope.detailTheTitle,
                    type: $scope.detailTheOptions,
                    industry: $scope.detailTheSecondOptions,
                    status: 1,
                    img: $scope.detailImgUrl,
                    content: $scope.content,
                    url: $scope.detailTheLink,
                }
            }).then(function (response) {
                if (response.data.code == 0){
                    $state.go('home.list');
                    bootbox.alert({
                        title:'提示',
                        message: "新增成功",
                        backdrop: true
                    });
                    reload: true;
                }else {
                    bootbox.alert({
                        title:'提示',
                        message: "新增失败",
                        backdrop: true
                    });
                }
            })
        }
    };
    }else{
        $state.go('login');
    }
});