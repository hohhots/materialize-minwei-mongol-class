'use strict';

(function () {
  // Define the `header` module
  var app = angular.module('app.category');

  // Register `headerList` component, along with its associated controller and template
  app.component('originPractice', {
    template: '<div ng-include="$ctrl.templateUrl"></div>',
    bindings: {
      jsonData: '<',
      subData: '<'
    },
    controller: [
      '$scope',
      '$state',
      '$element',
      '$location',
      '$interval',
      'Config',
      'Util',
      'Json',
      controller]
  });

  function controller($scope, $state, $element, $location, $interval, config, util, json) {
    var self = this;

    //define self variables
    self.templateUrl = config.templateUrl.originpractice;
    self.langs = {};
    self.audio = {};
    self.answerAlphas = [];
    self.correct = false;
    self.error = false;
    
    self.$onInit = function () {
      self.langs.name = self.jsonData[0].name + config.alphaLangs.practice;
      self.langs.selectAlpha = config.alphaLangs.selectAlpha;
      self.langs.checkAnswer = config.alphaLangs.checkAnswer;
      self.langs.exit = config.alphaLangs.exit;
      self.langs.notSupportHtml5Audio = config.alphaLangs.notSupportHtml5Audio;
      self.langs.nextTest = config.alphaLangs.nextTest;
      setFourAlphas();
    };

    self.$postLink = function () {
      var stop = $interval(function () {
        if (!audioElem) {
          audioElem = $element.find('audio')[0];
        } else {
          $interval.cancel(stop);
          audioElem.onended = self.playAudios;
        }
      }, 10);
    };

    self.exitPractice = function () {
      $location.path("/" + config.app.url + "/" + config.pagesUrl.alphaOrigin);
    };

    self.getAlphaClass = function (alpha) {
      var name = config.alphaCss.practiceEmpty;
      if(answered) {
        name = 'origin-' + alpha.fileName;
      }
      return name;
    };

    self.playAudios = function () {
      if (playedAudioId == testAlphas.length) {
        playedAudioId = 0;
        return;
      }
      var name = testAlphas[playedAudioId].fileName;
      var gender = util.getRandomGender();
      self.audio = {
        mpeg: url + config.data.audios + '/' + name + '/' + name + gender + config.dataTypes.audios[1],
        ogg: url + config.data.audios + '/' + name + '/' + name + gender + config.dataTypes.audios[0]
      };
      if (playedAudioId != 0) {
        $scope.$digest();
      }
      audioElem.load();
      audioElem.play();
      playedAudioId++;
    };

    self.selectAlphaClick = function() {
      $scope.$broadcast(config.events.displayOriginRandom);
    };

    self.checkAnswerClick = function() {
      self.correct = false;
      self.error = false;
      if(!answered) {
        return;
      }
      if(answerCorrect()) {
        self.correct = true;
      } else {
        self.error = true;
      }

    };

    self.nextTestClick = function() {
      $state.reload();
    };

    var testAlphas = [];
    var audioElem = null;
    var playedAudioId = 0;
    var url = config.mediaUrl.alphaOrigin;
    var answered = false;

    var setFourAlphas = function () {
      var position = Math.floor(Math.random() * (self.subData.length - 3));
      testAlphas = self.subData.slice(position, position + 4);
      self.answerAlphas = angular.copy(testAlphas);
    };

    var autoPlayAudio = function () {
      self.playAudios();
    };

    var selectRandomAlphas = function(event, alphas) {
      if((answered == true) && (alphas.length == 0)) {
        self.answerAlphas = angular.copy(testAlphas);
        answered = false;
        return;
      }
      if(alphas.length != 4) {
        return;
      }
      self.answerAlphas = angular.copy(alphas);
      answered = true;
    };

    var answerCorrect = function() {
      var correct = true;
      $.each(testAlphas, function(i, v){
        if(v.id != self.answerAlphas[i].id) {
          correct = false;
        }
      });
      return correct;
    };

    // add listener and hold on to deregister function
    var deregister = [];
    deregister.push($scope.$on(config.events.selectRandomAlphas, selectRandomAlphas));

    //deregister.push(videoElem.on('ended', videoEnded));
    // clean up listener when directive's scope is destroyed
    $.each(deregister, function (i, val) {
      $scope.$on('$destroy', val);
    });
  };

})();