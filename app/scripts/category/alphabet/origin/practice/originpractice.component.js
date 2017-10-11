'use strict';

(function () {
  // Define the `header` module
  var app = angular.module('app.category');

  // Register `headerList` component, along with its associated controller and template
  app.component('originPractice', {
    template: '<div ng-include="$ctrl.templateUrl"></div>',
    bindings: {
      jsonData: '<',
      subData: '<'
    },
    controller: [
      '$scope',
      '$element',
      '$location',
      '$interval',
      'Config',
      'Util',
      'Json',
      controller]
  });

  function controller($scope, $element, $location, $interval, config, util, json) {
    var self = this;

    //define self variables
    self.templateUrl = config.templateUrl.originpractice;
    self.langs = {};
    self.testAlphas = [];
    self.audio = {};

    self.$onInit = function () {
      self.langs.name = self.jsonData[0].name + config.alphaLangs.practice;
      self.langs.selectAlpha = config.alphaLangs.selectAlpha;
      self.langs.checkAnswer = config.alphaLangs.checkAnswer;
      self.langs.exit = config.alphaLangs.exit;
      self.langs.notSupportHtml5Audio = config.alphaLangs.notSupportHtml5Audio;
      setFourAlphas();
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
      $location.path("/" + config.app.url + "/" + config.pagesUrl.alphaOrigin);
    };

    self.getAlphaClass = function (name) {
      return config.alphaCss.practiceEmpty;
    };

    self.playAudios = function () {
      console.log(playedAudioId + " - " + self.testAlphas.length);
      if (playedAudioId == self.testAlphas.length) {
        playedAudioId = 0;
        return;
      }
      var name = self.testAlphas[playedAudioId].fileName;
      var gender = util.getRandomGender();
      self.audio = {
        mpeg: url + config.data.audios + '/' + name + '/' + name + gender + config.dataTypes.audios[1],
        ogg: url + config.data.audios + '/' + name + '/' + name + gender + config.dataTypes.audios[0]
      };
      if (playedAudioId != 0) {
        $scope.$digest();
      }
      audioElem.load();
      audioElem.play();
      playedAudioId++;
    };

    var audioElem = null;
    var playedAudioId = 0;
    var url = config.mediaUrl.alphaOrigin;

    var setFourAlphas = function () {
      var position = Math.floor(Math.random() * (self.subData.length - 3));
      self.testAlphas = self.subData.slice(position, position + 4);
    };

    var autoPlayAudio = function () {
      self.playAudios();
    };

    var selectRandomAlphas = function(event, alphas) {
      console.log(alphas);
    };

    // add listener and hold on to deregister function
    var deregister = [];
    deregister.push($scope.$on(config.events.selectRandomAlphas, selectRandomAlphas));

    //deregister.push(videoElem.on('ended', videoEnded));
    // clean up listener when directive's scope is destroyed
    $.each(deregister, function (i, val) {
      $scope.$on('$destroy', val);
    });
  };

})();