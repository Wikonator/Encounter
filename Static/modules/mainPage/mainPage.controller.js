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

          scope.clickToPost = function () {
              var formData = {
                  username : "ImHereToKickAxe",
                  link: scope.linkSpot,
                  description: scope.description
              };
            //   console.log(formData);
              $http.post("http://localhost:8080/postLink", formData).then(function(success) {
                  console.log("succes posting this stuff");
              }, function(error){
                  console.log(error);
              });
          }

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
