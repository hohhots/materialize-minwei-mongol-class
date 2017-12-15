'use strict';

(function () {
  // Define the `header` module
  var app = angular.module('app.category');

  // Register `headerList` component, along with its associated controller and template
  app.component('wordbeginPractice', {
    template: '<div ng-include="$ctrl.templateUrl"></div>',
    bindings: {
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
    self.templateUrl = config.templateUrl.wordbeginpractice;
    self.pageLangs = {};
    self.allCorrect = false;
    self.originword = '';
    self.answerword = '';
    
    self.$onInit = function () {
      self.pageLangs.name = self.jsonData[0].name + config.alphaLangs.practice;
      self.pageLangs.exit = config.alphaLangs.exit;
      self.pageLangs.notSupportHtml5Audio = config.alphaLangs.notSupportHtml5Audio;
      self.pageLangs.nextTest = config.alphaLangs.nextTest;
      setOriginWord();
    };

    self.exitPractice = function () {
      util.changePath(config.pagesUrl.wordBegin);
    };

    self.wordClick = function () {
      $scope.$broadcast(config.events.playWordAnimation, self.originword);
    };

    var practiceWords = [];

    function setOriginWord () {
      practiceWords = self.subData[0].words;

      var position = Math.floor(Math.random() * (practiceWords.length));
      var word = practiceWords[position].word;
      console.log(word);

      self.originword = word;

    }

    // add listener and hold on to deregister function
    var deregister = [];
    //deregister.push($scope.$on(config.events.stopPlayers, stopPlayers));
    //deregister.push($scope.$on(config.events.selectRandomAlphas, selectRandomAlphas));

    //deregister.push(videoElem.on('ended', videoEnded));
    // clean up listener when directive's scope is destroyed
    $.each(deregister, function (i, val) {
      $scope.$on('$destroy', val);
    });
  };

})();