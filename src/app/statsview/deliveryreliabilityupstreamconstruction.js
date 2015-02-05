angular.module('statsview.deliveryreliabilityupstreamconstruction', [])
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/deliveryreliabilityupstreamconstruction', {
                templateUrl: 'statsview/deliveryreliabilityupstreamconstruction.tpl.html',
                controller: 'DeliveryReliabilityUpstreamConstructionController'
            });
        }
    ])
    .controller('DeliveryReliabilityUpstreamConstructionController', [
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
            Console.group("DeliveryReliabilityUpstreamConstructionController entered.");



            //get the data from the server and creates the chart
            $http({
                method: "GET",
                url: '/deliveryreliabilityupstreamconstruction/'
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
                        colors: [
                            '#008AD9',
                            '#B10024'
                        ],
                        chart: {
                            type: 'line',
                            spacingRight: 170
                        },
                        title: {
                            text: $filter('translate')('_delivery.reliability.upstream.construction'),
                            y: 40
                        },
                        subtitle: {
                            text: data.year
                        },
                        xAxis: {
                            title: {
                                text: $filter('translate')('_delivery.reliability.upstream.construction.deviation.in.days')
                            },
                            categories: data.categories,
                            plotLines: [{
                                value: 0,
                                zIndex: 5,
                                color: '#B10024',
                                dashStyle: 'shortdash',
                                width: 2

                            }, {
                                value: 1,
                                zIndex: 5,
                                color: '#B10024',
                                dashStyle: 'shortdash',
                                width: 2
                            }]
                        },
                        yAxis: {
                            title: {
                                text: $filter('translate')('_number')
                            },
                            min: 0,
                            minRange: 30,
                            allowDecimals: false

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
                            type: 'column',
                            name: $filter('translate')('_upstream.process.mistakes.actual'),
                            data: data.deviationInDays
                        }, {
                            type: 'spline',
                            name: $filter('translate')('_upstream.process.mistakes.actual'),
                            data: data.deviationInDays
                        }]
                    };
                }
            });



            Console.groupEnd();
        }
    ]);