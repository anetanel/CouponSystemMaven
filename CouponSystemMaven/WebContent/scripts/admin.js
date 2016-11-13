(function () {
    var app = angular.module("couponSystem");

    var adminController = function ($scope, $http, uiGridConstants, $uibModal) {

    	var view = this;
    	
        $http.get("rest/admin/getAllCompanies")
            .then(function (response) {
                $scope.companies.data = response.data;
            });

        $http.get("rest/admin/getAllCustomers")
            .then(function (response) {
                $scope.customers.data = response.data;
            });


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
                    clientType: () => clientType
                }
            })
        };
        
        
        $scope.companies = {
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
        



    };

    app.controller("adminController", adminController);
}());