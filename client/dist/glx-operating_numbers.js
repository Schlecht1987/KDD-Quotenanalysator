/*! glx-operating_numbers - v0.0.1-SNAPSHOT - 2014-12-19
 * http://glx-operating_numbers.greylogix.local/
 * Copyright (c) 2014 Hendrik Froemming;
 * Licensed 
 */
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
    'highcharts-ng'
]);

angular.module('app').config(['$routeProvider', '$locationProvider', '$translateProvider',

    function($routeProvider, $locationProvider, $translateProvider) {
        $locationProvider.html5Mode(false);
        $routeProvider.otherwise({
            redirectTo: '/start'
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
        //The value for the Login Modal Loginbutton
        $scope.loginButtonValue = "Login";


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
            Console.group("BegegnungController entered.");

            $http({
                method: "GET",
                url: '/begegnung/'
            }).
            success(function(data) {
                if (!data.error) {
                   $scope.begegnungData = data;
                  console.debug(data);
        
                }
            });

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
            $scope.from = null;
            $scope.until = null;
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
                        for (var i = 0; i < data.prozent.length; i++) {
                            $scope.infos[i] = {
                                y: data.prozent[i],
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
                                yAxis: {
                                    min: 0,
                                    max: 100,
                                    title: {
                                        text: '%'
                                    }
                                },
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
                                name: 'Population',
                                data: $scope.infos
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

      $scope.goToDataDelete = function() {
        $location.path("/delete");
      };

      Console.groupEnd();
    }
  ]);
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

angular.module('services.console', []).factory('Console', function() {
  return window.debug; // assumes JavaScript Debug has already been loaded on the page
});

angular.module('templates.app', ['begegnung/begegnung.tpl.html', 'quoten/quoten.tpl.html', 'start/start.tpl.html']);

angular.module("begegnung/begegnung.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("begegnung/begegnung.tpl.html",
    "<div>\n" +
    " <table class='table table-hover'>\n" +
    "    <thead>\n" +
    "      <tr>\n" +
    "        <th>1</th>\n" +
    "        <th>2</th>\n" +
    "        <th>3</th>\n" +
    "        <th>4</th>\n" +
    "        <th>5</th>\n" +
    "        <th>6</th>\n" +
    "        <th>\n" +
    "          <div class=\"input-group\">\n" +
    "            <input type=\"text\" class=\"form-control\" placeholder=\"Suche\" ng:model=\"data.search\">\n" +
    "          </div>\n" +
    "        </th>\n" +
    "      </tr>\n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "      <tr ng-repeat=\"value in begegnungData | filter:data.search| orderBy:['datum']\" id='row{{$index}}'>\n" +
    "        <td>{{value.datum}}</td>\n" +
    "        <td>{{value.mannschaft_1}}</td>\n" +
    "        <td>{{value.mannschaft_2}}</td>\n" +
    "        <td>{{value.spieltyp}}</td>\n" +
    "        <td>{{value.ergebnis}}</td>\n" +
    "        <td>\n" +
    "          <!-- Button trigger modal -->\n" +
    "          <a data-toggle=\"modal\" data-target='#myModal{{$index}}' class=\"btn btn-primary btn-lg\">Quoten Änderung</a>\n" +
    "          <!-- Modal -->\n" +
    "          <div class=\"modal fade\" id='myModal{{$index}}' tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n" +
    "            <div class=\"modal-dialog\">\n" +
    "              <div class=\"modal-content\">\n" +
    "                <div class=\"modal-header\">\n" +
    "                  <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n" +
    "                  <h4 class=\"modal-title\">Achtung</h4>\n" +
    "                </div>\n" +
    "                <div class=\"modal-body\">\n" +
    "                 \n" +
    "                </div>\n" +
    "                <div class=\"modal-footer\">\n" +
    "                  <button type=\"button\" ng:click=\"deleteById(collectionData.mongoId[value.mongoIndex], Urls.capacity.deleteUrl, $index,value.mongoIndex)\" class=\"btn btn-primary\" data-dismiss=\"modal\">ja</button>\n" +
    "                  <button type=\"button\" ng:click=\"noClicked()\" class=\"btn btn-primary\" data-dismiss=\"modal\">nein</button>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "              <!-- /.modal-content -->\n" +
    "            </div>\n" +
    "            <!-- /.modal-dialog -->\n" +
    "          </div>\n" +
    "          <!-- /.modal -->\n" +
    "        </td>\n" +
    "      </tr>\n" +
    "    </tbody>\n" +
    "  </table>\n" +
    "</div>");
}]);

angular.module("quoten/quoten.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("quoten/quoten.tpl.html",
    "<div>\n" +
    "    <highchart id=\"chart1\" config=\"chartConfig\"></highchart>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-lg-2\">\n" +
    "            <div class=\"input-group\">\n" +
    "                <button ng-click=\"neumalen()\">\n" +
    "                    EIN BUTTON\n" +
    "                </button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-lg-2\">\n" +
    "            <div class=\"input-group\">\n" +
    "                <span class=\"input-group-addon\">@</span>\n" +
    "                <input id=\"reservationtime\" type=\"text\" class=\"form-control\" placeholder=\"Datum\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-lg-2\">\n" +
    "            <input type=\"range\" min=\"0.025\" max=\"2\" value=\"0.1\" step=\"0.025\" ng-model=\"item.cost\" ng-mouseup=\"sliderChange()\"/>\n" +
    "            {{item.cost}}\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("start/start.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("start/start.tpl.html",
    "<!-- Single button -->\n" +
    "<div class=\"container\">\n" +
    "  HELLO WORLD IHR MOTHERFUCKER\n" +
    "</div>");
}]);

angular.module('templates.common', []);

