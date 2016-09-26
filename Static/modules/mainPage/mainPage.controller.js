(function() {
  "use strict"

  angular
    .module(module.mainPage)
    .controller("MainPageController", MainPageController);

    function MainPageController($scope) {
      var scope = $scope,
          vm = this;

          vm.getAllLinks = getAllLinks;
          vm.logOut = logOut;

          function getAllLinks() {
            console.log("I'm getting links!");
          }
    }


})();
