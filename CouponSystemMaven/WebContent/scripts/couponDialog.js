(function () {
    var app = angular.module("couponSystem");

    var couponDialog = function ($scope, $http, $uibModal, $uibModalInstance, selectedRow, isNew, getCoupons, Upload) {
        if (selectedRow) {
            $scope.selectedRow = selectedRow;
            $scope.selectedRow.CouponStartDate = new Date($scope.selectedRow.CouponStartDate);
            $scope.selectedRow.CouponEndDate = new Date($scope.selectedRow.CouponEndDate);
        } else {
            $scope.selectedRow = {};
        }
        $scope.startDateOpen = false;
        $scope.endDateOpen = false;
        //$scope.iconFile = false;

     // upload on file select or drop
        $scope.selectIcon = function (file) {
        	console.log('a' + file)
        	if (file.size > 1024000) {
        		//$scope.alerts = [{message: "Icon file upload is limited to 1 Mb."}];
        		$uibModal.open(
                        {
                        	template: '<div style="text-align:center;margin-bottom:0px;" class="alert alert-danger"><strong>File is too big!</strong><br>Uploaded icon files are limited to 1Mb.</div>',
                        	size: 'sm'	
                        }
                    )
        	} else if (file.type.split("/")[0] != "image"){
        		$uibModal.open(
                        {
                        	template: '<div style="text-align:center;margin-bottom:0px;" class="alert alert-danger"><strong>File is not an image!</strong><br>Only image type files are allowed.</div>',
                        	size: 'sm'
                        }
                    )
        	} else {
        		$scope.iconFile = file;
        	}
        };
        
        $scope.closeAlert = function(index) {
        	$scope.alerts.splice(index, 1);
        };
        
        var upload = function () {
        	Upload.upload({
        		url: 'rest/upload',
        		data: {file: $scope.iconFile}
        	});
        };
        
        
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
                "image": '/img/' + $scope.iconFile.name
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
        	upload();
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