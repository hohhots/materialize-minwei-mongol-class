'use strict';

(function ($) {
  var app = angular.module('app.player');

  var playAudios = function () {
  };

  playAudios.prototype.init = function (ctrl, audios) {
    var self = this;
    
    self.pauseAudios();

    self.ctrl = ctrl;

    self.audios = audios;
    self.sounds = [];

    $.each(self.audios, function (index, audio) {
      self.sounds.push(self.audioX(audio));
    });console.log(self.sounds);
  };

  playAudios.prototype.audioX = function (audio) {
    console.log(audio);
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

    self.playingId = -1;
    var sounds = self.sounds;
    playSnd();

    function playSnd() {
      self.playingId++;
      if (self.playingId == sounds.length) {
        self.ctrl.audioPaused();
        return;
      }
      sounds[self.playingId].onended = playSnd;
      sounds[self.playingId].play();
      self.ctrl.audioPlayed();
    }
  };

  playAudios.prototype.pauseAudios = function () {
    var self = this;

    if(self.playingId > -1) {
      self.sounds[self.playingId].pause();
      self.pausedAudio = self.sounds[self.playingId];
      self.ctrl.audioPaused();
    }
  };

  app.service('audioPlayerService', playAudios);
})(jQuery);