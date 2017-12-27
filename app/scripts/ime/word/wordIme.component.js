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

    self.wordImeKeyConsonants = ['n10', 'b10', 'p10', 'h10', 'g10', 'm10', 'l10', 's10',
      'x10', 't10', 'd10', 'q10', 'j10', 'y10', 'r10', 'w10'];

    self.wordImeKeyVowels = ['a11', 'a21', 'a31', 'a41', 'a61'];

    self.wordImeKeyOriVowels = ['a10', 'a20', 'a30', 'a40', 'a60'];

    // Auto setted according to selectedOriginAlpha variable. 
    self.alphaVariants = [];

    self.cancel = function () {
      if (self.alphaVariants.length == 0) {
        closeIme();
      } else {
        closeVariantKeys();
      }
    };

    self.originAlphaSelected = function () {
      return selectedOriginAlpha ? true : false;
    };

    self.hasFourVariants = function () {
      var fourth = false;
      if (self.alphaVariants.length == 4) {
        fourth = true;
      }
      return fourth;
    };

    self.hasFourAlphaclass = function () {
      var cssClass = '';
      if (self.alphaVariants.length == 4) {
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

    self.consonantSelected = function () {
      var selected = false;
      if (selectedConsonant != '') {
        selected = true;
      }
      return selected;
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
      if ((selectedConsonant == 'w10') && disabledVowels.includes(vowel)) {
        return;
      }

      // Consonant didn't selected and vowel is in head form.
      if (!selectedConsonant && (vowel.lastIndexOf('1') == 2)) {
        $scope.$broadcast(config.events.setImeAlpha, vowel);
        return;
      }

      if (selectedConsonant && (vowel.lastIndexOf('0') == 2)) {
        selectedOriginAlpha = selectedConsonant.substr(0, 1) + vowel.substr(1, 1) + '0';
      }

      self.alphaVariants = wordConfig.getAlphaAllVariants(selectedOriginAlpha);

      startWordIme();
      //console.log(self.alphaVariants);
    };

    self.getVowelClass = function (vowel) {
      var cssClass = 'wordime-key-vowel';
      if ((selectedConsonant == 'w10') && disabledVowels.includes(vowel)) {
        cssClass = 'wordime-key-vowel-disable';
      }
      return cssClass;
    };

    self.alphaClick = function (order) {
      setInputFocus();
      $scope.$broadcast(config.events.setImeAlpha, self.alphaVariants[order]);
      closeVariantKeys();
    };

    // set value for self variables
    var wordImeBoard;
    var wordContainer;
    var wordimeButtonContainer;
    var wordImeBoardInitHeight = 120;
    var selectedConsonant = '';
    var selectedOriginAlpha = '';
    var keySelectedClass = 'wordime-key-selected';
    var disabledVowels = ['a30', 'a40', 'a60'];

    function closeIme() {
      self.showWordIme = false;
      closeVariantKeys();
    }

    function closeVariantKeys() {
      selectedConsonant = '';
      selectedOriginAlpha = '';
      self.alphaVariants = [];
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

      console.log(String.fromCharCode('0x' + 'e9e5'));
    }

    function setInnerEvent() {
      $(window).resize(resizeComponents);
    }

    function resizeComponents(event) {
      wordContainer.outerHeight(0);
      wordimeButtonContainer.outerHeight(0);

      wordContainer.outerHeight(wordImeBoard.height());
      wordimeButtonContainer.outerHeight(wordImeBoard.height());

      $scope.$broadcast(config.events.setDimension);
      //console.log(wordImeBoard.height());
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
