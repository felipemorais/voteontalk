'use strict';

angular.module('voteontalkApp').controller('DetailTalkCtrl', function ($scope, $talkService, $routeParams) {
  var talkId = $routeParams.talkId;
  $scope.talk = [];
  $scope.talkUpdate = function () {
    $scope.talk = $talkService.getById(talkId);
  };
  $scope.voteTalk = function (voteValue) {
    $talkService.updateVote(talkId, voteValue);
  };
});