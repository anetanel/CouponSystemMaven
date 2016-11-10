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
                "title": $scope.selectedRow.CouponTitle,
                "startDate": $scope.selectedRow.CouponStartDate.toISOString().split('T')[0],
                "endDate": $scope.selectedRow.CouponEndDate.toISOString().split('T')[0],
                "amount": $scope.selectedRow.CouponAmount,
                "type": $scope.selectedRow.CouponType,
                "message": $scope.selectedRow.CouponMessage,
                "price": $scope.selectedRow.CouponPrice,
                "image": $scope.selectedRow.CouponImagePath
            };

            if (isNew) {
                //createCoupon(coupon);
            }
            //console.log(coupon.startDate.toISOString());

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
    };
    app.controller("couponDialog", couponDialog);
}());