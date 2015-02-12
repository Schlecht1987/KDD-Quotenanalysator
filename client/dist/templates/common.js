angular.module('templates.common', ['directives/angular-slider.tpl.html']);

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
