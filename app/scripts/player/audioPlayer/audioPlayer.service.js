'use strict';

(function ($) {
  var app = angular.module('app.player');

  var playAudios = function () {
    this.sounds = [];
  };

  playAudios.prototype.init = function (audios) {
    var self = this;

    self.audios = audios;

    $.each(self.audios, function (index, audio) {
      self.sounds.push(self.audioX(audio));
    });
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

    function playSnd() {
      i++;
      if (i == sounds.length) return;
      sounds[i].addEventListener('ended', playSnd);
      sounds[i].play();
    }
  };

  app.service('audioPlayerService', playAudios);
})(jQuery);