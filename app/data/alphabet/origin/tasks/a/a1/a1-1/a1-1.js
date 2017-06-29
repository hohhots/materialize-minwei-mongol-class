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
      var parent = $scope.$parent.$ctrl;

      var emitEvent = function() {
        $scope.$emit(config.events.exerciseRendered);
      };

      var hi = function(event, data) {
        console.log('exercise :  I got it! ' + data);
      };

      self.templateUrl = parent.exerciseTemplateUrl;

      $timeout(emitEvent);

      $scope.$on('hi', hi);

      self.$onDestroy = function(){
        console.log('exercise : I am destroyed!');
      };

      self.leftImageUrl = config.data.data + "/" + parent.category.dirName + "/" + parent.subject.dirName + "/" + config.data.images + "/" + "a.png";

      self.questions = [
        {
          id: 1,
          name: "a"
        },
        {
          id: 4,
          name: "b"
        },
        {
          id: 3,
          name: "c"
        },
        {
          id: 2,
          name: "d"
        }
      ];

    }


})(jQuery, window.angular);
