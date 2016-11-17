(function () {
    var app = angular.module("couponSystem");

    var adminController = function ($scope, $http, uiGridConstants, $uibModal, $confirm) {

    	var view = this;
    	$scope.selectedCompanyRow = false;
    	$scope.selectedCustomerRow = false;
    	
    	$scope.deleteClient = function (client) {
    		if (client == 'Company') {
    			$scope.mySelectedRow = $scope.selectedCompanyRow;
    		} else if (client == 'Customer') {
    			$scope.mySelectedRow = $scope.selectedCustomerRow;
    		}
            $confirm({
                text: 'Are you sure you want to delete "' + $scope.mySelectedRow.ClientName + ' (ID: ' + $scope.mySelectedRow.ClientId + ')" ?',
                title: 'Delete '+ client,
                ok: 'Yes',
                cancel: 'No'
            })
                .then(function () {
                    $http.delete("rest/admin/delete" + client + "?id=" + $scope.mySelectedRow.ClientId)
                        .then(function () {
                        	$scope.selectedCompanyRow = false;
                        	$scope.selectedCustomerRow = false;
                        	$scope.getAllCompanies();
                            $scope.getAllCustomers();
                        });

                });
        };
        
        $scope.getAllCompanies = function () {
        	$http.get("rest/admin/getAllCompanies")
            .then(function (response) {
                $scope.companies.data = response.data;
            });
        };

        $scope.getAllCustomers = function () {
        	$http.get("rest/admin/getAllCustomers")
            .then(function (response) {
                $scope.customers.data = response.data;
            });
        };

        $scope.getAllClients = function () {
        	$scope.getAllCompanies();
            $scope.getAllCustomers();
        };
        

        $scope.newClient = function (clientType) {
            $scope.editClient(null, clientType, 'New');
        };
        
        $scope.editClient = function (row, clientType, isNew) {
            var modalInstance = $uibModal.open({
                controller: "clientDialog",
                templateUrl: 'html/clientdialog.html',
                resolve: {
                    selectedRow: () => {
                        if (row) return row.entity
                    },
                    isNew: () => isNew,
                    clientType: () => clientType,
                    getAllClients: () => $scope.getAllClients
                }
            })
        };
        
        
        $scope.companies = {
        		onRegisterApi: function (gridApi) {
                    $scope.gridApi = gridApi;
                    gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                        $scope.selectedCompanyRow = gridApi.selection.getSelectedRows()[0];
                    });
                },
        		enableRowSelection: true,
                multiSelect: false,
                enableSelectAll: false,
                enableRowHeaderSelection: false,
                enableFiltering: true,
                rowTemplate: "<div ng-dblclick=\"grid.appScope.editClient(row, 'Company')\" ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name\" class=\"ui-grid-cell\" ng-class=\"{ 'ui-grid-row-header-cell': col.isRowHeader }\" ui-grid-cell></div>",
            columnDefs: [
                {name: 'ClientId', displayName: 'ID', type: 'number', sort: {direction: uiGridConstants.ASC, priority: 0}},
                {name: 'ClientName', displayName: "Company Name"},
                {name: 'CompanyEmail' },
                {name: 'ClientCoupons', field: 'ClientCoupons.length', displayName: 'Coupons', type: 'number'}
            ]
        };
        
        
        $scope.customers = {        	
        		onRegisterApi: function (gridApi) {
                    $scope.gridApi = gridApi;
                    gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                        $scope.selectedCustomerRow = gridApi.selection.getSelectedRows()[0];
                    });
                },
        		enableRowSelection: true,
                multiSelect: false,
                enableSelectAll: false,
                enableRowHeaderSelection: false,
                enableFiltering: true,
        	rowTemplate: "<div ng-dblclick=\"grid.appScope.editClient(row, 'Customer')\" ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name\" class=\"ui-grid-cell\" ng-class=\"{ 'ui-grid-row-header-cell': col.isRowHeader }\" ui-grid-cell></div>",
            columnDefs: [
                {name: 'ClientId', displayName: 'ID', type: 'number', sort: {direction: uiGridConstants.ASC, priority: 0}},
                {name: 'ClientName', displayName: 'Customer Name'},
                {name: 'ClientCoupons', field: 'ClientCoupons.length', displayName: 'Coupons', type: 'number'}
            ]
        };
        
        //
        // Load Companies and Customers details
        //

        $scope.getAllClients();

    };

    app.controller("adminController", adminController);
}());