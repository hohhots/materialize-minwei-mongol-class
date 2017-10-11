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
    self.langs.clear = config.alphaLangs.clear;
    self.langs.ok = config.alphaLangs.ok;
    self.langs.selectAlpha = config.alphaLangs.selectAlpha;
    self.showOriginRandom = false;
    self.jsonData = [];
    self.subData = [];
    self.randomAlphas = [];

    self.$onInit = function () {
      self.jsonData = self.jsondata;
      self.subData = self.subdata;
      setAlphasRandom(angular.copy(self.subdata));
    };

    self.clearClick = function() {
      selectedAlphas = [];
    };

    self.okClick = function () {
      $scope.$emit(config.events.selectRandomAlphas, selectedAlphas);
      self.showOriginRandom = false;
    };

    self.alphaClick = function (alpha) {
      var i = self.getSelectedOrder(alpha.id);
      if (i != 0) {
        removeSelectedAlpha(i);
        return;
      }
      if(selectedAlphas.length == 4) {
        return;
      }
      selectedAlphas.push(alpha);
    };

    self.getSelectedOrder = function (alphaId) {
      var a = 0;
      $.each(selectedAlphas, function (i, v) {
        if (alphaId == v.id) {
          a = (i + 1);
        }
      });
      return a;
    };

    self.getAlphaCss = function (alphaId) {
      if (self.getSelectedOrder(alphaId) != 0) {
        return 'originrandom-num';
      }
      return 'originrandom-num-zero';
    };

    self.ifAlphaSelected = function (type, alphaId) {
      var index = self.getSelectedOrder(alphaId);
      if (index > 0) {
        if (type == config.type.css) {
          return 'originrandom-selected';
        }
      }
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

    var displayOriginRandom = function () {
      self.showOriginRandom = true;
    };

    var removeSelectedAlpha = function(selectedOrder) {
      var i = selectedOrder - 1;
      selectedAlphas.splice(i,1);
    };

    // add listener and hold on to deregister function
    var deregister = [];
    deregister.push($scope.$on(config.events.displayOriginRandom, displayOriginRandom));

    //deregister.push(videoElem.on('ended', videoEnded));
    // clean up listener when directive's scope is destroyed
    $.each(deregister, function (i, val) {
      $scope.$on('$destroy', val);
    });
  };
})();