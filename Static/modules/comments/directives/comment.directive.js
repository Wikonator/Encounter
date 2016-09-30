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
    CommentsDirectiveController.$inject = ['$scope']
    function CommentsDirectiveController($scope) {
        console.log($scope)
        var vm = this;
        vm.newComment = new Comment;
        vm.addComment = addComment;
        vm.reply = reply;
        vm.drawReplies = drawReplies;
        vm.findComment = findComment;

         $scope.add = function(data) {
            var post = data.nodes.length + 1;
            var newName = data.name + '-' + post;
            data.nodes.push({name: newName,nodes: []});
        };
        
    $scope.tree = [{name: "Node", nodes: []}];
        
        
        function findComment(array,parentDiv) {
            
            console.log(parentDiv.attr("id"))
            console.log(parentDiv.target)
          var winner;
          for(var i =0; i < array.length; i++) {

            if(array[i].id === parentDiv.target.id) {

                return drawReplies(parentDiv,array[i])
               //return array[i];
            }

            if(array[i].child.length) {
              winner = findComment(array[i].child, parentDiv);
            }

            if(winner){
                return drawReplies(parentDiv,winner)
            }
          }

        }

        function drawReplies(parentDiv, comment) {
            console.log(comment)
            comment.child.forEach(function(reply) {
                //var reply =angular.element('<new-comment-directive comments = "vm.comments"></new-comment-directive>');

                var x = '<div class=' + reply.class + '><p>' + reply.content + '</p><button id=drawReplies>show replies</button><button ng-click="vm.reply()">reply</button></div>'
                var x = '<p class=' + reply.class +'>' + reply.content + '</p>'
                var button = angular.element('<button type="button" ng-click="vm.findComment()"  id={{reply.id}}>reply</button>')
                button.bind("click", function(){vm.findComment(vm.comments, $("#" +reply.id))});

                $(parentDiv.target).parent().append(x);
                $(parentDiv.target).parent().append(button);


            });
//$scope.$apply();
            //$(parentDiv.target).parent().append('<button type= "button" ng-click="vm.drawReplies($event)"');
        }
        function reply(val) {
            var reply =angular.element('<comment-directive comments ="vm.comments" class="comments-1-1"></comment-directive>');
            $(reply).on("click", vm.reply);
            $(val.target).parent().append(reply);
        }

        function addComment() {
            vm.comments.push(vm.newComment);
            console.table(vm.comments)
        }

        function Comment() {
            this.content = "";
            this.user = "";
            this.date = "";
            this.class = "";
        }
    }
})();
