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
    self.bookJson = [];
    self.showClass = false;

    self.$onInit = function () {
      self.pagenum = parseInt(self.pagenum, 10);
      if (!self.parent.validPageNum(self.pagenum)) {
        return;
      }
      self.levelid = self.parent.levelid;
      self.fileName = self.parent.getFileName(self.pagenum);
      self.parent.setPageNum(self.pagenum);

      util.setBook(self);
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
      audioPlayerService.pauseAudio();
      $state.go(config.uiState[self.bookJson.interactType].name, { levelid: self.levelid, pagenum: self.pagenum });
    };

    self.setModels = function (book, json) {
      self.bookJson = json;
      // using map change images url
      self.pdfImage = self.parent.getBookPath() + '/' + config.data.images + '/' + self.fileName + config.dataTypes.images[1];

      audioPlayerService.init(self, getAudio());

      if (self.bookJson.interactType) {
        self.showClass = true;
      }
    };

    self.playVideo = function () {
      var names = {};
      var url = self.parent.getBookPath() + '/' + config.data.videos + '/' + self.fileName;console.log(url);
      names.videos = {
        ogv: url + config.dataTypes.videos[0],
        webm: url + config.dataTypes.videos[1]
      };
      names.name = "动画";
      $scope.$broadcast(config.events.playIntroductionVideo, names);
    };

    self.hasVideo = function () {
      if(self.bookJson.video){
        return !0;
      } else {
        return !!0;
      }
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
