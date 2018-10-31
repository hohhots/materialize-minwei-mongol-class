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
    self.alphaIdToSelect = self.langs.selectAlpha;
    self.showListRandom = false;
    self.jsonData = [];
    self.subData = [];
    self.randomAlphas = [];
    self.realAlphaClass = '';

    self.$onInit = function () {
      self.jsonData = self.jsondata;
      self.subData = self.subdata;
    };
    // 'name' format is like 'a' 'e' 'ji' 'go'
    // return 'a10' 'e10' 'j10' 'g40'
    self.getAlphaText = function(name) {
      //console.log(name);
      return util.convertOriginNameToCode(name);
    };

    self.exitPractice = function () {
      $scope.$broadcast(config.events.listHideRandomAlpha);
    };

    var fiveAlphaClass = 'alpha5-col s1';
    var fourAlphaClass = 'w3-col s3';
    var oneAlphaClass = 'w3-col s12';
    var randomValues = [];

    var init = function (tests) {
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
      var mapName = util.getAlphaMapName(array[random].name);
      if (randomValues.indexOf(mapName) === -1) {
        randomValues.push(mapName);
        self.randomAlphas.push(array.splice(random, 1)[0]);
      } else {
        array.splice(random, 1)[0];
      }
      setAlphasRandom(angular.copy(array));
    };

    var displayRandomAlpha = function (event, tests) {
      self.showListRandom = true;
      self.alphaIdToSelect = self.langs.selectAlpha + ' ' + tests.testAlpha.id;
      if (self.randomAlphas.length === 0) {
        init(tests);
      } else {
        var temp = self.randomAlphas;
        randomValues = [];
        self.randomAlphas = [];
        setAlphasRandom(temp);
      }
    };

    self.alphaClick = function (alpha) {
      $scope.$emit(config.events.listRandomAlphaSelected, alpha);
      $scope.$broadcast(config.events.listHideRandomAlpha);
    };

    var hideRandomAlpha = function () {
      self.showListRandom = false;
    };

    // add listener and hold on to deregister function
    var deregister = [];
    deregister.push($scope.$on(config.events.listDisplayRandomAlpha, displayRandomAlpha));
    deregister.push($scope.$on(config.events.listHideRandomAlpha, hideRandomAlpha));

    //deregister.push(videoElem.on('ended', videoEnded));
    // clean up listener when directive's scope is destroyed
    $.each(deregister, function (i, val) {
      $scope.$on('$destroy', val);
    });
  };
})();