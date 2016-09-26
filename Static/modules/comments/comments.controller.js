(function() {
    'use strict'

    angular
        .module('app.landing')
        .controller('CommentsController', CommentsController);

    function CommentsController($Scope) {
        console.log($Scope)
    }


})();
