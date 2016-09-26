(function() {
    'use strict'

    angular
        .module('app.comments')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider'];

    function configFunction($routeProvider) {
        $routeProvider.when('/comments', {
            templateUrl: 'module/comments/commetns.html',
            controller: 'CommentsController',
            controllerAs: 'vm'
        });
    }
})();
