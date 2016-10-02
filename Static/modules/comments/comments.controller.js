(function() {
    'use strict'
    angular

        .module('app.comment')
        .controller('CommentsController', CommentsController);


    function CommentsController($scope,$http) {
        var vm = this;
        vm.comment = addComment;
        vm.newComment =Comment;
       $scope.comment = '';
        vm.id = 0;
        $scope.tree =  [];
        var result = {};

$scope.tree.map(function(comment) {
	result[comment.parent] = 	result[comment.parent] || [];
		result[comment.parent].push(comment);
});
        console.log(result)
        var x ;
        for (var key in result){
	   if(key === "null") {
		  ///////
	   }else {
		x = $scope.tree.find(function(comment){
		  return comment.id === key;
		});
		
		result[key].forEach(function(comment) {
			x.child.push(comment)
		})
		
	}

}
        
//        $scope.tree = [{reply:'',likes: 0, disLikes: 0,content: 'first', class: "comments-1", id:"1", child: [{likes: 0, disLikes: 0,content:'first child',class: "comments-1-1", id:"1-1", child: []}, {likes: 0, disLikes: 0,child:[],content: "second child",class: "comments-1-1", id:"1-2"}]},
//            {likes: 0, disLikes: 0,content: 'second',child: [{likes: 0, disLikes: 0,content:'first child',class: "comments-1-1", id:"1-1", child: []}, {likes: 0, disLikes: 0,child:[{likes: 0, disLikes: 0,content:'first child',class: "comments-1-1", id:"1-1-2", child: []}, {likes: 0, disLikes: 0,child:[],content: "second child",class: "comments-1-1", id:"1-2-2"}],content: "second child",class: "comments-1-1", id:"1-2"}], class: "comments-1", id:"2"}
//        ];
  
        
        // should get the comments from the database
//        vm.comments = [
//            {content: 'first', class: "comments-1", id:"1", child: [{content:'first child',class: "comments-1-1", id:"1-1", child: []}, {child:[],content: "second child",class: "comments-1-1", id:"1-2"}]},
//            {content: 'second',child: [{content:'first child',class: "comments-1-1", id:"1-1", child: []}, {child:[{content:'first child',class: "comments-1-1", id:"1-1-2", child: []}, {child:[],content: "second child",class: "comments-1-1", id:"1-2-2"}],content: "second child",class: "comments-1-1", id:"1-2"}], class: "comments-1", id:"2"}
//        ];
        
        function Comment(reply,id,userName, date,parent) {
            this.content = reply;
            this.class = id;
            this.id = id;
            this.child = [];
            this.user = userName;
            this.date = date;
            this.likes = 0;
            this.disLikes = 0;
            this.parent = parent;
        }
        $scope.like = function(data) {
                data.likes++
                
        }
        
        $scope.disLike = function(data) {
                data.disLikes++
        }
        
        $scope.addComment = function(reply) {
            vm.id ++;
            $http.post('/addComment', new Comment(reply,vm.id,'userName',new Date,null)).then(function(data){},function(err){})
            $scope.tree.push(new Comment(reply,vm.id,'userName',new Date));
            $('#content').val('');
        }
        
        $scope.add = function(data,reply) {
            //vm.newComment(data,content)
            var post = data.child.length + 1;
            var newName = data.id + '-' + post;
            //data.child.push(vm.newComment(data,content));
            //var content = content;
//            data.child.push({reply:'',likes: 0, disLikes: 0,content: reply, class: newName, id: newName, child: [], user: 'somebody', date: new Date});
            data.child.push(new Comment(reply,newName,'someBody', new Date))
            data.reply = '';
        };
        
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


[
    {id:1,parent:null,child:[]},
    {id:2,parent:null,child:[]},
    {id:3,parent:null,child:[]},
    {id:1-1,parent:1,child:[]},
    {id:1-2,parent:2,child:[]},
    {id:1-3,parent:3,child:[]},
    {id:1-1-1,parent:1-1,child:[]},
    {id:1-1-2,parent:1-2,child:[]},
    {id:1-1-3,parent:1-3,child:[]}
]