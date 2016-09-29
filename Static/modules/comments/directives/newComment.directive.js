(function() {
    "use strict";

    angular
        .module("app.comment")
        .directive("newCommentDirective", newCommentDirective);

    function newCommentDirective() {
        return {
            templateUrl: 'modules/comments/directives/newComment.html',
            restrict: 'E',
            scope: {
                comments: '='
            },
            bindToController: true,
            controller: NewCommentsDirectiveController,
            controllerAs: "vm"
        }
    }

    function NewCommentsDirectiveController() {
        var vm = this;
        vm.newComment = new Comment;
        vm.addComment = addComment;

        function addComment() {
            vm.comments.push(vm.newComment);
            console.table(vm.comments)
            vm.newComment = new Comment;
        }

        function Comment() {
            this.content = "";
            this.user = "";
            this.date = "";
            this.class = "";
        }
    }
})();
