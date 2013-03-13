'use strict';

angular.module('voteontalkApp', ['ngResource'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/dashboard', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/detail/:talkId', {
        templateUrl: 'views/details.html',
        controller: 'DetailTalkCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/dashboard'
      });
  }).run(['$rootScope', '$location', function ($rootScope, $location) {

    //is there a access token
    $rootScope.userToken = $rootScope.userToken || '';
    //check access token on each route change
    $rootScope.$on('$routeChangeStart', function (e, newValue) {
      var route = newValue.$route;

      if (route && route.controller !== 'LoginCtrl' && !$rootScope.userToken) {
        $location.url('/login');
      }

    });
  }
]);