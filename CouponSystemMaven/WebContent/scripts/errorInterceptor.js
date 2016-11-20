var module = angular.module("couponSystem");
module.factory("errorInterceptor", ['$rootScope', '$q', '$injector', '$location', function ($rootScope, $q, $injector, $location) {

    $rootScope.modals = 0;

    var errorInterceptor = {
        responseError: function (response) {
            if (response.status === 500) {
                if (response.data.errorMessage) {
                    $injector.get('$uibModal').open({template: '<div style="text-align:center;margin-bottom:0px;" class="alert alert-warning"><strong>Warning!</strong><br>' + response.data.errorMessage + '.</div>'});
                } else if (response.data.redirect) {
                    if ($rootScope.modals < 1) {
                        $rootScope.modals++;
                        $injector.get('$uibModal').open({template: '<div style="text-align:center;margin-bottom:0px;" class="alert alert-warning"><strong>Warning!</strong><br>' + response.data.filter + '.</div>'});

                        $location.path('/')
                    } else {
                        $rootScope.modals = 0;
                    }

                } else {
                    $injector.get('$uibModal').open({template: '<div style="text-align:center;margin-bottom:0px;" class="alert alert-danger"><strong>Error!</strong><br>' + response.statusText + '.</div>'});
                }
            }
            return $q.reject(response);
        }
    }
    return errorInterceptor;
}]);