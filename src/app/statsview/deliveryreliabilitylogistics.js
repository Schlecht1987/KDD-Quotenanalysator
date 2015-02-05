angular.module('statsview.deliveryreliabilitylogistics', [])
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/deliveryreliabilitylogistics', {
                templateUrl: 'statsview/deliveryreliabilitylogistics.tpl.html',
                controller: 'DeliveryReliabilityLogisticsController'
            });
        }
    ])
    .controller('DeliveryReliabilityLogisticsController', [
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
            Console.group("DeliveryReliabilityLogisticsController entered.");

            //get the data from the server and creates the chart
            $http({
                method: "GET",
                url: '/deliveryreliabilitylogistics/'
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
                    var numberCommissioningTrolleysAVG = $scope.calculatedAVG(data.numberCommissioningTrolleys);
                    var numberIncompleteCommissioningTrolleysAVG = $scope.calculatedAVG(data.numberIncompleteCommissioningTrolleys);
                    //data.numberCommissioningTrolleys
                    //data.numberIncompleteCommissioningTrolleys
                    //data.categories

                    $scope.lineChart = {
                        chart: {
                            spacingTop: 80
                        },
                        title: {
                            text: $filter('translate')('_delivery.reliability.logistics.title')
                        },
                        xAxis: [{
                            categories: data.categories
                        }],
                        yAxis: [{ // Primary yAxis
                            labels: {
                                format: '{value}'
                            },
                            title: {
                                text: $filter('translate')('_delivery.reliability.logistics.number.commissioning.trolleys'),
                                style: {
                                    color: '#008AD9'
                                }
                            },
                            plotLines: [{
                                value: numberCommissioningTrolleysAVG,
                                color: '#008AD9',
                                dashStyle: 'shortdash',
                                width: 2,
                                label: {
                                    text: 'Ø',
                                    align: 'right',
                                    textAlign: 'left',
                                    x: -20,
                                    style: {
                                        fontWeight: 'bold',
                                        fontSize: '15px'
                                    }
                                }
                            }]
                        }, { // Secondary yAxis
                            title: {
                                text: $filter('translate')('_delivery.reliability.logistics.number.incomplete.commissioning.trolleys'),
                                style: {
                                    color: '#EE8D00'
                                }
                            },plotLines: [{
                                value: numberIncompleteCommissioningTrolleysAVG,
                                color: '#EE8D00',
                                dashStyle: 'shortdash',
                                width: 2,
                                label: {
                                    text: 'Ø',
                                    align: 'right',
                                    textAlign: 'left',
                                    x: -20,
                                    style: {
                                        fontWeight: 'bold',
                                        fontSize: '15px'
                                    }
                                }
                            }],
                            labels: {
                                format: '{value}%'
                            },
                            opposite: true
                        }],
                        tooltip: {
                            shared: true
                        },
                        series: [{
                            name: $filter('translate')('_delivery.reliability.logistics.number.commissioning.trolleys'),
                            type: 'column',
                            color: '#008AD9',
                            data: data.numberCommissioningTrolleys
                        }, {
                            name: $filter('translate')('_delivery.reliability.logistics.number.incomplete.commissioning.trolleys'),
                            yAxis: 1,
                            type: 'spline',
                            color: '#EE8D00',
                            data: data.numberIncompleteCommissioningTrolleys
                        }]
                    };
                }
            });

            $scope.calculatedAVG = function(values) {
                var temp = 0;
                for (var i = 0; i < values.length; i++) {
                    temp += values[i];
                }
                temp = temp/values.length;
                return temp;
            };
            Console.groupEnd();
        }
    ]);