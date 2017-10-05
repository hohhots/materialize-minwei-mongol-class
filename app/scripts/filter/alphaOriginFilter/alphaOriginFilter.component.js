'use strict';

(function () {
  var app = angular.module('app.filter');

  app.component('appAlphaoriginfilter', {
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
    self.templateUrl = config.templateUrl.alphaOriginFilter;
   
    self.showAlphaOriginFilter = true;
  };
})();
