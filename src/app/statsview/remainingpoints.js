angular.module('statsview.remainingpoints', [])
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.when('/remainingPoints', {
        templateUrl: 'statsview/remainingpoints.tpl.html',
        controller: 'RemainingPointsController'
      });
    }
  ])
  .controller('RemainingPointsController', [
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
      Console.group("RemainingPointsController entered.");

      //get the data from the server and creates the chart
        $http({
          method: "GET",
          url: '/remainingpoints/'
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
                spacingRight: 170
              },
              title: {
                text: $filter('translate')('_remainingPoints'),
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
                  text: $filter('translate')('_remainingPoints.mistakes.per.cabinet')
                },
                min: 0,
                plotLines: [{
                  //RED PRODUCTION
                  value: data.productionAVG,
                  color: '#B10024',
                  dashStyle: 'shortdash',
                  width: 2,
                  label: {
                    align: 'right',
                    textAlign: 'left',
                    text: $filter('translate')('_actual.last') +' '+ data.production.length +' '+ $filter('translate')('_months'),
                    style: {
                      fontFamily: '\'Lato\', sans-serif',
                      fontSize: '15px',
                      color: '#B10024'
                    }
                  }
                }, {
                  value: 3,
                  color: '#B10024',
                  dashStyle: 'shortdash',
                  width: 2,
                  label: {
                    align: 'right',
                    textAlign: 'left',
                    text: $filter('translate')('_target.for') +' 2014 ',
                    style: {
                      fontFamily: '\'Lato\', sans-serif',
                      fontSize: '15px',
                      color: '#B10024'
                    }
                  }
                },{
                  value: data.productionLastYearAVG,
                  color: '#B10024',
                  dashStyle: 'shortdash',
                  width: 2,
                  label: {
                     y: 5,
                    align: 'right',
                    textAlign: 'left',
                    text: $filter('translate')('_average') +' '+ lastYear,
                    style: {
                      fontFamily: '\'Lato\', sans-serif',
                      fontSize: '15px',
                      color: '#B10024'
                    }
                  }
                }, { //ORANGE BYDELIVERY

                  value: data.byDeliveryAVG,
                  color: '#EE8D00',
                  dashStyle: 'shortdash',
                  width: 2,
                  label: {
                    align: 'right',
                    textAlign: 'left',
                    text: $filter('translate')('_actual.last') +' '+ data.byDelivery.length +' '+ $filter('translate')('_months'),
                    style: {
                      fontFamily: '\'Lato\', sans-serif',
                      fontSize: '15px',
                      color: '#EE8D00'
                    }
                  }
                }, {
                  value: 0.4,
                  color: '#EE8D00',
                  dashStyle: 'shortdash',
                  width: 2,
                  label: {
                    align: 'right',
                    textAlign: 'left',
                    text: $filter('translate')('_target.for') +' 2014',
                    style: {
                      fontFamily: '\'Lato\', sans-serif',
                      fontSize: '15px',
                      color: '#EE8D00'
                    }
                  }
                },{
                  value: data.byDeliveryLastYearAVG,
                  color: '#EE8D00',
                  dashStyle: 'shortdash',
                  width: 2,
                  label: {
                     y: 5,
                    align: 'right',
                    textAlign: 'left',
                    text: $filter('translate')('_average') +' '+ lastYear,
                    style: {
                      fontFamily: '\'Lato\', sans-serif',
                      fontSize: '15px',
                      color: '#EE8D00'
                    }
                  }
                }, { //BLUE CONSTURUCTION
                  value: data.constructionAVG,
                  color: '#008AD9',
                  dashStyle: 'shortdash',
                  width: 2,
                  label: {
                    align: 'right',
                    textAlign: 'left',
                    text: $filter('translate')('_actual.last') +' '+ data.construction.length +' '+ $filter('translate')('_months'),
                    style: {
                      fontFamily: '\'Lato\', sans-serif',
                      fontSize: '15px',
                      color: '#008AD9'
                    }
                  }
                }, {
                  value: 0.8,
                  color: '#008AD9',
                  dashStyle: 'shortdash',
                  width: 2,
                  label: {
                    y: 10,
                    align: 'right',
                    textAlign: 'left',
                    text: $filter('translate')('_target.for') +' 2014',
                    style: {
                      fontFamily: '\'Lato\', sans-serif',
                      fontSize: '15px',
                      color: '#008AD9'
                    }
                  }
                },{
                  value: data.constructionLastYearAVG,
                  color: '#008AD9',
                  dashStyle: 'shortdash',
                  width: 2,
                  label: {
                     y: 5,
                    align: 'right',
                    textAlign: 'left',
                    text: $filter('translate')('_average') +' '+ lastYear,
                    style: {
                      fontFamily: '\'Lato\', sans-serif',
                      fontSize: '15px',
                      color: '#008AD9'
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
                },
                series: {
                  lineWidth: 4
                }
              },
              series: [{
                name: $filter('translate')('_remainingPoints.construction'),
                data: data.construction.reverse()
              }, {
                name: $filter('translate')('_remainingPoints.production'),
                data: data.production.reverse()
              }, {
                name: $filter('translate')('_remainingPoints.byDelivery'),
                data: data.byDelivery.reverse()
              }]
            };
          }
        });
      Console.groupEnd();
    }
  ]);