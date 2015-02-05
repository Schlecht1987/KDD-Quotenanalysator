angular.module('statsview.processingtime', [])
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/processingtime', {
                templateUrl: 'statsview/processingtime.tpl.html',
                controller: 'ProcessingTimeController'
            });
        }
    ])
    .controller('ProcessingTimeController', [
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
            Console.group("ProcessingTimeController entered.");

            //get the data from the server and creates the chart
            $http({
                method: "GET",
                url: '/processingtime/'
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
                            spacingRight: 170
                        },
                        title: {
                            text: $filter('translate')('_processing.time.title'),
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
                                text: $filter('translate')('_days')
                            },
                            min: 0,
                            plotLines: [{
                                //RED
                                value: 8.84,
                                color: '#B10024',
                                dashStyle: 'shortdash',
                                width: 2,
                                label: {
                                    align: 'right',
                                    textAlign: 'left',
                                    text: $filter('translate')('_target.remainingpoints.done') + ' 2014',
                                    style: {
                                        fontFamily: '\'Lato\', sans-serif',
                                        fontSize: '15px',
                                        color: '#B10024'
                                    }
                                }
                            }, { //ORANG
                                value: 14.69,
                                color: '#EE8D00',
                                dashStyle: 'shortdash',
                                width: 2,
                                label: {
                                    align: 'right',
                                    textAlign: 'left',
                                    text: $filter('translate')('_target.delivered') + ' 2014',
                                    style: {
                                        fontFamily: '\'Lato\', sans-serif',
                                        fontSize: '15px',
                                        color: '#EE8D00'
                                    }
                                }
                            }, { //BLUE
                                value: 5.22,
                                color: '#008AD9',
                                dashStyle: 'shortdash',
                                width: 2,
                                label: {
                                    align: 'right',
                                    textAlign: 'left',
                                    text: $filter('translate')('_target.ready.for.inspection') + ' 2014',
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
                            }
                        },
                        series: [{
                            name: $filter('translate')('_processing.time.ready.for.inspection'),
                            data: data.readyForInspection.reverse()
                        }, {
                            name: $filter('translate')('_processing.time.remaining.points.finished'),
                            data: data.remainingPointsFinished.reverse()
                        }, {
                            name: $filter('translate')('_processing.time.delivered'),
                            data: data.delivered.reverse()
                        }]
                    };
                }
            });


            Console.groupEnd();
        }
    ]);
