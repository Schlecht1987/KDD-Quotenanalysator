angular.module('statsview.workingstepmistakes', [])
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.when('/workingstepmistakes', {
        templateUrl: 'statsview/workingstepmistakes.tpl.html',
        controller: 'WorkingstepMistakesController'
      });
    }
  ])
  .controller('WorkingstepMistakesController', [
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
      Console.group("WorkingstepMistakesController entered.");

      //get the data from the server and creates the chart
        $http({
          method: "GET",
          url: '/workingstepmistakes/'
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
            $scope.linecharts = {
              colors: ['#B10024',
                '#EE8D00',
                '#FFE400',
                '#008AD9',
                '#C9D200',
                '#4B0459',
                '#002043',
                '#204333'
              ],
              chart: {
                type: 'column',
                spacingRight: 120
              },
              title: {
                text: $filter('translate')('_workingstepmistake'),
                y: 40
              },
              xAxis: {
                categories: data.months.reverse()
              },
              yAxis: {
                min: 0,
                title: {
                  text: $filter('translate')('_workingstepmistake')
                },
                plotLines: [{
                  value: 10,
                  color: 'black',
                  dashStyle: 'shortdash',
                  width: 2,
                  label: {
                    align: 'right',
                    textAlign: 'left',
                    text: $filter('translate')('_target') + ' 2014',
                    style: {
                      fontFamily: '\'Lato\', sans-serif',
                      fontSize: '20px'
                    }
                  }
                }, {
                  value: 12,
                  color: 'black',
                  dashStyle: 'shortdash',
                  width: 2,
                  label: {
                    align: 'right',
                    textAlign: 'left',
                    text: $filter('translate')('_actual') +' 2013',
                    style: {
                      fontFamily: '\'Lato\', sans-serif',
                      fontSize: '20px'
                    }
                  }
                }]
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
                  pointPadding: 0.2,
                  borderWidth: 0
                }
              },
              series: [{
                name: $filter('translate')('_workingstepmistake.logistics'),
                data: data.logistics.reverse()

              }, {
                name: $filter('translate')('_workingstepmistake.mechanicalconstruction'),
                data: data.mechanicalconstruction.reverse()

              }, {
                name: $filter('translate')('_workingstepmistake.assembly'),
                data: data.assembly.reverse()

              }, {
                name: $filter('translate')('_workingstepmistake.finalassembly'),
                data: data.finalassembly.reverse()

              }, {
                name: $filter('translate')('_workingstepmistake.check'),
                data: data.check.reverse()

              }, {
                name: $filter('translate')('_workingstepmistake.rework'),
                data: data.rework.reverse()
              }]
            };
          }
        });
      Console.groupEnd();
    }
  ]);