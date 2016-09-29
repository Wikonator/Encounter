(function() {
  "use strict"

  angular
    .module("app.mainPage")
    .controller("MainPageController", MainPageController);

    function MainPageController($scope, $http) {
      var scope = $scope,
          vm = this;

          vm.getAllLinks = getAllLinks;
          vm.logOut = logOut;

          function getAllLinks() {
            $http.get("http://localhost:8080/getLinks").then(function(data){
                console.log(data.data);
                scope.links = data.data;
            });
          };
          getAllLinks();

          function logOut() {
              console.log("loggin out");
          }
    }


})();
