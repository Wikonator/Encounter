(function() {
    'use strict'
    angular

        .module('app.comment')
        .controller('CommentsController', CommentsController);


    function CommentsController($scope) {
        var vm = this;

        vm.reply = reply;
        // should get the comments from the database
        vm.comments = [{comment: 'first'},{comment: 'second'},{comment: 'thrid'},{comment: 'four'},{comment: 'five'}];
        function reply(val) {
            console.log( $(val.target).parent().attr("class"))
            var reply =angular.element("<div class="+ $(val.target).parent().attr("class") + "-1><textare>hello world comment</textarea>" +
            '<p id="p" class="p">reply</p></div>');
            $(reply).on("click", vm.reply);
            $(val.target).parent().append(reply);
        }

        function getComments() {
            /*
            $get("/getComments", function() {

            })
            */
            return [{comment: 'first'},{comment: 'second'},{comment: 'thrid'},{comment: 'four'},{comment: 'five'}]
        }


    }


})();
