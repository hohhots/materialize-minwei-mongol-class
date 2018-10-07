'use strict';

(function ($) {
  // Define the `header` module
  var app = angular.module('app.home');

  // Register `headerList` component, along with its associated controller and template
  app.component('appBooks', {
    template: '<div ng-include="$ctrl.templateUrl"></div>',
    bindings: {
      pagenum: '<'
    },
    require: {
      parent: '^^appLevels'
    },
    controller: [
      '$state',
      '$scope',
      '$sce',
      '$http',
      '$interval',
      '$element',
      'Config',
      'Util',
      'audioPlayerService',
      Controller]
  });

  function Controller($state, $scope, $sce, $http, $interval, $element, config, util, audioPlayerService) {
    var self = this;

    self.templateUrl = config.templateUrl.appBooks;
    self.langs = {};
    self.langs.notSupportHtml5Audio = config.alphaLangs.notSupportHtml5Audio;
    // classroom directory hash name
    self.fileName = '';
    self.pdfImage = '';
    self.interactUrl = '';
    // json data
    self.json = '';

    self.$onInit = function () {
      self.pagenum = parseInt(self.pagenum, 10);
      if (!self.parent.validPageNum(self.pagenum)) {
        return;
      }
      self.levelid = self.parent.levelid;
      self.fileName = self.parent.getFileName(self.pagenum);
      self.parent.setPageNum(self.pagenum);

      var json = getPageJsonUrl();
      $http.get(json, { cache: true }).then(setJson);
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

    self.playAudio = function () {
      if (!audioPlaying) {
        audioPlayerService.play();
      } else {
        audioPlayerService.pauseAudio();
      }
    };

    self.getPlayerIconClass = function () {
      return util.getPlayerIconClass(audioPlaying);
    };

    self.audioPlayed = function () {
      audioPlaying = true;
    };

    self.audioPaused = function () {
      audioPlaying = false;
    };

    self.gotoClass = function () {
      $state.go(config.uiState[self.json.interactType].name, { levelid: self.levelid, pagenum: self.pagenum });
    };

    var audioElem;
    var audioPlaying = false;
    // classroom data directory url
    var dataUrl = config.dataPath['appLevels'].data;

    var getAudio = function () {
      return {
        url: self.parent.getBookPath() + '/' + config.data.audios + '/',
        mpeg: self.pagenum + config.dataTypes.audios[1],
        ogg: self.pagenum + config.dataTypes.audios[0]
      };
    };

    var getPageJsonUrl = function () {
      var url = dataUrl + self.levelid + '/' + self.fileName + '.json';
      return url;
    };

    var setJson = function (resp) {
      self.json = (resp.data)[0];
      // using map change images url
      self.pdfImage = self.parent.getBookPath() + '/' + config.data.images + '/' + self.fileName + config.dataTypes.images[1];

      audioPlayerService.init(self, getAudio());
    };

    var autoStopAudio = function () {
      $scope.$broadcast(config.events.stopPlayers, true);
    };

    var stopPlayers = function (event, outScope) {
      if (audioElem && audioPlaying) {
        audioElem.pause();
        audioPlaying = false;
        if (outScope) {
          $scope.$digest();
        }
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
  }
})(jQuery);
