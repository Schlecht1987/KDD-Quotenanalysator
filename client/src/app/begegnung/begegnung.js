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
            //Speicherung von Booleans ob ein Panel Sichbar ist oder nicht
            $scope.showpanel = [];
            // Speicherung der Json Konstruke für die Diagramme
            $scope.charConfig = [];

            //Zeigt ein Panel an oder versteckt es
            $scope.togglePanel = function(index) {
                $scope.showpanel[index] = !$scope.showpanel[index];
            };

            //Setzt die Daten in das Highcharts Json Konstrukt
            $scope.buildHighcharts = function(index, data) {
                if (data.historyDate == null) {
                    data.historyDate = [];
                    data.historyQM1 = [];
                    data.historyQM2 = [];
                    data.historyQX = [];
                }

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
                        data: data.historyQM1
                    }, {
                        name: 'X',
                        data: data.historyQX
                    }, {
                        name: data.mannschaft_2,
                        data: data.historyQM2
                    }],
                    title: {
                        text: 'Quotenänderung ' + data.mannschaft_1 + ' vs ' + data.mannschaft_2,
                        style: {
                            fontWeight: 'bold'
                        }
                    },
                    xAxis: {
                        categories: data.historyDate,
                        labels: {
                            style: {
                                fontSize: '13px',
                                fontFamily: 'Verdana, sans-serif',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    yAxis: {
                        title: {
                            text: 'Quote',
                            style: {
                                fontWeight: 'bold'
                            }
                        }
                    }


                };
                $scope.charConfig[index] = chartObject;
            };


            //Initialer GET Request um Daten zu laden
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


            //schneidet sekunden vom timestamp string der Initialdaten ab
            $scope.cutTimestamp = function(date) {

                return date.substring(0, (date.length - 5));
            };
            Console.groupEnd();
        }
    ]);
