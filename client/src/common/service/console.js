
angular.module('services.console', []).factory('Console', function() {
  return window.debug; // assumes JavaScript Debug has already been loaded on the page
});
