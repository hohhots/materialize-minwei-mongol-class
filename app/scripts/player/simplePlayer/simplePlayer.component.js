'use strict';

(function () {
  // Define the `header` module
  var app = angular.module('app.player');

  // Register `headerList` component, along with its associated controller and template
  app.component('appSimpleplayer', {
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
    self.templateUrl = config.templateUrl.simplePlayer;
    self.mediasUrl = {};
    self.pageLang = {};
    self.showPlayer = false;

    // ser value for self variables
    self.pageLang.close = config.subject.close;
    self.pageLang.notSupportHtml5Audio = config.subject.notSupportHtml5Audio;
    self.pageLang.notSupportHtml5Video = config.subject.notSupportHtml5Video;

    self.closePlayer = function() {
      self.showPlayer = false;
      videoElem.pause();
    };
 
    self.$postLink = function() {
      var stop = $interval(function() {
        if (!videoElem) {
          videoElem = $element.find('video')[0];
        } else {
          $interval.cancel(stop);
        }
      }, 10);
    };

    // define local variables
    var videoElem = null;

    var playAlphaVideo = function (event, mediasUrl) {
      self.showPlayer = true;
      self.mediasUrl = mediasUrl;

      videoElem.load();
      videoElem.play();

    };

    // add listener and hold on to deregister function
    var deregister = [];
    deregister.push($scope.$on(config.events.playAlphaVideo, playAlphaVideo));
    // clean up listener when directive's scope is destroyed
    $.each(deregister, function (i, val) {
      $scope.$on('$destroy', val);
    });
  };
})();
