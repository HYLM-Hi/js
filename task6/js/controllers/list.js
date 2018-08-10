app.controller('listForm', function ($scope, $http, $state,$stateParams,types,status,industry) {
    var theTwoName = sessionStorage.getItem('name');
    if (theTwoName) {
        $scope.listDateStart = Number($stateParams.startAt) || undefined;//将从服务器请求回来的对象值转换为数字,默认为未定义
        $scope.listDateEnd = Number($stateParams.endAt) || undefined;//将从服务器请求回来的对象值转换为数字,默认为未定义
        $scope.listTheType = $stateParams.type;//类型
        $scope.listTheStatus = $stateParams.status;//状态

        // 取出constant里面的types、status、industry
        $scope.types = types;
        $scope.status = status;
        $scope.industry = industry;

        //请求后台数据
        $http({
            // 请求的方式
            method: 'GET',
            // 请求的地址
            url: '/carrots-admin-ajax/a/article/search',
            params: $stateParams//将页面初始化的值发送给服务器
            //then异步请求请求后台数据，用response方法进行响应
        }).then(function (response) {
            if (response.data.code === 0) {
                $scope.articleList = response.data.data.articleList;//接受服务器返回的列表数组
                $scope.totalItems = response.data.data.total;//接受服务器返回信息总数
                $scope.currentPage = $stateParams.page || 1;//初始值显示第一页
                $scope.currentSize = $stateParams.size || 10;//初始值一页显示10条内容
            }
        });
        // 分页插件选择第几页
        $scope.listPickPage = function () {
            $state.go('home.list', {
                page: $scope.currentPage,//点击改变页面数，将值发送给服务器
            },{
                reload:true//重新加载当前文档
            });
        };
        // 确认显示多少条数据以及跳转到第几页
        $scope.listToShow = function () {
            $state.go('home.list', {
                size: $scope.currentSize,//点击改变一页显示的条目数，将值发送给服务器
                page: $scope.listPagePicker//跳转到第几页
            },{
                reload:true//重新加载当前文档
            });
        };

        // 日期插件
        $scope.popup1 = {
            opened: false//默认值为不显示
        };
        $scope.popup2 = {
            opened: false//默认值为不显示
        };
        $scope.open1 = function () {
            $scope.popup1.opened = true;//点击日期显示
        };
        $scope.open2 = function () {
            $scope.popup2.opened = true;//点击日期显示
        };

        //点击搜索
        $scope.search = function () {
            //开始日期
            if ($scope.listDateStart==undefined){
                $scope.listDateStart=undefined;//框值未填则表示不发生改变
            }
            else if (typeof $scope.listDateStart=="object"){
                $scope.listDateStart=Date.parse($scope.listDateStart);//解析字符串，并返回 1970/1/1 午夜距离该日期时间的毫秒数
            }

            //结束日期
            if ($scope.listDateEnd==undefined){
                $scope.listDateEnd=undefined;//框值未填则表示不发生改变
            }
            else if (typeof $scope.listDateEnd=="object"){
                $scope.listDateEnd=Date.parse($scope.listDateEnd);//解析字符串，并返回 1970/1/1 午夜距离该日期时间的毫秒数
                $scope.listDateEnd=$scope.listDateEnd+86399999;//设置结束时间为当天的23:59:59
            }
            $state.go("home.list", {
                    type: $scope.listTheType,//将类型传给服务器
                    status: $scope.listTheStatus,//将状态传给服务器
                    startAt: $scope.listDateStart,//将起始更新时间传给服务器
                    endAt: $scope.listDateEnd//将终止更新时间传给服务器
                },{
                    reload:true//重新加载当前文档
                });
        };

        // 清除按钮
        $scope.clean = function () {
            $state.go('home.list', {
                type: undefined,
                status: undefined,
                startAt: undefined,
                endAt: undefined//全部定义为初始状态
            }, {
                reload: true
            })
        };
        // 编辑按钮
        $scope.listEdit = function () {
            $state.go('home.articleDetail', {
                    id: this.item.id,
            });
        };
        //确定上线下线按钮的状态
        $scope.listUpDown =function () {
            $scope.listTheStatus=this.item.status;//判断状态为1还是2
            if($scope.listTheStatus==1){
                $scope.listTheId=this.item.id;//将当前id赋值给一个变量
                $scope.listTheStatus=2;//改变状态为2
                //bootbox模拟状态框
                bootbox.confirm({
                    title: "操作提示",
                    message: "上线后该图片将在banner中展示，是否执行上线操作？",
                    buttons: {
                        cancel: {
                            label: '取消',
                        },
                        confirm: {
                            label: '确定',
                        }
                    },
                    //回调函数
                    callback: function (result) {
                        if (result == true){
                            $http({
                                method: 'PUT',
                                url: '/carrots-admin-ajax/a/u/article/status',
                                params: {
                                    id: $scope.listTheId,
                                    status: $scope.listTheStatus
                                }
                            }).then(function(response){
                                if (response.data.code==0){
                                    $state.reload("home.list");
                                    bootbox.alert({
                                        title:"提示",
                                        message:"上线成功！",
                                        size:"small",
                                        backdrop:true
                                    });
                                }else {
                                    alert(response.data.meassage)//返回上线不成功等其它消息
                                }
                            })
                        }
                    }

                })
            }
            else if($scope.listTheStatus==2){//判断状态为1还是2
                $scope.listTheId=this.item.id;//将当前id赋值给一个变量
                $scope.listTheStatus=1;//改变状态为1
                //bootbox模拟状态框
                bootbox.confirm({
                    title:"提示",
                    message:"下线后该图片不展示在轮播banner中，是否执行下线操作",
                    buttons: {
                        cancel: {
                            label: '取消',
                        },
                        confirm: {
                            label: '确定',
                        }
                    },
                    callback: function (result) {
                        if (result == true){
                            $http({
                                method: 'PUT',
                                url: '/carrots-admin-ajax/a/u/article/status',
                                params: {
                                    id: $scope.listTheId,
                                    status: $scope.listTheStatus
                                }
                            }).then (function (response) {
                                if (response.data.code == 0) {
                                    // 成功后刷新当前页面
                                    $state.reload("home.list");
                                    // 成功后弹出提示框
                                    bootbox.alert({
                                        title: '提示',
                                        size: 'small',
                                        message: "下线成功!",
                                        backdrop: true
                                    });
                                } else {
                                    alert(response.data.message)//返回下线不成功等其它消息
                                }
                            })
                        }
                    }
                })
            }
        }
        // 删除按钮
        $scope.listDelete = function () {
            // 将当前id赋值给一个变量
            $scope.listTheId = this.item.id;
            // 运用bootbox模态框
            bootbox.confirm({
                title: "提示",
                message: "是否确认删除",
                    buttons: {
                        cancel: {
                            label: '取消',
                        },
                        confirm: {
                            label: '确定',
                        }
                    },
                callback: function (result) {
                    if (result == true){
                        $http({
                            method: 'delete',
                            url: '/carrots-admin-ajax/a/u/article/' + $scope.listTheId
                        }).then (function (response) {
                            if (response.data.code == 0) {
                                // 成功后刷新当前页面
                                $state.reload("home.list");
                                console.log(response);
                            } else {
                                alert(response.data.message)
                            }
                        })
                    }
                }
            });
        };
    }
});

