'use strict';

(function($, angular) {

  angular
    .module('subject')
    .component('appExcercise', {
      template: '<div ng-include="$ctrl.templateUrl"></div>',
      controller: [
        '$rootScope',
        '$scope',
        '$timeout',
        controller]
    });

    function controller($rootScope, $scope, $timeout) {
      var self = this;

      var emitEvent = function() {
        $scope.$emit('excerciseRendered');
      };

      var hi = function(event, data) {
        console.log('excercise :  I got it! ' + data);
      };

      self.templateUrl = $scope.$parent.$ctrl.excerciseTemplateUrl;

      self.brgd = "srgl";

      $timeout(emitEvent);

      $scope.$on('hi', hi);

      self.$onDestroy = function(){
        console.log('excercise : I am destroyed!');
      };

    }


})(jQuery, window.angular);
