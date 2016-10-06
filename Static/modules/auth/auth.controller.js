(function() {
    'use strict'

    angular
        .module('app.auth')
        .controller('AuthController', AuthController);

    AuthController.$inject = ['authService'];
    
    function AuthController(authService) {
        var vm = this;
        vm.register = authService.register;
        vm.login = authService.login;
        vm.logout = authService.logout;
        vm.user = {
            email: '',
            passwod: '',
            user: ''
        }
        vm.error = authService.checkError;
        vm.isLoggedIn = authService.isLoggedIn;

    }
})();