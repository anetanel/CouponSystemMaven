(function () {
    var app = angular.module("couponSystem");

    var adminController = function ($scope, $http, uiGridConstants ) {

        $http.get("rest/admin/getAllCompanies")
            .then(function (response) {
                $scope.companies.data = response.data;
            });

        $http.get("rest/admin/getAllCustomers")
            .then(function (response) {
                $scope.customers.data = response.data;
            });


        $scope.companies = {
            columnDefs: [
                {name: 'ClientId', displayName: 'ID', type: 'number', sort: {direction: uiGridConstants.ASC, priority: 0}},
                {name: 'ClientName', displayName: "Company Name"},
                {name: 'CompanyEmail' },
                {name: 'ClientCoupons', field: 'ClientCoupons.length', displayName: 'Coupons', type: 'number'}
            ]
        };
        $scope.customers = {
            columnDefs: [
                {name: 'ClientId', displayName: 'ID', type: 'number'},
                {name: 'ClientName', displayName: 'Customer Name'},
                {name: 'ClientCoupons', field: 'ClientCoupons.length', displayName: 'Coupons', type: 'number'}
            ]
        };


    };

    app.controller("adminController", adminController);
}());