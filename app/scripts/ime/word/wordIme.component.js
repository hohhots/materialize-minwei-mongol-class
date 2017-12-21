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
      'Config',
      'wordConfig',
      'Util',
      'Json',
      controller]
  });

  function controller($scope, $element, $interval, config, wordConfig, util, json) {
    var self = this;

    //define self variables
    self.templateUrl = config.templateUrl.wordIme;
    self.showWordIme = false;
    self.word = '';

    self.wordImeKeyAlphas = ['n10', 'b10', 'p10', 'h10', 'g10', 'm10', 'l10', 's10',
      'x10', 't10', 'd10', 'q10', 'j10', 'y10', 'r10', 'w10'];

    self.wordImeKeyVowels = ['a10', 'a20', 'a30', 'a40', 'a50', 'a60', 'a70'];

    self.done = function () {
      closeIme();
    };

    self.cancel = function () {
      closeIme();
    };

    // ser value for self variables
    var wordImeBoard;
    var wordContainer;
    var wordimeKeysContainer;
    var wordimeButtonContainer;
    var wordImeBoardInitHeight = 120;

    function closeIme() {
      self.showWordIme = false;
    };

    function startWordIme(event, word) {
      //hide to solve flash problem when display and set components dimension.
      $element.css('visibility', 'hidden');

      self.showWordIme = true;
      self.word = word;

      var dd = $interval(function () {
        if (!wordImeBoard || !wordContainer || !wordimeButtonContainer) {
          wordImeBoard = $element.find('.wordime-board');
          wordContainer = $element.find('.wordime-word-container');
          wordimeKeysContainer = $element.find('.wordime-keyboard-container');
          wordimeButtonContainer = $element.find('.wordime-button-container');
        } else {
          resizeComponents();
          setInnerEvent();
          $interval.cancel(dd);
          // After all set to display element.
          $element.css('visibility', 'visible');
        }
      }, 20);

      console.log(String.fromCharCode(0xe9e5));
    }

    function mwordInputFocused() {
      console.log('focused');
    }

    function setInnerEvent() {
      $(window).resize(resizeComponents);
    }

    function resizeComponents(event) {
      wordContainer.height(0);
      wordimeButtonContainer.height(0);

      wordContainer.outerHeight(wordImeBoard.height());
      wordimeKeysContainer.outerHeight(wordImeBoard.height());
      wordimeButtonContainer.outerHeight(wordImeBoard.height());

      $scope.$broadcast(config.events.setDimension);
      //console.log(wordImeBoard.height());
    }

    //add listener and hold on to deregister function
    var deregister = [];
    deregister.push($scope.$on(config.events.startWordIme, startWordIme));
    deregister.push($scope.$on(config.events.mwordInputFocused, mwordInputFocused));

    // clean up listener when directive's scope is destroyed
    $.each(deregister, function (i, val) {
      $scope.$on('$destroy', val);
    });
  };
})();
