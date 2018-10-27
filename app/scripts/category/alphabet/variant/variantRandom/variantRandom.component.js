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

    self.alphaClick = function (alpha) {
      $scope.$emit(config.events.variantRandomAlphaSelected, alpha);
      $scope.$broadcast(config.events.variantHideRandomAlpha);
    };

    self.exitPractice = function () {
      $scope.$broadcast(config.events.variantHideRandomAlpha);
    };

    var oneAlphaClass = 'w3-col s12';
    var twoAlphaClass = 'w3-col s6';
    var threeAlphaClass = 'w3-col s4';
    var fourAlphaClass = 'w3-col s3';
    var fiveAlphaClass = 'alpha5-col s1';

    function init(tests) {
      setAlphasRandom(tests);
      self.realAlphaClass = fiveAlphaClass;
      switch (self.randomAlphas.length) {
        case 1:
          self.realAlphaClass = oneAlphaClass;
          break;
        case 2:
          self.realAlphaClass = twoAlphaClass;
          break;
        case 3:
          self.realAlphaClass = threeAlphaClass;
          break;
        case 4:
          self.realAlphaClass = fourAlphaClass;
          break;
        case 5:
          self.realAlphaClass = fiveAlphaClass;
          break;
        default:
      }
    }

    function setAlphasRandom(tests) {
      var len = tests.length;
      if (len === 0) {
        return;
      }
      var random = Math.floor(Math.random() * len);
      if (self.randomAlphas.indexOf(tests[random]) === -1) {
        self.randomAlphas.push(tests.splice(random, 1)[0]);
      }

      setAlphasRandom(angular.copy(tests));
    }

    function displayRandomAlpha(event, tests) {
      // Display as title
      self.alphaIdToSelect = self.langs.selectAlpha;
      if (self.randomAlphas.length == 0) {
        init(tests);
      } else {
        var temp = self.randomAlphas;
        self.randomAlphas = [];
        setAlphasRandom(temp);
      }
      self.showVariantRandom = true;
    }

    function hideRandomAlpha() {
      self.showVariantRandom = false;
    }

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