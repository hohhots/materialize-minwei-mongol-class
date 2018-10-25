'use strict';

(function () {
  // Define the `header` module
  var app = angular.module('app.category');

  // Register `headerList` component, along with its associated controller and template
  app.component('variantPractice', {
    template: '<div ng-include="$ctrl.templateUrl"></div>',
    bindings: {
      levelid: '<',
      pagenum: '<',
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

    self.bookJson = [];
    // if util has data, just get it;
    // self.bookJson = util.getBookJson(self.levelid, self.pagenum);

    self.$onInit = function () {
      util.setBook(self);
    };

    //if util already get data, don't run this function.
    self.setModels = function (book, json) {
      self.book = book;
      self.bookJson = json;
      self.alphaPosition = self.bookJson.orderInList;

      self.langs.name = self.jsonData[0].name + config.alphaLangs.practice;
      self.langs.exit = config.alphaLangs.exit;
      self.langs.notSupportHtml5Audio = config.alphaLangs.notSupportHtml5Audio;
      self.langs.nextTest = config.alphaLangs.nextTest;
      self.langs.text = config.variantPracticeLangs.text;

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
      $state.go(config.uiState.alphaVariant.name, {levelid: self.levelid, pagenum: self.pagenum});
    };

    self.allCorrect = function () {
      if (testFourthAlphas.length == answerFourthAlphas.length) {
        return util.allAnswerCorrect($.merge($.merge([], answerAlphas), answerFourthAlphas));
      }
      return false;
    };

    self.getAlphaClass = function (alpha) {
      return 'originFont-' + alpha.name;
    };

    self.getAnswerAlphaClass = function (index) {
      var css = config.alphaCss.variantpracticeEmpty + ' variantpractice-position';
      var alpha = answerAlphas[index];
      if (util.alphaAnswered(alpha)) {
        css = 'variantview-view-value';
      }

      var stat = ' variantpractice-alpha-click';
      if ((testFourthAlphas.length == answerFourthAlphas.length)
        && util.allAlphaAnswered($.merge($.merge([], answerAlphas), answerFourthAlphas))) {
        if (alpha.correct) {
          stat = ' originpractice-green';
        }
        if (alpha.error) {
          stat = ' originpractice-red variantpractice-alpha-click';
        }
      }
      return css + stat;
    };

    self.getAnswerFourthAlphaClass = function (alphaId) {
      //console.log(testFourthAlphas);
      var ans = self.alphaFourthAnswered(alphaId);
      var css = 'variantpractice-position ';
      if (ans) {
        css = 'variantview-view-value ';
      }

      if (alphaId < 3) {
        if (ans) {
          css += ' variantpractice-alpha-click';
        } else {
          css += config.alphaCss.variantpracticeEmpty + ' variantpractice-alpha-click';
        }
        var alpha = answerFourthAlphas[alphaId - 1];
        if (alpha) {
          var stat = '';
          if ((testFourthAlphas.length == answerFourthAlphas.length)
            && util.allAlphaAnswered($.merge($.merge([], answerAlphas), answerFourthAlphas))) {

            if (alpha.correct) {
              stat = ' originpractice-green';
            }
            if (alpha.error) {
              stat = ' originpractice-red variantpractice-alpha-click';
            }
          }
          css += stat;
        }
        // Set css for 'we' alpha 3 position
        if (testFourthAlphas.length == 1) {
          if ((alphaId == 2) && (testFourthAlphas[0].text == 'w14')) {
            css = config.alphaCss.variantpracticeEmpty + ' variantpractice-position variantpractice-none';
          }
        }
      } else {
        if ((alphaId == 3) || (alphaId == 4)) {
          css += ' variantpractice-none';
        }
      }

      return css;
    };

    self.getPlayerIconClass = function () {
      return util.getPlayerIconClass(playedAudioId);
    };

    self.playAudios = function () {
      if (playedAudioId == 0) {
        playAudio();
      } else {
        $scope.$broadcast(config.events.stopPlayers);
      }
    };

    self.selectAlphaClick = function (alpha, fourth) {
      //$scope.$broadcast(config.events.stopPlayers);
      //console.log(answerFourthAlphas);
      var answers = answerAlphas;
      if (fourth) {
        answers = answerFourthAlphas;
        if (alpha.id > 2) {
          return;
        }
        if ((alpha.id == 2) && (testFourthAlphas[0].text == 'w14')) {
          return;
        }
      }

      if ((answerAlphas.length == self.testAlphas.length) &&
        (answerFourthAlphas.length == testFourthAlphas.length)) {
        var all = $.merge($.merge([], answerAlphas), answerFourthAlphas);
        var tAlpha = answers[alpha.id - 1];
        if (tAlpha && tAlpha.correct) {
          return;
        }

        if (util.allAnswerCorrect(all)) {
          return;
        }
      }

      if (!fourth) {
        testAlpha = alpha;
      } else {
        testAlpha = getFourthTestAlpha(alpha);
      }

      var tests = {};

      var t = angular.copy(testOriginAlpha);
      concatenateFourthAlphas(t);
      tests = {
        testOrigin: t,
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

    self.alphaAnswered = function (index) {
      if (util.alphaAnswered(answerAlphas[index])) {
        return true;
      }
      return false;
    };

    self.alphaFourthAnswered = function (alphaId) {
      //console.log(alphaId);
      if (alphaId < 3) {
        if (answerFourthAlphas[alphaId - 1]) {
          return true;
        }
      }

      return false;
    };

    self.hasFourthAlpha = function () {
      if (testFourthAlphas.length == 0) {
        return false;
      }
      return true;
    };

    self.alphaHasFourth = function (alphaId) {
      if (alphaId > 2) {
        return false;
      }

      var fourth = false;
      //console.log(testFourthAlphas);
      $.each(testFourthAlphas, function (index, val) {
        if (testFourthAlphas[alphaId - 1]) {
          fourth = true;
          return false;
        }
      });
      return fourth;
    };

    // 'name' format is like 'a' 'e' 'ji' 'go'
    // return 'a10' 'e10' 'j10' 'g40'
    self.getAlphaText = function (name) {
      return util.convertOriginNameToCode(name);
    };

    // 'name' format is like 'a' 'e' 'ji' 'go'
    // return 'a10' 'e10' 'j10' 'g40'
    self.getAlphaAnswerText = function (index) {
      //console.log(index);
      var alpha = answerAlphas[index];
      if (util.alphaAnswered(alpha)) {
        return alpha.text;//util.convertVariantNameToCode(alpha.name, variantPosition);
      }

      return '';
    };

    self.getAlphaFourthAnswerText = function (alphaId) {
      if (alphaId > 2) {
        return '';
      }
      //console.log(alphaId);
      var alpha = answerFourthAlphas[alphaId - 1];
      if (alpha) {
        return alpha.text;
      }
      return '';
    };

    var audioElem = null;
    // with text like 'a10' 'a11' 'a12' 'a13'
    var testOriginAlpha = '';
    var testFourthAlphas = [];
    var answerAlphas = [];
    var answerFourthAlphas = [];
    var testAlpha = {};
    var variantPosition = 0;
    var playedAudioId = 0;
    var url = config.mediaUrl.alphaList;
    var sevenAlphaClass = 'alpha-col s3 l1';
    var twoAlphaClass = 'w3-col s6';

    function setAnswerAlphas() {
      variantPosition = util.getVariantPracticePosition(self.levelid, self.pagenum);
      testOriginAlpha = self.subData[--self.alphaPosition];
      self.testAlphas = testOriginAlpha.vowel;
      setTestAlphasText();
      answerAlphas = angular.copy(self.testAlphas);
      self.realAlphaClass = sevenAlphaClass;
      if (self.testAlphas.length == 2) {
        self.realAlphaClass = twoAlphaClass;
      }
    }

    function setTestAlphasText() {
      $.each(self.testAlphas, function (index, val) {
        val.text = util.convertVariantNameToCode(val.name, variantPosition);
      });
      //console.log(self.testAlphas);
      setFourthInAlphas();
    }

    function setFourthInAlphas() {
      if (variantPosition != 3) {
        return;
      }
      $.each(self.testAlphas, function (index, val) {
        if (index < 2) {
          if (util.alphaExist(val.name)) {
            var alpha = angular.copy(val);
            alpha.text = alpha.text.replace(3, 4);
            testFourthAlphas.push(alpha);
          }
        }
      });
    }

    function setAnswerAlphaState(alpha) {
      alpha.correct = false;
      alpha.error = false;
      if (alpha.text == testAlpha.text) {
        alpha.correct = true;
      } else {
        alpha.error = true;
      }
      //console.log(testAlpha);
      //console.log(alpha);
    }

    function concatenateFourthAlphas(t) {//console.log(testFourthAlphas);
      $.each(testFourthAlphas, function (key, val) {
        t.vowel.push(val);
      });
    }

    function getFourthTestAlpha(alpha) {
      //console.log(alpha);
      var ta = alpha;
      $.each(testFourthAlphas, function (index, val) {
        if (val.id = alpha.id) {
          ta = val;
          return false;
        }
      });
      //console.log(ta);
      return ta;
    }

    function playAudio() {
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
    }

    function stopPlayers(event, outScope) {
      audioElem.pause();
      playedAudioId = 0;
      if (outScope) {
        $scope.$digest();
      }
    }

    function randomAlphaSelected(event, alpha) {
      //console.log(answerFourthAlphas);
      var t = angular.copy(alpha);
      setAnswerAlphaState(t);
      var index = testAlpha.id - 1;
      if (testAlpha.text.indexOf('4') == 2) {
        answerFourthAlphas[index] = t;
      } else {
        answerAlphas[index] = t;
      }
      //console.log(answerFourthAlphas);
    }

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