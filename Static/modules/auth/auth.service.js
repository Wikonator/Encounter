(function() {
  'use strict';

  angular
    .module('app.auth')
    .factory('authService', authService);

  authService.$inject = ['$http'];

  function authService($http) {

    var service = {
      isLoggedIn: isLoggedIn,
      userName: userName,
      user : null,
      register: register,
      login: login,
      logout: logout,
//      isLoggedIn: isLoggedIn,
      checkError: checkError,
      error: ''
    };

    return service;

    ////////////
      
    var loggedin = false;
     
    function userName() {
        return $http.get('/isLoggedIn').then(function(result) {
            service.user = result.data.name;
            return result.data;
        });
    }
      
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
            service.user = null;
            location.hash = 'register';
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
            service.user = user.user;
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