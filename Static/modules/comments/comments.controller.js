(function() {
    'use strict'
    angular

        .module('app.comment')
        .controller('CommentsController', CommentsController);


    function CommentsController($scope,$http) {
        var vm = this;
        vm.comment = {};
        vm.newComment =Comment;
        vm.id = 0;
        vm.tree =  getComments();
        
        function Comment(reply,userName, date,parent) {
            this.content = reply;
//            this.class = id;
//            this.id = id;
            //this.child = [];
            this.user = userName;
            this.date = date;
            this.likes = 0;
            this.disLikes = 0;
            this.parent = parent;
        }
        
        vm.like = function(data) {
                data.likes++    
        }
        
        vm.disLike = function(data) {
                data.disLikes++
        }
       
        vm.addComment = function(reply) {
            vm.id ++;
            vm.comment = new Comment;
            $http.post('/addComment', new Comment(reply,'userName',new Date,null)).then(function(data){
                console.log(data)
                vm.tree.push(data.data[0]);
                console.table(vm.tree)
                },function(err){console.log(err)});
        }
        
        $scope.add = function(data,reply) {
            //vm.newComment(data,content);
            data.child = data.child || [];
            var post = data.child.length + 1;
            var newName = data.id + '-' + post;
            //data.child.push(vm.newComment(data,content));
            //var content = content;
//            data.child.push({reply:'',likes: 0, disLikes: 0,content: reply, class: newName, id: newName, child: [], user: 'somebody', date: new Date});
            console.log(data)
            $http.post('/addComment', new Comment(reply,'userName',new Date,data.id)).then(function(result) {
                console.log(result);
//                vm.tree.push(result.config.data);
                  data.child.push(result.config.data)
                console.table(vm.tree);
                data.reply = '';
            })
        };
        
        function getComments() {

            return $http.get("/getComments").then(function(data){
                vm.tree = data.data
             return  '';
            }).then(function() {
                var result = {};

                vm.tree.map(function(comment) {
                    comment.child = [];
                    result[comment.parent] = result[comment.parent] || [];
                    result[comment.parent].push(comment);
                });
                    console.table(result);
                    
                        var x ;
                        for (var key in result){
                           if(key === "null") {
                              ///////
                           }else {
                            x = vm.tree.find(function(comment){
                              return comment.id == key;
                            });
                            result[key].forEach(function(comment) {
                                x.child.push(comment)
                            })

                           }

                        }
                console.table(vm.tree)
                vm.tree =vm.tree.filter(function(comment,array,index){
                    return comment.parent === null
                })
                console.table(vm.tree)
                    }).catch(function(err){
                        location.hash = 'login'
                    })
                }

    }


})();
