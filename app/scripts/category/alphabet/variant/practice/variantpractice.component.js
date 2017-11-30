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

    self.allCorrect = function () {
      return util.allAnswerCorrect(answerAlphas);
    };

    self.getAlphaClass = function (alpha) {
      return 'originFont-' + alpha.name;
    };

    self.getAnswerAlphaClass = function (index) {
      var css = config.alphaCss.variantpracticeEmpty + ' variantpractice-position';
      var alpha = answerAlphas[index];
      if (util.alphaAnswered(alpha)) {
        css = 'originFont-' + alpha.name + '-' + variantPosition + ' variantview-view-value';
      }

      var stat = '';
      if (util.allAlphaAnswered(util.alphaAnswered, answerAlphas)) {
        if (alpha.correct) {
          stat = ' originpractice-green';
        }
        if (alpha.error) {
          stat = ' originpractice-red';
        }
      }
      return css + stat;
    };

    self.getPlayerIconClass = function () {
      return util.getPlayerIconClass(playedAudioId);
    };

    self.getAlphaCheckedClass = function (alpha) {
      var stat = 'originpractice-blue';
      if (util.allAlphaAnswered(util.alphaAnswered, answerAlphas)) {
        if (alpha.correct) {
          stat = 'originpractice-green';
        }
        if (alpha.error) {
          stat = 'originpractice-red';
        }
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

    self.selectAlphaClick = function (index) {
      //$scope.$broadcast(config.events.stopPlayers);
      if (util.allAnswerCorrect(answerAlphas)) { return; }
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
      if (!util.alphaAnswered(answerAlphas[testAlphaIndex])) {
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

    self.nextTestClick = function () {
      $state.reload();
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
      answerAlphas = angular.copy(self.testAlphas);
      self.realAlphaClass = sevenAlphaClass;
      if (self.testAlphas.length == 2) {
        self.realAlphaClass = twoAlphaClass;
      }
      self.realAlphaClass = self.realAlphaClass + ' variantpractice-alpha-click';
    };

    var setAnswerAlphaState = function (alpha) {
      alpha.correct = false;
      alpha.error = false;
      if (alpha.name == util.convertAlphaName(testAlpha.name, variantPosition)) {
        alpha.correct = true;
      } else {
        alpha.error = true;
      }
    };

    var playAudio = function () {
      if (playedAudioId == self.testAlphas.length) {
        $scope.$broadcast(config.events.stopPlayers, true);
        return;
      }
      var name = self.testAlphas[playedAudioId].name;
      var gender = util.getRandomGender();
      var dirName = testOriginAlpha.name.substr(0, 1);
      self.audio = {
        mpeg: url + config.data.audios + '/' + dirName + '/' + name + gender + config.dataTypes.audios[1],
        ogg: url + config.data.audios + '/' + dirName + '/' + name + gender + config.dataTypes.audios[0]
      };
      if (playedAudioId != 0) {
        $scope.$digest();
      }
      audioElem.load();
      audioElem.play();
      playedAudioId++;
    };

    var stopPlayers = function (event, outScope) {
      audioElem.pause();
      playedAudioId = 0;
      if (outScope) {
        $scope.$digest();
      }
    };

    var randomAlphaSelected = function (event, alpha) {
      setAnswerAlphaState(alpha);
      answerAlphas[testAlpha.id - 1] = angular.copy(alpha);
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