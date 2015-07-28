'use strict';

angular.module('users').controller('FriendRequestsController', ['$scope', '$stateParams', '$http', '$location',
                                                          'Authentication', 'Requests', 'Users',
  function($scope, $stateParams, $http, $location, Authentication, Requests, Users) {
    $scope.authentication = Authentication;

    $scope.friendStatuses = [];

    $scope.getRequests = function() {
      Requests.query({receiverID: $scope.authentication.user._id}, function(allRequests) {
        $scope.friendRequests = allRequests;
        for (var i=0; i<$scope.friendRequests.length; i++) {
          $scope.friendStatuses.push("unchanged");
        }
      });
    };

    $scope.acceptRequest = function(index) {
      var selectedRequest = $scope.friendRequests[index];
      selectedRequest.status = "accepted";

      selectedRequest.$update(function() {
        $http.post('api/users/friends', selectedRequest).success(function() {
          $scope.friendStatuses[index] = "accepted";
        }).error(function(response) {
          $scope.error = response.message;
        });

      }, function(errorResponse) {
        // todo: display error message
      });
    };

    $scope.rejectRequest = function(index) {
      var selectedRequest = $scope.friendRequests[index];
      selectedRequest.status = "rejected";

      selectedRequest.$update(function() {
        $scope.friendStatuses[index] = "rejected";
      }, function(errorResponse) {
        // todo: display error message
      });
    };

  }
]);
