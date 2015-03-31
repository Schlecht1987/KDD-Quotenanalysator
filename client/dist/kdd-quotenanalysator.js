/*! kdd-quotenanalysator - v0.0.1-SNAPSHOT - 2015-03-31
 * http://localhost:11016/
 * Copyright (c) 2015 Hendrik Froemming;
 * Licensed 
 */
// Hauptmodul 
angular.module('app', [
    'ngRoute',
    'start',
    'begegnung',
    'quoten',
    'ngResource',
    'ngCookies',
    'pascalprecht.translate',
    'services.console',
    'directives.highcharts',
    'templates.app',
    'templates.common',
    'ui.bootstrap',
    'highcharts-ng',
    'myDatepicker',
    'bootstrapSlider',
    'angularUtils.directives.dirPagination'

]);

angular.module('app').config(['$routeProvider', '$locationProvider', '$translateProvider',

    function($routeProvider, $locationProvider, $translateProvider) {
        $locationProvider.html5Mode(false);
        $routeProvider.otherwise({
            redirectTo: '/quoten'
        });
        $translateProvider.translations('de', {

        });
        $translateProvider.translations('en', {

        });
        $translateProvider.preferredLanguage('de');
        $translateProvider.useCookieStorage();
    }
]);

angular.module('app').controller('AppCtrl', [
    'Console',
    '$translate',
    '$rootScope',
    '$cookieStore',
    '$location',
    '$timeout',
    '$scope',
    '$http',
    '$filter',
    function(
        Console,
        $translate,
        $rootScope,
        $cookieStore,
        $location,
        $timeout,
        $scope,
        $http,
        $filter
    ) {
        Console.group("AppController entered");
        $scope.comingmatches = 0;
        $scope.gametypes = 0;
        $scope.matches = 0;
        $scope.matcheswithoutresult = 0;
        $scope.oddsChanges = 0;
        $scope.results = 0;
        $scope.teams = 0;

        $scope.getOverviewData = function() {
            console.log("try to get initial data");
            $http.get('/inputdata/').
            success(function(data, status, headers, config) {

                Console.debug("data", data);
                $scope.comingmatches = data.comingmatches;
                $scope.gametypes = data.gametypes;
                $scope.matches = data.matches;
                $scope.matcheswithoutresult = data.matcheswithoutresult;
                $scope.oddsChanges = data.oddsChanges;
                $scope.results = data.results;
                $scope.teams = data.teams;

            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.

            });

        };
        $scope.getOverviewData();

        // Apply the theme
        var highchartsOptions = Highcharts.setOptions(Highcharts.theme);

        Console.groupEnd(); // .controller
    }
]);

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

            $scope.searchSpieltyp ="";

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

//Nicht Implementierte Startseite

angular.module('start', [])
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.when('/start', {
        templateUrl: 'start/start.tpl.html',
        controller: 'StartController'
      });
    }
  ])
  .controller('StartController', [
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
      Console.group("StartController entered.");

      $scope.meineVariable = "Hello World";

      Console.groupEnd();
    }
  ]);
