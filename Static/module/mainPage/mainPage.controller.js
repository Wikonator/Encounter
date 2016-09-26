(function() {
  "use strict"

  angular
    .module(module.mainPage)
    .controller("MainController", MainController);

    function MainController($scope) {
      var scope = $scope,
          vm = this;

          vm.getAllLinks = getAllLinks;
          vm.logOut = logOut;

          function getAllLinks() {
            console.log("I'm getting links!");
          }
    }


})();
