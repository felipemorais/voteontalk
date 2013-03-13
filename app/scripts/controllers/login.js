'use strict';

angular.module('voteontalkApp').controller('LoginCtrl', function ($scope, $location, $rootScope) {
  $scope.loginUser = function () {
    $rootScope.userToken = $scope.token;
    $location.path('dashboard');
  };
});