'use strict';

angular.module('voteontalkApp')
  .controller('MainCtrl', function ($scope, $talkService) {
    
    $scope.talklist = $talkService.getAll();


  });
