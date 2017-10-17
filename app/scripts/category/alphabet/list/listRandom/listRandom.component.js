'use strict';

(function () {
  // Define the `header` module
  var app = angular.module('app.category');

  // Register `headerList` component, along with its associated controller and template
  app.component('listRandom', {
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
    self.templateUrl = config.templateUrl.listRandom;
    self.langs = {};
    self.langs.selectAlpha = config.alphaLangs.selectAlpha;
    self.showListRandom = false;
    self.jsonData = [];
    self.subData = [];
    self.randomAlphas = [];

    self.$onInit = function () {
      self.jsonData = self.jsondata;
      self.subData = self.subdata;
      setAlphasRandom(angular.copy(self.subdata));
    };

    var selectedAlphas = [];

    var setAlphasRandom = function (array) {
      var len = array.length;
      if (len == 0) {
        return;
      }
      var random = Math.floor(Math.random() * len);
      self.randomAlphas.push(array.splice(random, 1)[0]);
      setAlphasRandom(angular.copy(array));
    };

    var displayListRandom = function () {
      self.showListRandom = true;
    };

    // add listener and hold on to deregister function
    var deregister = [];
    deregister.push($scope.$on(config.events.displayListRandom, displayListRandom));

    //deregister.push(videoElem.on('ended', videoEnded));
    // clean up listener when directive's scope is destroyed
    $.each(deregister, function (i, val) {
      $scope.$on('$destroy', val);
    });
  };
})();