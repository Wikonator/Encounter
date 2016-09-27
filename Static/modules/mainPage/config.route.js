(function() {

  'use strict'

   angular
       .module('app.mainPage')
       .config(configFunction);

   configFunction.$inject = ['$routeProvider'];

   function configFunction($routeProvider) {
       $routeProvider.when('/', {
           templateUrl: 'modules/mainPage/mainPage.html',
           controller: 'MainPageController',
           controllerAs: 'vm'
       });
     }
})()
