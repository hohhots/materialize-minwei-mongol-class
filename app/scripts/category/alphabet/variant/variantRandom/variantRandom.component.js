'use strict';

(function () {
  // Define the `header` module
  var app = angular.module('app.category');

  // Register `headerList` component, along with its associated controller and template
  app.component('variantRandom', {
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
    self.templateUrl = config.templateUrl.variantRandom;
    self.langs = {};
    self.langs.selectAlpha = config.alphaLangs.selectAlpha;
    self.alphaIdToSelect = self.langs.selectAlpha;
    self.showVariantRandom = false;
    self.jsonData = [];
    self.subData = [];
    self.randomAlphas = [];
    self.realAlphaClass = '';

    self.$onInit = function () {
      self.jsonData = self.jsondata;
      self.subData = self.subdata;
    };

    self.exitPractice = function () {
      $scope.$broadcast(config.events.variantHideRandomAlpha);
    };

    self.getAlphaClass = function (alpha) {console.log(variantPosition);
      return 'origin-' + alpha.name + '-' + variantPosition;
    };

    var fiveAlphaClass = 'alpha5-col s4 m3 l1';
    var fourAlphaClass = 'w3-col s4 m3 l3';
    var oneAlphaClass = 'w3-col s12 m12 l12';
    var variantPosition = 0;

    var init = function (tests) {
      variantPosition = tests.variantPosition;
      setAlphasRandom(angular.copy(tests.testOrigin.vowel));
      self.realAlphaClass = fiveAlphaClass;
      if (self.randomAlphas.length == 4) {
        self.realAlphaClass = fourAlphaClass;
      }
      if (self.randomAlphas.length == 1) {
        self.realAlphaClass = oneAlphaClass;
      }
    };

    var setAlphasRandom = function (array) {
      var len = array.length;
      if (len == 0) {
        return;
      }
      var random = Math.floor(Math.random() * len);
      if (array[random].name == util.convertAlphaName(array[random].name)) {
        self.randomAlphas.push(array.splice(random, 1)[0]);
      } else {
        array.splice(random, 1)[0];
      }
      setAlphasRandom(angular.copy(array));
    };

    var displayRandomAlpha = function (event, tests) {
      self.showVariantRandom = true;
      self.alphaIdToSelect = self.langs.selectAlpha + ' ' + tests.testAlpha.id;
      if (self.randomAlphas.length == 0) {
        init(tests);
      } else {
        var temp = self.randomAlphas;
        self.randomAlphas = [];
        setAlphasRandom(temp);
      }
    };

    var hideRandomAlpha = function () {

    };

    // add listener and hold on to deregister function
    var deregister = [];
    deregister.push($scope.$on(config.events.variantDisplayRandomAlpha, displayRandomAlpha));
    deregister.push($scope.$on(config.events.variantHideRandomAlpha, hideRandomAlpha));

    //deregister.push(videoElem.on('ended', videoEnded));
    // clean up listener when directive's scope is destroyed
    $.each(deregister, function (i, val) {
      $scope.$on('$destroy', val);
    });
  };
})();