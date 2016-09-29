(function() {
    'use strict'
    angular

        .module('app.comment')
        .controller('CommentsController', CommentsController);


    function CommentsController($scope) {
        var vm = this;
        vm.comment = addComment;
        // should get the comments from the database
        vm.comments = [
            {content: 'first', class: "comments-1", id:"1", child: [{content:'first child',class: "comments-1-1", id:"1-1", child: []}, {child:[],content: "second child",class: "comments-1-1", id:"1-2"}]},
            {content: 'second',child: [{content:'first child',class: "comments-1-1", id:"1-1", child: []}, {child:[{content:'first child',class: "comments-1-1", id:"1-1-2", child: []}, {child:[],content: "second child",class: "comments-1-1", id:"1-2-2"}],content: "second child",class: "comments-1-1", id:"1-2"}], class: "comments-1", id:"2"}
        ];
        
        $scope.add = function(data) {
            var post = data.child.length + 1;
            var newName = data.name + '-' + post;
            data.child.push({name: newName,child: []});
        };
    $scope.tree = [
            {name: 'first', class: "comments-1", id:"1", child: [{name:'first child',class: "comments-1-1", id:"1-1", child: []}, {child:[],name: "second child",class: "comments-1-1", id:"1-2"}]},
            {name: 'second',child: [{name:'first child',class: "comments-1-1", id:"1-1", child: []}, {child:[{name:'first child',class: "comments-1-1", id:"1-1-2", child: []}, {child:[],name: "second child",class: "comments-1-1", id:"1-2-2"}],name: "second child",class: "comments-1-1", id:"1-2"}], class: "comments-1", id:"2"}
        ];

        function getComments() {

            /*
            $get("/getComments", function() {

            })
            */
            return [{comment: 'first'},{comment: 'second'},{comment: 'thrid'},{comment: 'four'},{comment: 'five'}]
        }

        function addComment() {
            vm.comments.push(vm.newComment);
            console.table(vm.comments)
        }


    }


})();
