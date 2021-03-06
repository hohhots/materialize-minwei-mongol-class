'use strict';

(function () {
  // Define the `header` module
  var app = angular.module('app.category');

  // Register `headerList` component, along with its associated controller and template
  app.component('listPractice', {
    template: '<div ng-include="$ctrl.templateUrl"></div>',
    bindings: {
      levelid: '<',
      pagenum: '<',
      subData: '<'
    },
    controller: ['$scope', '$state', '$element', '$interval', '$http', 'Config', 'Util', 'Json', controller]
  });

  function controller($scope, $state, $element, $interval, $http, config, util, json) {
    var self = this;

    //define self variables
    self.templateUrl = config.templateUrl.listpractice;
    self.langs = {};
    self.answerAlphas = [];
    self.realAlphaClass = '';
    self.allCorrect = false;
    //self.bookJson = util.getBookJson(self.levelid, self.pagenum);

    // alpha list data directory hash names array
    self.book = util.getBookPagesName(self.levelid);
    // classroom directory hash name

    self.$onInit = function () {
      util.setBook(self);
    };

    self.setModels = function (book, json) {
      self.book = book;
      self.bookJson = json;

      self.langs.name = self.bookJson.practiceTitle;
      self.langs.selectAlpha = config.alphaLangs.selectAlpha;
      self.langs.exit = config.alphaLangs.exit;
      self.langs.notSupportHtml5Audio = config.alphaLangs.notSupportHtml5Audio;
      self.langs.testAgain = config.alphaLangs.testAgain;
      self.langs.text = config.listPracticeLangs.text;
      
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
      return util.getPlayerIconClass(playedAudioId);
    };

    self.exitPractice = function () {
      $state.go(config.uiState.alphaList.name, {levelid: self.levelid, pagenum: self.pagenum});
    };

    self.allCorrect = function () {
      return util.allAnswerCorrect(self.answerAlphas);
    };

    self.getAlphaCheckedClass = function (alpha) {
      var stat = 'originpractice-blue';
      if (util.allAlphaAnswered(self.answerAlphas)) {
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
      if (util.allAnswerCorrect(self.answerAlphas)) { return; }
      testAlpha = testAlphas[index];
      var tests = {
        testOrigin: testOriginAlpha,
        testAlpha: testAlpha
      };
      $scope.$broadcast(config.events.listDisplayRandomAlpha, tests);
    };

    self.testAgainClick = function () {
      $state.reload();
    };

    // 'alpha.name' format is like 'a' 'e' 'ji' 'go'
    // return 'a10' 'e10' 'j10' 'g40'
    self.getAlphaText = function(alpha) {
      //console.log(name);
      var text = '';
      if (util.alphaAnswered(alpha)) {
        text = util.convertOriginNameToCode(alpha.name);
      }
      return text;
    };

    var audioElem = null;
    var testOriginAlpha = '';
    var testAlphas = [];
    var testAlpha = {};
    var playedAudioId = 0;
    var url = config.mediaUrl.alphaList;
    var sevenAlphaClass = 'w3-col s3 alpha-col m3 l1';
    var twoAlphaClass = 'w3-col s6 m6 l6';

    var setAnswerAlphas = function () {
      testOriginAlpha = self.subData[self.bookJson.orderInList - 1];
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
      if (util.getAlphaMapName(alpha.name) === util.getAlphaMapName(testAlpha.name)) {
        alpha.correct = true;
      } else {
        alpha.error = true;
      }
    };

    function playAudio() {
      var dirName = testOriginAlpha.name.substr(0,1);
      if (playedAudioId === testAlphas.length) {
        $scope.$broadcast(config.events.stopPlayers, true);
        return;
      }
      var name = getAlphaAudioName();
      var gender = util.getRandomGender();
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

    function stopPlayers(event, outScope) {
      audioElem.pause();
      playedAudioId = 0;
      if (outScope) {
        $scope.$digest();
      }
    };

    function randomAlphaSelected(event, alpha) {
      setAnswerAlphaState(alpha);
      self.answerAlphas[testAlpha.id - 1] = angular.copy(alpha);
    };

    function getAlphaAudioName() {
      return testAlphas[playedAudioId].name.substring(0, 2);
    }

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