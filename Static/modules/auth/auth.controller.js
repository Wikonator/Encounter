(function() {
    'use strict'
    
    angular
        .module('app.auth')
        .controller('AuthController',AuthController);
   
    AuthController.$inject = ['$http'];
    
   function AuthController($http) {
       var vm = this;
       
       vm.register = register;
       vm.login = login;
       vm.logout = logout;
       vm.user = {
           email: '',
           passwod: '',
           user: ''
       }
       vm .error = '';
       vm.isLoggedIn = true;
       
       function register(user) {
           $http.post('/register', {user:user.user,email: user.email, password: user.password}).then(function(){
               vm.login(user)
           }).catch(function(error) {
               vm.error = error;
           });
       }
       
       function logout(user){   
           $http.get('/logout').then(function(){
               vm.isLoggedIn = true;
               location.hash = 'register'
               return;
           }).catch(function(error){
               console.log('error')
               vm.error = error;
           });
       }
       
       function login(user){
           $http.get('/login').then(function(result){
               vm.isLoggedIn = false;
               location.hash = '';
               return ;
           }).catch(function(error) {
               vm.error = error;
           });
       }
   }
})();