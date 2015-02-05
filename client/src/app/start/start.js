angular.module('start', [])
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.when('/start', {
        templateUrl: 'start/start.tpl.html',
        controller: 'StartController'
      });
    }
  ])
  .controller('StartController', [
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
      Console.group("StartController entered.");

      $scope.goToDataDelete = function() {
        $location.path("/delete");
      };

      Console.groupEnd();
    }
  ]);