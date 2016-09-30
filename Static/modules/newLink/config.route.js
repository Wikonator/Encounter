(function() {

  'use strict'

   angular
       .module('app.newLinkPage')
       .config(configFunction);

   configFunction.$inject = ['$routeProvider'];

   function configFunction($routeProvider) {
       $routeProvider.when('/newLinkPage', {
           templateUrl: 'modules/newLink/newLinkPage.html',
           controller: 'newLinkPageController',
           controllerAs: 'vm'
       });
     }
})()
