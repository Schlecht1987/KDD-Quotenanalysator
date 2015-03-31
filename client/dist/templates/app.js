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
