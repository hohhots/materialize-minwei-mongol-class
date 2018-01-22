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
      'wordConfig',
      'Util',
      'Json',
      controller]
  });

  function controller($scope, $element, $interval, config, wordConfig, util, json) {
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
      var pare = $element.find('.w3-modal');
      pare.stop(true, true).fadeTo(500, 0, function () {
        //run before display to none.
        playWordSpans.stop();
        playingIndex = 0;

        audioElem.pause();
        self.showWordPlayer = false;
        self.word = '';

        $scope.$digest();

        pare.css('opacity', 1);
      });
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

    var animationDone = false;
    var audioDone = false;

    var animationDuration = 500;

    function playerEnded() {
      self.closePlayer();
      $scope.$digest();
    }

    function setAudioElem(word) {
      gender = util.getRandomGender();
      vowels = wordConfig.getVowels();

      setWordAudios(word);
      $.each(wordAudios, function (key, val) {
        $.each(val, function (key1, val1) {
          preloadAudios(val1);
        });
      });
    }

    function playWordAudios(event, word) {
      setAudioElem(word);
      playWordAudio();
    }

    function playWordAudio(outsideScope) {
      /**if (!self.showWordPlayer) {
        audioElem.pause();
        return;
      }**/
      if (playingIndex == playWord.length) {
        playWholeAudio();
        return;
      }

      audioDone = false;

      audioElem.onended = function () {
        audioDone = true;
        nextAnimation();
      };

      self.mediasUrl = { audios: wordAudios[playWord[playingIndex]] };
      if (outsideScope) {
        $scope.$digest();
      }

      audioElem.load();
      audioElem.play();
    }

    function playWholeAudio() {
      audioDone = false;

      audioElem.onended = function () {
        audioDone = true;
        setClosePlayer();
      };
      console.log(wordAudios);
      self.mediasUrl = { audios: wordAudios.word };
      $scope.$digest();

      audioElem.load();
      audioElem.play();
    }

    function setWordAudios(word) {
      wordAudios = [];

      playWord = setTextArray(word);

      var url = config.mediaUrl.alphaList;

      $.each(playWord, function (index, val) {

        //if val is vowels
        var name = vowels[val.substr(1, 1) - 1];
        //if val is not vowels
        var f = val.substr(0, 1);
        if ($.inArray(f, vowels) == -1) {
          name = f + name;
        }

        var audios = {
          mpeg: url + config.data.audios + '/' + f + '/' + name + gender + config.dataTypes.audios[1],
          ogg: url + config.data.audios + '/' + f + '/' + name + gender + config.dataTypes.audios[0]
        };
        wordAudios[val] = audios;
      });

      url = config.mediaUrl.wordBegin;
      var tword = playWord.join('');
      wordAudios.word = {
        mpeg: url + config.data.audios + '/' + tword + gender + config.dataTypes.audios[1],
        ogg: url + config.data.audios + '/' + tword + gender + config.dataTypes.audios[0]
      };

      function setTextArray(word) {
        var textArray = [];
        var len = word.length / 3;
        if (len == 0) { return; }
        for (var i = 0; i < len; i++) {
          var j = i * 3;
          textArray[i] = word.substring(j, j + 3);
        }
        return textArray;
      };
    };

    function playWordAnimation(event, word) {
      $element.css('visibility', 'hidden');
      self.showWordPlayer = true;
      self.word = word;
      //broadcast after word rendring completed, so time must set largger than word rendring.
      var dd = $interval(function () {
        $scope.$broadcast(config.events.wordGetWordSpans);
        $interval.cancel(dd);
      }, 30);
    }

    function setWordAnimationElement(event, words) {
      gender = util.getRandomGender();
      playWord = words[0];
      playWordSpans = words[1];
      if (wordParentSpan.length == 0) {
        wordParentSpan = words[2];
      }
      if (vowels.length == 0) {
        vowels = words[3];
      }

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

    function setWordSeperate() {
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
          top = util.getNumOfDim(top);

          var height = $(preSpan).css('width');
          height = util.getNumOfDim(height);
          top = parseInt(top) + parseInt(height) + seperateHeight;

          $(val).css('left', top);
        }
      });
    };

    function wordAnimation() {
      if (!self.showWordPlayer) {
        return;
      }
      if (playingIndex == playWord.length) {
        shrinkWord();
        return;
      }
      $element.css('visibility', 'visible');

      animationDone = false;

      var span = $(playWordSpans[playingIndex]);
      span.css({ 'visibility': 'visible', 'opacity': 0 });
      span.stop(true, true).animate({ "opacity": "+=1" }, animationDuration, function () {
        animationDone = true;
        nextAnimation();
      });

    };

    function nextAnimation() {
      if (animationDone && audioDone) {
        ++playingIndex;
        wordAnimation();
        playWordAudio(true);
      }
    };

    function shrinkWord() {
      animationDone = [];

      for (var i = 1; i < playWord.length; i++) {
        var span = $(playWordSpans[i]);
        span.stop(true, true).animate({ "left": "-=" + (seperateHeight * i) }, animationDuration, function () {
          animationDone.push(true);
          setClosePlayer();
        });
      }
    };

    function setClosePlayer() {
      if ((animationDone.length == (playWord.length - 1)) && audioDone) {
        self.closePlayer();
      }
    };

    // add listener and hold on to deregister function
    var deregister = [];
    deregister.push($scope.$on(config.events.playWordAnimation, playWordAudios));
    deregister.push($scope.$on(config.events.playWordAnimation, playWordAnimation));
    deregister.push($scope.$on(config.events.setWordAnimationElement, setWordAnimationElement));

    // clean up listener when directive's scope is destroyed
    $.each(deregister, function (i, val) {
      $scope.$on('$destroy', val);
    });
  };
})();
