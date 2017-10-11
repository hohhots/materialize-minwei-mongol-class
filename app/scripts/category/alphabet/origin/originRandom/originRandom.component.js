'use strict';

(function () {
  // Define the `header` module
  var app = angular.module('app.category');

  // Register `headerList` component, along with its associated controller and template
  app.component('originRandom', {
    template: '<div ng-include="$ctrl.templateUrl"></div>',
    bindings: {
      jsondata: '<',
      subdata: '<'
    },
    controller: [
      '$scope',
      '$element',
      '$location',
      '$interval',
      'Config',
      'Util',
      'Json',
      controller]
  });

  function controller($scope, $element, $location, $interval, config, util, json) {
    var self = this;

    //define self variables
    self.templateUrl = config.templateUrl.originRandom;
    self.langs = {};
    self.langs.ok = config.alphaLangs.ok;
    self.langs.selectAlpha = config.alphaLangs.selectAlpha;
    self.showOriginRandom = true;
    self.jsonData = [];
    self.subData = [];
    self.randomAlphas = [];

    self.$onInit = function () {
      self.jsonData = self.jsondata;
      self.subData = self.subdata;
      setAlphasRandom(angular.copy(self.subdata));
    };

    self.okClick = function() {
      $scope.$emit(config.events.selectRandomAlphas, selectedAlphas);
      self.showOriginRandom = false;
    };

    var selectedAlphas = [];

    var setAlphasRandom = function(array) {
      var len = array.length;
      if(len == 0) {
        return;
      }
      var random = Math.floor(Math.random()*len);
      self.randomAlphas.push(array.splice(random,1)[0]);
      setAlphasRandom(angular.copy(array));
    };
  };
})();