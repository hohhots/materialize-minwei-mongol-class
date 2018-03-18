'use strict';

(function () {

  var app = angular.module('app.player');

  // Register `headerList` component, along with its associated controller and template
  app.component('appAudioplayer', {
    template: '<div ng-include="$ctrl.templateUrl"></div>',
    bindings: {
      getAudios: '&'
    },
    controller: [
      '$scope',
      '$element',
      '$interval',
      'Config',
      'Util',
      'Json',
      controller]
  });

  function controller($scope, $element, $interval, config) {
    var self = this;

    //define self variables
    self.templateUrl = config.templateUrl.audioPlayer;
    self.langs = {};
    self.langs.notSupportHtml5Audio = config.alphaLangs.notSupportHtml5Audio;

    self.$onInit = function () {
      // self.audios is Array.
      self.audios = self.getAudios(); console.log(self.audios);

    };

    self.$postLink = function () {
      var find = $interval(function () {
        var len = audioElems?audioElems.length:0;
        if (self.audios.length > len) {
          audioElems = $('audio', $element);
        } else {
          $interval.cancel(find);
          $.each(audioElems, function(index, audio) {
            audio.onended = autoStopAudio;
          });
        }
      }, 10);
    };

    var audioElems;
    var nowPlayingId = 0;

    var autoStopAudio = function() {
      if(nowPlayingId < audioElems.length) {
        playAudio(nowPlayingId + 1);
      }
    };

    var startPlay = function (e) {
      playAudio(1);
    };

    var playAudio = function(id) {
      id = id || 1;console.log(id);
      nowPlayingId = id;
      
      audioElems[id - 1].load();
      audioElems[id - 1].play();
    };

    // add listener and hold on to deregister function
    var deregister = [];
    deregister.push($scope.$on(config.events.startAudioPlay, startPlay));

    //deregister.push(videoElem.on('ended', videoEnded));
    // clean up listener when directive's scope is destroyed
    $.each(deregister, function (i, val) {
      $scope.$on('$destroy', val);
    });

  };
})();
