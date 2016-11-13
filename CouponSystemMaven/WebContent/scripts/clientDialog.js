(function () {
    var app = angular.module("couponSystem");

    var clientDialog = function ($scope, $http, $uibModalInstance, isNew, clientType, selectedRow) {
    	$scope.selectedRow = selectedRow;
    	$scope.isNew = isNew;
    	$scope.clientType = clientType;
    	
    	console.log(selectedRow);
        $scope.ok = function () {
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $scope.selectedRow = null;
            $uibModalInstance.dismiss('cancel');
        };

    };
    app.controller("clientDialog", clientDialog);
}());