if (typeof module !== 'undefined' && typeof exports !== 'undefined' && module.exports === exports) {
    module.exports = 'highcharts-ng';
}
(function() {
    'use strict';
    /*global angular: false, Highcharts: false */



    function highchartsNGUtils() {

        return {

            //IE8 support
            indexOf: function(arr, find, i /*opt*/ ) {
                if (i === undefined) {
                    i = 0;
                }
                if (i < 0) {
                    i += arr.length;
                }
                if (i < 0) {
                    i = 0;
                }
                for (var n = arr.length; i < n; i++) {
                    if (i in arr && arr[i] === find) {
                        return i;
                    }
                    return -1;
                }
            },

            prependMethod: function(obj, method, func) {
                var original = obj[method];
                obj[method] = function() {
                    var args = Array.prototype.slice.call(arguments);
                    func.apply(this, args);
                    if (original) {
                        return original.apply(this, args);
                    } else {
                        return;
                    }

                };
            },

            deepExtend: function deepExtend(destination, source) {
                //Slightly strange behaviour in edge cases (e.g. passing in non objects)
                //But does the job for current use cases.
                if (angular.isArray(source)) {
                    destination = angular.isArray(destination) ? destination : [];
                    for (var i = 0; i < source.length; i++) {
                        destination[i] = deepExtend(destination[i] || {}, source[i]);
                    }
                } else if (angular.isObject(source)) {
                    for (var property in source) {
                        destination[property] = deepExtend(destination[property] || {}, source[property]);
                    }
                } else {
                    destination = source;
                }
                return destination;
            }
        };
    }

    function highchart(highchartsNGUtils, $timeout) {

        // acceptable shared state
        var seriesId = 0;
        var ensureIds = function(series) {
            var changed = false;
            angular.forEach(series, function(s) {
                if (!angular.isDefined(s.id)) {
                    s.id = 'series-' + seriesId++;
                    changed = true;
                }
            });
            return changed;
        };

        // immutable
        var axisNames = ['xAxis', 'yAxis'];
        var chartTypeMap = {
            'stock': 'StockChart',
            'map': 'Map',
            'chart': 'Chart'
        };

        var getMergedOptions = function(scope, element, config) {
            var mergedOptions = {};

            var defaultOptions = {
                chart: {
                    events: {}
                },
                title: {},
                subtitle: {},
                series: [],
                credits: {},
                plotOptions: {},
                navigator: {
                    enabled: false
                }
            };

            if (config.options) {
                mergedOptions = highchartsNGUtils.deepExtend(defaultOptions, config.options);
            } else {
                mergedOptions = defaultOptions;
            }
            mergedOptions.chart.renderTo = element[0];

            angular.forEach(axisNames, function(axisName) {
                if (angular.isDefined(config[axisName])) {
                    mergedOptions[axisName] = angular.copy(config[axisName]);

                    if (angular.isDefined(config[axisName].currentMin) ||
                        angular.isDefined(config[axisName].currentMax)) {

                        highchartsNGUtils.prependMethod(mergedOptions.chart.events, 'selection', function(e) {
                            var thisChart = this;
                            if (e[axisName]) {
                                scope.$apply(function() {
                                    scope.config[axisName].currentMin = e[axisName][0].min;
                                    scope.config[axisName].currentMax = e[axisName][0].max;
                                });
                            } else {
                                //handle reset button - zoom out to all
                                scope.$apply(function() {
                                    scope.config[axisName].currentMin = thisChart[axisName][0].dataMin;
                                    scope.config[axisName].currentMax = thisChart[axisName][0].dataMax;
                                });
                            }
                        });

                        highchartsNGUtils.prependMethod(mergedOptions.chart.events, 'addSeries', function(e) {
                            scope.config[axisName].currentMin = this[axisName][0].min || scope.config[axisName].currentMin;
                            scope.config[axisName].currentMax = this[axisName][0].max || scope.config[axisName].currentMax;
                        });
                    }
                }
            });

            if (config.title) {
                mergedOptions.title = config.title;
            }
            if (config.subtitle) {
                mergedOptions.subtitle = config.subtitle;
            }
            if (config.credits) {
                mergedOptions.credits = config.credits;
            }
            if (config.size) {
                if (config.size.width) {
                    mergedOptions.chart.width = config.size.width;
                }
                if (config.size.height) {
                    mergedOptions.chart.height = config.size.height;
                }
            }
            return mergedOptions;
        };

        var updateZoom = function(axis, modelAxis) {
            var extremes = axis.getExtremes();
            if (modelAxis.currentMin !== extremes.dataMin || modelAxis.currentMax !== extremes.dataMax) {
                axis.setExtremes(modelAxis.currentMin, modelAxis.currentMax, false);
            }
        };

        var processExtremes = function(chart, axis, axisName) {
            if (axis.currentMin || axis.currentMax) {
                chart[axisName][0].setExtremes(axis.currentMin, axis.currentMax, true);
            }
        };

        var chartOptionsWithoutEasyOptions = function(options) {
            return highchartsNGUtils.deepExtend({}, options, {
                data: null,
                visible: null
            });
        };

        var getChartType = function(scope) {
            if (scope.config === undefined) {
                return 'Chart';
            }
            return chartTypeMap[('' + scope.config.chartType).toLowerCase()] ||
                (scope.config.useHighStocks ? 'StockChart' : 'Chart');
        };

        return {
            restrict: 'EAC',
            replace: true,
            template: '<div></div>',
            scope: {
                config: '=',
                disableDataWatch: '='
            },
            link: function(scope, element, attrs) {
                // We keep some chart-specific variables here as a closure
                // instead of storing them on 'scope'.

                // prevSeriesOptions is maintained by processSeries
                var prevSeriesOptions = {};

                var processSeries = function(series) {
                    var i;
                    var ids = [];

                    if (series) {
                        var setIds = ensureIds(series);
                        if (setIds) {
                            //If we have set some ids this will trigger another digest cycle.
                            //In this scenario just return early and let the next cycle take care of changes
                            return false;
                        }

                        //Find series to add or update
                        angular.forEach(series, function(s) {
                            ids.push(s.id);
                            var chartSeries = chart.get(s.id);
                            if (chartSeries) {
                                if (!angular.equals(prevSeriesOptions[s.id], chartOptionsWithoutEasyOptions(s))) {
                                    chartSeries.update(angular.copy(s), false);
                                } else {
                                    if (s.visible !== undefined && chartSeries.visible !== s.visible) {
                                        chartSeries.setVisible(s.visible, false);
                                    }
                                    chartSeries.setData(angular.copy(s.data), false);
                                }
                            } else {
                                chart.addSeries(angular.copy(s), false);
                            }
                            prevSeriesOptions[s.id] = chartOptionsWithoutEasyOptions(s);
                        });

                        //  Shows no data text if all series are empty
                        if (scope.config.noData) {
                            var chartContainsData = false;

                            for (i = 0; i < series.length; i++) {
                                if (series[i].data && series[i].data.length > 0) {
                                    chartContainsData = true;

                                    break;
                                }
                            }

                            if (!chartContainsData) {
                                chart.showLoading(scope.config.noData);
                            } else {
                                chart.hideLoading();
                            }
                        }
                    }

                    //Now remove any missing series
                    for (i = chart.series.length - 1; i >= 0; i--) {
                        var s = chart.series[i];
                        if (s.options.id !== 'highcharts-navigator-series' && highchartsNGUtils.indexOf(ids, s.options.id) < 0) {
                            s.remove(false);
                        }
                    }

                    return true;
                };

                // chart is maintained by initChart
                var chart = false;
                var initChart = function() {
                    if (chart) {
                        chart.destroy();
                    }
                    prevSeriesOptions = {};
                    var config = scope.config || {};
                    var mergedOptions = getMergedOptions(scope, element, config);
                    var func = config.func || undefined;
                    var chartType = getChartType(scope);

                    chart = new Highcharts[chartType](mergedOptions, func);

                    for (var i = 0; i < axisNames.length; i++) {
                        if (config[axisNames[i]]) {
                            processExtremes(chart, config[axisNames[i]], axisNames[i]);
                        }
                    }
                    if (config.loading) {
                        chart.showLoading();
                    }
                    config.getHighcharts = function() {
                        return chart;
                    };

                };
                initChart();


                if (scope.disableDataWatch) {
                    scope.$watchCollection('config.series', function(newSeries, oldSeries) {
                        processSeries(newSeries);
                        chart.redraw();
                    });
                } else {
                    scope.$watch('config.series', function(newSeries, oldSeries) {
                        var needsRedraw = processSeries(newSeries);
                        if (needsRedraw) {
                            chart.redraw();
                        }
                    }, true);
                }

                scope.$watch('config.title', function(newTitle) {
                    chart.setTitle(newTitle, true);
                }, true);

                scope.$watch('config.subtitle', function(newSubtitle) {
                    chart.setTitle(true, newSubtitle);
                }, true);

                scope.$watch('config.loading', function(loading) {
                    if (loading) {
                        chart.showLoading(loading === true ? null : loading);
                    } else {
                        chart.hideLoading();
                    }
                });
                scope.$watch('config.noData', function(noData) {
                    if (scope.config && scope.config.loading) {
                        chart.showLoading(noData);
                    }
                }, true);

                scope.$watch('config.credits.enabled', function(enabled) {
                    if (enabled) {
                        chart.credits.show();
                    } else if (chart.credits) {
                        chart.credits.hide();
                    }
                });

                scope.$watch(getChartType, function(chartType, oldChartType) {
                    if (chartType === oldChartType) {
                        return;
                    }
                    initChart();
                });

                angular.forEach(axisNames, function(axisName) {
                    scope.$watch('config.' + axisName, function(newAxes, oldAxes) {
                        if (newAxes === oldAxes || !newAxes) {
                            return;
                        }

                        if (angular.isArray(newAxes)) {

                            for (var axisIndex = 0; axisIndex < newAxes.length; axisIndex++) {
                                var axis = newAxes[axisIndex];

                                if (axisIndex < chart[axisName].length) {
                                    chart[axisName][axisIndex].update(axis, false);
                                    updateZoom(chart[axisName][axisIndex], angular.copy(axis));
                                }

                            }

                        } else {
                            // update single axis
                            chart[axisName][0].update(newAxes, false);
                            updateZoom(chart[axisName][0], angular.copy(newAxes));
                        }

                        chart.redraw();
                    }, true);
                });
                scope.$watch('config.options', function(newOptions, oldOptions, scope) {
                    //do nothing when called on registration
                    if (newOptions === oldOptions) {
                        return;
                    }
                    initChart();
                    processSeries(scope.config.series);
                    chart.redraw();
                }, true);

                scope.$watch('config.size', function(newSize, oldSize) {
                    if (newSize === oldSize) {
                        return;
                    }
                    if (newSize) {
                        chart.setSize(newSize.width || chart.chartWidth, newSize.height || chart.chartHeight);
                    }
                }, true);

                scope.$on('highchartsng.reflow', function() {
                    chart.reflow();
                });

                scope.$on('$destroy', function() {
                    if (chart) {
                        try {
                            chart.destroy();
                        } catch (ex) {
                            // fail silently as highcharts will throw exception if element doesn't exist
                        }

                        $timeout(function() {
                            element.remove();
                        }, 0);
                    }
                });

            }
        };
    }
    angular.module('highcharts-ng', [])
        .factory('highchartsNGUtils', highchartsNGUtils)
        .directive('highchart', ['highchartsNGUtils', '$timeout', highchart]);
}());

    /* jshint ignore:start */
