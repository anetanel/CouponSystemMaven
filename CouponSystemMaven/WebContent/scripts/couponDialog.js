(function () {
    var app = angular.module("couponSystem");

    var couponDialog = function ($scope, $http, $uibModalInstance, selectedRow, isNew, getCoupons) {
        if (selectedRow) {
            $scope.selectedRow = selectedRow;
        } else {
            $scope.selectedRow = {};
        }
        $scope.startDateCollapsed = true;
        $scope.endDateCollapsed = true;

        $scope.couponTypes = {};
        $http.get("rest/general/getCouponTypes")
            .then(function (response) {
                $scope.couponTypes = response.data;
            });


        $scope.ok = function () {
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


            $scope.selectedRow = null;
            $uibModalInstance.close();
            getCoupons();
        };

        $scope.cancel = function () {
            $scope.selectedRow = null;
            $uibModalInstance.dismiss('cancel');
        };

        var createCoupon = function(coupon) {
            $http.post("rest/company/createCoupon", coupon);
        };

        var updateCoupon = function(coupon) {
            $http.post("rest/company/updateCoupon", coupon);
        }
    };
    app.controller("couponDialog", couponDialog);
}());