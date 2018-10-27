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
    self.originAlphas = [];
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
      var allC = true;

      if (!allVariantsAnswered()) {
        allC = false;
      }

      $.each(answerAlphas, function (index, value) {
        $.each(value.testVariants, function (ind, val) {
          if (val.variant !== val.answer) {
            allC = false;
            return false;
          }
        });
      });

      return allC;
      
    };

    self.getAlphaClass = function (alpha) {
      return 'originFont-' + alpha.name;
    };

    // (alphaIndex, positionIndex) {
    //  if (answerAlphas[alphaIndex].testVariants[positionIndex].answer)
    self.getAnswerAlphaClass = function (alphaIndex, positionIndex) {
      var css = config.alphaCss.variantpracticeEmpty + ' variantpractice-position';
      var alpha = answerAlphas[alphaIndex].testVariants[positionIndex];
      if (alpha.answer) {
        css = 'variantview-view-value';
      }

      var stat = ' variantpractice-alpha-click';
      if (allVariantsAnswered()) {
        if (alpha.variant === alpha.answer) {
          stat = ' originpractice-green';
        } else {
          stat = ' originpractice-red variantpractice-alpha-click';
        }
      }
      return css + stat;
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

    self.selectAlphaClick = function (alphaIndex, positionIndex) {
      if (self.allCorrect()) {
        return;
      }
      var answers = answerAlphas;console.log(answerAlphas);
      testAlpha = {testAlphaIndex: alphaIndex, testVariantPosition: positionIndex};

      var tests = getAlphaVariantsCode(answers);

      $scope.$broadcast(config.events.variantDisplayRandomAlpha, tests);
    };

    self.getSelectText = function (alphaIndex, positionIndex) {
      var text = '';
      if (!self.alphaAnswered(alphaIndex, positionIndex)) {
        text = config.alphaLangs.top;

        if (variantPosition > 3 && variantPosition < 7) {
          text = config.alphaLangs.middle;
        }
        if (variantPosition > 6) {
          text = config.alphaLangs.bottom;
        }
      }
      return text;
    };

    self.nextTestClick = function () {
      $state.reload();
    };

    self.alphaAnswered = function (alphaIndex, positionIndex) {
      if (answerAlphas[alphaIndex].testVariants[positionIndex].answer) {
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
    self.getAlphaAnswerText = function (alphaIndex, positionIndex) {
      return answerAlphas[alphaIndex].testVariants[positionIndex].answer;
    };

    var audioElem = null;
    // with text like 'a10' 'a11' 'a12' 'a13'
    var testOriginAlpha = '';
    var testFourthAlphas = [];
    var answerAlphas = [];
    var answerFourthAlphas = [];
    
    // testAlpha = {testAlphaIndex:0, testVariantPosition:0};
    var testAlpha = {};
    var variantPosition = 0;
    var playedAudioId = 0;
    var url = config.mediaUrl.alphaList;
    var sevenAlphaClass = 'alpha-col s3 l1';
    var twoAlphaClass = 'w3-col s6';

    function setAnswerAlphas() {
      variantPosition = util.getVariantPracticePosition(self.levelid, self.pagenum);
      testOriginAlpha = self.subData[--self.alphaPosition];
      self.originAlphas = testOriginAlpha.vowel;
      setOriginAlphasText();
      answerAlphas = angular.copy(self.originAlphas);
      self.realAlphaClass = sevenAlphaClass;
      if (self.originAlphas.length == 2) {
        self.realAlphaClass = twoAlphaClass;
      }
    }

    function setOriginAlphasText() {
      $.each(self.originAlphas, function (index, val) {
        val.testVariants = [];
        for (var i = 0; i < 3; i++) {
          var code = util.convertVariantNameToCode(val.name, variantPosition + i);
          if (code) {
            var ob = {};
            ob.position = variantPosition + i;
            ob.variant = code;
            val.testVariants.push(ob);
          }
        }
      });
    }

    function playAudio() {
      if (playedAudioId == self.originAlphas.length) {
        $scope.$broadcast(config.events.stopPlayers, true);
        return;
      }
      var name = self.originAlphas[playedAudioId].name;
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

    function getAlphaVariantsCode(alphas) {
      var uniqueCodes = [];
      $.each(alphas, function (index, val) {
        $.each(val.testVariants, function (inde, va) {
          if (uniqueCodes.indexOf(va.variant) === -1) {
            uniqueCodes.push(va.variant);
          }
        });
      });

      return uniqueCodes;
    }

    function allVariantsAnswered() {
      var allAnswered = true;

      $.each(answerAlphas, function (index, value) {
        $.each(value.testVariants, function (ind, val) {
          if (!val.answer) {
            allAnswered = false;
            return false;
          }
        });
      });

      return allAnswered;
    }

    function randomAlphaSelected(event, alpha) {
      var ans = answerAlphas[testAlpha.testAlphaIndex].testVariants[testAlpha.testVariantPosition];
      ans.answer = alpha;
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