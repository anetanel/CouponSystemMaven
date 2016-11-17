var module = angular.module("couponSystem");
module.factory("errorInterceptor", ['$q', '$injector', function($q, $injector) {
	var errorInterceptor = {
		responseError : function(response) {
			if (response.status === 500) {
				if (response.data.errorMessage) {				
					$injector.get('$uibModal').
						open({template: '<div style="text-align:center;margin-bottom:0px;" class="alert alert-warning"><strong>Warning!</strong><br>'+ response.data.errorMessage +'.</div>'});	
				} else {
					console.log(response.statusText)
				}
			}
			return $q.reject(response);
		}
	}
	return errorInterceptor;
} ]);