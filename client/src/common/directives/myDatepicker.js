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