if (typeof module !== 'undefined' && typeof exports !== 'undefined' && module.exports === exports) {
    module.exports = 'highcharts-ng';
}
(function() {
  
    'use strict';
    /*global angular: false, Highcharts: false */
    angular.module('highcharts-ng', []).factory('highchartsNGUtils', highchartsNGUtils).directive('highchart', [
        'highchartsNGUtils',
        '$timeout',
        highchart
    ]);

    function highchartsNGUtils() { // jshint ignore:line

        return {
            indexOf: function(arr, find, i) {
                if (i === undefined) {
                    i = 0;
                }
                if (i < 0) {
                    i += arr.length;
                }
                if (i < 0) {
                    i = 0;
                }
                for (var n = arr.length; i < n; i++) {
                    if (i in arr && arr[i] === find)
                    {
                        return i;
                    }
                }
                return -1;
            },
            prependMethod: function(obj, method, func) {
                var original = obj[method];
                obj[method] = function() {
                    var args = Array.prototype.slice.call(arguments);
                    func.apply(this, args);
                    if (original) {
                        return original.apply(this, args);
                    } else {
                        return;
                    }
                };
            },
            deepExtend: function deepExtend(destination, source) {
                //Slightly strange behaviour in edge cases (e.g. passing in non objects)
                //But does the job for current use cases.
                if (angular.isArray(source)) {
                    destination = angular.isArray(destination) ? destination : [];
                    for (var i = 0; i < source.length; i++) {
                        destination[i] = deepExtend(destination[i] || {}, source[i]);
                    }
                } else if (angular.isObject(source)) {
                    for (var property in source) {
                        destination[property] = deepExtend(destination[property] || {}, source[property]);
                    }
                } else {
                    destination = source;
                }
                return destination;
            }
        };
    }

    function highchart(highchartsNGUtils, $timeout) {
        // acceptable shared state
        var seriesId = 0;
        var ensureIds = function(series) {
            var changed = false;
            angular.forEach(series, function(s) {
                if (!angular.isDefined(s.id)) {
                    s.id = 'series-' + seriesId++;
                    changed = true;
                }
            });
            return changed;
        };
        // immutable
        var axisNames = [
            'xAxis',
            'yAxis'
        ];
        var getMergedOptions = function(scope, element, config) {
            var mergedOptions = {};
            var defaultOptions = {
                chart: {
                    events: {}
                },
                title: {},
                subtitle: {},
                series: [],
                credits: {},
                plotOptions: {},
                navigator: {
                    enabled: false
                }
            };
            if (config.options) {
                mergedOptions = highchartsNGUtils.deepExtend(defaultOptions, config.options);
            } else {
                mergedOptions = defaultOptions;
            }
            mergedOptions.chart.renderTo = element[0];
            angular.forEach(axisNames, function(axisName) {
                if (angular.isDefined(config[axisName])) {
                    mergedOptions[axisName] = angular.copy(config[axisName]);
                    if (angular.isDefined(config[axisName].currentMin) || angular.isDefined(config[axisName].currentMax)) {
                        highchartsNGUtils.prependMethod(mergedOptions.chart.events, 'selection', function(e) {
                            var thisChart = this;
                            if (e[axisName]) {
                                scope.$apply(function() {
                                    scope.config[axisName].currentMin = e[axisName][0].min;
                                    scope.config[axisName].currentMax = e[axisName][0].max;
                                });
                            } else {
                                //handle reset button - zoom out to all
                                scope.$apply(function() {
                                    scope.config[axisName].currentMin = thisChart[axisName][0].dataMin;
                                    scope.config[axisName].currentMax = thisChart[axisName][0].dataMax;
                                });
                            }
                        });
                        highchartsNGUtils.prependMethod(mergedOptions.chart.events, 'addSeries', function(e) {
                            scope.config[axisName].currentMin = this[axisName][0].min || scope.config[axisName].currentMin;
                            scope.config[axisName].currentMax = this[axisName][0].max || scope.config[axisName].currentMax;
                        });
                    }
                }
            });
            if (config.title) {
                mergedOptions.title = config.title;
            }
            if (config.subtitle) {
                mergedOptions.subtitle = config.subtitle;
            }
            if (config.credits) {
                mergedOptions.credits = config.credits;
            }
            if (config.size) {
                if (config.size.width) {
                    mergedOptions.chart.width = config.size.width;
                }
                if (config.size.height) {
                    mergedOptions.chart.height = config.size.height;
                }
            }
            return mergedOptions;
        };
        var updateZoom = function(axis, modelAxis) {
            var extremes = axis.getExtremes();
            if (modelAxis.currentMin !== extremes.dataMin || modelAxis.currentMax !== extremes.dataMax) {
                axis.setExtremes(modelAxis.currentMin, modelAxis.currentMax, false);
            }
        };
        var processExtremes = function(chart, axis, axisName) {
            if (axis.currentMin || axis.currentMax) {
                chart[axisName][0].setExtremes(axis.currentMin, axis.currentMax, true);
            }
        };
        var chartOptionsWithoutEasyOptions = function(options) {
            return angular.extend({}, options, {
                data: null,
                visible: null
            });
        };
        return {
            restrict: 'EAC',
            replace: true,
            template: '<div></div>',
            scope: {
                config: '=',
                disableDataWatch: '='
            },
            link: function(scope, element, attrs) {
                // We keep some chart-specific variables here as a closure
                // instead of storing them on 'scope'.
                // prevSeriesOptions is maintained by processSeries
                var prevSeriesOptions = {};
                var processSeries = function(series) {
                    var i;
                    var ids = [];
                    if (series) {
                        var setIds = ensureIds(series);
                        if (setIds) {
                            //If we have set some ids this will trigger another digest cycle.
                            //In this scenario just return early and let the next cycle take care of changes
                            return false;
                        }
                        //Find series to add or update
                        angular.forEach(series, function(s) {
                            ids.push(s.id);
                            var chartSeries = chart.get(s.id);
                            if (chartSeries) {
                                if (!angular.equals(prevSeriesOptions[s.id], chartOptionsWithoutEasyOptions(s))) {
                                    chartSeries.update(angular.copy(s), false);
                                } else {
                                    if (s.visible !== undefined && chartSeries.visible !== s.visible) {
                                        chartSeries.setVisible(s.visible, false);
                                    }
                                    chartSeries.setData(angular.copy(s.data), false);
                                }
                            } else {
                                chart.addSeries(angular.copy(s), false);
                            }
                            prevSeriesOptions[s.id] = chartOptionsWithoutEasyOptions(s);
                        });
                        //  Shows no data text if all series are empty
                        if (scope.config.noData) {
                            var chartContainsData = false;
                            for (i = 0; i < series.length; i++) {
                                if (series[i].data && series[i].data.length > 0) {
                                    chartContainsData = true;
                                    break;
                                }
                            }
                            if (!chartContainsData) {
                                chart.showLoading(scope.config.noData);
                            } else {
                                chart.hideLoading();
                            }
                        }
                    }
                    //Now remove any missing series
                    for (i = chart.series.length - 1; i >= 0; i--) {
                        var s = chart.series[i];
                        if (s.options.id !== 'highcharts-navigator-series' && highchartsNGUtils.indexOf(ids, s.options.id) < 0) {
                            s.remove(false);
                        }
                    }
                    return true;
                };
                // chart is maintained by initChart
                var chart = false;
                var initChart = function() {
                    if (chart)
                    {
                        chart.destroy();
                    }
                    prevSeriesOptions = {};
                    var config = scope.config || {};
                    var mergedOptions = getMergedOptions(scope, element, config);
                    var func = config.func || undefined;
                    chart = config.useHighStocks ? new Highcharts.StockChart(mergedOptions, func) : new Highcharts.Chart(mergedOptions, func);
                    for (var i = 0; i < axisNames.length; i++) {
                        if (config[axisNames[i]]) {
                            processExtremes(chart, config[axisNames[i]], axisNames[i]);
                        }
                    }
                    if (config.loading) {
                        chart.showLoading();
                    }
                    config.getHighcharts = function() {
                        return chart;
                    };
                };
                initChart();
                if (scope.disableDataWatch) {
                    scope.$watchCollection('config.series', function(newSeries, oldSeries) {
                        processSeries(newSeries);
                        chart.redraw();
                    });
                } else {
                    scope.$watch('config.series', function(newSeries, oldSeries) {
                        var needsRedraw = processSeries(newSeries);
                        if (needsRedraw) {
                            chart.redraw();
                        }
                    }, true);
                }
                scope.$watch('config.title', function(newTitle) {
                    chart.setTitle(newTitle, true);
                }, true);
                scope.$watch('config.subtitle', function(newSubtitle) {
                    chart.setTitle(true, newSubtitle);
                }, true);
                scope.$watch('config.loading', function(loading) {
                    if (loading) {
                        chart.showLoading();
                    } else {
                        chart.hideLoading();
                    }
                });
                scope.$watch('config.credits.enabled', function(enabled) {
                    if (enabled) {
                        chart.credits.show();
                    } else if (chart.credits) {
                        chart.credits.hide();
                    }
                });
                scope.$watch('config.useHighStocks', function(useHighStocks, oldUseHighStocks) {
                    if (useHighStocks === oldUseHighStocks)
                    {
                        return;
                    }
                    initChart();
                });
                angular.forEach(axisNames, function(axisName) {
                    scope.$watch('config.' + axisName, function(newAxes, oldAxes) {
                        if (newAxes === oldAxes)
                        {
                            return;
                        }
                        if (newAxes) {
                            chart[axisName][0].update(newAxes, false);
                            updateZoom(chart[axisName][0], angular.copy(newAxes));
                            chart.redraw();
                        }
                    }, true);
                });
                scope.$watch('config.options', function(newOptions, oldOptions, scope) {
                    //do nothing when called on registration
                    if (newOptions === oldOptions)
                    {
                        return;
                    }
                    initChart();
                    processSeries(scope.config.series);
                    chart.redraw();
                }, true);
                scope.$watch('config.size', function(newSize, oldSize) {
                    if (newSize === oldSize)
                    {
                        return;
                    }
                    if (newSize) {
                        chart.setSize(newSize.width || undefined, newSize.height || undefined);
                    }
                }, true);
                scope.$on('highchartsng.reflow', function() {
                    chart.reflow();
                });
                scope.$on('$destroy', function() {
                    if (chart) {
                        chart.destroy();
                        $timeout(function() {
                            element.remove();
                        }, 0);
                    }
                });
            }
        };
    }
}());
   /* jshint ignore:end */
