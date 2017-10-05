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
      '$http',
      'Config',
      'Util',
      'Json',
      controller]
  });

  function controller($scope, $element, $interval, $http, config, util, json) {
    var self = this;

    //define self variables
    self.templateUrl = config.templateUrl.alphaOriginFilter;

    self.showAlphaOriginFilter = true;
    self.selectOriginAlpha = config.alphaLangs.selectOriginAlpha;
    self.subData = [];

    var httpData = function (name) {
      $http.get(config.dataPath[name].data, { cache: true })
        .then(function (resp) { self.subData = resp.data;console.log(self.subData); });
    };

    httpData('alphabetorigin');

    
  };
})();
