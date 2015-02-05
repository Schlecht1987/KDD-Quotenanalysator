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
    'highcharts-ng'
]);

angular.module('app').config(['$routeProvider', '$locationProvider', '$translateProvider',

    function($routeProvider, $locationProvider, $translateProvider) {
        $locationProvider.html5Mode(false);
        $routeProvider.otherwise({
            redirectTo: '/start'
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
        //The value for the Login Modal Loginbutton
        $scope.loginButtonValue = "Login";


        // Apply the theme
        var highchartsOptions = Highcharts.setOptions(Highcharts.theme);

        Console.groupEnd(); // .controller
    }
]);