angular.module('directives.highcharts', []);
angular.module('directives.highcharts').directive('highcharts',['$rootScope',
  function($rootScope) {
    return {
      restrict: 'E',
      template: '<div></div>',
      scope: {
        chartData: "=value"
      },
      transclude: true,
      replace: true,

      link: function(scope, element, attrs) {
        var chartsDefaults = {
            exporting: {
            enabled : false
      },
          chart: {
            renderTo: 'highcharts',

            events: {
              load: function() {
                //bilfingerlogo
                //calculate width
                //130 px
             /*   var picturewidth = 130;
                var pictureheight = 130;
                var alingTop = 1;
                var highchartswidth = document.getElementById('highcharts').offsetWidth;
                if ($rootScope.smileyColorValue === 1) {
                  this.renderer.image('/assets/img/smileyGreen.svg', highchartswidth - picturewidth, alingTop, picturewidth, pictureheight).add();
                } else if ($rootScope.smileyColorValue === 2) {
                  this.renderer.image('/assets/img/smileyYellow.svg', highchartswidth - picturewidth,alingTop, picturewidth, pictureheight).add();
                } else if ($rootScope.smileyColorValue === 3) {
                  this.renderer.image('/assets/img/smileyRed.svg', highchartswidth - picturewidth, alingTop, picturewidth, pictureheight).add();
                } else {
                  this.renderer.image('/assets/img/smileyYellow.svg', highchartswidth - picturewidth, alingTop, picturewidth, pictureheight).add();
                }*/
                //this.renderer.image('/assets/img/Bilfinger_Logo.svg', userwidth-150, 10, 143, 57)
                //.add();
              }
            },
            type: attrs.type || null,
            height: attrs.height || null,
            width: attrs.width || null,
            title: attrs.title || null
          }
        };

        //Update when charts data changes
        scope.$watch(function() {
          return scope.chartData;
        }, function(value) {
          if (!value) {
            return;
          }
          // We need deep copy in order to NOT override original chart object.
          // This allows us to override chart data member and still the keep
          // our original renderTo will be the same
          var deepCopy = true;
          var newSettings = {};
          $.extend(deepCopy, newSettings, chartsDefaults, scope.chartData);
          var chart = new Highcharts.Chart(newSettings);
          console.log("New Highcharts");
        });
      }
    };
  }
]);
angular.module('myDatepicker', []);
angular.module("myDatepicker").directive('myDatepicker', function ($parse) {
    // my-datepicker
    // myDatepicker

   return {
      restrict: "EA",
      replace: true,
      template:"<input data-provide='datepicker' class='form-control' readonly>",
      link: function (scope, element, attrs) {
         var ngModel = $parse(attrs.ngModel); // ng-model="user.dateOfBirth"

         scope.$watch(ngModel, function (val) {
            var date = myHelpers.safeGetDate(val);
            element.datepicker("setDate", date);
         });

         var processChange = function () {
            var date = myHelpers.isoStringFromDate(element.datepicker("getDate"));

            scope.$apply(function (scope) {
               // Change bound variable
               ngModel.assign(scope, date);
               var newVal = myHelpers.safeGetDate(ngModel(scope));
               element.datepicker("setDate", newVal);
            });
         };

         element.datepicker({
           
            format: 'yyyy-mm-dd',
                clearBtn: true,
                language: "de",
                todayHighlight: true,
                autoclose: true
         });



      }
   };
})
;
angular.
    module('bootstrapSlider', []).
      directive('bootstrapSlider', function() {
        return {
            // scope:{sub_t:}
            link: function(scope, element, attrs) {



            $(document).ready(function() {
                // var init = scope.$eval(attrs.ngModel);
                var min = scope.$eval(attrs.min);
                var max = scope.$eval(attrs.max);
                var milestones = attrs.milestones.split(',');
                var defaultval = attrs.defaultval.split(',');
                var steps =  attrs.steps.split(',');
                var lowBoundText = $(element.find('input')[0]);
                var highBoundText = $(element.find('input')[1]);
                createAlert = function(alert,valid, obj){
                    obj = obj;
                    obj.valid = valid;
                    obj.alert = alert;
                    return obj;
                };
                hideAlert = function(){
                   proxyObj = {'scope':scope,'attrs' :attrs};
                    setTimeout( $.proxy(function(){
                        this.scope.$apply($.proxy(function(){
                            this.scope[this.attrs.ngModel].alert = null;
                        },this)); 
                    }, proxyObj
                    ), 5000);
                };
                if( parseInt(defaultval[0]) >= parseInt(defaultval[1])) {
                    alert= "Default value should be in ascending order. \n Lower bound should not be greater than higher bound";
                    scope[attrs.ngModel]= createAlert(alert,false,{});
                    return null;
                }
                lowBoundText.val(defaultval[0]);
                highBoundText.val(defaultval[1]);
    


                //Check to see if steps between all milestones covered
                if ((milestones.length +1) === steps.length){

                    var obj = {};
                    obj.valid = true;
                    obj.val =[parseInt(defaultval[0]),parseInt(defaultval[1])];
                    obj.min = min;
                    obj.max = max;
                    arr=[];
                    for(j= 0 ;  j< max;j=j+steps[0]){
                        viewObj = {};
                        viewObj.value =  min + steps[0]; 
                        arr.push(viewObj);
                    }
                    obj.stepper = arr;
                    scope[attrs.ngModel] = obj; 


                    $('.angular-slider').slider({
                        value : [parseInt(defaultval[0]),parseInt(defaultval[1])],
                        min : parseInt(min),
                        max : parseInt(max),
                        tooltip : 'hide',
                        handle: 'triangle',
                        selection: 'after',
                        step:steps[0],
                        steps:steps,
                        milestones: milestones
                    });



                    // Update model to reflect view
                    $('.angular-slider').slider().on('slide', function(ev) {
                        scope.$apply(function() {
                            scope[attrs.ngModel].val = ev.value;
                            lowBoundText.val(ev.value[0]);
                            highBoundText.val(ev.value[1]);
                        });
                    });


                    lowBoundText.bind('change',function(e){
                        
                        scope.$apply(function() {

                        origVal =scope[attrs.ngModel].val; 
                        if(e.target.value >= parseInt(origVal[1],10) || e.target.value < min ){
                            alert ="Value entered should be -\n * Lower than Higher Bound. \n * Shouldnt be  more than the min value. \n * It should be numeric";
                            obj = {};
                            obj = scope[attrs.ngModel];
                            scope[attrs.ngModel] = createAlert(alert,true,obj);
                            lowBoundText.val(origVal[0]);
                            hideAlert();


                        }

                        scope[attrs.ngModel].val = [e.target.value, origVal[1]];
                        $('.angular-slider').slider('setValue', scope[attrs.ngModel].val);

                        });
                    });

                    highBoundText.bind('change',function(e){
                        scope.$apply(function() {
                        origVal =scope[attrs.ngModel].val; 
                        console.log(origVal);
                        if(e.target.value <= parseInt(origVal[0],10) || e.target.value > max){
                            alert ="Value entered should be -\n * Higher than lower Bound. \n * Shouldnt be  less than the max value. \n * It should be numeric";
                            obj = {};
                            obj = scope[attrs.ngModel];
                            scope[attrs.ngModel] = createAlert(alert,true,obj);
                            highBoundText.val(origVal[1]);
                            hideAlert();
                        }
                        scope[attrs.ngModel].val = [origVal[0] ,e.target.value];
                        $('.angular-slider').slider('setValue', scope[attrs.ngModel].val);
                    });
                    });

                }else{
                    alert = "Steps should always be exactly one more than the no of milestones.";
                    scope[attrs.ngModel] = createAlert(alert,false,{});
                }
            });
        },
        templateUrl: 'directives/angular-slider.tpl.html'
    };
});

