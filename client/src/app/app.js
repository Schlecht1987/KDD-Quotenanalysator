// Hauptmodul 
angular.module('app', [
    'ngRoute',
    'start',
    'begegnung',
    'quoten',
    'ngResource',
    'ngCookies',
    'pascalprecht.translate',
    'services.console',
    'directives.highcharts',
    'templates.app',
    'templates.common',
    'ui.bootstrap',
    'highcharts-ng',
    'myDatepicker',
    'bootstrapSlider',
    'angularUtils.directives.dirPagination'

]);

angular.module('app').config(['$routeProvider', '$locationProvider', '$translateProvider',

    function($routeProvider, $locationProvider, $translateProvider) {
        $locationProvider.html5Mode(false);
        $routeProvider.otherwise({
            redirectTo: '/quoten'
        });
        $translateProvider.translations('de', {

        });
        $translateProvider.translations('en', {

        });
        $translateProvider.preferredLanguage('de');
        $translateProvider.useCookieStorage();
    }
]);

angular.module('app').controller('AppCtrl', [
    'Console',
    '$translate',
    '$rootScope',
    '$cookieStore',
    '$location',
    '$timeout',
    '$scope',
    '$http',
    '$filter',
    function(
        Console,
        $translate,
        $rootScope,
        $cookieStore,
        $location,
        $timeout,
        $scope,
        $http,
        $filter
    ) {
        Console.group("AppController entered");
        $scope.comingmatches = 0;
        $scope.gametypes = 0;
        $scope.matches = 0;
        $scope.matcheswithoutresult = 0;
        $scope.oddsChanges = 0;
        $scope.results = 0;
        $scope.teams = 0;

        $scope.getOverviewData = function() {
            console.log("try to get initial data");
            $http.get('/inputdata/').
            success(function(data, status, headers, config) {

                Console.debug("data", data);
                $scope.comingmatches = data.comingmatches;
                $scope.gametypes = data.gametypes;
                $scope.matches = data.matches;
                $scope.matcheswithoutresult = data.matcheswithoutresult;
                $scope.oddsChanges = data.oddsChanges;
                $scope.results = data.results;
                $scope.teams = data.teams;

            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.

            });

        };
        $scope.getOverviewData();

        // Apply the theme
        var highchartsOptions = Highcharts.setOptions(Highcharts.theme);

        Console.groupEnd(); // .controller
    }
]);
