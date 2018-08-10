var app = angular.module('app', ['ui.router','ui.bootstrap','ng.ueditor','mgcrea.ngStrap']);
app.config(function ($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.when('', '/login');
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'login.html'
        })
        .state('home', {
            url: '/home',
            templateUrl: 'home.html'
        })
        .state('home.list', {
            url: "/list?size&page&dotal&startAt&endAt&type&status&id",
            templateUrl: 'list.html'
        })
        .state('home.articleDetail', {
            url: '/articleDetail?id',
            templateUrl: 'articleDetail.html'
        })
});
