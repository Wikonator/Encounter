(function() {

  'use strict'

   angular
       .module('module.mainPage')
       .config(configFunction);

   configFunction.$inject = ['$routeProvider'];

   function configFunction($routeProvider) {
       $routeProvider.when('/', {
           templateUrl: 'module/mainPage/mainPage.html',
           controller: 'MainController',
           controllerAs: 'vm'
       });
     }
})()
