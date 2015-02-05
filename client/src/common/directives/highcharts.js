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