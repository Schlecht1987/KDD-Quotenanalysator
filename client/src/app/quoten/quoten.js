angular.module('quoten', [])
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/quoten', {
                templateUrl: 'quoten/quoten.tpl.html',
                controller: 'QuotenController'
            });
        }
    ])
    .controller('QuotenController', [
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
            Console.group("QuotenController entered.");
            $scope.getData = null;
            $scope.from = "2013-01-02";
            $scope.until = "2015-12-01";
            $scope.slider = null;
            $scope.item = {
                cost: 0.1
            };


            $scope.sliderChange = function() {
                console.debug("Slider changed");
                $scope.getChart();
            };

            $(document).ready(function() {
                $('#reservationtime').daterangepicker({
                        showDropdowns: true,
                        showWeekNumbers: true,
                        format: 'YYYY-MM-DD',
                        startDate: '2013-01-01',
                        endDate: '2014-12-31'
                    },
                    function(start, end, label) {

                        $scope.from = start.format('YYYY-MM-DD');
                        $scope.until = end.format('YYYY-MM-DD');
                        console.debug($scope.from);
                        console.debug($scope.until);
                    },
                    function(start, end, label) {
                        console.log(start.toISOString(), end.toISOString(), label);
                    });
            });
            //Bootstrap -slider open
            $("#ex2").slider({});
            //bootstrap datepicker
            $('.datepicker').datepicker();


            $scope.getChart = function() {

                var postObject = {
                    "from": $scope.from,
                    "until": $scope.until,
                    "spieltyp": "Bundesliga",
                    "wettanbieter": "bwin",
                    "quotenRange": $scope.item.cost
                };
                //get the data from the server and creates the chart
                $http({
                    method: "POST",
                    url: '/quoten/',
                    data: postObject
                }).
                success(function(data) {

                    if (!data.error) {
                        $scope.getData = data;
                        console.debug("data", data);
                        $scope.infos = [];
                        $scope.anzahlSpiele = [];
                        for (var i = 0; i < data.prozent.length; i++) {
                            $scope.infos[i] = {
                                y: data.prozent[i],
                                siege: data.siege[i],
                                niederlagen: data.niederlagen[i]
                            };
                            $scope.anzahlSpiele[i] = {
                                y: data.siege[i] + data.niederlagen[i],
                                siege: data.siege[i],
                                niederlagen: data.niederlagen[i]
                            };

                        }
                        console.debug($scope.infos);


                        $scope.chartConfig = {
                            options: {
                                chart: {
                                    type: 'column'
                                },
                                title: {
                                    text: 'Quoten Analyse'
                                },

                                xAxis: {
                                    categories: data.quoten,
                                    type: 'category',
                                    labels: {
                                        style: {
                                            fontSize: '13px',
                                            fontFamily: 'Verdana, sans-serif'
                                        }
                                    }
                                },
                                yAxis: [{
                                        min: 0,
                                        max: 100,
                                        title: {
                                            text: '%'
                                        }
                                    }, {
                                        min: 0,
                                        title: {
                                            text: 'Anzahl Spiele'
                                        },
                                        opposite: true
                                    }

                                ],
                                legend: {
                                    enabled: false
                                },
                                plotOptions: {
                                    series: {
                                        borderWidth: 0,
                                        dataLabels: {
                                            enabled: true,
                                            format: '{point.y:.1f}%'
                                        }
                                    },
                                    column: {
                                        animation: false
                                    }
                                },
                                tooltip: {
                                    formatter: function() {
                                        return ' ' +
                                            'siege: ' + this.point.siege + '<br />' +
                                            'Niederlagen: ' + this.point.niederlagen + '<br />';
                                    }
                                }
                            },
                            series: [{
                                name: '%',
                                data: $scope.infos
                            }, {
                                name: '%',
                                data: $scope.anzahlSpiele,
                                yAxis: 1,
                                tooltip: {
                                    valueSuffix: ''
                                },
                                dataLabels: {
                                    enabled: true,
                                    format: '{point.y}'
                                }
                            }]
                        };
                    }
                });
            };

            $scope.neumalen = function() {
                console.debug("lalala");
                $scope.getChart();
                //$scope.chartConfig.options.xAxis.categories.pop(1);
                /*     var rnd = [];
                     for (var i = 0; i < 10; i++) {
                         rnd.push(Math.floor(Math.random() * 20) + 1);
                     }
                     $scope.chartConfig.series.push({
                         data: rnd
                     });*/



            };




            Console.groupEnd();
        }
    ]);
