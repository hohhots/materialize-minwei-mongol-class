'use strict';

(function () {
  var app = angular.module('app.filter');

  app.component('appAlphaoriginfilter', {
    template: '<div ng-include="$ctrl.templateUrl"></div>',
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

    self.showAlphaOriginFilter = false;
    self.selectOriginAlpha = config.alphaLangs.selectOriginAlpha;
    self.subData = [];
    self.selectAll = config.alphaLangs.selectAll;
    self.ok = config.alphaLangs.ok;

    self.selectAllClick = function () {
      var len = selectedAlphaIds.length;
      if (len == self.subData.length) {
        selectedAlphaIds = [];
        return;
      }
      selectedAlphaIds = [];
      $.each(self.subData, function (key, value) {
        selectedAlphaIds.push(value.id);
      });
    };

    self.okClick = function () {
      $scope.$emit(config.events.filtAlphaVariants, selectedAlphaIds);
      self.showAlphaOriginFilter = false;
    };

    self.alphaClick = function (alphaId) {
      var index = selectedAlphaIds.indexOf(alphaId);
      if (index > -1) {
        selectedAlphaIds.splice(index, 1);
      } else {
        selectedAlphaIds.push(alphaId);
      }
    };

    self.ifAlphaSelected = function (type, alphaId) {
      var index = selectedAlphaIds.indexOf(alphaId);
      if (index > -1) {
        if (type == config.type.css) {
          return 'alphabetorigin-selected';
        }
      }
    };

    var selectedAlphaIds = [];

    var displayAlphaFilter = function() {
      self.showAlphaOriginFilter = true;
    };

    var init = function () {

    };

    var httpData = function (name) {
      $http.get(config.dataPath[name].data, { cache: true })
        .then(function (resp) {
          self.subData = resp.data;
          init();
        });
    };

    httpData('alphabetorigin');


    // add listener and hold on to deregister function
    var deregister = [];
    deregister.push($scope.$on(config.events.displayAlphaFilter, displayAlphaFilter));

    //deregister.push(videoElem.on('ended', videoEnded));
    // clean up listener when directive's scope is destroyed
    $.each(deregister, function (i, val) {
      $scope.$on('$destroy', val);
    });
  };
})();
