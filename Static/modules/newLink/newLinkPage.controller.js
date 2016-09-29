(function() {
  "use strict"

  angular
    .module("app.newLinkPage")
    .controller("newLinkPageController", newLinkPageController);

    function newLinkPageController($scope, $http) {
        var scope = $scope,
            vm = this;

            scope.clickToPost = function () {
                var formData = {
                    username : "ImHereToKickAxe",
                    link: scope.linkSpot,
                    description: scope.description
                };
              //   console.log(formData);
                $http.post("http://localhost:8080/postLink", formData).then(function(success) {
                    console.log("succes posting this stuff");
                    window.location.hash = "/";
                }, function(error){
                    console.log(error);
                });
            }
    }

    })();
