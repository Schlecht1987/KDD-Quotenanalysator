angular.module('statsview.ideasprocessimprovements', [])
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.when('/ideasprocessimprovements', {
        templateUrl: 'statsview/ideasprocessimprovements.tpl.html',
        controller: 'IdeasProcessImprovementsController'
      });
    }
  ])
  .controller('IdeasProcessImprovementsController', [
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
      Console.group("IdeasProcessImprovementsController entered.");

      //get the data from the server and creates the chart
        $http({
          method: "GET",
          url: '/ideasprocessimprovements/'
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
                spacingTop: 80
              },
              title: {
                text: $filter('translate')('_ideas.process.improvements'),
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
                  text: $filter('translate')('_ideas.process.improvements.number.ideas')
                },
                min: 0
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
                name: $filter('translate')('_ideas.process.improvements.ideas.overall'),
                data: data.overallIdeas.reverse()
              }, {
                name: $filter('translate')('_ideas.process.improvements.implemented.ideas'),
                data: data.implementedIdeas.reverse()
              }]
            };
          }
        });
      Console.groupEnd();
    }
  ]);