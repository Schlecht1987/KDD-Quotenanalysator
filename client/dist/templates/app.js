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
    "    <div class='wrapper text-center'>\n" +
    "        <div class=\"btn-group btn-group-lg\" role=\"group\" aria-label=\"...\">\n" +
    "            <button type=\"button\" class=\"btn btn-default\">Alle</button>\n" +
    "            <button type=\"button\" class=\"btn btn-default\">Heim</button>\n" +
    "            <button type=\"button\" class=\"btn btn-default\">Unentschieden</button>\n" +
    "            <button type=\"button\" class=\"btn btn-default\">Gast</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <highchart id=\"chart1\" config=\"chartConfig\"></highchart>\n" +
    "\n" +
    "    <div class='wrapper text-center'>\n" +
    "\n" +
    "        <button type=\"button\" class=\"btn-success btn-lg\" ng-click=\"neumalen()\">\n" +
    "            GO\n" +
    "        </button>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-lg-2\">\n" +
    "            <div class=\"input-group\">\n" +
    "                <input id=\"reservationtime\" type=\"text\" class=\"form-control\" placeholder=\"Datum\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-lg-2\">\n" +
    "            <input type=\"range\" min=\"0.025\" max=\"2\" value=\"0.1\" step=\"0.025\" ng-model=\"item.cost\" ng-mouseup=\"sliderChange()\" /> {{item.cost}}\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        Filter by price interval: <b>€ 10</b>\n" +
    "        <input id=\"ex2\" type=\"text\" class=\"span2\" value=\"\" data-slider-min=\"10\" data-slider-max=\"1000\" data-slider-step=\"5\" data-slider-value=\"[250,450]\" /> <b>€ 1000</b>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "       <input data-provide=\"datepicker\">\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "</div>\n" +
    "\n" +
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
