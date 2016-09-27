(function() {
    'use strict'

    angular
        .module('app.s')
        .controller('CommentsController', CommentsController);


    function CommentsController($scope) {
        var vm = this;

        vm.reply = reply;

        function reply(val) {
            setTimeout(function() {
                $scope.$apply()
            },500)
            console.log($scope)
            var reply =angular.element("<div class="+ $(val.target).parent().attr("class") + "-1><p>hello world comment</p>" +
            '<p id="p" class="p">reply</p></div>');
            $(reply).on("click", vm.reply)
            $(val.target).parent().append(reply);

            //$scope.$apply();

        }


    }


})();
