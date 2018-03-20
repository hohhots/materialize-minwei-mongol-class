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
    var i = -1;
    var sounds = self.sounds;
    playSnd();

    function playSnd() {console.log(i);
      i++;
      if (i == sounds.length) {
        self.ctrl.audioPaused();
        return;
      }
      sounds[i].onended = playSnd;
      sounds[i].play();
      self.ctrl.audioPlayed();
    }
  };

  playAudios.prototype.pauseAudios = function () {
    var self = this;
    $.each(self.sounds, function(i,audio) {
      audio.pause();
    });
  };

  app.service('audioPlayerService', playAudios);
})(jQuery);