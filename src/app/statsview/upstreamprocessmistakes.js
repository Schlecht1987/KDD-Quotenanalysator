angular.module('statsview.upstreamprocessmistakes', [])
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.when('/upstreamprocessmistakes', {
        templateUrl: 'statsview/upstreamprocessmistakes.tpl.html',
        controller: 'UpstreamProcessMistakesController'
      });
    }
  ])
  .controller('UpstreamProcessMistakesController', [
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
      Console.group("UpstreamProcessMistakesController entered.");

      //get the data from the server and creates the chart
        $http({
          method: "GET",
          url: '/upstreamprocessmistakes/'
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
                text: $filter('translate')('_upstream.process.mistakes.headline'),
                y: 40
              },
              subtitle: {
                text: data.year
              },
              xAxis: {
                categories: data.categories.reverse()
              },
              yAxis: {
                title: {
                  text: $filter('translate')('_upstream.process.mistakes.quality')
                },
                min: 70,
                max: 100,
                plotLines: [{
                  value: 95,
                  color: '#B10024',
                  dashStyle: 'shortdash',
                  width: 2,
                  label: {
                    text: $filter('translate')('_aspiration') +' 2014',
                    style: {
                      fontWeight: 'bold',
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
                data: data.actualPercent.reverse()
              }]
            };
          }
        });
      Console.groupEnd();
    }
  ]);