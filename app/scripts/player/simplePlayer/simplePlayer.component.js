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
      'Config',
      'Util',
      'Json',
      controller]
  });

  function controller($scope, $element, config, util, json) {
    var self = this;

    //define self variables
    self.templateUrl = config.templateUrl.simplePlayer;
    self.pageLang = {};

    // ser value for self variables
    self.pageLang.close = config.subject.close;
    self.pageLang.notSupportHtml5Audio = config.subject.notSupportHtml5Audio;
    self.pageLang.notSupportHtml5Video = config.subject.notSupportHtml5Video;

    var playAlphaVideo = function(event, videoUrl) {
      
    };

    // add listener and hold on to deregister function
    var deregister = [];
    deregister.push($scope.$on(config.events.playAlphaVideo, playAlphaVideo));

    // clean up listener when directive's scope is destroyed
    $.each(deregister, function(i, val){
      $scope.$on('$destroy', val);
    });

  };

})();
