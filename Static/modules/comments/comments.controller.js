(function() {
    'use strict'
    angular

        .module('app.comment')
        .controller('CommentsController', CommentsController);

    CommentsController.$inject = ["$scope", "$http", "authService"];
    function CommentsController($scope,$http,authService) {
        var vm = this;
        vm.comment = {};
        vm.newComment =Comment;
        vm.id = getParameterByName('id');
        vm.tree =  getComments();
        vm.description = getParameterByName('description');
        vm.link = getParameterByName('url');
        vm.userName = '';
        
        authService.userName().then(function(name) {
            vm.userName = name.name;
        }).catch(function(err) {
            vm.userName = null;   
        });
        
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
            $http.post('/addComment', new Comment(reply,vm.userName,(new Date).toString().split('GMT')[0],null,vm.id)).then(function(data){
                vm.tree.push(data.data[0]);
                },function(err){console.log(err)});
        }
        
        $scope.add = function(data,reply) {
            data.child = data.child || [];
            var post = data.child.length + 1;
            var newName = data.id + '-' + post;
            var newComment = new Comment(reply,vm.userName,(new Date).toString().split('GMT')[0],data.id,vm.id);
            $http.post('/addComment', newComment).then(function(result) {
                newComment.id = result.data[0].id; 
                data.child.push(result.config.data)
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
                vm.tree =vm.tree.filter(function(comment,array,index){
                    return comment.parent === null
                })
                
                    }).catch(function(err){
                        location.hash = 'login'
                    })
                }

    }


})();
