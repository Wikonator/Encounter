(function() {
  "use strict"

  angular
    .module("app.mainPage")
    .controller("MainPageController", MainPageController);

    function MainPageController($scope, $http, $location) {
      var scope = $scope,
          vm = this;

          vm.getAllLinks = getAllLinks;
          vm.logOut = logOut;
        //   vm.switchPageToLinks = switchPageToLinks;


          scope.changeView = function (view) {
            //   console.log(view);
              console.log("changing view to new Links");
              location.hash = view;
          }

          scope.comments = function(comments, link) {
              location.hash = '#comments?id=' + link.id +'&description=' + link.description + '&rul=' + link.link;
          }

          function getAllLinks() {
            $http.get("http://localhost:8080/getLinks").then(function(data){
                // console.log(data.data);
                scope.links = data.data;
            });
          };
          getAllLinks();

          function logOut() {
              console.log("loggin out");
          }
    }


})();
