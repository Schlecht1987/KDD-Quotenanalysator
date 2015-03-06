angular.module('templates.app', ['begegnung/begegnung.tpl.html', 'quoten/quoten.tpl.html', 'start/start.tpl.html']);

angular.module("begegnung/begegnung.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("begegnung/begegnung.tpl.html",
    "<div class=\"col-lg-3 col-lg-offset-9\">\n" +
    "\n" +
    "    <input type=\"text\" class=\"form-control\" placeholder=\"Suche\" ng:model=\"data.search\">\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "<div class=\"col-lg-12\">\n" +
    "    <div class=\"panel panel-default \" ng-repeat=\"value in begegnungData | filter:data.search| orderBy:['datum']\">\n" +
    "        <div class=\"panel-heading panel-custom\">\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-lg-3\">\n" +
    "                    <div class=\"row row-border\">\n" +
    "                        <div class=\"col-lg-9\">\n" +
    "                            {{value.mannschaft_1}}\n" +
    "                        </div>\n" +
    "                        <div class=\"col-lg-3\">\n" +
    "                            {{value.quoteM1}}\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
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
    "\n" +
    "                <div class=\"col-lg-3\">\n" +
    "                    <div class=\"row row-border\">\n" +
    "                        <div class=\"col-lg-9\">\n" +
    "                            {{value.mannschaft_2}}\n" +
    "                        </div>\n" +
    "                        <div class=\"col-lg-3\">\n" +
    "                            {{value.quoteM2}}\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"col-lg-2\">\n" +
    "                    {{value.spieltyp}}\n" +
    "                </div>\n" +
    "                <div class=\"col-lg-2\">\n" +
    "                    {{cutTimestamp(value.datum)}}\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-lg-2\">\n" +
    "                    Quotenschlüssel: 12\n" +
    "                </div>\n" +
    "                <div class=\"col-lg-2\">\n" +
    "                    Quotenwarscheinlichkeit\n" +
    "                </div>\n" +
    "                <div class=\"col-lg-2\">\n" +
    "                    {{value.spieltyp}}\n" +
    "                </div>\n" +
    "                <div class=\"col-lg-2\">\n" +
    "                    {{value.spieltyp}}\n" +
    "                </div>\n" +
    "                <div class=\"col-lg-2\">\n" +
    "                    {{value.spieltyp}}\n" +
    "                </div>\n" +
    "                <div class=\"col-lg-2\">\n" +
    "\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" aria-label=\"Left Align\" ng-click=\"togglePanel($index);buildHighcharts($index, value)\">\n" +
    "                        <span class=\"glyphicon glyphicon-menu-down\" aria-hidden=\"true\"></span>\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "        </div>\n" +
    "        <div class=\"panel-body\" ng-show=\"showpanel[$index] == true\">\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-lg-9 col-lg-offset-3\">\n" +
    "                    <highchart id=\"chart1\" config=\"charConfig[$index]\"></highchart>\n" +
    "                </div>\n" +
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
    "                        <input id=\"customSlider\" type=\"range\" min=\"0.01\" max=\"2\" value=\"0.1\" step=\"0.01\" ng-model=\"accuracy\" ng-mouseup=\"sliderChange()\" />\n" +
    "                        <div class=\"vcenter\" id=\"floatleftid\">\n" +
    "                            <b> 2 </b>\n" +
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
    "                    <div class=\"col-md-12 \">\n" +
    "\n" +
    "                        <b>1.0 &nbsp&nbsp</b>\n" +
    "                        <input id=\"ex2\" type=\"text\" class=\"span2\" value=\"\" data-slider-min=\"1.0\" data-slider-max=\"30.0\" data-slider-step=\"0.1\" ng-mouseup=\"sliderChange()\"/> &nbsp&nbsp<b>30</b>\n" +
    "\n" +
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
    "                    <a ng-repeat=\"item in spieltyp \" class=\"list-group-item\" ng-click=\"takeSpieltyp(item)\">\n" +
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
    "  HELLO WORLD IHR MOTHERFUCKER\n" +
    "</div>");
}]);
