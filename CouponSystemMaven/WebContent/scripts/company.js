(function () {
    var app = angular.module("couponSystem");

    var companyController = function ($scope, $http, uiGridConstants, $uibModal, $confirm) {

    	$http.get("rest/company/getCompanyName")
    	.then(function(response){
    		$scope.companyName = response.data;
    	});
        $scope.mySelectedRow = false;
        $scope.deleteCoupon = function () {
            $confirm({
                text: 'Are you sure you want to delete "' + $scope.mySelectedRow.CouponTitle + ' (ID: ' + $scope.mySelectedRow.CouponId + ')" ?',
                title: 'Delete it',
                ok: 'Yes',
                cancel: 'No'
            })
                .then(function () {
                    $http.delete("rest/company/deleteCoupon?couponId=" + $scope.mySelectedRow.CouponId)
                        .then(function () {
                            $scope.getCoupons();
                        });

                });
        };

        $scope.newCoupon = function () {
            $scope.editCoupon(null, true);
        };

        $scope.editCoupon = function (row, isNew) {
            var modalInstance = $uibModal.open({
                controller: "couponDialog",
                templateUrl: 'html/coupondialog.html',
                resolve: {
                    selectedRow: () => {
                        if (row) return row.entity
                    },
                    isNew: () => isNew,
                    getCoupons: () => $scope.getCoupons
                }
            })
        };

        $scope.companyCoupons = {
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    $scope.mySelectedRow = gridApi.selection.getSelectedRows()[0];
                });
            },
            enableRowSelection: true,
            multiSelect: false,
            enableSelectAll: false,
            enableRowHeaderSelection: false,
            enableFiltering: true,
            rowTemplate: "<div ng-dblclick=\"grid.appScope.editCoupon(row)\" ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name\" class=\"ui-grid-cell\" ng-class=\"{ 'ui-grid-row-header-cell': col.isRowHeader }\" ui-grid-cell></div>",
            columnDefs: [
                {name: 'CouponId', type: 'number', sort: {direction: uiGridConstants.ASC, priority: 0}},
                {name: 'CouponTitle'},
                {name: 'CouponStartDate', type: 'date', cellFilter: 'date:\'yyyy-MM-dd\''},
                {name: 'CouponEndDate', type: 'date', cellFilter: 'date:\'yyyy-MM-dd\''},
                {name: 'CouponAmount', type: 'number'},
                {name: 'CouponType'},
                {name: 'CouponMessage'},
                {name: 'CouponPrice', type: 'numberStr'},
                {
                    name: 'CouponImagePath',
                    displayName: 'Image',
                    cellTemplate: "<img width=\"50px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>"
                }
            ]
        };

        $scope.getCoupons = function () {
            $http.get("rest/company/getAllCoupons")
                .then(function (response) {
                    $scope.companyCoupons.data = response.data;
                });
        };

        $scope.getCoupons();

    }

    app.controller("companyController", companyController);
}());
