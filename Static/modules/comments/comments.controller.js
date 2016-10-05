(function() {
    'use strict'
    angular

        .module('app.comment')
        .controller('CommentsController', CommentsController);


    function CommentsController($scope,$http) {
        var vm = this;
        vm.comment = {};
        vm.newComment =Comment;
        vm.id = getParameterByName('id');
        vm.tree =  getComments();
        
        function getParameterByName(name, url) {
                if (!url) url = window.location.href;
                name = name.replace(/[\[\]]/g, "\\$&");
                var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                    results = regex.exec(url);
                if (!results) return null;
                if (!results[2]) return '';
                return decodeURIComponent(results[2].replace(/\+/g, " "));
        }
        
        
        function Comment(reply,userName, date,parent,id) {
            this.content = reply;
//            this.class = id;
//            this.id = id;
            //this.child = [];
            this.user = userName;
            this.date = date;
            this.likes = 0;
            this.disLikes = 0;
            this.parent = parent;
            this.linkId = id;
        }
        
        vm.like = function(data) {
                data.likes++    
        }
        
        vm.disLike = function(data) {
                data.disLikes++
        }
       
        vm.addComment = function(reply) {
            vm.comment = new Comment;
            $http.post('/addComment', new Comment(reply,'userName',new Date,null,vm.id)).then(function(data){
                vm.tree.push(data.data[0]);
                },function(err){console.log(err)});
        }
        
        $scope.add = function(data,reply) {
            data.child = data.child || [];
            var post = data.child.length + 1;
            var newName = data.id + '-' + post;
            //data.child.push(vm.newComment(data,content));
            //var content = content;
//            data.child.push({reply:'',likes: 0, disLikes: 0,content: reply, class: newName, id: newName, child: [], user: 'somebody', date: new Date});
            console.log(data);
            console.log('here')
            var newComment = new Comment(reply,'userName',new Date,data.id,vm.id);
            $http.post('/addComment', newComment).then(function(result) {
                newComment.id = result.data[0].id
                console.log(result);
//                vm.tree.push(result.config.data);
                  data.child.push(result.config.data)
                console.table(vm.tree);
                data.reply = '';
            })
        };
        
        function getComments() {
            

            return $http.get("/getComments" + "?id=" + vm.id).then(function(data){
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
