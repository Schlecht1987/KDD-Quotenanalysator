angular.module('begegnung', [])
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/begegnung', {
                templateUrl: 'begegnung/begegnung.tpl.html',
                controller: 'BegegnungController'
            });
        }
    ])
    .controller('BegegnungController', [
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
            Console.group("BegegnungController entered.");

            $scope.showpanel = [];

            $scope.charConfig = [];

            $scope.eineZahl = 5;

            $scope.togglePanel = function(index) {
                $scope.showpanel[index] = !$scope.showpanel[index];
            };

            $scope.buildHighcharts = function(index, data) {
                if(data.historyDate == null){
                     data.historyDate = [];
                     data.historyQM1 = [];
                     data.historyQM2 = [];
                     data.historyQX = [];
                }
                data.historyDate.push("Aktuell");
                data.historyQM1.push(data.quoteM1);
                data.historyQM2.push(data.quoteM2);
                data.historyQX.push(data.quoteX);


                var chartObject = {
                    options: {
                        chart: {
                            type: 'line',
                            zoomType: 'x'
                        },
                        plotOptions: {
                            line: {
                                dataLabels: {
                                    enabled: true,
                                    style: {
                                        fontWeight: 'bold',
                                        fontSize: '15px'
                                    }
                                },
                                enableMouseTracking: false
                            }
                        }
                    },

                    series: [{
                        name: data.mannschaft_1,
                        data:  data.historyQM1
                    }, {
                        name: 'X',
                        data: data.historyQX
                    }, {
                        name: data.mannschaft_2,
                        data:  data.historyQM2
                    }],
                    title: {
                        text: 'Quotenänderung ' + data.mannschaft_1 + ' vs ' + data.mannschaft_2
                    },
                    xAxis: {
                        categories: data.historyDate
                    },
                    yAxis: {
                        title: {
                            text: 'Quote'
                        }
                    }


                };
                $scope.charConfig[index] = chartObject;
            };



            $http({
                method: "GET",
                url: '/begegnung/'
            }).
            success(function(data) {
                if (!data.error) {
                    $scope.begegnungData = data;
                    console.debug(data);

                }
            });
            $scope.test = function() {
                return "hat geklappt";
            };

            //schneidet sekunden vom timestamp string ab
            $scope.cutTimestamp = function(date) {

                return date.substring(0, (date.length - 5));
            };
            Console.groupEnd();
        }
    ]);
