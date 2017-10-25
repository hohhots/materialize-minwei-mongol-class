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
      '$timeout',
      'Config',
      'Util',
      'Json',
      controller]
  });

  function controller($scope, $state, $element, $location, $interval, $timeout, config, util, json) {
    var self = this;

    //define self variables
    self.templateUrl = config.templateUrl.originpractice;
    self.langs = {};
    self.audio = {};
    self.answerAlphas = [];
    self.allCorrect = false;

    self.$onInit = function () {
      self.langs.name = self.jsonData[0].name + config.alphaLangs.practice;
      self.langs.selectAlpha = config.alphaLangs.selectAlpha;
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
          audioElem.onended = playAudio;
        }
      }, 10);
    };

    self.getPlayerIconClass = function () {
      var css = "fa-play-circle-o";
      if (playedAudioId != 0) {
        css = "fa-pause-circle-o w3-text-red";
      }
      return css;
    };

    self.exitPractice = function () {
      util.changePath(config.pagesUrl.alphaOrigin);
    };

    self.getAlphaClass = function (alpha) {
      var name = config.alphaCss.practiceEmpty;
      if (answered()) {
        name = 'originFont-' + alpha.fileName;
      }
      return name;
    };

    self.getAlphaCheckedClass = function (alpha) {
      var stat = 'originpractice-blue';
      if (alpha.correct) {
        stat = 'originpractice-green';
      }
      if (alpha.error) {
        stat = 'originpractice-red';
      }
      return stat;
    };

    self.playAudios = function () {
      if (playedAudioId == 0) {
        playAudio();
      } else {
        $scope.$broadcast(config.events.stopPlayers);
      }
    };

    self.selectAlphaClick = function () {
      if (util.allAnswerCorrect(self.answerAlphas)) { return; }
      //$scope.$broadcast(config.events.stopPlayers);
      $scope.$broadcast(config.events.displayOriginRandom);
    };

    self.nextTestClick = function () {
      $state.reload();
    };

    var testAlphas = [];
    var audioElem = null;
    var playedAudioId = 0;
    var url = config.mediaUrl.alphaOrigin;

    var answered = function () {
      var ans = false;
      $.each(self.answerAlphas, function (i, v) {
        if (!!v.error || !!v.correct) {
          ans = true;
        }
      });
      return ans;
    };

    var setFourAlphas = function () {
      var position = Math.floor(Math.random() * (self.subData.length - 3));
      testAlphas = self.subData.slice(position, position + 4);
      self.answerAlphas = angular.copy(testAlphas);
    };

    var playAudio = function () {
      if (playedAudioId == testAlphas.length) {
        $scope.$broadcast(config.events.stopPlayers, true);
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

    var checkAnswer = function () {
      if (util.allAnswerCorrect(self.answerAlphas)) {
        return;
      }
      setAnswerResult();
    };

    var setAnswerResult = function () {
      $.each(testAlphas, function (i, v) {
        if (v.id != self.answerAlphas[i].id) {
          self.answerAlphas[i].error = true;
        } else {
          self.answerAlphas[i].correct = true;
        }
      });
      if (util.allAnswerCorrect(self.answerAlphas)) {
        self.allCorrect = true;
      }
    };

    var stopPlayers = function (event, outScope) {
      audioElem.pause();
      playedAudioId = 0;
      if (outScope) {
        $scope.$digest();
      }
    };

    var selectRandomAlphas = function (event, alphas) {
      if ((answered()) && (alphas.length != 4)) {
        self.answerAlphas = angular.copy(testAlphas);
        return;
      }
      if (alphas.length != 4) {
        return;
      }
      self.answerAlphas = angular.copy(alphas);
      checkAnswer();
    };

    // add listener and hold on to deregister function
    var deregister = [];
    deregister.push($scope.$on(config.events.stopPlayers, stopPlayers));
    deregister.push($scope.$on(config.events.selectRandomAlphas, selectRandomAlphas));

    //deregister.push(videoElem.on('ended', videoEnded));
    // clean up listener when directive's scope is destroyed
    $.each(deregister, function (i, val) {
      $scope.$on('$destroy', val);
    });
  };

})();