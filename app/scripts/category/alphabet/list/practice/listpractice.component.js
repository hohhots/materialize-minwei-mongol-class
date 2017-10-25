'use strict';

(function () {
  // Define the `header` module
  var app = angular.module('app.category');

  // Register `headerList` component, along with its associated controller and template
  app.component('listPractice', {
    template: '<div ng-include="$ctrl.templateUrl"></div>',
    bindings: {
      jsonData: '<',
      subData: '<'
    },
    controller: ['$scope', '$state', '$element', '$interval', 'Config', 'Util', 'Json', controller]
  });

  function controller($scope, $state, $element, $interval, config, util, json) {
    var self = this;

    //define self variables
    self.templateUrl = config.templateUrl.listpractice;
    self.langs = {};
    self.answerAlphas = [];
    self.realAlphaClass = '';
    self.allCorrect = false;

    self.$onInit = function () {
      self.langs.name = self.jsonData[0].name + config.alphaLangs.practice;
      self.langs.selectAlpha = config.alphaLangs.selectAlpha;
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

    self.getPlayerIconClass = function () {
      var css = "fa-play-circle-o";
      if (playedAudioId != 0) {
        css = "fa-pause-circle-o w3-text-red";
      }
      return css;
    };

    self.exitPractice = function () {
      util.changePath(config.pagesUrl.alphaList);
    };

    self.allCorrect = function () {
      return util.allAnswerCorrect(self.answerAlphas);
    };

    self.getAlphaClass = function (alpha) {
      var name = config.alphaCss.practiceEmpty;
      if (alphaAnswered(alpha)) {
        name = 'originFont-' + alpha.name;
      }
      return name;
    };

    self.getAlphaCheckedClass = function (alpha) {
      var stat = 'originpractice-blue';
      if (allAlphaAnswered()) {
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
      if (util.allAnswerCorrect(self.answerAlphas)) { return; }
      testAlpha = testAlphas[index];
      var tests = {
        testOrigin: testOriginAlpha,
        testAlpha: testAlpha
      };
      $scope.$broadcast(config.events.listDisplayRandomAlpha, tests);
    };

    self.nextTestClick = function () {
      $state.reload();
    };

    var audioElem = null;
    var testOriginAlpha = '';
    var testAlphas = [];
    var testAlpha = {};
    var playedAudioId = 0;
    var url = config.mediaUrl.alphaList;
    var sevenAlphaClass = 'alpha-col s4 m3 l1';
    var twoAlphaClass = 'w3-col s6 m6 l6';

    var setAnswerAlphas = function () {
      var position = Math.floor(Math.random() * (self.subData.length));
      testOriginAlpha = self.subData[position];
      testAlphas = testOriginAlpha.vowel;
      self.answerAlphas = angular.copy(testAlphas);
      self.realAlphaClass = sevenAlphaClass;
      if (testAlphas.length == 2) {
        self.realAlphaClass = twoAlphaClass;
      }
    };

    var setAnswerAlphaState = function (alpha) {
      alpha.correct = false;
      alpha.error = false;
      if (alpha.name == util.convertAlphaName(testAlpha.name)) {
        alpha.correct = true;
      } else {
        alpha.error = true;
      }
    };

    var alphaAnswered = function (alpha) {
      var ans = false;
      if (!!alpha.error || !!alpha.correct) {
        ans = true;
      }
      return ans;
    };

    var allAlphaAnswered = function () {
      var ans = true;
      $.each(self.answerAlphas, function (i, alpha) {
        if (!alphaAnswered(alpha)) {
          ans = false;
        }
      });
      return ans;
    };

    var playAudio = function () {
      if (playedAudioId == testAlphas.length) {
        $scope.$broadcast(config.events.stopPlayers, true);
        return;
      }
      var name = testAlphas[playedAudioId].name;
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

    var stopPlayers = function (event, outScope) {
      audioElem.pause();
      playedAudioId = 0;
      if (outScope) {
        $scope.$digest();
      }
    };

    var randomAlphaSelected = function (event, alpha) {
      setAnswerAlphaState(alpha);
      self.answerAlphas[testAlpha.id - 1] = angular.copy(alpha);
    };

    // add listener and hold on to deregister function
    var deregister = [];
    deregister.push($scope.$on(config.events.stopPlayers, stopPlayers));
    deregister.push($scope.$on(config.events.listRandomAlphaSelected, randomAlphaSelected));

    //deregister.push(videoElem.on('ended', videoEnded));
    // clean up listener when directive's scope is destroyed
    $.each(deregister, function (i, val) {
      $scope.$on('$destroy', val);
    });

  };
})();