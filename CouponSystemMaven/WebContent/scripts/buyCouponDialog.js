(function () {
    var app = angular.module("couponSystem");

    var buyCouponDialog = function ($scope, $http, $uibModalInstance, uiGridConstants, getCoupons) {
        $scope.allCoupons = {
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            enableFiltering: true,
            columnDefs: [
                {name: 'CouponId', type: 'number', sort: {direction: uiGridConstants.ASC, priority: 0}},
                {name: 'CouponTitle'},
                {name: 'CouponStartDate', type: 'date'},
                {name: 'CouponEndDate', type: 'date'},
                {name: 'CouponAmount', type: 'number'},
                {name: 'CouponType'},
                {name: 'CouponMessage'},
                {name: 'CouponPrice', type: 'number'},
                {
                    name: 'CouponImagePath',
                    displayName: 'Image',
                    cellTemplate: "<img height=\"30px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>"
                }
            ]
        };

        $http.get("rest/customer/getAllCoupons")
            .then(function (response) {
                $scope.allCoupons.data = response.data;
            });


        var success = function () {
            $uibModalInstance.close();
            getCoupons();
        };

        var buyCoupon = function (couponId) {
            $http.post("rest/customer/buyCouponById?couponId=" + couponId)
                .then(function (response) {
                    success();
                });
        };

        $scope.ok = function () {

            var coupons = $scope.gridApi.selection.getSelectedRows();

            coupons.forEach(function (coupon) {
                buyCoupon(coupon.CouponId);
            });

        };

        $scope.cancel = function () {
            $scope.selectedRow = null;
            $uibModalInstance.dismiss('cancel');
        };

    };
    app.controller("buyCouponDialog", buyCouponDialog);
}());