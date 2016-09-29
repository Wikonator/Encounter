(function() {
    'use strict'
    angular

        .module('app.comment')
        .controller('CommentsController', CommentsController);


    function CommentsController($scope) {
        var vm = this;
        vm.comment = addComment;
        vm.newComment =Comment;
        
        // should get the comments from the database
        vm.comments = [
            {content: 'first', class: "comments-1", id:"1", child: [{content:'first child',class: "comments-1-1", id:"1-1", child: []}, {child:[],content: "second child",class: "comments-1-1", id:"1-2"}]},
            {content: 'second',child: [{content:'first child',class: "comments-1-1", id:"1-1", child: []}, {child:[{content:'first child',class: "comments-1-1", id:"1-1-2", child: []}, {child:[],content: "second child",class: "comments-1-1", id:"1-2-2"}],content: "second child",class: "comments-1-1", id:"1-2"}], class: "comments-1", id:"2"}
        ];
        
        function Comment(data,reply) {
            console.table(data);
            console.log(content);
            var post = data.child.length + 1;
            var newName = data.name + '-' + post;
            this.content = content;
            this.class = newName;
            this.id = newName;
            this.child = [];
            this.user = "somebody";
            this.date = new Date;  
        }
        $scope.like = function(data) {
                data.likes++
                
        }
        
        $scope.disLike = function(data) {
                data.disLikes++
        }
        
        $scope.add = function(data,reply) {
            //vm.newComment(data,content)
            console.log(reply);
            var post = data.child.length + 1;
            var newName = data.id + '-' + post;
            //data.child.push(vm.newComment(data,content));
            //var content = content;
            data.child.push({reply:'',likes: 0, disLikes: 0,content: reply, class: newName, id: newName, child: [], user: 'somebody', date: new Date});
            data.reply = '';
        };
        
        $scope.tree = [
            {reply:'',likes: 0, disLikes: 0,content: 'first', class: "comments-1", id:"1", child: [{likes: 0, disLikes: 0,content:'first child',class: "comments-1-1", id:"1-1", child: []}, {likes: 0, disLikes: 0,child:[],content: "second child",class: "comments-1-1", id:"1-2"}]},
            {likes: 0, disLikes: 0,content: 'second',child: [{likes: 0, disLikes: 0,content:'first child',class: "comments-1-1", id:"1-1", child: []}, {likes: 0, disLikes: 0,child:[{likes: 0, disLikes: 0,content:'first child',class: "comments-1-1", id:"1-1-2", child: []}, {likes: 0, disLikes: 0,child:[],content: "second child",class: "comments-1-1", id:"1-2-2"}],content: "second child",class: "comments-1-1", id:"1-2"}], class: "comments-1", id:"2"}
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
