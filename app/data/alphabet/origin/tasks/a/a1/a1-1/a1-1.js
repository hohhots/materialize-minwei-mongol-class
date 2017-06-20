'use strict';

(function($, angular) {

  //angular.module('excercise', []);
  angular
    .module('subject')
    .component('appExcercise', {
      template: '<div ng-include="$ctrl.templateUrl"></div>',
      controller: [
        '$scope',
        '$timeout',
        controller]
    });

    function controller($scope, $timeout) {
      var self = this;

      var emitEvent = function() {
        $scope.$emit('excerciseRendered');
      };

      self.templateUrl = $scope.$parent.$ctrl.excerciseTemplateUrl;

      self.brgd = "srgl";

      $timeout(emitEvent);

    }

})(jQuery, window.angular);
