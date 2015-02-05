angular.module('statsview.scrappedmaterial', [])
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.when('/scrappedmaterial', {
        templateUrl: 'statsview/scrappedmaterial.tpl.html',
        controller: 'ScrappedmaterialController'
      });
    }
  ])
  .controller('ScrappedmaterialController', [
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
      Console.group("ScrappedmaterialController entered.");
//get the data from the server and creates the chart
        $http({
          method: "GET",
          url: '/scrappedmaterial/'
        }).
        success(function(data) {
          if (!data.error) {
            console.debug("data", data);
            var d = new Date();
            var n = d.getFullYear();
            var lastYear = n-1;
            //check if SmileyValue exists
            if (data.smileyValue) {
              $rootScope.setSmileyValue(data.smileyValue);
            } else {
              console.debug("smileyvalue not found");
            }
            $scope.lineChart = {
              colors: ['#008AD9',
                '#B10024',
                '#EE8D00'
              ],
              chart: {
                type: 'line',
                spacingRight: 170,
                spacingTop: 25
              },
              title: {
                text: $filter('translate')('_scrapped.material'),
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
                  text: $filter('translate')('_scrapped.material.cost')
                },
                min: 0,
                max: 1500,
                plotLines: [{
                  //RED
                  value: 500,
                  color: '#B10024',
                  dashStyle: 'shortdash',
                  width: 2,
                  label: {
                    align: 'right',
                    textAlign: 'left',
                    text: $filter('translate')('_average.cost')+'<br>2014',
                    style: {
                      fontFamily: '\'Lato\', sans-serif',
                      fontSize: '15px',
                      color: '#B10024'
                    }
                  }
                },{
                  //RED
                  value: data.averageCostLastYear,
                  color: '#B10024',
                  dashStyle: 'shortdash',
                  width: 2,
                  label: {
                    align: 'right',
                    textAlign: 'left',
                    text: $filter('translate')('_average')+'<br>'+lastYear,
                    style: {
                      fontFamily: '\'Lato\', sans-serif',
                      fontSize: '15px',
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
                name: $filter('translate')('_scrapped.material.cost'),
                data: data.cost.reverse()
              }]
            };
          }
        });
      Console.groupEnd();
    }
  ]);