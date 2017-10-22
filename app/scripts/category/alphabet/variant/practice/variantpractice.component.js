'use strict';

(function () {
  // Define the `header` module
  var app = angular.module('app.category');

  // Register `headerList` component, along with its associated controller and template
  app.component('variantPractice', {
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
    self.templateUrl = config.templateUrl.variantpractice;
    self.langs = {};
    self.testAlphas = [];
    self.realAlphaClass = '';
    self.correct = false;
    self.error = false;

    self.$onInit = function () {
      self.langs.name = self.jsonData[0].name + config.alphaLangs.practice;
      self.langs.checkAnswer = config.alphaLangs.checkAnswer;
      self.langs.exit = config.alphaLangs.exit;
      self.langs.notSupportHtml5Audio = config.alphaLangs.notSupportHtml5Audio;
      self.langs.nextTest = config.alphaLangs.nextTest;
      setAnswerAlphas();
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

    self.exitPractice = function () {
      util.changePath(config.pagesUrl.alphaVariant);
    };

    self.getAlphaClass = function (alpha) {
      return 'origin-' + alpha.name;
    };

    self.getAnswerAlphaClass = function (index) {
      var css = config.alphaCss.variantpracticeEmpty + ' variantpractice-position';
      var alpha = answerAlphas[index];
      if (alpha) {
        css = 'origin-' + alpha.name + '-' + variantPosition + ' variantview-view-value';
      }
      return css;
    };

    self.getPlayerIconClass = function () {
      var css = "fa-play-circle-o";
      if (playedAudioId != 0) {
        css = "fa-pause-circle-o w3-text-red";
      }
      return css;
    };

    self.playAudios = function () {
      if (playedAudioId == 0) {
        playAudio();
      } else {
        $scope.$broadcast(config.events.stopPlayers);
      }
    };

    self.selectAlpha = function (index) {
      $scope.$broadcast(config.events.stopPlayers);
      if (self.correct) { return; }
      testAlpha = self.testAlphas[index];
      var tests = {
        testOrigin: testOriginAlpha,
        testAlpha: testAlpha,
        variantPosition: variantPosition
      };
      $scope.$broadcast(config.events.variantDisplayRandomAlpha, tests);
    };
    
    self.getSelectText = function (testAlphaIndex) {
      var text = '';
      if (!answerAlphas[testAlphaIndex]) {
        switch (variantPosition) {
          case 1:
            text = config.alphaLangs.top;
            break;
          case 2:
            text = config.alphaLangs.middle;
            break;
          default:
            text = config.alphaLangs.bottom;
        }
      }
      return text;
    };

    var audioElem = null;
    var testOriginAlpha = '';
    var answerAlphas = [];
    var testAlpha = {};
    var variantPosition = 0;
    var playedAudioId = 0;
    var url = config.mediaUrl.alphaList;
    var sevenAlphaClass = 'alpha-col s4 m3 l1';
    var twoAlphaClass = 'w3-col s6 m6 l6';

    var setAnswerAlphas = function () {
      variantPosition = Math.floor(Math.random() * 3) + 1;
      var position = Math.floor(Math.random() * (self.subData.length));
      testOriginAlpha = self.subData[position];
      self.testAlphas = testOriginAlpha.vowel;
      self.realAlphaClass = sevenAlphaClass;
      if (self.testAlphas.length == 2) {
        self.realAlphaClass = twoAlphaClass;
      }
      self.realAlphaClass = self.realAlphaClass + ' variantpractice-alpha-click';
    };

    var checkStateInit = function () {
      self.correct = false;
      self.error = false;
    };

    var playAudio = function () {
      if (playedAudioId == self.testAlphas.length) {
        $scope.$broadcast(config.events.stopPlayers, true);
        return;
      }
      var name = self.testAlphas[playedAudioId].name;
      var gender = util.getRandomGender();
      self.audio = {
        mpeg: url + config.data.audios + '/' + testOriginAlpha.name + '/' + name + gender + config.dataTypes.audios[1],
        ogg: url + config.data.audios + '/' + testOriginAlpha.name + '/' + name + gender + config.dataTypes.audios[0]
      };
      if (playedAudioId != 0) {
        $scope.$digest();
      }
      audioElem.load();
      audioElem.play();
      playedAudioId++;
    };

    var randomAlphaSelected = function (event, alpha) {
      checkStateInit();
      alpha.answered = true;
      answerAlphas[testAlpha.id - 1] = angular.copy(alpha);
    };

    var stopPlayers = function (event, outScope) {
      audioElem.pause();
      playedAudioId = 0;
      if (outScope) {
        $scope.$digest();
      }
    };

    // add listener and hold on to deregister function
    var deregister = [];
    deregister.push($scope.$on(config.events.stopPlayers, stopPlayers));
    deregister.push($scope.$on(config.events.variantRandomAlphaSelected, randomAlphaSelected));

    //deregister.push(videoElem.on('ended', videoEnded));
    // clean up listener when directive's scope is destroyed
    $.each(deregister, function (i, val) {
      $scope.$on('$destroy', val);
    });
  };

})();