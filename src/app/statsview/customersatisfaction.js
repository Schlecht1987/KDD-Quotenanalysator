angular.module('statsview.customersatisfaction', [])
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/customersatisfaction', {
                templateUrl: 'statsview/customersatisfaction.tpl.html',
                controller: 'CustomerSatisfactionController'
            });
        }
    ])
    .controller('CustomerSatisfactionController', [
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
            Console.group("CustomerSatisfactionController entered.");

            // counts the number of customer satisfactions
            $scope.numberOfCustomers = function(data) {
                var number = 0;
                number += data.dissatisfied;
                number += data.ok;
                number += data.satisfied;
                number += data.veryDissatisfied;
                number += data.verySatisfied;
                return number;
            };

            //get the data from the server and creates the chart
            $http({
                method: "GET",
                url: '/customerSatisfaction/'
            }).
            success(function(data, status, headers, config) {
                //check if SmileyValue exists
                if (data.smileyValue) {
                    $rootScope.setSmileyValue(data.smileyValue);
                } else {
                    console.debug("smileyvalue not found");
                }
                if (!data.error) {
                    // console.debug("data", data);
                    // console.debug("header", headers);
                    // console.debug("config", config);
                    // console.debug("screen width", screen.width)
                    $scope.numberOfCustomers(data);
                    var date = new Date();
                    var userwidth = document.getElementById('highcharts').offsetWidth - 300;
                    var subtitle = " " + (date.getMonth() + 1) + '/' + (date.getYear() - 101) + ' - ' + (date.getMonth() + 1) + '/' + (date.getYear() - 100);
                    $scope.piechartdata = [
                        [$filter('translate')('_customer.veryDissatisfied'), data.veryDissatisfied],
                        [$filter('translate')('_customer.dissatisfied'), data.dissatisfied],
                        [$filter('translate')('_customer.ok'), data.ok],
                        [$filter('translate')('_customer.satisfied'), data.satisfied],
                        [$filter('translate')('_customer.verySatisfied'), data.verySatisfied]
                    ];
                    $scope.pieChart = {

                       
                        options: {
                            chart: {
                                plotBackgroundColor: null,
                                plotBorderWidth: null,
                                plotShadow: false
                            },
                            credits: false
                        },
                        title: {
                            text: $filter('translate')('_customer.title'),
                            y: 20
                        },
                        subtitle: {
                            text: subtitle,
                            y: 40
                        },
                        tooltip: {
                            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                        },
                        plotOptions: {
                            pie: {
                                allowPointSelect: true,
                                //cursor: 'pointer',
                                dataLabels: {
                                    enabled: true,
                                    color: '#000000',
                                    connectorColor: '#000000',
                                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                    style: {
                                        fontFamily: '\'Lato\', sans-serif',
                                        lineHeight: '26px',
                                        fontSize: '23px'
                                    }
                                },
                                colors: ['#B10024', '#EE8D00', '#FFE400', '#008AD9', '#C9D200']
                            }
                        },
                        series: [{
                            type: 'pie',
                            name: 'customerSatisfaction',
                            data: $scope.piechartdata
                        }],
                        labels: {
                            items: [{
                                html: $filter('translate')('_customer.number.ask.customers') + $scope.numberOfCustomers(data),
                                style: {
                                    left: '50px',
                                    top: '750px',
                                    fontFamily: '\'Lato\', sans-serif',
                                    lineHeight: '26px',
                                    fontSize: '23px'
                                }
                            }, {
                                html: $filter('translate')('_actual') + ' 2013: <br>52,2 % ' + $filter('translate')('_customer.verySatisfied') + '<br>47,8 % ' + $filter('translate')('_customer.satisfied'),
                                style: {
                                    left: userwidth,
                                    top: '610px',
                                    fontFamily: '\'Lato\', sans-serif',
                                    lineHeight: '26px',
                                    fontSize: '23px'
                                }
                            }, {
                                html: $filter('translate')('_target.value') + ' 2014: <br>65 % ' + $filter('translate')('_customer.verySatisfied') + '<br>35 % ' + $filter('translate')('_customer.satisfied'),
                                style: {
                                    left: userwidth,
                                    top: '710px',
                                    fontFamily: '\'Lato\', sans-serif',
                                    lineHeight: '26px',
                                    fontSize: '23px'
                                }
                            }]
                        }
                    };

                }
            });
            Console.groupEnd();
        }
    ]);