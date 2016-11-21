(function () {
    var app = angular.module("couponSystem");

    var couponDialog = function ($scope, $http, $uibModalInstance, selectedRow, isNew, getCoupons) {
        if (selectedRow) {
            $scope.selectedRow = selectedRow;
            $scope.selectedRow.CouponStartDate = new Date($scope.selectedRow.CouponStartDate);
            $scope.selectedRow.CouponEndDate = new Date($scope.selectedRow.CouponEndDate);
        } else {
            $scope.selectedRow = {};
        }
        $scope.startDateOpen = false;
        $scope.endDateOpen = false;

        $scope.couponTypes = {};
        $http.get("rest/general/getCouponTypes")
            .then(function (response) {
                $scope.couponTypes = response.data;
            });


        $scope.ok = function () {
        	$scope.invalidStartDate = false;
        	$scope.invalidEndDate = false;
        	if (!($scope.selectedRow.CouponStartDate instanceof Date)) {
        		$scope.invalidStartDate = true;
        		return;
        	}
        	if (!($scope.selectedRow.CouponEndDate instanceof Date)) {
        		$scope.invalidEndDate = true;
        		return;
        	}
            var coupon = {
                "id": $scope.selectedRow.CouponId,
                "title": $scope.selectedRow.CouponTitle,
                "startDate": $scope.selectedRow.CouponStartDate,
                "endDate": $scope.selectedRow.CouponEndDate,
                "amount": $scope.selectedRow.CouponAmount,
                "type": $scope.selectedRow.CouponType,
                "message": $scope.selectedRow.CouponMessage,
                "price": $scope.selectedRow.CouponPrice,
                "image": $scope.selectedRow.CouponImagePath
            };

            if (isNew) {
                createCoupon(coupon);
            } else {
                updateCoupon(coupon);
            }

        };

        $scope.cancel = function () {
            $scope.selectedRow = null;
            $uibModalInstance.dismiss('cancel');
        };

        var success = function () {
            $uibModalInstance.close();
            $scope.selectedRow = null;
            getCoupons();
        };
        
        var createCoupon = function (coupon) {
            $http.post("rest/company/createCoupon", coupon)
            	.then(function (response) {
                    success();
                });
        };

        var updateCoupon = function (coupon) {
            $http.post("rest/company/updateCoupon", coupon)
        		.then(function (response) {
        			success();
        		});
        };
    
    };
    app.controller("couponDialog", couponDialog);
}());