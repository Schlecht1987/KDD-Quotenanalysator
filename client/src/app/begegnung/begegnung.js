angular.module('begegnung', [])
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/begegnung', {
                templateUrl: 'begegnung/begegnung.tpl.html',
                controller: 'BegegnungController'
            });
        }
    ])
    .controller('BegegnungController', [
        'Console',
        '$translate',
        '$scope',
        '$http',
        '$filter',
        '$cookieStore',
        '$compile',
        '$location',
        function(
            Console,
            $translate,
            $scope,
            $http,
            $filter,
            $cookieStore,
            $compile,
            $location

        ) {
            Console.group("BegegnungController entered.");

            $http({
                method: "GET",
                url: '/begegnung/'
            }).
            success(function(data) {
                if (!data.error) {
                   $scope.begegnungData = data;
                  console.debug(data);
        
                }
            });

            Console.groupEnd();
        }
    ]);
