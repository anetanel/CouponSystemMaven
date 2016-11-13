(function () {
    var app = angular.module("couponSystem");

    var customerController = function ($scope, $http, uiGridConstants, $uibModal) {

    	$http.get("rest/customer/getCustomerName")
    	.then(function(response){
    		$scope.customerName = response.data;
    	});
    	$scope.buyCoupons = function () {
            var modalInstance = $uibModal.open({
            	controller: "buyCouponDialog",
                templateUrl: 'html/buycoupondialog.html',
                resolve: {
                    getCoupons: () => $scope.getCoupons
                }
            })
        };
    	
        $scope.customerCoupons = {
        	enableFiltering: true,
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
        
        $scope.getCoupons= function() {
        	$http.get("rest/customer/getMyCoupons")
            	.then(function (response) {
            		console.log("in getCoupons");
            		$scope.customerCoupons.data = response.data;
            	});
        };

        $scope.getCoupons();
        
        

    }

    app.controller("customerController", customerController);
}());