angular.module('services.console', []).factory('Console', function() {
  return window.debug; // assumes JavaScript Debug has already been loaded on the page
});

angular.module('templates.app', ['begegnung/begegnung.tpl.html', 'quoten/quoten.tpl.html', 'start/start.tpl.html']);

angular.module("begegnung/begegnung.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("begegnung/begegnung.tpl.html",
    "<div class=\"row\">\n" +
    "    <div class=\"col-lg-6 col-lg-offset-3\" id=\"begegnung_search\">\n" +
    "        <input type=\"text\" class=\"form-control\" placeholder=\"Suche\" ng:model=\"data.search\">\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"col-lg-12\">\n" +
    "    <div class=\"panel panel-default \" dir-paginate=\"value in begegnungData | filter:data.search| orderBy:['datum'] | itemsPerPage: 10 \" current-page=\"currentPage\">\n" +
    "        <div class=\"panel-heading \">\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-lg-10\">\n" +
    "                    <p class=\"text-center\"><b>Liga: {{value.spieltyp}}</b></p>\n" +
    "                </div>\n" +
    "                <div class=\"col-lg-2\">\n" +
    "                    <p class=\"text-center\"> {{cutTimestamp(value.datum)}} </p>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-lg-4\">\n" +
    "                    <div class=\"row row-border\">\n" +
    "                        <div class=\"col-lg-10\">\n" +
    "                            {{value.mannschaft_1}}\n" +
    "                        </div>\n" +
    "                        <div class=\"col-lg-2\">\n" +
    "                            {{value.quoteM1}}\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"col-lg-2\">\n" +
    "                    <div class=\"row row-border\">\n" +
    "                        <div class=\"col-lg-9\">\n" +
    "                            X\n" +
    "                        </div>\n" +
    "                        <div class=\"col-lg-3\">\n" +
    "                            {{value.quoteX}}\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"col-lg-4\">\n" +
    "                    <div class=\"row row-border\">\n" +
    "                        <div class=\"col-lg-10\">\n" +
    "                            {{value.mannschaft_2}}\n" +
    "                        </div>\n" +
    "                        <div class=\"col-lg-2\">\n" +
    "                            {{value.quoteM2}}\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"col-lg-2\">\n" +
    "                    Quotenschlüssel: {{value.quotenkey}}\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-lg-10\">\n" +
    "                    <div class=\"row\">\n" +
    "                        <div class=\"col-lg-4\">\n" +
    "                            <p class=\"text-center\"><b>T: {{value.quoteM1Chance}}%&nbsp;&nbsp;&nbsp;R: {{value.quoteM1RealChance}}%&nbsp;&nbsp;&nbsp;S: {{value.quoteM1CountGames}}&nbsp;&nbsp;&nbsp;<span ng-style=\"{color:expectationColorM1[value.id]}\">E: {{value.quoteM1Expecation}}</span>&nbsp;&nbsp;&nbsp;Q: {{value.quoteM1UsedQuoteForStats}}</b></p>\n" +
    "                        </div>\n" +
    "                        <div class=\"col-lg-4\">\n" +
    "                            <p class=\"text-center\"><b>T:{{value.quoteXChance}}%&nbsp;&nbsp; R:{{value.quoteXRealChance}}%&nbsp;&nbsp;S:{{value.quoteXCountGames}}&nbsp;&nbsp;<span ng-style=\"{color:expectationColorX[value.id]}\">E:{{value.quoteXExpecation}}</span>&nbsp;&nbsp;Q:{{value.quoteXUsedQuoteForStats}}</b></p>\n" +
    "                        </div>\n" +
    "                        <div class=\"col-lg-4\">\n" +
    "                            <p class=\"text-center\"><b>T: {{value.quoteM2Chance}}%&nbsp;&nbsp;&nbsp;R: {{value.quoteM2RealChance}}%&nbsp;&nbsp;&nbsp;S: {{value.quoteM2CountGames}}&nbsp;&nbsp;&nbsp;<span ng-style=\"{color:expectationColorM2[value.id]}\">E: {{value.quoteM2Expecation}}</span>&nbsp;&nbsp;&nbsp;Q: {{value.quoteM2UsedQuoteForStats}}</b></p>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"col-lg-2\">\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" aria-label=\"Left Align\" ng-click=\"togglePanel($index,value)\">\n" +
    "                        <span class=\"glyphicon glyphicon-menu-down\" aria-hidden=\"true\"></span>\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"panel-body\" ng-show=\"showpanel[$index] == true\">\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-lg-12 \">\n" +
    "                    <highchart class=\"h-chart\" config=\"charConfig[value.id]\"></highchart>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"col-lg-1 col-lg-offset-6\">\n" +
    "        <div class=\"loader\" title=\"5\" ng-hide=\"!isLoading\">\n" +
    "            <svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" width=\"24px\" height=\"30px\" viewBox=\"0 0 24 30\" style=\"enable-background:new 0 0 50 50;\" xml:space=\"preserve\">\n" +
    "                <rect x=\"0\" y=\"13\" width=\"4\" height=\"5\" fill=\"#333\">\n" +
    "                    <animate attributeName=\"height\" attributeType=\"XML\" values=\"5;21;5\" begin=\"0s\" dur=\"0.6s\" repeatCount=\"indefinite\" />\n" +
    "                    <animate attributeName=\"y\" attributeType=\"XML\" values=\"13; 5; 13\" begin=\"0s\" dur=\"0.6s\" repeatCount=\"indefinite\" />\n" +
    "                </rect>\n" +
    "                <rect x=\"10\" y=\"13\" width=\"4\" height=\"5\" fill=\"#333\">\n" +
    "                    <animate attributeName=\"height\" attributeType=\"XML\" values=\"5;21;5\" begin=\"0.15s\" dur=\"0.6s\" repeatCount=\"indefinite\" />\n" +
    "                    <animate attributeName=\"y\" attributeType=\"XML\" values=\"13; 5; 13\" begin=\"0.15s\" dur=\"0.6s\" repeatCount=\"indefinite\" />\n" +
    "                </rect>\n" +
    "                <rect x=\"20\" y=\"13\" width=\"4\" height=\"5\" fill=\"#333\">\n" +
    "                    <animate attributeName=\"height\" attributeType=\"XML\" values=\"5;21;5\" begin=\"0.3s\" dur=\"0.6s\" repeatCount=\"indefinite\" />\n" +
    "                    <animate attributeName=\"y\" attributeType=\"XML\" values=\"13; 5; 13\" begin=\"0.3s\" dur=\"0.6s\" repeatCount=\"indefinite\" />\n" +
    "                </rect>\n" +
    "            </svg>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "    <div class=\"col-log-8 col-lg-offset-4\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-log-11 col-lg-offset-1\">\n" +
    "                <dir-pagination-controls max-size=\"\" direction-links=\"\" boundary-links=\"\" on-page-change=\"paginationPageChange()\" pagination-id=\"\" template-url=\"../../vendor/bower_components/angular-utils-pagination/dirPagination.tpl.html\">\n" +
    "                </dir-pagination-controls>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("quoten/quoten.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("quoten/quoten.tpl.html",
    "<div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-heading\">\n" +
    "        <div class='wrapper text-center'>\n" +
    "            <div class=\"btn-group btn-group-lg\" role=\"group\" aria-label=\"...\">\n" +
    "                <button type=\"button\" class=\"btn btn-default\" ng-click=\"changeQuotentyp(1)\">Alle</button>\n" +
    "                <button type=\"button\" class=\"btn btn-default\" ng-click=\"changeQuotentyp(2)\">Heim</button>\n" +
    "                <button type=\"button\" class=\"btn btn-default\" ng-click=\"changeQuotentyp(3)\">Unentschieden</button>\n" +
    "                <button type=\"button\" class=\"btn btn-default\" ng-click=\"changeQuotentyp(4)\">Gast</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"panel-body\">\n" +
    "        <highchart id=\"chart1\" config=\"chartConfig\"></highchart>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class='wrapper text-center'>\n" +
    "    <button type=\"button\" class=\"btn-success btn-lg\" ng-click=\"neumalen()\" ng-hide=\"isLoading\">\n" +
    "        GO\n" +
    "    </button>\n" +
    "    <div class=\"loader\" ng-hide=\"!isLoading\">\n" +
    "        <svg version=\"1.1\" id=\"loader-1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" width=\"50px\" height=\"50px\" viewBox=\"0 0 50 50\" style=\"enable-background:new 0 0 50 50;\" xml:space=\"preserve\">\n" +
    "            <path fill=\"#000\" d=\"M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z\">\n" +
    "                <animateTransform attributeType=\"xml\" attributeName=\"transform\" type=\"rotate\" from=\"0 25 25\" to=\"360 25 25\" dur=\"0.6s\" repeatCount=\"indefinite\" />\n" +
    "            </path>\n" +
    "        </svg>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"row\">\n" +
    "    <div class=\"col-lg-3 \">\n" +
    "        <div class=\"panel panel-default\">\n" +
    "            <div class=\"panel-heading\">\n" +
    "                <h3 class=\"panel-title\">Quotengenauigkeit</h3>\n" +
    "            </div>\n" +
    "            <div class=\"panel-body\">\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"col-md-12 \">\n" +
    "                        <div class=\"vcenter\" id=\"floatleftid\">\n" +
    "                            <b> 0.01 </b>\n" +
    "                        </div>\n" +
    "                        <input id=\"customSlider\" type=\"range\" min=\"0.01\" max=\"1\" value=\"0.1\" step=\"0.01\" ng-model=\"accuracy\" ng-mouseup=\"sliderChange()\" />\n" +
    "                        <div class=\"vcenter\" id=\"floatleftid\">\n" +
    "                            <b> 1 </b>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <p class=\"text-center\"><b>{{accuracy}}</b>\n" +
    "                </p>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "    <div class=\"col-lg-3\">\n" +
    "        <p class=\"text-center\"><b>Datum von</b>\n" +
    "        </p>\n" +
    "        <div class=\"input-group\">\n" +
    "            <span class=\"input-group-addon\" id=\"basic-addon1\">von</span>\n" +
    "            <my-datepicker ng-model=\"from\"></my-datepicker>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"col-lg-3\">\n" +
    "        <p class=\"text-center\"><b>Datum bis</b>\n" +
    "        </p>\n" +
    "        <div class=\"input-group\">\n" +
    "            <span class=\"input-group-addon\" id=\"basic-addon1\">bis</span>\n" +
    "            <my-datepicker ng-model=\"until\"></my-datepicker>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"col-lg-3\">\n" +
    "        <div class=\"panel panel-default\">\n" +
    "            <div class=\"panel-heading\">\n" +
    "                <h3 class=\"panel-title\">Quotenbereich</h3>\n" +
    "            </div>\n" +
    "            <div class=\"panel-body\">\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"col-md-1 \">\n" +
    "                        <b>1.0 &nbsp</b>\n" +
    "                    </div>\n" +
    "                    <div class=\"col-md-8 \">\n" +
    "\n" +
    "\n" +
    "                        <input id=\"ex2\" type=\"text\" value=\"\" data-slider-min=\"1.0\" data-slider-max=\"30.0\" data-slider-step=\"0.1\" ng-mouseup=\"sliderChange()\" />\n" +
    "\n" +
    "                    </div>\n" +
    "                    <div class=\"col-md-2 \">\n" +
    "                        &nbsp&nbsp<b>&nbsp30</b>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <p class=\"text-center\"><b>{{myRangeSliderValue[0]}}-{{myRangeSliderValue[1]}}</b>\n" +
    "                </p>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "    <div class=\"col-lg-2 \">\n" +
    "        <div class=\"checkbox\">\n" +
    "            <label>\n" +
    "                <input type=\"checkbox\" ng-model=\"extendedSearch\"> Erweiterer Filter\n" +
    "            </label>\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"row\" ng-hide=\"!extendedSearch\">\n" +
    "    <div class=\"col-lg-3 \" ng-hide=\"boolFilterSpieltyp\">\n" +
    "        <div class=\"panel panel-default\">\n" +
    "            <div class=\"panel-heading\">\n" +
    "                <h3 class=\"panel-title\">Spieltypen</h3>\n" +
    "            </div>\n" +
    "            <div class=\"panel-body\">\n" +
    "                <div class=\"list-group listoverflow\">\n" +
    "                <input type=\"text\" ng-model=\"searchSpieltyp\" value=\"\" placeholder=\"Name einer Liga\" class=\"form-control\"> </input>\n" +
    "                    <a ng-repeat=\"item in spieltyp | filter:searchSpieltyp\" class=\"list-group-item\" ng-click=\"takeSpieltyp(item)\">\n" +
    "                        {{item}}\n" +
    "                     </a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"col-lg-3 \" ng-hide=\"boolFilterSpieltyp\">\n" +
    "        <div class=\"panel panel-default\">\n" +
    "            <div class=\"panel-heading\">\n" +
    "                <h3 class=\"panel-title\">Ausgewählte Spieltypen</h3>\n" +
    "            </div>\n" +
    "            <div class=\"panel-body\">\n" +
    "                <div class=\"list-group listoverflow\">\n" +
    "                    <a ng-repeat=\"item in selectedSpieltyp \" class=\"list-group-item\" ng-click=\"removeSpieltyp(item)\">\n" +
    "                {{item}}\n" +
    "                    </a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"col-lg-3 \">\n" +
    "        <div class=\"panel panel-default\">\n" +
    "            <div class=\"panel-heading\">\n" +
    "                <h3 class=\"panel-title\">Ausgewählte Mannschften</h3>\n" +
    "            </div>\n" +
    "            <div class=\"panel-body\">\n" +
    "                <div class=\"list-group listoverflow\">\n" +
    "                    <a ng-repeat=\"item in selectedMannschaften\" class=\"list-group-item\" ng-click=\"removeTeam(item)\">\n" +
    "                {{item}}\n" +
    "            </a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"col-lg-3 \">\n" +
    "        <div class=\"panel panel-default\">\n" +
    "            <div class=\"panel-heading\">\n" +
    "                <h3 class=\"panel-title\">Mannschaften</h3>\n" +
    "            </div>\n" +
    "            <div class=\"panel-body\">\n" +
    "                <input type=\"text\" ng-model=\"searchMannschaft\" value=\"\" placeholder=\"Name einer Mannschaft\" class=\"form-control\"> </input>\n" +
    "                <div class=\"list-group speciallistoverflow\">\n" +
    "                    <a ng-repeat=\"item in mannschaften | filter:searchMannschaft\" class=\"list-group-item\" ng-click=\"takeTeam(item)\">\n" +
    "                {{item}}\n" +
    "            </a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\" row\">\n" +
    "    <div class=\"col-lg-4 col-lg-offset-1\">\n" +
    "\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("start/start.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("start/start.tpl.html",
    "<!-- Single button -->\n" +
    "<div class=\"container\">\n" +
    " <div ng-model='meineVariable'> {{meineVariable}} </div>\n" +
    "</div>");
}]);

