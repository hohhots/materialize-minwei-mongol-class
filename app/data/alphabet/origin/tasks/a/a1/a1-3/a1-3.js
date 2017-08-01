
'use strict';

window.exerciseController = function controller($rootScope, $scope, $timeout, config) {
  var self = this,
      parent = $scope.$parent.$ctrl,
      playClicked = false,
      exerciseQuestionClicked = -1;

  var emitRenderedEvent = function() {
    $scope.$emit(config.events.exerciseRendered);
  };

  var hi = function(event, data) {
    console.log('exercise :  I got it! ' + data);
  };

  var exerciseNowPlaying = function(event, id) {
    init();
    self.exerciseCheckIcon[id] = "fa-circle";
    self.exerciseCheckStyle[id].color = "#80ac07";
  };

  var exercisePlayEnd = function(event, data) {
    playClicked = false;
    self.playMouseLeave();

    init();

    $scope.$digest();
  };

  var exerciseCheck = function() {
    $scope.$emit(config.events.exerciseCheckAnswer, exerciseQuestionClicked);
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
    if(playClicked){return;}
    if(self.playIconBackStyle.color != "#80ac07") {
        self.playIconBackStyle.color = "#80ac07";
      }
  };

  self.playMouseLeave = function() {
    if(playClicked){return;}
    self.playIconBackStyle = {};
  };

  self.playMouseMove = function() {
    self.playMouseEnter();
  };

  self.playClick = function() {
    self.playMouseEnter();
    playClicked = true;

    $scope.$emit(config.events.exercisePlayed, self.questions);
  };

  self.exerciseCheckMouseEnter = function(id, otherClicked = false) {
    if((exerciseQuestionClicked == id) && !otherClicked){return;}

    self.exerciseCheckIcon[id] = "fa-check-circle";
  };

  self.exerciseCheckMouseLeave = function(id, otherClicked = false) {
    if((exerciseQuestionClicked == id) && !otherClicked){return;}

    self.exerciseCheckIcon[id] = "fa-circle-thin";
  };

  self.exerciseCheckClick = function(id) {
    if(exerciseQuestionClicked == id){
      init();
      return;
    } else {
      if(exerciseQuestionClicked != 0) {
        self.exerciseCheckMouseLeave(exerciseQuestionClicked, true);
        self.exerciseCheckIcon[exerciseQuestionClicked] = "fa-circle-thin";
        self.exerciseCheckStyle[exerciseQuestionClicked] = {};
      }
    }

    exerciseQuestionClicked = id;

    self.exerciseCheckIcon[id] = "fa-check-circle";
    self.exerciseCheckStyle[id].color = "#80ac07";
  };

  self.leftImageUrl = config.data.data + "/" + parent.category.dirName + "/" + parent.subject.dirName + "/" + config.data.images + "/" + "a.png";
  self.exerciseCheckIcon = {};
  self.playIconBackStyle = {};
  self.exerciseCheckStyle = {};
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

  // add listener and hold on to deregister function
  var deregister = [];
  deregister.push($scope.$on(config.events.exerciseNowPlaying, exerciseNowPlaying));
  deregister.push($scope.$on(config.events.exercisePlayEnd, exercisePlayEnd));
  deregister.push($scope.$on(config.events.exerciseCheck, exerciseCheck));
  // clean up listener when directive's scope is destroyed
  $.each(deregister, function(i, val){
    $scope.$on('$destroy', val);
  });

};
