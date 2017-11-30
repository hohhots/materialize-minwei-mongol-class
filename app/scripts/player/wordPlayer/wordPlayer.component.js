'use strict';

(function () {
  // Define the `header` module
  var app = angular.module('app.player');

  // Register `headerList` component, along with its associated controller and template
  app.component('appWordplayer', {
    template: '<div ng-include="$ctrl.templateUrl"></div>',
    bindings: {
      jsonData: '<',
      subData: '<'
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

  function controller($scope, $element, $interval, config, util, json) {
    var self = this;

    //define self variables
    self.templateUrl = config.templateUrl.wordPlayer;
    self.mediasUrl = {};
    self.pageLang = {};
    self.showWordPlayer = false;
    self.word = '';

    // ser value for self variables
    self.pageLang.close = config.subject.close;
    self.pageLang.notSupportHtml5Audio = config.subject.notSupportHtml5Audio;

    self.$postLink = function () {
      var stop = $interval(function () {
        if (!audioElem) {
          audioElem = $element.find('audio')[0];
        } else {
          $interval.cancel(stop);
        }
      }, 10);
    };

    self.closePlayer = function () {
      //run before display to none.
      playWordSpans.stop();
      playingIndex = 0;

      audioElem.pause();
      self.showWordPlayer = false;
      self.word = '';
    };

    // define local variables
    var vowels = [];
    var audioElem = null;
    var seperateHeight = 20;
    var playWord = [];
    var wordAudios = {};
    var playWordSpans = [];
    var wordParentSpan = [];
    var playingIndex = 0;
    var gender = '';

    var playerEnded = function () {
      self.closePlayer();
      $scope.$digest();
    };

    var playWordAnimation = function (event, word) {
      $element.css('visibility', 'hidden');
      self.showWordPlayer = true;
      self.word = word.word;
      //broadcast after word rendring completed, so time must set largger than word rendring.
      var dd = $interval(function () {
        $scope.$broadcast(config.events.wordGetWordSpans);
        $interval.cancel(dd);
      }, 30);

    };

    var setWordAnimationElement = function (event, words) {
      gender = util.getRandomGender();
      playWord = words[0];
      playWordSpans = words[1];
      if (wordParentSpan.length == 0) {
        wordParentSpan = words[2];
      }
      if (vowels.length == 0) {
        vowels = words[3];
      }

      setWordAudios();
      $.each(wordAudios, function (key, val) {
        $.each(val, function (key1, val1) {
          preloadAudios(val1);
        });
      });

      setWordSeperate();
      wordAnimation();
    };

    function preloadAudios(url) {
      var audio = new Audio();
      // once this file loads, it will call loadedAudio()
      // the file will be kept by the browser as cache
      //audio.addEventListener('canplaythrough', loadedAudio, false);
      audio.src = url;
    }

    var setWordSeperate = function () {
      var parentWidth = wordParentSpan.css('width');
      parentWidth = util.getNumOfDim(parentWidth);

      var wordWidth = playWordSpans.css('height');
      wordWidth = util.getNumOfDim(wordWidth);

      var middleLeft = (parentWidth - wordWidth) / 2;

      $.each(playWordSpans, function (index, val) {
        $(val).css({
          'visibility': 'hidden',
          'position': 'absolute',
          'left': '0',
          'top': middleLeft + 'px'
        });
        if (index) {
          var preSpan = playWordSpans[index - 1];

          var top = $(preSpan).css('left');
          top = util.getNumOfDim(top);// + playWordSpans[index - 1].offsetHeight;

          var height = $(preSpan).css('width');
          height = util.getNumOfDim(height);
          top = parseInt(top) + parseInt(height) + seperateHeight;

          $(val).css('left', top);
        }
      });
    };

    var wordAnimation = function (outsideScope) {
      if (!self.showWordPlayer || (playingIndex == playWord.length)) {
        return;
      }
      $element.css('visibility', 'visible');

      var animationDone = false;
      var audioDone = false;

      var span = $(playWordSpans[playingIndex]);
      span.css({ 'visibility': 'visible', 'opacity': 0 });
      span.stop(true, true).animate({ "opacity": "+=1" }, 2000, function () {
        animationDone = true;
        nextAnimation();
      });

      audioElem.onended = function () {
        audioDone = true;
        nextAnimation();
      };
      self.mediasUrl.audios = wordAudios[playWord[playingIndex]]; 
      if (outsideScope) {
        $scope.$digest();
      }
      audioElem.load();
      audioElem.play();

      var nextAnimation = function () {
        if (animationDone && audioDone) {
          ++playingIndex;
          wordAnimation(true);
        }
      };
    };

    var setWordAudios = function () {
      wordAudios = {};
      $.each(playWord, function (index, val) {

        //if val is vowels
        var name = vowels[val.substr(1, 1) - 1];
        //if val is not vowels
        var f = val.substr(0, 1);
        if ($.inArray(f, vowels) == -1) {
          name = f + name;
        }

        var url = config.mediaUrl.alphaList;
        var audios = {
          mpeg: url + config.data.audios + '/' + f + '/' + name + gender + config.dataTypes.audios[1],
          ogg: url + config.data.audios + '/' + f + '/' + name + gender + config.dataTypes.audios[0]
        };
        wordAudios[val] = audios;
      });
    };

    // add listener and hold on to deregister function
    var deregister = [];
    deregister.push($scope.$on(config.events.playWordAnimation, playWordAnimation));
    deregister.push($scope.$on(config.events.setWordAnimationElement, setWordAnimationElement));
    //deregister.push($scope.$on(config.events.playIntroductionVideo, playIntroductionVideo));

    // clean up listener when directive's scope is destroyed
    $.each(deregister, function (i, val) {
      $scope.$on('$destroy', val);
    });
  };
})();
