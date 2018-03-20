'use strict';

(function ($) {
  // Define the `header` module
  var app = angular.module('app.home');

  // Register `headerList` component, along with its associated controller and template
  app.component('appClassroom', {
    template: '<div ng-include="$ctrl.templateUrl"></div>',
    bindings: {
      classroomid: '<'
    },
    require: {
      parent: '^^appLevels'
    },
    controller: [
      '$location',
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

  function Controller($location, $scope, $sce, $http, $interval, $element, config, util, audioPlayerService) {
    var self = this;

    self.templateUrl = config.templateUrl.appClassroom;
    self.langs = {};
    self.langs.notSupportHtml5Audio = config.alphaLangs.notSupportHtml5Audio;
    self.dirHash = '';


    self.$onInit = function () {
      self.dirHash = self.parent.getDirectoryHash(self.classroomid);
      self.levelid = self.parent.levelid;
      self.parent.setClassroomId(parseInt(self.classroomid));

      var json = getClassroomUrl();
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
      if(!audioPlaying) {
        audioPlayerService.play(getAudios());
      } else {
        audioPlayerService.pauseAudios();
        audioPlaying = false;
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

    var audioElem;
    var audioPlaying = false;

    var getAudios = function() {
      var audioUrl = config.mediaUrl.classroom;

      var ta = $.map(self.json.audioIds, function(id) {
        return {
          url: audioUrl + config.data.audios + '/',
          mpeg: id + config.dataTypes.audios[1],
          ogg: id + config.dataTypes.audios[0]
        };
      });
      return ta;
    };

    var getClassroomUrl = function() {
      var url = angular.copy(config.dataPath['appLevels'].data);

      url = url + self.levelid + '/' + self.dirHash + '/class.json';
      // console.log(json);
      return url;
    };

    var setJson = function(resp) {
      var purl = config.dataPath['appLevels'].data;

      self.json = (resp.data)[0];
      // using map change images url
      self.json.pdfImages = $.map(self.json.pdfImages, function(url) {
        return purl + 'images/' + url;
      });

      audioPlayerService.init(self, getAudios());
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
