(function () {
    var app = angular.module("couponSystem");

    var couponDialog = function ($scope, $http, $uibModalInstance, selectedRow) {
        $scope.selectedRow = selectedRow;
        $scope.startDateCollapsed = true;
        $scope.endDateCollapsed = true;

        $scope.couponTypes = {};
        $http.get("rest/general/getCouponTypes")
            .then(function (response) {
                $scope.couponTypes = response.data;
            });


        $scope.ok = function () {
            if (newCoupon) {
                console.log("new coupon")
            } else {
                console.log("edit coupon")
            }
            $scope.selectedRow = null;
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $scope.selectedRow = null;
            $uibModalInstance.dismiss('cancel');
        };
    };
    app.controller("couponDialog", couponDialog);
}());