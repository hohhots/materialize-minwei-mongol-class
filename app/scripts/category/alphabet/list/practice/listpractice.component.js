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
    self.correct = false;
    self.error = false;

    self.$onInit = function () {
      self.langs.name = self.jsonData[0].name + config.alphaLangs.practice;
      self.langs.selectAlpha = config.alphaLangs.selectAlpha;
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
          audioElem.onended = self.playAudios;
        }
      }, 10);
    };

    self.exitPractice = function () {
      util.changePath(config.pagesUrl.alphaList);
    };

    self.getAlphaClass = function (alpha) {
      var name = config.alphaCss.practiceEmpty;
      if (alpha.answered) {
        name = 'origin-' + alpha.name;
      }
      return name;
    };

    self.playAudios = function () {
      if (playedAudioId == testAlphas.length) {
        playedAudioId = 0;
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

    self.selectAlpha = function (index) {
      $scope.$broadcast(config.events.stopPlayers);
      if (self.correct) { return; }
      testAlpha = testAlphas[index];
      var tests = {
        testOrigin: testOriginAlpha,
        testAlpha: testAlpha
      };
      $scope.$broadcast(config.events.listDisplayRandomAlpha, tests);
    };

    self.checkAnswerClick = function () {
      if (practiceDone()) {
        checkStateInit();
        var right = true;
        $.each(testAlphas, function (i, v) {
          if (self.answerAlphas[i].name != util.convertAlphaName(v.name)) {
            right = false;
          }
        });
        if (right == true) {
          self.correct = true;
        } else {
          self.error = true;
        }
      }
    };

    self.nextTestClick = function () {
      $state.reload();
    };

    var testOriginAlpha = '';
    var testAlphas = [];
    var testAlpha = {};
    var audioElem = null;
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

    var randomAlphaSelected = function (event, alpha) {
      checkStateInit();
      alpha.answered = true;
      self.answerAlphas[testAlpha.id - 1] = angular.copy(alpha);
    };

    var practiceDone = function () {
      var done = true;
      $.each(self.answerAlphas, function (i, v) {
        if (v.answered != true) {
          done = false;
        }
      });
      return done;
    };

    var checkStateInit = function () {
      self.correct = false;
      self.error = false;
    };

    var stopPlayers = function () {
      playedAudioId = 0;
      audioElem.pause();
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