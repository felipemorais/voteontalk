'use strict';
angular.module('voteontalkApp').factory('$talkService', ['$rootScope', '$resource', '$filter', '$location', function ($scope, $resource, $filter, $location) {

	var updateInterval = 10000;
	var res = $resource(
		'./apitalk/:id/:controller',
		{
			id: '@id',
			controller: '@controller'
		}
	);

	$scope.allTalk = [];

	function fetch() {
		var url = res.query({}, angular.noop, function (response) {
		  //redirect if Unauthorized
		  if (response.status === 401) {
		    $location.path('login');
		  }
		});
		return url;
	}

	$scope.getAll = function () {
		return $scope.allTalk;
	};

	$scope.getById = function (talkId) {
		var talklist = $filter('filter')($scope.allTalk, { id: talkId });
		return (talklist.length > 0) ? talklist[0] : false;
	};
	$scope.updateVote = function (talkId, voteValue) {
		res.save({
			id: talkId,
			controller: 'sendVote',
			username: $scope.userToken,
			vote: voteValue
		},
		{});
	};
	//Update TalkList
	setInterval(function () {
		$scope.$apply(function () {
			$scope.allTalk = fetch();
		});
	}, updateInterval);

	$scope.allTalk = fetch();

	return $scope;

}]);