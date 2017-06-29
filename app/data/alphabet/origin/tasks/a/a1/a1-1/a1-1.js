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
      var self = this,
          parent = $scope.$parent.$ctrl,
          playClicked = false;

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

      self.playMouseEnter = function() {
        if(playClicked){return;}
        self.playIconBackStyle.color = "#80ac07";
      };

      self.playMouseLeave = function() {
        if(playClicked){return;}
        self.playIconBackStyle = {};
      };

      self.playClick = function() {
        playClicked = true;

        $scope.$emit(config.events.exercisePlayed, self.questions);
      };

      self.leftImageUrl = config.data.data + "/" + parent.category.dirName + "/" + parent.subject.dirName + "/" + config.data.images + "/" + "a.png";
      self.playIconBackStyle = {};
      self.questions = [
        {
          id: 1,
          name: "a",
          audio: 1
        },
        {
          id: 2,
          name: "b",
          audio: 2
        },
        {
          id: 3,
          name: "c",
          audio: 3
        },
        {
          id: 4,
          name: "d",
          audio: 4
        }
      ];


    }


})(jQuery, window.angular);
