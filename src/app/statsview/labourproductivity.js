angular.module('statsview.labourproductivity', [])
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.when('/labourproductivity', {
        templateUrl: 'statsview/labourproductivity.tpl.html',
        controller: 'LabourProductivityController'
      });
    }
  ])
  .controller('LabourProductivityController', [
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
      Console.group("LabourProductivityController entered.");

     //get the data from the server and creates the chart
        $http({
          method: "GET",
          url: '/labourproductivity/'
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
              colors: ['#008AD9',
                '#B10024',
                '#EE8D00'
              ],
              chart: {
                type: 'line',
                spacingRight: 130

              },
              title: {
                text: $filter('translate')('_labour.productivity'),
                y: 40
              },
              subtitle: {
                text: data.year
              },
              xAxis: {
                categories: data.categories,
                title: {
                  text: $filter('translate')('_calendar.week')
                }
              },
              yAxis: {
                title: {
                  text: $filter('translate')('_labour.productivity.yAxis.title')
                },
                min: 35,
                max: 95,
                plotLines: [{
                  value: 40.29,
                  color: 'green',
                  dashStyle: 'shortdash',
                  width: 2,
                  label: {
                    align: 'right',
                    textAlign: 'left',
                    text: $filter('translate')('_actual')+' 2012',
                    style: {
                      fontFamily: '\'Lato\', sans-serif',
                      fontSize: '15px',
                      color: 'green'
                    }
                  }
                }, {
                  value: 75.0,
                  color: 'green',
                  dashStyle: 'shortdash',
                  width: 2,
                  label: {
                    align: 'right',
                    textAlign: 'left',
                    text: $filter('translate')('_actual')+' 2013',
                    style: {
                      fontFamily: '\'Lato\', sans-serif',
                      fontSize: '15px',
                      color: 'green'
                    }
                  }
                }, {
                  value: 80.0,
                  color: '#B10024',
                  dashStyle: 'shortdash',
                  width: 2,
                  label: {
                    align: 'right',
                    textAlign: 'left',
                    text: $filter('translate')('_target')+' 2014',
                    style: {
                      fontFamily: '\'Lato\', sans-serif',
                      fontSize: '15px',
                      color: '#B10024'
                    }
                  }
                }, {
                  value: data.avgLabourProductivity,
                  color: '#EE8D00',
                  dashStyle: 'shortdash',
                  width: 2,
                  label: {
                    align: 'right',
                    textAlign: 'left',
                    text: $filter('translate')('_average.value.calendar.year'),
                    style: {
                      fontFamily: '\'Lato\', sans-serif',
                      fontSize: '15px',
                      color: '#EE8D00'
                    }
                  }
                } ]
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
                    enabled: true,
                    style: {
                      fontFamily: '\'Lato\', sans-serif',
                      fontSize: '15px'
                    }
                  },
                  enableMouseTracking: false
                }
              },
              series: [{
                name: $filter('translate')('_labour.productivity'),
                data: data.labourProductivity
              }]
            };
          }
        });
      Console.groupEnd();
    }
  ]);