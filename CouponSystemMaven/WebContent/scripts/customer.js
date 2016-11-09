(function () {
    var app = angular.module("couponSystem");

    var customerController = function ($scope, $http, uiGridConstants) {

        $scope.customerCoupons = {
            columnDefs: [
                {name: 'CouponId', type: 'number',sort: {direction: uiGridConstants.ASC, priority: 0}},
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
                    cellTemplate: "<img width=\"50px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>"
                }
            ]
        };

        $http.get("rest/customer/getMyCoupons")
            .then(function (response) {
                $scope.customerCoupons.data = response.data;
            });


    }

    app.controller("customerController", customerController);
}());
