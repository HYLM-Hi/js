//自定义指令
app.directive('myPic', function ($http) {
    return{
        restrict: 'AE',//默认值，即可以通过元素名E和属性名A来调用指令
        templateUrl: 'picture.html',//这是一个url路径，路径指向一个html模板，html模板会填充指令内容
        replace: false,//replace 是否保留指令名在thml中，Transclude 是否将原来视图的内容嵌入到视图模板（ture保留替换前节点内容false覆盖）
        //进行scope绑定及事件绑定  ，link函数代表的是complie返回的postLink函数
        link: function (scope) {
            // 获得图片的描述信息
            scope.getValue = function (ele) {
                //apply：调用一个对象的一个方法，用另一个对象替换当前对象。最多只能有两个参数——新this对象和一个数组argArray。如果给该方法传递多个参数，则把参数都写进这个数组里面，一个参数同理
                scope.$apply(function () {
                    // 将取得的图片描述信息赋值给files
                    scope.files = ele.files[0];

                    // 图片名称
                    scope.theName = (ele.files[0].name);

                    // 图片展示大小，单位是MB，KB除1024除1024，保留小数点后两位
                    scope.theSize = ((ele.files[0].size/1024/1024).toFixed(2) + 'MB');

                    // 将ng-show的条件设置为true可以使得列表行出现
                    scope.detailDataShow = true;
                    // 使用FileReader对象，可以异步读取存储的缓存文件内容
                    // onabort
                    // 当读取操作被中止时调用.
                    // onerror
                    // 当读取操作发生错误时调用.
                    // onload
                    // 当读取操作成功完成时调用.
                    // onloadend
                    // 当读取操作完成时调用,不管是成功还是失败.该处理程序在onload或者onerror之后调用.
                    // onloadstart
                    // 当读取操作将要开始之前调用.
                    // onprogress
                    // 在读取数据过程中周期性调用.
                    onloadend = new FileReader();
                });

                // 上传按钮
                scope.detailUpDown = function () {

                    // 将要上传的参数以键值对的形式存入formData
                    var formData = new FormData();
                    formData.append('file', scope.files);

                    // 判断选择的图片大小是否小于5M
                    if (ele.files[0].size < 5242880){
                        $http({
                            method: 'POST',
                            url: '/carrots-admin-ajax/a/u/img/task',
                            data: formData,
                            headers: {
                                // 内容类型：将默认的text/plain纯文本格式去掉
                                'Content-Type': undefined
                            },
                        }).then(function (response) {
                            if (response.data.code == 0){
                                // 进度条样式转换
                                scope.detailOldProgress = true;
                                scope.detailNewProgress = true;

                                // 进度条的进度
                                scope.val = 100;

                                // 图片上传成功显示成功
                                scope.detailTips = true;

                                // 将上传按钮禁用
                                scope.detailUp = true;

                                // 将url赋值给预览图的src
                                scope.detailImgUrl = response.data.data.url;
                            }else {
                                alert('上传失败')
                            }
                        });
                    }else {
                        alert('请上传小于5MB的文件');
                    }

                    // 将小图预览框隐藏
                    scope.detailSmallPic = true;

                    // 将大图预览框显示
                    scope.detailBigPic = true;
                };


                // 删除按钮
                scope.detailDelete = function () {
                    // abort()中止当前的过程
                    onloadend.abort();

                    // 删除预览图
                    scope.detailImgUrl = '';

                    // 防止删除一个文件后不能再次上传同一个文件的问题,同时重置上传按钮
                    $('#detailFile').val('');
                    scope.detailUp = false;

                    // 图片上传成功显示成功
                    scope.detailTips = false;

                    // 将ng-show的条件设置为false可以使得列表行隐藏
                    scope.detailDataShow = false;

                    // 将小图预览框显示
                    scope.detailSmallPic = false;

                    // 将大图预览框隐藏
                    scope.detailBigPic = false;

                    // 进度条样式转换
                    scope.detailOldProgress = false;
                    scope.detailNewProgress = false;
                };
            };
        }
    }
});