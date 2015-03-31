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
        '$timeout',
        function(
            Console,
            $translate,
            $scope,
            $http,
            $filter,
            $cookieStore,
            $compile,
            $location,
            $timeout

        ) {
            Console.group("BegegnungController entered.");
            //Speicherung von Booleans ob ein Panel Sichbar ist oder nicht
            $scope.showpanel = [];
            // Speicherung der Json Konstruke für die Diagramme
            $scope.charConfig = [];

            $scope.isLoading = false;

            //Zeigt ein Panel an oder versteckt es
            $scope.togglePanel = function(index, data) {
                $scope.showpanel[index] = !$scope.showpanel[index];

                if (typeof $scope.charConfig[index] !== 'undefined') {

                } else {
                    $timeout(function() {
                        $scope.buildHighcharts(data);
                    }, 30);
                }
            };

            $scope.paginationPageChange = function() {
                console.log("Pagination change");
                for (var i = 0; i < $scope.showpanel.length; i++) {
                    $scope.showpanel[i] = false;
                    console.log($scope.showpanel[i]);
                }
            };

            $scope.currentPage = 1;

            //Setzt die Daten in das Highcharts Json Konstrukt
            $scope.buildHighcharts = function(data) {
                if (data.historyDate == null) {
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
                $scope.charConfig[data.id] = chartObject;
            };

            // Loading Anzeige Aktivieren
            $scope.startLoading = function() {
                $scope.isLoading = true;
            };
            // Loading Anzeige Deaktivieren
            $scope.finishLoading = function() {
                $timeout(function() {
                    $scope.isLoading = false;
                }, 10);
            };

            $scope.expectationColorM1 = [];
            $scope.expectationColorX = [];
            $scope.expectationColorM2 = [];
            //Initialer GET Request um Daten zu laden
            $scope.startLoading();
            $http({
                method: "GET",
                url: '/begegnung/'
            }).
            success(function(data) {
                if (!data.error) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].quoteM1Expecation < 0) {
                            $scope.expectationColorM1[data[i].id] = "#FF0000";
                        } else if (data[i].quoteM1Expecation > 0) {
                            $scope.expectationColorM1[data[i].id] = "#007A29";
                        } else {
                            $scope.expectationColorM1[data[i].id] = "#FFFFFF";
                        }

                        if (data[i].quoteXExpecation < 0) {
                            $scope.expectationColorX[data[i].id] = "#FF0000";
                        } else if (data[i].quoteXExpecation > 0) {
                            $scope.expectationColorX[data[i].id] = "#007A29";
                        } else {
                            $scope.expectationColorX[data[i].id] = "#FFFFFF";
                        }

                        if (data[i].quoteM2Expecation < 0) {
                            $scope.expectationColorM2[data[i].id] = "#FF0000";
                        } else if (data[i].quoteM2Expecation > 0) {
                            $scope.expectationColorM2[data[i].id] = "#007A29";
                        } else {
                            $scope.expectationColorM2[data[i].id] = "#FFFFFF";
                        }

                    }
                    $scope.begegnungData = data;
                    console.debug(data);
                    $scope.finishLoading();
                }
            });


            //schneidet sekunden vom timestamp string der Initialdaten ab
            $scope.cutTimestamp = function(date) {

                return date.substring(0, (date.length - 5));
            };


            Console.groupEnd();
        }
    ]);
