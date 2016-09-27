(function() {
    "use strict"

    angular
        .module("app.comment")
        .directive("commentDirective", commentDirective);

    function commentDirective() {
        return {
            templateUrl: 'modules/comments/directives/comment.html',
            restrict: 'E',
            scope: {
                comments: '='
            },
            bindToController: true,
            controller: CommentsDirectiveController,
            controllerAs: "vm"
        }
    }

    function CommentsDirectiveController() {

        var vm = this;
console.log(vm.comments)
        vm.newComment = new Comment;
        vm.addComment = addComment;

        function addComment() {
            vm.comments.push(vm.newComment);
            console.log(vm.comments)
        }

        function Comment() {
            this.content = "";
            this.user = "";
            this.date = "";
        }
    }
})();
