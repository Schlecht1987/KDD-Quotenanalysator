angular.module('statsview.capacity', [])
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.when('/capacity', {
        templateUrl: 'statsview/capacity.tpl.html',
        controller: 'CapacityController'
      });
    }
  ])
  .controller('CapacityController', [
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
      Console.group("CapacityController entered.");

      //get the data from the server and creates the chart
        $http({
          method: "GET",
          url: '/capacity/'
        }).
        success(function(data) {
          if (!data.error) {
            //console.debug("data", data);
            //check if SmileyValue exists
            if (data.smileyValue) {
              // console.debug("smileyvalue found")
              //$scope.setSmileyValue(data.smileyValue);
              $rootScope.setSmileyValue(data.smileyValue);
            } else {
              console.debug("smileyvalue not found");
            }
            $scope.lineChart = {
              colors: [
                '#008AD9',
                '#B10024'
              ],
              chart: {
                type: 'line',
                spacingTop: 80
              },
              title: {
                text: $filter('translate')('_capacity.title'),
                y: 40
              },
              subtitle: {
                text: data.year
              },
              xAxis: {
                title: {
                  text: $filter('translate')('_calendar.week')
                },
                categories: data.categories
              },
              yAxis: {
                title: {
                  text: $filter('translate')('_capacity.percent')
                },
                min: 0,
                plotLines: [{
                  //RED
                  value: 100,
                  color: '#B10024',
                  dashStyle: 'shortdash',
                  width: 2,
                  label: {

                    text: $filter('translate')('_target.value')+' 2014',
                    style: {
                      fontFamily: '\'Lato\', sans-serif',
                      fontSize: '20px',
                      color: '#B10024'
                    }
                  }
                }]
              },
              tooltip: {
                enabled: false,
                formatter: function() {
                  return '<b>' + this.series.name + '</b><br/>' +
                    this.x + ': ' + this.y + '°C';
                }
              },
              plotOptions: {
                line: {
                  dataLabels: {
                    enabled: true
                  },
                  enableMouseTracking: false
                }
              },
              series: [{
                name: $filter('translate')('_upstream.process.mistakes.actual'),
                data: data.actualPercent
              }]
            };
          }
        });
      Console.groupEnd();
    }
  ]);