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
            //-------------------------Filter---------------------------------------
            //1= Alle   2= Heim   3 = Unentschieden   4= Gast
            $scope.quotenTyp = 1;
            $scope.from = "2013-12-01";
            $scope.until = "2015-12-01";
            //Quotengenauigkeit
            $scope.accuracy = 0.1;
            $scope.myRangeSliderValue = [1.0, 6.0];

            //Jquery für range slider init
            $scope.myRangeSlider = $("#ex2").slider({
                value: $scope.myRangeSliderValue
            });
            //on change funktion call
            $('#ex2').on('change', function() {
                $scope.rangesliderChange();
            });



            $scope.sliderChange = function() {
                $scope.neumalen();
            };

            $scope.rangesliderChange = function() {
                $scope.myRangeSliderValue = $scope.myRangeSlider.slider('getValue');
                //Wichtig
                $scope.$apply();
            };

            $scope.changeQuotentyp = function(value) {
                if (value <= 4 && value >= 1) {
                    $scope.quotenTyp = value;
                    console.log("Quotentyp changed to " + value);
                    $scope.pushChart();
                }
            };

            $scope.getLegendName = function() {
                if ($scope.quotenTyp === 1) {
                    return "Alle";
                }

                if ($scope.quotenTyp === 2) {
                    return "Heim";
                }

                if ($scope.quotenTyp === 3) {
                    return "Unentschieden";
                }
                if ($scope.quotenTyp === 4) {
                    return "Gast";
                }
            };

            //----------------Erweiterter Filter -----------------------------------------
            //Boolean für den erweiterten filter content
            $scope.extendedSearch = true;
            $scope.spieltyp = [];
            //Kopie des arrays erzeugen
            $scope.spieltyptemp = [];
            $scope.selectedSpieltyp = [];
            $scope.mannschaften = [];
            //Kopie des arrays erzeugen
            $scope.mannschaftentemp = [];
            $scope.selectedMannschaften = [];

            //Filter Input Feld
            $scope.searchMannschaft = "";

            $scope.resetTeam = function() {
                $scope.selectedMannschaften = null;
                $scope.selectedMannschaften = [];
                $scope.mannschaften = null;
                $scope.mannschaften = $scope.mannschaftentemp.slice();
            };

            $scope.resetSpieltyp = function() {
                $scope.selectedSpieltyp = null;
                $scope.selectedSpieltyp = [];
                $scope.spieltyp = null;
                $scope.spieltyp = $scope.spieltyptemp.slice();
            };

            $scope.takeTeam = function(name) {
                $scope.resetSpieltyp();
                $scope.selectedMannschaften.push(name);
                $scope.mannschaften.splice($scope.mannschaften.indexOf(name), 1);
            };

            $scope.removeTeam = function(name) {
                $scope.mannschaften.push(name);
                $scope.selectedMannschaften.splice($scope.selectedMannschaften.indexOf(name), 1);
            };



            $scope.takeSpieltyp = function(name) {
                $scope.resetTeam();
                $scope.selectedSpieltyp.push(name);
                $scope.spieltyp.splice($scope.spieltyp.indexOf(name), 1);
            };

            $scope.removeSpieltyp = function(name) {
                $scope.spieltyp.push(name);
                $scope.selectedSpieltyp.splice($scope.selectedSpieltyp.indexOf(name), 1);
            };

            $scope.creatPostObject = function() {

                var postObject = {
                    quotenTyp: $scope.quotenTyp,
                    dateFrom: $scope.from,
                    dateUntil: $scope.until,
                    quotengenauigkeit: $scope.accuracy,
                    quotenRangemin: $scope.myRangeSliderValue[0],
                    quotenRangeMax: $scope.myRangeSliderValue[1],
                    extendedFilter: $scope.extendedSearch,
                    spieltyp: $scope.selectedSpieltyp,
                    mannschaft: $scope.selectedMannschaften
                };

                return postObject;
            };

            //---------------------------Initial Data--------------------------------

            $http({
                method: "GET",
                url: '/quoten/inputdata/'
            }).
            success(function(data) {
                if (!data.error) {
                    Console.debug("data", data);
                    $scope.mannschaftentemp = data.mannschaft.slice();
                    $scope.spieltyptemp = data.spieltyp.slice();
                    $scope.resetTeam();
                    $scope.resetSpieltyp();

                }
            });


            //----------------------Highcharts-----------------------------------

            $scope.drawChart = function() {
                //get the data from the server and creates the chart
                $http({
                    method: "POST",
                    url: '/quoten/',
                    data: $scope.creatPostObject()
                }).
                success(function(data) {

                    if (!data.error) {
                        console.debug("data", data);
                        $scope.infos = [];
                        for (var i = 0; i < data.prozent.length; i++) {
                            if (data.prozent[i] > -1) {
                                $scope.infos[i] = {
                                    y: data.prozent[i],
                                    siege: data.siege[i],
                                    niederlagen: data.niederlagen[i],
                                    anzahl: data.siege[i] + data.niederlagen[i]
                                };
                            } else {
                                $scope.infos[i] = {
                                    y: 0,
                                    siege: 0,
                                    niederlagen: 0,
                                    anzahl: 0
                                };
                            }
                        }
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
                                yAxis: {
                                    min: 0,
                                    max: 120,
                                    title: {
                                        text: '%'
                                    }
                                },
                                legend: {
                                    enabled: true
                                },
                                plotOptions: {
                                    series: {
                                        borderWidth: 0,
                                        dataLabels: {
                                            enabled: true,
                                            format: '{point.y:.1f}%<br/>  S:{point.anzahl}'
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
                                name: $scope.getLegendName(),
                                data: $scope.infos
                            }]
                        };
                    }
                });
            };

            $scope.neumalen = function() {
                $scope.drawChart();
                //$scope.chartConfig.options.xAxis.categories.pop(1);
                /*     var rnd = [];
                     for (var i = 0; i < 10; i++) {
                         rnd.push(Math.floor(Math.random() * 20) + 1);
                     }
                     $scope.chartConfig.series.push({
                         data: rnd
                     });*/

            };

            $scope.pushChart = function() {
                $http({
                    method: "POST",
                    url: '/quoten/',
                    data: $scope.creatPostObject()
                }).
                success(function(data) {

                    if (!data.error) {
                        console.debug("data", data);
                        var infos = [];
                        for (var i = 0; i < data.prozent.length; i++) {
                            if (data.prozent[i] > -1) {
                                infos[i] = {
                                    y: data.prozent[i],
                                    siege: data.siege[i],
                                    niederlagen: data.niederlagen[i],
                                    anzahl: data.siege[i] + data.niederlagen[i]
                                };
                            } else {
                                infos[i] = {
                                    y: 0,
                                    siege: 0,
                                    niederlagen: 0,
                                    anzahl: 0
                                };
                            }
                        }
                        $scope.chartConfig.series.push({
                            name: $scope.getLegendName(),
                            data: infos
                        });
                    }



                });
            };




            Console.groupEnd();
        }
    ]);
