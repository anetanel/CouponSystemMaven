(function () {
    var app = angular.module("couponSystem");

    var loginController = function ($scope, $http, $window, $uibModal, sharedProperties) {

        var onLogin = function (response) {
            $scope.result = response.data;
            
            if ($scope.result.login) {
            	$uibModal.open(
                        {template: 'Welcome ' + $scope.username}
                    )
                $window.location.href = "#/" + $scope.clientType.toLowerCase()
            } else {
            	$uibModal.open(
                        {template: 'Login information is incorrect!'}
                    )
            }
        };

        $scope.login = function (username, password, clientType) {
            // $scope.result=username + "," + password + "," + clientType;
        	sharedProperties.setUsername(username);
        	$scope.username = username;
            $http.get("login?username=" + username + "&password=" + password + "&clientType=" + clientType)
                .then(onLogin);
        };

        // set default radio button
        $scope.clientType="COMPANY";

    };

    app.controller("loginController", loginController);
}());
