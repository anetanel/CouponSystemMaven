(function () {
    var app = angular.module("couponSystem");

    var companyController = function ($scope, $http, uiGridConstants, $uibModal) {

        $scope.newCoupon = function () {
            $scope.editCoupon(null, true);
        };

        $scope.editCoupon = function (row, isNew) {
            var modalInstance = $uibModal.open({
                controller: "couponDialog",
                templateUrl: 'html/coupondialog.html',
                resolve: {
                    selectedRow: () => {if(row) return row.entity},
                    isNew: () => isNew
                    }
                })
        };

        $scope.companyCoupons = {
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
                {name: 'CouponPrice', type: 'number', type: 'number'},
                {
                    name: 'CouponImagePath',
                    displayName: 'Image',
                    cellTemplate: "<img width=\"50px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>"
                }
            ]
        };

        $http.get("rest/company/getAllCoupons")
            .then(function (response) {
                $scope.companyCoupons.data = response.data;
            });

    }

    app.controller("companyController", companyController);
}());
