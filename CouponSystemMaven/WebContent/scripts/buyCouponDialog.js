(function () {
    var app = angular.module("couponSystem");

    var buyCouponDialog = function ($scope, $http, $uibModalInstance, uiGridConstants, getCoupons) {
    	$scope.allCoupons = {
    			onRegisterApi: function (gridApi) {
                    $scope.gridApi = gridApi;
                },
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
    	
    	$http.get("rest/customer/getAllCoupons")
                .then(function (response) {
                    $scope.allCoupons.data = response.data;
                });


		    	var buyCoupon = function(couponId) {
			$http.post("rest/customer/buyCouponById?couponId=" + couponId)
					.then(function(response) {
						console.log("bought " + couponId);
					} , function(response) {
						console.log("did not buy " + couponId);
					})
		};
    	
        $scope.ok = function () {

        	var coupons = $scope.gridApi.selection.getSelectedRows();
        	
        	coupons.forEach(function (coupon) {
        		console.log(coupon.CouponId);
        		buyCoupon(coupon.CouponId);
        	});
        	
            $uibModalInstance.close();
            getCoupons();
        };

        $scope.cancel = function () {
            $scope.selectedRow = null;
            $uibModalInstance.dismiss('cancel');
        };

    };
    app.controller("buyCouponDialog", buyCouponDialog);
}());