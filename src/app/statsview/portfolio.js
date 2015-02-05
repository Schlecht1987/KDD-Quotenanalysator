angular.module('statsview.portfolio', [])
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/portfolio', {
                templateUrl: 'statsview/portfolio.tpl.html',
                controller: 'PortfolioController'
            });
        }
    ])
    .controller('PortfolioController', [
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
            Console.group("PortfolioController entered.");

            //get the data from the server and creates the chart
            $http({
                method: "GET",
                url: '/portfolio/'
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
                    var max = $scope.getMaxValue(data.actualPortfolio);
                    $scope.lineChart = {
                        colors: [
                            '#008AD9',
                            '#B10024'
                        ],
                        chart: {
                            type: 'line',
                            spacingRight: 170,
                            spacingTop: 25
                        },
                        title: {
                            text: $filter('translate')('_portfolio.title'),
                            y: 40
                        },
                        subtitle: {
                            text: data.year
                        },
                        xAxis: {
                            title: {
                                text: $filter('translate')('_calendar.week')
                            },
                            categories: data.categories
                        },
                        yAxis: {
                            title: {
                                text: $filter('translate')('_portfolio.title')
                            },
                            min: 10,
                            max: max,
                            plotLines: [{
                                value: 45,
                                color: '#B10024',
                                dashStyle: 'shortdash',
                                width: 2,
                                label: {
                                    text: 'max',
                                    align: 'right',
                                    textAlign: 'left',
                                    x: 2,
                                    y: 5,
                                    style: {
                                        fontWeight: 'bold',
                                        fontSize: '15px'
                                    }
                                }
                            }, {
                                value: 35,
                                color: '#B10024',
                                dashStyle: 'shortdash',
                                width: 2,
                                label: {
                                    text: 'min',
                                    align: 'right',
                                    textAlign: 'left',
                                    x: 2,
                                    y: 5,
                                    style: {
                                        fontWeight: 'bold',
                                        fontSize: '15px'
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
                                    enabled: true,
                                    style: {
                                        fontFamily: '\'Lato\', sans-serif',
                                        fontSize: '25px'
                                    }
                                },
                                enableMouseTracking: false
                            },
                            series: {
                                lineWidth: 6
                            }
                        },
                        series: [{
                            name: $filter('translate')('_upstream.process.mistakes.actual'),
                            data: data.actualPortfolio
                        }]
                    };
                }
            });
            // get the max value for the y axis out of the data array
            $scope.getMaxValue = function(values) {
                var max = 70;
                _.each(values, function(value) {
                    if (value > max) {
                        max = value;
                    }
                });
                return max;
            };
            Console.groupEnd();
        }
    ]);
