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
            Console.group("QuotenController entered.");
            //-------------------------Filter---------------------------------------
            //1= Alle   2= Heim   3 = Unentschieden   4= Gast
            $scope.quotenTyp = 1;
            //Quotenfilter Datum von
            $scope.from = "2013-12-01";
             //Quotenfilter Datum bis
            $scope.until = "2015-12-01";
            //Quotengenauigkeit
            $scope.accuracy = 0.1;
            //Quotenbereich
            $scope.myRangeSliderValue = [1.2, 2.2];
            //Boolean der prüft ob grade Daten geladen werden
            $scope.isLoading = false;

            //Jquery für range slider init
            $scope.myRangeSlider = $("#ex2").slider({
                value: $scope.myRangeSliderValue
            });
            //on change funktion call
            $('#ex2').on('change', function() {
                $scope.rangesliderChange();
            });

            //Funktion die beim Ändern der Quotengenauigkeit aufgerufen wird
            $scope.sliderChange = function() {
                $scope.neumalen();
            };
            //Funktion die beim Ändern des Quotenbereichts aufgerufen wird
            $scope.rangesliderChange = function() {
                $scope.myRangeSliderValue = $scope.myRangeSlider.slider('getValue');
                //Wichtig
                $scope.$apply();
            };
            //Funktion die beim Änderun des Quotentypes ausgeführt wird
            //setzt den neuen Quotentyp und fragt neue Daten ab und 
            // pusht diese in das Highcharts Data Array
            $scope.changeQuotentyp = function(value) {
                if (value <= 4 && value >= 1) {
                    $scope.quotenTyp = value;
                    console.log("Quotentyp changed to " + value);
                    $scope.pushChart();
                }
            };
            //Erzeugt zum Quotentyp den entsprechenden String
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
            //Liste mit Spieltypen für den Quotenfilter
            $scope.spieltyp = [];
            //Kopie des arrays erzeugen für reset
            $scope.spieltyptemp = [];
            //Ausgewählte Spieltypen vom Quotenfilter
            $scope.selectedSpieltyp = [];
            //Liste mit Mannschaften für den Quotenfilter
            $scope.mannschaften = [];
            //Kopie des arrays erzeugen für reset
            $scope.mannschaftentemp = [];
            //Ausgewählte  Mannschaften von dem Quotenfilter
            $scope.selectedMannschaften = [];

            //Filter Input Feld
            $scope.searchMannschaft = "";

            //resettet den Mannschaft Array
            $scope.resetTeam = function() {
                $scope.selectedMannschaften = null;
                $scope.selectedMannschaften = [];
                $scope.mannschaften = null;
                $scope.mannschaften = $scope.mannschaftentemp.slice();
            };
            //resettet den Spieltyp array
            $scope.resetSpieltyp = function() {
                $scope.selectedSpieltyp = null;
                $scope.selectedSpieltyp = [];
                $scope.spieltyp = null;
                $scope.spieltyp = $scope.spieltyptemp.slice();
            };
            //Nimmt ein Team in den Mannschafts Array auf
            $scope.takeTeam = function(name) {
                $scope.resetSpieltyp();
                $scope.selectedMannschaften.push(name);
                $scope.mannschaften.splice($scope.mannschaften.indexOf(name), 1);
            };
            // Entfernt eine Team aus dem Mannschafts Array
            $scope.removeTeam = function(name) {
                $scope.mannschaften.push(name);
                $scope.selectedMannschaften.splice($scope.selectedMannschaften.indexOf(name), 1);
            };


             //Fügt ein Spieltyp in den Spieltyp Array ein
            $scope.takeSpieltyp = function(name) {
                $scope.resetTeam();
                $scope.selectedSpieltyp.push(name);
                $scope.spieltyp.splice($scope.spieltyp.indexOf(name), 1);
            };
             //Nimmt ein Spieltyp aus dem Spieltyp Array 
            $scope.removeSpieltyp = function(name) {
                $scope.spieltyp.push(name);
                $scope.selectedSpieltyp.splice($scope.selectedSpieltyp.indexOf(name), 1);
            };
            // Erzeugung des Quotenfilter POST Objektes
            $scope.creatPostObject = function() {

                var postObject = {
                    oddsTyp: $scope.quotenTyp,
                    dateFrom: $scope.from,
                    dateUntil: $scope.until,
                    oddsAccuracy: $scope.accuracy,
                    oddsRangeMin: $scope.myRangeSliderValue[0],
                    oddsRangeMax: $scope.myRangeSliderValue[1],
                    extendedFilter: $scope.extendedSearch,
                    gameType: $scope.selectedSpieltyp,
                    team: $scope.selectedMannschaften
                };

                return postObject;
            };

            //---------------------------Initial Data--------------------------------
            //GET Request für initial Daten ( Liste mit Mannschaften und allen Spieltypen)
            $scope.getInitialData = function() {

                $http.get('/quoten/inputdata/').
                success(function(data, status, headers, config) {

                    Console.debug("data", data);
                    $scope.mannschaftentemp = data.mannschaft.slice();
                    $scope.spieltyptemp = data.spieltyp.slice();
                    $scope.resetTeam();
                    $scope.resetSpieltyp();


                }).
                error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.

                });

            };
            $scope.getInitialData();
            //----------------------Highcharts-----------------------------------
            //Erzeugung des Diagramm durch Zuweisung des Highcharts Json Konstrukt
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
                        var infos = [];
                        infos = $scope.createChartInfos(data);

                        $scope.chartConfig = {
                            options: {
                                chart: {
                                    type: 'column',
                                    zoomType: 'x'
                                },
                                title: {
                                    text: 'Quoten Analyse',
                                    style: {
                                        fontWeight: 'bold'
                                    }
                                },

                                xAxis: {
                                    categories: data.quoten,
                                    type: 'category',
                                    labels: {
                                        style: {
                                            fontSize: '13px',
                                            fontFamily: 'Verdana, sans-serif',
                                            fontWeight: 'bold'
                                        }
                                    }
                                },
                                yAxis: {
                                    min: 0,
                                    max: 100,
                                    title: {
                                        text: '%',
                                        style: {
                                            fontSize: '13px',
                                            fontFamily: 'Verdana, sans-serif',
                                            fontWeight: 'bold'
                                        }
                                    },
                                    labels: {
                                        style: {
                                            fontSize: '13px',
                                            fontFamily: 'Verdana, sans-serif',
                                            fontWeight: 'bold'
                                        }
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
                                            format: '{point.y:.1f}%<br/>  S:{point.anzahl} <br/> <span style="color:{point.erwartungswertColor}"> E:{point.erwartungswert}</span>',
                                            style: {
                                                fontSize: '15px',
                                                fontFamily: 'Verdana, sans-serif',
                                                fontWeight: 'bold'
                                            }
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
                                data: infos
                            }]
                        };
                    }
                });
            };
            // POST Resonponse Daten parser Funktion
            // Mappt die Json Daten in ein für Highcharts
            // Konfortableres Format
            $scope.createChartInfos = function(data) {
                var infos = [];
                for (var i = 0; i < data.prozent.length; i++) {
                    if (data.prozent[i] > -1) {
                        infos[i] = {
                            y: data.prozent[i],
                            siege: data.siege[i],
                            niederlagen: data.niederlagen[i],
                            anzahl: data.siege[i] + data.niederlagen[i],
                            erwartungswert: data.erwartungswert[i]
                        };
                    } else {
                        infos[i] = {
                            y: 0,
                            siege: 0,
                            niederlagen: 0,
                            anzahl: 0,
                            erwartungswert: 0
                        };
                    }
                    if (infos[i].erwartungswert > 0) {
                        infos[i].erwartungswertColor = "#007A29";
                    } else if (infos[i].erwartungswert < 0) {
                        infos[i].erwartungswertColor = "#FF0000";
                    } else {
                        infos[i].erwartungswertColor = "#000000";
                    }
                }
                return infos;
            };
            // Diagramm neu Zeichnen
            $scope.neumalen = function() {
                $scope.startLoading();
                $scope.drawChart();
                $scope.finishLoading();
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
            // Neue Diagramm Daten abfragen, und diese 
            // in das aktuelle Diagramm einfügen
            $scope.pushChart = function() {
                if (typeof $scope.chartConfig === "undefined") {
                    $scope.neumalen();
                } else {


                    $scope.startLoading();
                    $http({
                        method: "POST",
                        url: '/quoten/',
                        data: $scope.creatPostObject()
                    }).
                    success(function(data) {

                        if (!data.error) {
                            console.debug("data", data);
                            var infos = [];
                            infos = $scope.createChartInfos(data);


                            $scope.chartConfig.series.push({
                                name: $scope.getLegendName(),
                                data: infos
                            });
                        }



                    });
                    $scope.finishLoading();
                }
            };




            Console.groupEnd();
        }
    ]);
