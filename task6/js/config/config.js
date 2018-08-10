angular.module('app')
    .run(function ($rootScope,$modal,$location,$state,$cookies) {
        //模态框
        $rootScope.alert = function (content, okFn) {
            var modal = $modal({
                html: true,
                show: false,
                templateUrl: '../../alert.html',
                controller: function ($scope) {
                    $scope.content = content;
                    $scope.ok = function () {
                        typeof okFn == 'function' && okFn();
                        modal.$promise.then(modal.hide);
                    };
                }
            });
            modal.$promise.then(modal.show);
        };

    });

