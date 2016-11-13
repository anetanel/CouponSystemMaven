(function () {

    var app = angular.module("couponSystem", ['ngAnimate', 'ngSanitize','ui.grid', 'ngRoute', 'ui.bootstrap', 'ui.grid.selection', 'angular-confirm']);

    
    app.service('sharedProperties', function() {
        var username = 'No User';

        return {
            getUsername: function() {
                return username;
            },
            setUsername: function(value) {
            	username = value;
            }
        }
    });
        
    app.config(function ($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "html/login.html",
                controller: "loginController"
            })
            .when("/company", {
                templateUrl: "html/company.html",
                controller: "companyController"
            })
            .when("/customer", {
                templateUrl: "html/customer.html",
                controller: "customerController"
            })
            .when("/admin", {
                templateUrl: "html/admin.html",
                controller: "adminController"
            })
            .otherwise({redirectTo: "/login"})
    });

}());