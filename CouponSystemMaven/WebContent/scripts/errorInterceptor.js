(function(){
function errorInterceptor() {
  return {
    responseError: function(response) {
    	if (response.status === 500) {
    		console.log(response)
    		if (response.data.errorMessage) {
    			console.log(response.data.errorMessage);
    		} else {
    			console.log(response.statusText)
    		}
    		
        }
      return response;
    }
  }
}

var module = angular.module("couponSystem");
module.factory("errorInterceptor", errorInterceptor);
}());