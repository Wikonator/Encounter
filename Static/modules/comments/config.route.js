(function() {
    'use strict'

    angular
        .module('app.s')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider'];

    function configFunction($routeProvider) {
        $routeProvider.when('/comments', {
            templateUrl: 'modules/comments/comments.html',
            controller: 'CommentsController',
            controllerAs: 'vm'
        });
    }
})();
