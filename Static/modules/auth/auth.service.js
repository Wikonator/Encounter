(function() {
  'use strict';

  angular
    .module('app.auth')
    .factory('authService', authService);

  authService.$inject = ['$http'];

  function authService($http) {

    var service = {
      register: register,
      login: login,
      logout: logout,
      isLoggedIn: isLoggedIn,
      checkError: checkError,
      error: ''
    };

    return service;

    ////////////
      
    var loggedin = false;
      
    function checkError() {
        return service.error;
    }
      
    function register(user) {
        $http.post('/register', {
            user: user.user,
            email: user.email,
            password: user.password
        }).then(function() {
            login(user)
        }).catch(function(error) {
            service.error = error.data;
        });
    }

    function logout(user) {
        $http.get('/logout').then(function() {
            loggedin = false;
            location.hash = 'register'
            return;
        }).catch(function(error) {
            console.log(error)
            service.error = error;
        });
    }

    function login(user) {        
        $http.post('/login', {
            user: user.user,
            email: user.email,
            password: user.password
        }).then(function(result) {
            loggedin = true;
            location.hash = '';
            return;
        }).catch(function(error) {
            service.error = error.data;
        });
    }
    
    function isLoggedIn() {
      return loggedin;
    }
  }

})();