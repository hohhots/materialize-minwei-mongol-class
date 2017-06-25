'use strict';

(function($, angular) {

  angular
    .module('subject')
    .component('appExercise', {
      template: '<div ng-include="$ctrl.templateUrl"></div>',
      controller: [
        '$rootScope',
        '$scope',
        '$timeout',
        'Config',
        controller]
    });

    function controller($rootScope, $scope, $timeout, config) {
      var self = this;

      var emitEvent = function() {
        $scope.$emit(config.events.exerciseRendered);
      };

      var hi = function(event, data) {
        console.log('exercise :  I got it! ' + data);
      };

      self.templateUrl = $scope.$parent.$ctrl.exerciseTemplateUrl;

      self.brgd = "srgl";

      $timeout(emitEvent);

      $scope.$on('hi', hi);

      self.$onDestroy = function(){
        console.log('exercise : I am destroyed!');
      };

    }


})(jQuery, window.angular);
