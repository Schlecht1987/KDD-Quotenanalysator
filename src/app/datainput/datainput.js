angular.module('datainput', ['datainput.customersatisfaction','datainput.capacity','datainput.deliveryreliabilityupstreamconstruction','datainput.deliveryreliabilitylogistics','datainput.processingtime','datainput.ideasprocessimprovements','datainput.labourproductivity','datainput.numberproducedcabinets','datainput.portfolio','datainput.remainingpoints','datainput.scrappedmaterial','datainput.upstreamprocessmistakes','datainput.workingstepmistakes'])
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.when('/datainput', {
        templateUrl: 'datainput/datainput.tpl.html',
        controller: 'DataInputController'
      });
    }
  ])
  .controller('DataInputController', [
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
      Console.group("DataInputController entered.");

      $scope.goToDataDelete = function() {
        $location.path("/delete");
      };

      Console.groupEnd();
    }
  ]);