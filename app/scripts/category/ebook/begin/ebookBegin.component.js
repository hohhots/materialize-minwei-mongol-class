'use strict';

(function () {
  // Define the `header` module
  var app = angular.module('app.category');

  // Register `headerList` component, along with its associated controller and template
  app.component('appEbookbegin', {
    template: '<div ng-include="$ctrl.templateUrl"></div>',
    bindings: {
      jsonData: '<',
      subData: '<'
    },
    controller: ['$scope', '$interval', '$element', 'Config', 'Util', 'Json', controller]
  });

  function controller($scope, $interval, $element, config, util, json) {
    var self = this;

    self.langs = {};
    // variable for outside access 
    self.templateUrl = config.templateUrl.ebookBegin;
    self.langs.audioPlay = config.alphaLangs.audioPlay;
    self.langs.pagePrevious = config.alphaLangs.pagePrevious;
    self.langs.pageNext = config.alphaLangs.pageNext;
    self.langs.notSupportHtml5Audio = config.alphaLangs.notSupportHtml5Audio;
    self.currentImageUrl = '';

    self.$onInit = function () {
      setcurrentStates();
    };

    self.$postLink = function () {
      var stop = $interval(function () {
        if (!audioElem) {
          audioElem = $element.find('audio')[0];
        } else {
          $interval.cancel(stop);
          audioElem.onended = autoStopAudio;
        }
      }, 10);
    };

    self.pageNext = function () {
      if (currentPageNum == self.subData[0].totalPages) {
        return;
      }
      currentPageNum += 1;
      setcurrentStates();
    };

    self.pagePrevious = function () {
      if (currentPageNum == 1) {
        return;
      }
      currentPageNum -= 1;
      setcurrentStates();
    };

    self.audioPlay = function () {
      if (audioPlaying == 1) {
        $scope.$broadcast(config.events.stopPlayers);
        return;
      };
      self.audio = {
        mpeg: url + config.data.audios + '/' + currentPageNum + config.dataTypes.audios[1],
        ogg: url + config.data.audios + '/' + currentPageNum + config.dataTypes.audios[0]
      };
      audioElem.load();
      audioElem.play();
      audioPlaying = 1;
    };

    self.getPlayerIconClass = function () {
      return util.getPlayerIconClass(audioPlaying);
    };

    var url = config.mediaUrl.ebookBegin;
    var currentPageNum = 1;
    var audioElem = null;
    var audioPlaying = 0;

    var setcurrentStates = function () {
      self.currentImageUrl = url + config.data.images + '/' + currentPageNum + config.dataTypes.images[0];
    };

    var autoStopAudio = function () {
      $scope.$broadcast(config.events.stopPlayers, true);
    };

    var stopPlayers = function (event, outScope) {
      audioElem.pause();
      audioPlaying = 0;
      if (outScope) {
        $scope.$digest();
      }
    };

    // add listener and hold on to deregister function
    var deregister = [];
    deregister.push($scope.$on(config.events.stopPlayers, stopPlayers));

    //deregister.push(videoElem.on('ended', videoEnded));
    // clean up listener when directive's scope is destroyed
    $.each(deregister, function (i, val) {
      $scope.$on('$destroy', val);
    });

  };

})();
