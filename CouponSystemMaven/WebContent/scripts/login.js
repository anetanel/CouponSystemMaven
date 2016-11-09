(function () {
    var app = angular.module("couponSystem");

    var loginController = function ($scope, $http, $window, $uibModal) {

        var onLogin = function (response) {
            $scope.result = response.data;
            $uibModal.open(
                {template: $scope.result.login.toString()}
            )
            if ($scope.result.login) {
                $window.location.href = "#/" + $scope.clientType.toLowerCase()
            }
        };

        $scope.login = function (username, password, clientType) {
            // $scope.result=username + "," + password + "," + clientType;
            $http.get("login?username=" + username + "&password=" + password + "&clientType=" + clientType)
                .then(onLogin);
        };

        // set default radio button
        $scope.clientType="COMPANY";

    };

    app.controller("loginController", loginController);
}());
