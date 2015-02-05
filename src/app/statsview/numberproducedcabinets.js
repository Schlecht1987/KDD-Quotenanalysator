angular.module('statsview.numberproducedcabinets', [])
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.when('/numberproducedcabinets', {
        templateUrl: 'statsview/numberproducedcabinets.tpl.html',
        controller: 'NumberProducedCabinetsController'
      });
    }
  ])
  .controller('NumberProducedCabinetsController', [
    'Console',
    '$translate',
    '$scope',
    '$http',
    '$filter',
    '$cookieStore',
    '$rootScope',
    function(
      Console,
      $translate,
      $scope,
      $http,
      $filter,
      $cookieStore,
      $rootScope
    ) {
      Console.group("NumberProducedCabinetsController entered.");


        //get the data from the server and creates the chart
        $http({
          method: "GET",
          url: '/numberproducedcabinets/'
        }).
        success(function(data) {
          if (!data.error) {
            console.debug("data", data);
            //check if SmileyValue exists
            if (data.smileyValue) {
              $rootScope.setSmileyValue(data.smileyValue);
            } else {
              console.debug("smileyvalue not found");
            }
            //special mapping data to the chart;
            var ist = createIstArrayForData(data);
            var soll = createSollArrayForData(data);
            $scope.linecharts = {
              chart: {
                type: 'column',
                spacingTop: 80
              },
              title: {
                text: $filter('translate')('_number.produced.cabinets'),
                y: 40
              },
              xAxis: {
                categories: data.categories.reverse()
              },
              yAxis: {
                min: 0,
                title: {
                  text: $filter('translate')('_number.produced.cabinets')
                },
                stackLabels: {
                  enabled: true,
                  style: {
                    color: '#000',
                    fontWeight: 'bold',
                    fontSize: '23px',
                    fontFamily: 'Arial'
                  }
                }
              },
              tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' + '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
              },
              plotOptions: {
                column: {
                  stacking: 'normal',
                  colorByPoint: true,
                  dataLabels: {
                    enabled: true,
                    style: {
                      color: '#000',
                      fontWeight: 'bold',
                      fontSize: '23px',
                      fontFamily: 'Arial'
                    }
                  }
                }
              },
              credits: {
                enabled: false
              },
              series: [{
                name: $filter('translate')('_target'),
                color: '#008AD9',
                data: soll.reverse()

              }, {
                name: $filter('translate')('_number.produced.cabinets'),
                color: '#EE8D00',
                data: ist.reverse()
              }]
            };
          }
        });

        //create special data Array for the highcharts series
        function createIstArrayForData(data) {
          var ist = [];
          for (var i = 0; i < data.size; i++) {
            ist[i] = {
              y: data.actual[i],
              color: '#EE8D00'
            };
          }
          return ist;
        }

        //create special data Array for the highcharts series
        function createSollArrayForData(data) {
          var soll = [];
          for (var i = 0; i < data.size; i++) {
            //if temp is negative highcharts will not display the value and this is what we want!
            var temp = data.target[i] - data.actual[i];
            //only when the value is null highchart will not display this value
            if (temp === 0)
              {temp = null;}
            soll[i] = {
              y: temp,
              color: '#008AD9'
            };
          }
          return soll;
        }
      Console.groupEnd();
    }
  ]);