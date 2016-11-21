(function () {

    var app = angular.module("couponSystem", ['ngFileUpload', 'ngAnimate', 'ngSanitize', 'ui.grid', 'ngRoute', 'ui.bootstrap', 'ui.grid.selection', 'angular-confirm', 'ui.grid.autoResize']);

    app.config(function ($routeProvider, $httpProvider) {
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
            .otherwise({redirectTo: "/login"});
        $httpProvider.interceptors.push('errorInterceptor');
    });

}());