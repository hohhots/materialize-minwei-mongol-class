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

    self.wordImeKeyVowels = ['a10', 'a20', 'a30', 'a40', 'a60'];

    // Auto setted according to selectedConsonant variable. 
    self.alphaVariants = ['a10', 'a20', 'n10', 'w10'];

    self.done = function () {
      closeIme();
    };

    self.cancel = function () {
      closeIme();
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
    }

    self.consonantClick = function (consonant) {
      if (selectedConsonant != consonant){
        selectedConsonant = consonant;        
      } else {
        selectedConsonant = '';
      }
    }

    self.getConsonantClass = function (consonant) {
      var cssClass = '';
      if (consonant == selectedConsonant) {
        cssClass = 'wordime-key-consonant-selected';
      }
      return cssClass;
    }

    // set value for self variables
    var wordImeBoard;
    var wordContainer;
    var wordimeButtonContainer;
    var wordImeBoardInitHeight = 120;
    var selectedConsonant = '';
    var selectedVowel = '';
    var selectedOriginAlpha = '';

    function closeIme() {
      self.showWordIme = false;
    };

    function startWordIme(event) {
      //hide to solve flash problem when display and set components dimension.
      $element.css('visibility', 'hidden');

      self.showWordIme = true;

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

      console.log(String.fromCharCode(0xe9e5));
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

    //add listener and hold on to deregister function
    var deregister = [];
    deregister.push($scope.$on(config.events.startWordIme, startWordIme));

    // clean up listener when directive's scope is destroyed
    $.each(deregister, function (i, val) {
      $scope.$on('$destroy', val);
    });
  };
})();
