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
      audioElem.pause();
      self.showWordPlayer = false;
    };

    // define local variables
    var audioElem = null;

    var playerEnded = function () {
      self.showPlayer = false;
      $scope.$digest();
    };

    var playWordAnimation = function (event, word) {
      self.showWordPlayer = true;
      self.word = word.word;
      //self.mediasUrl = mediasUrl;
      //console.log(self.word);
      //audioElem.load();
      //audioElem.play();
    };

    // add listener and hold on to deregister function
    var deregister = [];
    deregister.push($scope.$on(config.events.playWordAnimation, playWordAnimation));
    //deregister.push($scope.$on(config.events.playIntroductionVideo, playIntroductionVideo));

    // clean up listener when directive's scope is destroyed
    $.each(deregister, function (i, val) {
      $scope.$on('$destroy', val);
    });
  };
})();
