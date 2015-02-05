angular.module('delete', [])
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.when('/delete', {
        templateUrl: 'delete/delete.tpl.html',
        controller: 'DeleteController'
      });
    }
  ])
  .controller('DeleteController', [
    '$timeout',
    'Console',
    '$translate',
    '$scope',
    '$http',
    '$filter',
    '$cookieStore',
    '$rootScope',
    function(
      $timeout,
      Console,
      $translate,
      $scope,
      $http,
      $filter,
      $cookieStore,
      $rootScope
    ) {
      Console.group("DeleteController entered.");
      //Data of the Urls for every view
      $scope.Urls = {
        customerSatisfaction: {
          getUrl: '/customerSatisfaction/all/',
          templateUrl: 'assets/delete/customerSatisfaction.html',
          deleteUrl: '/customerSatisfaction/delete/'
        },
        workingstepMistakes: {
          getUrl: '/workingstepmistakes/all/',
          templateUrl: 'assets/delete/workingstepMistakes.html',
          deleteUrl: '/workingstepmistakes/delete/'
        },
        remainingPoints: {
          getUrl: '/remainingpoints/all/',
          templateUrl: 'assets/delete/remainingPoints.html',
          deleteUrl: '/remainingpoints/delete/'
        },
        processingTime: {
          getUrl: '/processingtime/all/',
          templateUrl: 'assets/delete/processingTime.html',
          deleteUrl: '/processingtime/delete/'
        },
        upstreamProcessMistakes: {
          getUrl: '/upstreamprocessmistakes/all/',
          templateUrl: 'assets/delete/upstreamProcessMistakes.html',
          deleteUrl: '/upstreamprocessmistakes/delete/'
        },
        portfolio: {
          getUrl: '/portfolio/all/',
          templateUrl: 'assets/delete/portfolio.html',
          deleteUrl: '/portfolio/delete/'
        },
        labourProductivity: {
          getUrl: '/labourproductivity/all/',
          templateUrl: 'assets/delete/labourProductivity.html',
          deleteUrl: '/labourproductivity/delete/'
        },
        scrappedMaterial: {
          getUrl: '/scrappedmaterial/all/',
          templateUrl: 'assets/delete/scrappedMaterial.html',
          deleteUrl: '/scrappedmaterial/delete/'
        },
        deliveryReliabilityLogistics: {
          getUrl: '/deliveryreliabilitylogistics/all/',
          templateUrl: 'assets/delete/deliveryReliabilityLogistics.html',
          deleteUrl: '/deliveryreliabilitylogistics/delete/'
        },
        capacity: {
          getUrl: '/capacity/all/',
          templateUrl: 'assets/delete/capacity.html',
          deleteUrl: '/capacity/delete/'
        },
        ideasProcessImprovements: {
          getUrl: '/ideasprocessimprovements/all/',
          templateUrl: 'assets/delete/ideasProcessImprovements.html',
          deleteUrl: '/ideasprocessimprovements/delete/'
        },
        deliveryReliabilityUpstreamConstruction: {
          getUrl: '/deliveryreliabilityupstreamconstruction/all/',
          templateUrl: 'assets/delete/deliveryReliabilityUpstreamLogistics.html',
          deleteUrl: '/deliveryreliabilityupstreamconstruction/delete/'
        },
        numberProducedCabinets: {
          getUrl: '/numberproducedcabinets/all/',
          templateUrl: 'assets/delete/numberProducedCabinets.html',
          deleteUrl: '/numberproducedcabinets/delete/'
        }
      };

      // gets all the data from one Collection
      // getUrl: The Url fot the get Request
      // templateUrl: the html template for the right collection
      $scope.getData = function(getUrl, templateUrl) {
        $http({
          method: "GET",
          url: getUrl
        }).
        success(function(data) {
          if (!data.error) {
            console.debug("data", data);
            $scope.collectionData = data;
            $scope.addCollectionDataMongoIdIndex($scope.collectionData.collection.length);
            $scope.settemplateUrl(templateUrl);
          }
        });
      };

      // Fills the Collection Array with a index that points to the mongoIdArray
      // where the mongoid is.
      $scope.addCollectionDataMongoIdIndex = function(number) {
        for (var i = 0; i < number; i++) {
          $scope.collectionData.collection[i].mongoIndex = i;
        }
      };

      // sets the html template Url ( every collection needs their own template)
      $scope.settemplateUrl = function(templateUrl) {
        $scope.collection = {
          url: templateUrl
        };
      };

      // Delete a collection document by the mongoId
      // mongoID: The mongoId wich is to be deleted
      // deletedUrl : The URL where the Delete request will send to
      // index: The index of the row of the Table ()
      $scope.deleteById = function(mongoId, deleteUrl, index, arrayIndex) {
        $http({
          url: deleteUrl,
          method: "DELETE",
          data: mongoId
        }).success(function(data, status, headers, config) {
          //wait 1 second that the modal can dissapear
          $timeout(function() {
            //deletes the row of the table
            $("#row" + index).remove();
            console.debug("collectiondata", $scope.collectionData);
            console.debug("array index", arrayIndex);
            $scope.collectionData.collection[arrayIndex].note = "DELETED!";
            $scope.$apply();
            console.debug("collectiondata", $scope.collectionData);
          }, 1000);
        }).error(function(data, status, headers, config) {
          Console.debug("data: ", data, "status: ", status);
          switch (status) {
            case 333:
              alert("please login");
              break;
            default:
              Console.debug("data: ", data, "status: ", status);
          }
        });
      };

      //if the user doesent want to delete a record.
      $scope.noClicked = function() {
        Console.debug("no clicked");
      };
      Console.groupEnd();
    }
  ]);