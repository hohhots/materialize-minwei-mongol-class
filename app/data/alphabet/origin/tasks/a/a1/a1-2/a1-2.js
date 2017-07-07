'use strict';

window.exerciseController = function controller($rootScope, $scope, $timeout, config) {
  var self = this,
        parent = $scope.$parent.$ctrl,
        exerciseQuestionClicked = 0;

  var emitRenderedEvent = function() {
      $scope.$emit(config.events.exerciseRendered);
    };

  var hi = function(event, data) {
      console.log('exercise :  I got it! ' + data);
    };

  var init = function() {
      exerciseQuestionClicked = 0;

      $.each(self.questions, function(i, val){
          self.exerciseCheckIcon[val.id] = "fa-circle-thin";
          self.exerciseCheckStyle[val.id] = {};
        }
      );
    };

  self.templateUrl = parent.exerciseTemplateUrl;

  $timeout(emitRenderedEvent);

  self.$onInit = function() {
      init();
    };

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

};
