'use strict';

(function () {
  // Define the `header` module
  var app = angular.module('app.category');

  // Register `headerList` component, along with its associated controller and template
  app.component('wordbeginPractice', {
    template: '<div ng-include="$ctrl.templateUrl"></div>',
    bindings: {
      levelid: '<',
      pagenum: '<',
      jsonData: '<'
    },
    controller: [
      '$scope',
      '$state',
      '$element',
      '$location',
      '$interval',
      '$timeout',
      'Config',
      'wordConfig',
      'Util',
      'Json',
      controller]
  });

  function controller($scope, $state, $element, $location, $interval, $timeout, config, wordConfig, util) {
    var self = this;

    //define self variables
    self.templateUrl = config.templateUrl.wordbeginpractice;
    self.pageLangs = {};
    self.allCorrect = false;
    self.originWord = '';
    self.answerWord = '';
    self.answerCorrect = false;
    self.OriginWordNum = 0;

    self.bookJson = util.getBookJson(self.levelid, self.pagenum);

    self.$onInit = function () {
      self.pageLangs.name = self.jsonData[0].name + config.alphaLangs.practice;
      self.pageLangs.exit = config.alphaLangs.exit;
      self.pageLangs.notSupportHtml5Audio = config.alphaLangs.notSupportHtml5Audio;
      self.pageLangs.nextTest = config.alphaLangs.nextTest;

      util.setBook(self);
    };

    self.setModels = function (book, json) {
      self.bookJson = json;

      practiceWords = self.bookJson.words;
      setOriginWord();
    };

    self.exitPractice = function () {
      $state.go(config.uiState.wordBegin.name, { levelid: self.levelid, pagenum: self.pagenum });
    };

    self.wordClick = function () {
      $scope.$broadcast(config.events.playWordAnimation, self.originWord);
    };

    self.answerClick = function () {
      $scope.$broadcast(config.events.startWordIme, self.originWord);
    };

    self.getAnswerClass = function () {
      if (self.answerWord == '') {
        return '';
      }

      var cssClass = '';

      if (self.answerCorrect) {
        cssClass = 'wordbeginpractice-right';
      } else {
        cssClass = 'wordbeginpractice-wrong';
      }

      return cssClass;
    }

    self.nextTestClick = function () {
      ++self.OriginWordNum;
      self.answerCorrect = false;
      self.answerWord = '';

      setOriginWord();
    };

    self.getPracticeCount = function () {
      return practiceWords.length;
    };

    var practiceWords = [];

    function setOriginWord() {
      if ((self.OriginWordNum < 0) || (self.OriginWordNum >= practiceWords.length)) {
        self.OriginWordNum = 0;
      }
      self.originWord = practiceWords[self.OriginWordNum].word;
    }

    function wordImeDone(event, word) {
      self.answerWord = word;
      checkAnswerCorrect();
    }

    function checkAnswerCorrect() {
      if (wordConfig.setMonWord(self.originWord) === wordConfig.setMonWord(self.answerWord)) {
        self.answerCorrect = true;
      } else {
        self.answerCorrect = false;
      }
    }

    // add listener and hold on to deregister function
    var deregister = [];
    deregister.push($scope.$on(config.events.wordImeDone, wordImeDone));
    //deregister.push($scope.$on(config.events.stopPlayers, stopPlayers));

    //deregister.push(videoElem.on('ended', videoEnded));
    // clean up listener when directive's scope is destroyed
    $.each(deregister, function (i, val) {
      $scope.$on('$destroy', val);
    });
  };

})();