(function () {
    var app = angular.module("couponSystem");

    var loginController = function ($scope, $http, $window, $uibModal) {

        var onLogin = function (response) {
            $scope.result = response.data;
            
            if ($scope.result.login) {
            	$uibModal.open(
                        {template: '<div style="text-align:center;margin-bottom:0px;" class="alert alert-success"><strong>Login Successful!</strong><br> Welcome, '+ $scope.username +'</div>'}
                    )
                $window.location.href = "#/" + $scope.clientType.toLowerCase()
            } else {
            	$uibModal.open(
                        {template: '<div style="text-align:center;margin-bottom:0px;" class="alert alert-warning"><strong>Login Failed!</strong><br> Login information is incorrect.</div>'}
                    )
            }
        };

        $scope.login = function (username, password, clientType) {       	
        	$scope.username = username;
            $http.get("login?username=" + username + "&password=" + password + "&clientType=" + clientType)
                .then(onLogin);
        };

        // set default radio button
        $scope.clientType="COMPANY";

    };

    app.controller("loginController", loginController);
}());
