(function () {
    var app = angular.module("couponSystem");

    var companyController = function ($scope, $http, uiGridConstants, $uibModal, $log) {


        $scope.showInfo = function (row) {

            var modalInstance = $uibModal.open({
                controller: childController,
                templateUrl: 'ngTemplate/infoPopup.html',
                resolve: {
                    selectedRow: function () {
                        return row.entity;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $log.log('modal selected Row: ' + selectedItem);
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        var childController = function ($scope, $uibModalInstance, selectedRow) {
            $scope.selectedRow = selectedRow;
            $scope.startDateCollapsed = true;
            $scope.endDateCollapsed = true;

            $scope.test = "blah";
            $scope.couponTypes = {};
            $scope.selected={};
            $http.get("rest/general/getCouponTypes")
                .then(function (response) {
                    $scope.couponTypes = response.data;
                });


            $scope.ok = function () {
                $scope.selectedRow = null;
                $uibModalInstance.close();
            };

            $scope.cancel = function () {
                $scope.selectedRow = null;
                $uibModalInstance.dismiss('cancel');
            };
        };


        $scope.companyCoupons = {
            enableRowSelection: true,
            multiSelect: false,
            enableSelectAll: false,
            enableRowHeaderSelection: false,
            enableFiltering: true,
            rowTemplate: "<div ng-dblclick=\"grid.appScope.showInfo(row)\" ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name\" class=\"ui-grid-cell\" ng-class=\"{ 'ui-grid-row-header-cell': col.isRowHeader }\" ui-grid-cell></div>",
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
