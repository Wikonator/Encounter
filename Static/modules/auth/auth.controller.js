(function() {
    'use strict'

    angular
        .module('app.auth')
        .controller('AuthController', AuthController);

    AuthController.$inject = ['authService'];
    
    function AuthController(authService) {
        
        var vm = this;
        vm.isLoggedIn = authService.isLoggedIn;
        vm.register = authService.register;
        vm.login = authService.login;
        vm.logout = authService.logout;
        vm.user = {
            email: '',
            passwod: '',
            user: ''
        }
        
        vm.error = authService.checkError;
        
        
//        authService.userName().then(function(name) {
//            console.log('success')
//            vm.isLoggedIn = name.isLoggedIn;
//        }).catch(function(){
//            console.log('faild')
//            vm.isLoggedIn = null;
//        })
    }
})();