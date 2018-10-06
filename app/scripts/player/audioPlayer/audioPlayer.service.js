'use strict';

(function ($) {
  var app = angular.module('app.player');

  var playAudios = function () {
  };

  playAudios.prototype.init = function (ctrl, audio) {
    var self = this;

    self.pauseAudio();

    self.ctrl = ctrl;

    self.sound = self.audioX(audio);

    self.playing = false;
    self.pausedAudio = null;
  };

  playAudios.prototype.audioX = function (audio) {
    var a = new Audio();
    a.preload = 'auto';

    var f = '';
    if (a.canPlayType("audio/ogg") != "")
      f = audio.ogg;
    else
      f = audio.mpeg;

    a.src = audio.url + f;

    return a;
  }

  playAudios.prototype.play = function () {
    var self = this;

    if(self.pausedAudio) {
      self.pausedAudio.play();
      self.pausedAudio = null;
      self.ctrl.audioPlayed();
      return;
    }

    var sound = self.sound;
    playSnd();

    function playSnd() {
      if (self.playing) {
        self.ctrl.audioPaused();
        return;
      }
      sound.onended = playSnd;
      sound.play();

      self.playing = true;
      self.ctrl.audioPlayed();
    }
  };

  playAudios.prototype.pauseAudio = function () {
    var self = this;

    if (self.playing) {
      self.sound.pause();
      self.pausedAudio = self.sound;
      self.ctrl.audioPaused();
    }
  };

  app.service('audioPlayerService', playAudios);
})(jQuery);