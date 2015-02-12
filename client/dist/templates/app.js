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
    "<div class='wrapper text-center'>\n" +
    "    <div class=\"btn-group btn-group-lg\" role=\"group\" aria-label=\"...\">\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"changeQuotentyp(1)\">Alle</button>\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"changeQuotentyp(2)\">Heim</button>\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"changeQuotentyp(3)\">Unentschieden</button>\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"changeQuotentyp(4)\">Gast</button>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<highchart id=\"chart1\" config=\"chartConfig\"></highchart>\n" +
    "\n" +
    "<div class='wrapper text-center'>\n" +
    "    <button type=\"button\" class=\"btn-success btn-lg\" ng-click=\"neumalen()\">\n" +
    "        GO\n" +
    "    </button>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"row\">\n" +
    "    <div class=\"col-lg-2 col-lg-offset-2\">\n" +
    "        <p class=\"text-center\"><b>Quotengenauigkeit</b></p>\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-md-12 \">\n" +
    "                <div class=\"vcenter\" id=\"floatleftid\">\n" +
    "                    <b> 0.025 </b>\n" +
    "                </div>\n" +
    "                <input id=\"customSlider\" type=\"range\" min=\"0.01\" max=\"2\" value=\"0.1\" step=\"0.01\" ng-model=\"accuracy\" ng-mouseup=\"sliderChange()\" />\n" +
    "                <div class=\"vcenter\" id=\"floatleftid\">\n" +
    "                    <b> 2 </b>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <p class=\"text-center\"><b>{{accuracy}}</b>\n" +
    "        </p>\n" +
    "    </div>\n" +
    "    <div class=\"col-lg-2\">\n" +
    "        <p class=\"text-center\"><b>Datum von</b></p>\n" +
    "        <div class=\"input-group\">\n" +
    "            <span class=\"input-group-addon\" id=\"basic-addon1\">von</span>\n" +
    "            <my-datepicker ng-model=\"from\"></my-datepicker>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"col-lg-2\">\n" +
    "        <p class=\"text-center\"><b>Datum bis</b></p>\n" +
    "        <div class=\"input-group\">\n" +
    "            <span class=\"input-group-addon\" id=\"basic-addon1\">bis</span>\n" +
    "            <my-datepicker ng-model=\"until\"></my-datepicker>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"col-lg-2\">\n" +
    "        <p class=\"text-center\"><b>Quotenbereich</b></p>\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-md-12 \">\n" +
    "\n" +
    "                <b>1.0 &nbsp&nbsp</b>\n" +
    "                <input id=\"ex2\" type=\"text\" class=\"span2\" value=\"\" data-slider-min=\"1.0\" data-slider-max=\"30.0\" data-slider-step=\"0.1\" /> &nbsp&nbsp<b>30</b>\n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <p class=\"text-center\"><b>{{myRangeSliderValue[0]}}-{{myRangeSliderValue[1]}}</b></p>\n" +
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
    "    <div class=\"col-lg-2 col-lg-offset-2\" ng-hide=\"boolFilterSpieltyp\">\n" +
    "        <div class=\"panel panel-info\">\n" +
    "            <div class=\"panel-heading\">\n" +
    "\n" +
    "                <h3 class=\"panel-title\">Spieltypen</h3>\n" +
    "\n" +
    "                <div class=\"list-group listoverflow\">\n" +
    "                    <a ng-repeat=\"item in spieltyp \" class=\"list-group-item\" ng-click=\"takeSpieltyp(item)\">\n" +
    "                        {{item}}\n" +
    "                     </a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"col-lg-2 \" ng-hide=\"boolFilterSpieltyp\">\n" +
    "        <div class=\"panel panel-info\">\n" +
    "            <div class=\"panel-heading\">\n" +
    "                <h3 class=\"panel-title\">Ausgewählte Spieltypen</h3>\n" +
    "                <div class=\"list-group listoverflow\">\n" +
    "                    <a ng-repeat=\"item in selectedSpieltyp \" class=\"list-group-item\" ng-click=\"removeSpieltyp(item)\">\n" +
    "                {{item}}\n" +
    "                    </a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"col-lg-2 \">\n" +
    "        <div class=\"panel panel-info\">\n" +
    "            <div class=\"panel-heading\">\n" +
    "                <h3 class=\"panel-title\">Ausgewählte Mannschften</h3>\n" +
    "                <div class=\"list-group listoverflow\">\n" +
    "                    <a ng-repeat=\"item in selectedMannschaften\" class=\"list-group-item\" ng-click=\"removeTeam(item)\">\n" +
    "                {{item}}\n" +
    "            </a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"col-lg-2 \">\n" +
    "        <div class=\"panel panel-info\">\n" +
    "            <div class=\"panel-heading\">\n" +
    "                <h3 class=\"panel-title\">Mannschaften</h3>\n" +
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