angular.module('templates.common', ['directives/angular-slider.tpl.html', '../../vendor/bower_components/angular-utils-pagination/dirPagination.tpl.html']);

angular.module("directives/angular-slider.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("directives/angular-slider.tpl.html",
    "<div ng-show=\"index.valid\">\n" +
    "  <div ng-init  =\"\">\n" +
    "\n" +
    "  <div class=\"row-fluid\">\n" +
    "    <div class=\"span2\" style=\"margin:0\">\n" +
    "      <div class=\"well well-small min-max\" >\n" +
    "          <strong>Min</strong><br/>{{index.min}}\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"span8\" style=\"margin:0\">\n" +
    "        <!--<ul  class=\"scale\" style=\"\">\n" +
    "          <li ng-repeat=\"stepper in index.stepper\" >\n" +
    "            {{!stepper.value}}s\n" +
    "          </li>\n" +
    "        </ul> -->\n" +
    "       <div class=\"angular-slider\">\n" +
    "       </div>\n" +
    "    </div>\n" +
    "    <div class=\"span2\" >\n" +
    "       <div class=\"well well-small min-max\" >\n" +
    "          <strong>Max</strong><br/>{{index.max}}\n" +
    "       </div>\n" +
    "    </div>\n" +
    "\n" +
    "    Lower Bound:\n" +
    "    <input type=\"text\" name=\"input\"  ng-trim=\"true\" >\n" +
    "    <br/>\n" +
    "    Higher Bound:\n" +
    "    <input type=\"text\" name=\"input\"  ng-trim=\"true\">\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"row-fluid\">\n" +
    "  <div class=\"alert alert-error span6 alertBox\" ng-show=\"index.alert\" style=\"float:left;width:50%;\">\n" +
    "\n" +
    "    {{index.alert}}\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("../../vendor/bower_components/angular-utils-pagination/dirPagination.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../../vendor/bower_components/angular-utils-pagination/dirPagination.tpl.html",
    "<ul class=\"pagination\" ng-if=\"1 < pages.length\">\n" +
    "    <li ng-if=\"boundaryLinks\" ng-class=\"{ disabled : pagination.current == 1 }\">\n" +
    "        <a href=\"\" ng-click=\"setCurrent(1)\">&laquo;</a>\n" +
    "    </li>\n" +
    "    <li ng-if=\"directionLinks\" ng-class=\"{ disabled : pagination.current == 1 }\">\n" +
    "        <a href=\"\" ng-click=\"setCurrent(pagination.current - 1)\">&lsaquo;</a>\n" +
    "    </li>\n" +
    "    <li ng-repeat=\"pageNumber in pages track by $index\" ng-class=\"{ active : pagination.current == pageNumber, disabled : pageNumber == '...' }\">\n" +
    "        <a href=\"\" ng-click=\"setCurrent(pageNumber)\">{{ pageNumber }}</a>\n" +
    "    </li>\n" +
    "\n" +
    "    <li ng-if=\"directionLinks\" ng-class=\"{ disabled : pagination.current == pagination.last }\">\n" +
    "        <a href=\"\" ng-click=\"setCurrent(pagination.current + 1)\">&rsaquo;</a>\n" +
    "    </li>\n" +
    "    <li ng-if=\"boundaryLinks\"  ng-class=\"{ disabled : pagination.current == pagination.last }\">\n" +
    "        <a href=\"\" ng-click=\"setCurrent(pagination.last)\">&raquo;</a>\n" +
    "    </li>\n" +
    "</ul>");
}]);
