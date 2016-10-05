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
      error: ''
    };

    return service;

    ////////////
      
    var loggedin = false;
    console.log('authservice')
    function register(user) {
        $http.post('/register', {
            user: user.user,
            email: user.email,
            password: user.password
        }).then(function() {
            login(user)
        }).catch(function(error) {
            service.error = error;
        });
    }

    function logout(user) {
        $http.get('/logout').then(function() {
            loggedin = false;
            location.hash = 'register'
            return;
        }).catch(function(error) {
            console.log('error')
            service.error = error;
        });
    }

    function login(user) {        
        $http.get('/login').then(function(result) {
            loggedin = true;
            console.log(loggedin)
            location.hash = '';
            return;
        }).catch(function(error) {
            console.log('error')
            service.error = error;
        });
    }
    
    function isLoggedIn() {
        console.log('isloggedin')
      return loggedin;
    }
  }

})();