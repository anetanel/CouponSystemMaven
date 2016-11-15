(function () {
    var app = angular.module("couponSystem");

    var clientDialog = function ($scope, $http, $uibModalInstance, isNew, clientType, selectedRow) {
    	$scope.selectedRow = selectedRow;
    	$scope.isNew = isNew;
    	$scope.clientType = clientType;
    	$scope.passwordChecked = false;
    	$scope.password = null;
    	
    	console.log(selectedRow);
        $scope.ok = function () {
        	var client = {
        		"type": $scope.clientType,
        		"name": $scope.selectedRow.ClientName,
        		"id": $scope.selectedRow.ClientId
        	};
        	
        	if ($scope.passwordChecked || $scope.isNew) {
        		client.password = $scope.password;
        	}
        	if ($scope.clientType == "Company") {
        		client.email = $scope.selectedRow.CompanyEmail;
        	}
        	
        	if (isNew) {
        		createClient(client);
        	} else {
        		updateClient(client);
        	}
            $uibModalInstance.close();
            console.log(client);
        };

        $scope.cancel = function () {
            $scope.selectedRow = null;
            $uibModalInstance.dismiss('cancel');
        };
        
        var createClient = function(client) {
        	$http.post("rest/admin/create" + $scope.clientType, client);
        };
        
        var updateClient = function(client) {
        	$http.post("rest/admin/update" + $scope.clientType, client);
        };

    };
    app.controller("clientDialog", clientDialog);
}());