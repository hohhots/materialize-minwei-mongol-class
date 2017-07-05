'use strict';

(function($, angular) {

  angular
    .module('app.subject')
    .component('appExercise', {
      template: '<div ng-include="$ctrl.templateUrl"></div>',
      controller: [
        '$rootScope',
        '$scope',
        '$timeout',
        'Config',
        controller]
    });

    function controller($rootScope, $scope, $timeout, config) {console.log('222');
      var self = this,
          parent = $scope.$parent.$ctrl;

      var emitRenderedEvent = function() {
        $scope.$emit(config.events.exerciseRendered);
      };

      var hi = function(event, data) {
        console.log('exercise :  I got it! ' + data);
      };

      var init = function() {console.log('2');
        exerciseQuestionClicked = 0;

        $.each(self.questions, function(i, val){
            self.exerciseCheckIcon[val.id] = "fa-circle-thin";
            self.exerciseCheckStyle[val.id] = {};
          }
        );
      };

      self.templateUrl = parent.exerciseTemplateUrl;

      $timeout(emitRenderedEvent);

      self.$onDestroy = function(){
        //console.log('exercise : I am destroyed!');
      };

      self.playMouseEnter = function() {
        console.log('enter');
      };

      self.leftImageUrl = config.data.data + "/" + parent.category.dirName + "/" + parent.subject.dirName + "/" + config.data.images + "/" + "a.png";
      self.exerciseCheckIcon = [];
      self.playIconBackStyle = {};
      self.exerciseCheckStyle = {};
      self.exerciseCover = false;
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

      init();
    }

})(jQuery, window.angular);
