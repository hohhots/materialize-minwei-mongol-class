'use strict';

(function () {
  // Define the `header` module
  var app = angular.module('app.category');

  // Register `headerList` component, along with its associated controller and template
  app.component('appAlphaorigin', {
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
    self.templateUrl = config.templateUrl.alphabetorigin;

    // ser value for self variables
    self.alphaClicked = function(name) {
      var names = {};
      var url = config.mediaUrl.alphaOrigin;
      names.audios = {
        ogg: url + config.data.audios + '/' + name + util.getRandomGender() + config.dataTypes.audios[0],
        mpeg: url + config.data.audios + '/' + name + util.getRandomGender() + config.dataTypes.audios[1]
      };
      names.videos = {
        ogv: url + config.data.videos + '/' + name + config.dataTypes.videos[0],
        webm: url + config.data.videos + '/' + name + config.dataTypes.videos[1]
      };
      $scope.$broadcast(config.events.playAlphaVideo, names);
    };

  };

})();
