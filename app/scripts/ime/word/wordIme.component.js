'use strict';

(function () {
  // Define the `header` module
  var app = angular.module('app.ime');

  // Register `mwordIme` component, along with its associated controller and template
  app.component('mwordIme', {
    template: '<div ng-include="$ctrl.templateUrl"></div>',
    bindings: {
      jsonData: '<',
      subData: '<'
    },
    controller: [
      '$scope',
      '$element',
      '$interval',
      '$timeout',
      'Config',
      'wordConfig',
      'Util',
      'Json',
      controller]
  });

  function controller($scope, $element, $interval, $timeout, config, wordConfig, util, json) {
    var self = this;

    //define self variables
    self.templateUrl = config.templateUrl.wordIme;
    self.showWordIme = false;
    self.word = '';

    self.wordImeKeyConsonants = ['n00', 'b00', 'p00', 'h00', 'g00', 'm00', 'l00', 's00',
      'x00', 't00', 'd00', 'q00', 'j00', 'y00', 'r00', 'w00'];

    self.wordImeKeyForeigns = ['f00', 'k00', 'z00', 'c00', 'H00', 'L00'];

    self.wordImeKeyFSingles = ['e10', 'e11', 'e12', 'e13', 'e14'];

    self.wordImeKeyVowels = ['a11', 'a21', 'a31', 'a41', 'a61'];

    self.wordImeKeyOriVowels = ['a10', 'a20', 'a30', 'a40', 'a60'];

    self.wordImeKeyHalfs = ['A01', 'A03', 'A05', 'A07', 'A09', 'A11', 'A13', 'A15', 'A17', 'A19'];

    self.originAlphaSelected = function () {
      var selectOVariants = selectedOriginAlpha ? true : false;
      var selectHVariants = selectedHalfAlpha ? true : false;

      return selectOVariants || selectHVariants;
    };

    self.hasFourVariants = function () {
      var fourth = false;
      if (alphaVariants.length == 5) {
        fourth = true;
      }
      return fourth;
    };

    self.hasFourAlphaclass = function () {
      var cssClass = '';
      if (alphaVariants.length == 5) {
        cssClass = 'w3-col s4';
      }
      return cssClass;
    };

    self.consonantClick = function (consonant) {
      //setInputFocus();

      if (selectedConsonant != consonant) {
        selectedConsonant = consonant;
      } else {
        selectedConsonant = '';
      }
      resizeComponents();
    };

    self.getConsonantClass = function (consonant) {
      var cssClass = '';
      if (consonant == selectedConsonant) {
        cssClass = keySelectedClass;
      }
      return cssClass;
    };

    self.vowelClick = function (vowel) {
      setInputFocus();
      // Alpha w just has two alpha.
      if (isVowelDisabled(vowel)) {
        return;
      }

      // Consonant didn't selected and vowel is in origin form.
      if (!selectedConsonant) {
        selectedOriginAlpha = vowel;
      } else {
        selectedOriginAlpha = selectedConsonant.charAt(0) + vowel.charAt(1) + '0';
      }

      alphaVariants = wordConfig.getAlphaAllVariants(selectedOriginAlpha);

      startWordIme();
    };

    self.getVowelClass = function (vowel) {
      var cssClass = 'wordime-key-vowel';

      if (isVowelDisabled(vowel)) {
        cssClass = 'wordime-key-vowel-disable';
      }

      return cssClass;
    };

    self.alphaClick = function (position) {
      // setInputFocus();
      $scope.$broadcast(config.events.setImeAlpha, self.getAlphaVariant(position));
      closeVariantKeys();
    };

    self.halfVariantClick = function (position) {
      // setInputFocus();
      self.toggleConsnantAlphas();
      $scope.$broadcast(config.events.setImeAlpha, self.getHalfVariant(position));
      closeVariantKeys();
    };

    self.fsingleClick = function (fsingle) {
      self.toggleConsnantAlphas();
      $scope.$broadcast(config.events.setImeAlpha, fsingle);
      closeVariantKeys();
    };

    self.halfClick = function (half) {
      setInputFocus();
      // Sure no other alpha selected.
      if (selectedConsonant) {
        return;
      }

      selectedHalfAlpha = half;

      halfVariants = wordConfig.getHalfVariants(half);

      startWordIme();
    };

    self.backSpace = function () {
      //console.log('back');
      $scope.$broadcast(config.events.wordInputBackSpace);
    };

    self.done = function () {
      closeIme(true);
    };

    self.getAlphaVariant = function (position) {
      var alpha = '';
      $.each(alphaVariants, function (index, value) {
        if (value.substring(2) === position.toString()) {
          alpha = value;
        }
      });

      return alpha;
    }

    self.variantExist = function (position) {
      if (self.getAlphaVariant(position)) {
        return true;
      }
      return false;
    };

    self.getVariantsNum = function (position) {
      position = position * 3 - 2;
      var num = 0;
      for (var i = 0; i < 3; i++) {
        if (self.getAlphaVariant(position + i)) {
          ++num;
        }
      }
      return num;
    };

    self.getVariantsClass = function (position) {
      return 'wordime-variant-wrapper' + self.getVariantsNum(position);
    };

    self.halfAlphaSelected = function () {
      if (selectedHalfAlpha) {
        return true;
      }
      return false;
    };

    self.getHalfVariant = function (position) {
      return halfVariants[position];
    };

    self.cancel = function () {
      if ((alphaVariants.length === 0) && (halfVariants.length === 0)) {
        closeIme();
      } else {
        closeVariantKeys();
      }
    };

    self.displayHalfAlphas = function () {
      var display = false;

      if (displayedBoards[4] && testWordHasHalfs() && !variantsDisplayed()) {
        display = true;
      }
      return display;
    };

    self.setHalfAlphasClass = function () {
      var clas = 'wordime-hide';
      if (self.displayHalfAlphas()) {
        clas = '';
      }
      return clas;
    }

    self.toggleHalfAlphas = function () {
      displayedBoards = {4: true};
    };

    self.toggleConsnantAlphas = function () {
      displayedBoards = {1: true, 2: true};
    };

    self.toggleForeignAlphas = function () {
      displayedBoards = {1: true, 3: true};
    };

    self.displayVowelAlphas= function () {
      return getAlphasDisplayState(1);
    };

    self.displayConsnantAlphas = function () {
      return getAlphasDisplayState(2);
    };

    self.displayForeignAlphas = function () {
      return getAlphasDisplayState(3);
    };

    self.getConsnantAlphasClass = function () {
      return getAlphasClasses(self.displayConsnantAlphas());
    };

    self.getForeignAlphasClass = function () {
      return getAlphasClasses(self.displayForeignAlphas());
    };

    self.getVowelAlphasClass = function () {
      return getAlphasClasses(self.displayVowelAlphas());
    };

    self.getConsnantButtonClass = function () {
      var clas = 'wordime-hide';
      if (!self.displayConsnantAlphas() && !selectedOriginAlpha) {
        clas = 'wordime-button';
      }
      return clas;
    };

    self.getHalfButtonClass = function () {
      var clas = 'wordime-hide';
      if (testWordHasHalfs() && !self.displayHalfAlphas() && !selectedOriginAlpha) {
        clas = 'wordime-button';
      }
      return clas;
    };

    self.getForeignButtonClass = function () {
      var clas = 'wordime-hide';
      if (testWordHasForeigns() && !self.displayForeignAlphas() && !selectedOriginAlpha) {
        clas = 'wordime-button';
      }
      return clas;
    };

    // set value for self variables
    var wordImeBoard;
    var wordContainer;
    var wordimeButtonContainer;
    var selectedConsonant = '';
    // If has value, display variant keyboard
    var selectedOriginAlpha = '';
    var keySelectedClass = 'wordime-key-selected';
    var disabledWVowels = ['a30', 'a40', 'a60'];
    var disabledLVowels = ['a20', 'a30', 'a40', 'a60'];
    // Auto setted according to selectedOriginAlpha variable. 
    var alphaVariants = [];

    var selectedHalfAlpha = '';
    var halfVariants = [];

    // 1=vowel, 2=consnant, 3=foreign; 4=half
    var displayedBoards = {1: true, 2: true};

    // alphasNum 1=vowel, 2=consnant, 3=foreign; 4=half
    function getAlphasDisplayState(alphasNum) {
      var display = false;

      if (displayedBoards[alphasNum] && !variantsDisplayed()) {
        display = true;
      }
      return display;
    }

    function getAlphasClasses (alphaDisplayState) {
      var clas = ' wordime-hide';
      if (alphaDisplayState) {
        clas = '';
      }
      return 'wordime-alphas-container' + clas;
    }

    // some consnant has only a few vowels.
    function isVowelDisabled(vowel) {
      if ((selectedConsonant === 'w10') && disabledWVowels.includes(vowel)) {
        return true;
      }
      if ((selectedConsonant === 'L10') && disabledLVowels.includes(vowel)) {
        return true;
      }
      return false;
    }

    function variantsDisplayed() {
      var displayed = false;

      if (alphaVariants.length || halfVariants.length) {
        displayed = true;
      }
      return displayed;
    }

    function testWordHasHalfs() {
      var has = false;
      if (wordConfig.wordHasHalfAlphas($scope.$parent.$ctrl.originWord)) {
        if (!self.originAlphaSelected()) {
          has = true;
        }
      }

      return has;
    }

    function testWordHasForeigns() {
      var has = false;
      if (wordConfig.wordHasForeignAlphas($scope.$parent.$ctrl.originWord)) {
        if (!self.originAlphaSelected()) {
          has = true;
        }
      }

      return has;
    }

    function closeIme(done) {
      self.showWordIme = false;

      if (alphaVariants.length) {
        closeVariantKeys();
      } else {
        // selectedConsonant = '';
        closeVariantKeys();
        //displayedBoards = {1: true, 2: true};
        $scope.$broadcast(config.events.closeIme, done);
      }
    }

    function closeVariantKeys() {
      selectedConsonant = '';

      selectedOriginAlpha = '';
      alphaVariants = [];

      selectedHalfAlpha = '';
      halfVariants = [];

      displayedBoards = {1: true, 2: true};

      setTimeout(function () {
        resizeComponents();
      }, 10);
    }

    function startWordIme(event) {
      //hide to solve flash problem when display and set components dimension.
      if (event) {
        $element.css('visibility', 'hidden');
        self.showWordIme = true;
      }

      var dd = $interval(function () {
        if (!wordImeBoard || !wordContainer || !wordimeButtonContainer) {
          wordImeBoard = $element.find('.wordime-board');
          wordContainer = $element.find('.wordime-word-container');
          wordimeButtonContainer = $element.find('.wordime-button-container');
        } else {
          resizeComponents();
          setInnerEvent();
          $interval.cancel(dd);
          // After all set delay 20 to display all element.
          setTimeout(function () {
            $element.css('visibility', 'visible');
            $scope.$broadcast(config.events.setInputFocus);
          }, 20);
        }
      }, 20);
    }

    function setInnerEvent() {
      $(window).resize(resizeComponents);
    }

    function resizeComponents(event) {
      $scope.$broadcast(config.events.setDimension);
    }

    function setInputFocus() {
      $scope.$broadcast(config.events.setInputFocus);
    }

    //add listener and hold on to deregister function
    var deregister = [];
    deregister.push($scope.$on(config.events.startWordIme, startWordIme));

    // clean up listener when directive's scope is destroyed
    $.each(deregister, function (i, val) {
      $scope.$on('$destroy', val);
    });
  };
})();
