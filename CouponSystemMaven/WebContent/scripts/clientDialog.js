(function () {
    var app = angular.module("couponSystem");

    var clientDialog = function ($scope, $http, $uibModalInstance, isNew, clientType, selectedRow, getAllClients, $uibModal) {
    	$scope.selectedRow = selectedRow;
    	$scope.isNew = isNew;
    	$scope.clientType = clientType;
    	$scope.passwordChecked = false;
    	$scope.password = null;
    	
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
        };

        $scope.cancel = function () {
            $scope.selectedRow = null;
            $uibModalInstance.dismiss('cancel');
        };
        
        var success = function() {
        	$uibModalInstance.close();
        	getAllClients();
        }
        
        var createClient = function(client) {
        	$http.post("rest/admin/create" + $scope.clientType, client)
        		.then(function(res) {
        			success();
        		});
        };
        
        var updateClient = function(client) {
        	$http.post("rest/admin/update" + $scope.clientType, client)
        		.then(function(res) {
            		success();
            	});
        };

    };
    app.controller("clientDialog", clientDialog);
}());