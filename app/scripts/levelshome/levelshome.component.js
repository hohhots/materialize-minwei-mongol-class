'use strict';

(function ($) {
  // Define the `header` module
  var app = angular.module('app.home');

  // Register `headerList` component, along with its associated controller and template
  app.component('levelsHome', {
    template: '<div ng-include="$ctrl.templateUrl"></div>',
    bindings: {
      introductionData: '<',
      levelsData: '<'
    },
    controller: [
      '$scope',
      '$sce',
      'Config',
      'Util',
      Controller]
  });

  function Controller($scope, $sce, config, util) {
    var self = this;

    self.templateUrl = config.templateUrl.levelshome;

    self.appDetailShow = false;
    self.monDetailShow = false;

    self.langs = {};

    self.$onInit = function () {
      self.langs.suixin = self.introductionData[0];
      self.langs.mongol = self.introductionData[1];
      
      $('body').css('background', '#3f3f3f');
    };

    self.showAppDetail = function () {
      self.appDetailShow = !self.appDetailShow;
    };

    self.showMonDetail = function () {
      self.monDetailShow = !self.monDetailShow;
    };

    var background = $('body').css('background');

    var restoreBackground = function () {
      $('body').css('background', background);
    };

    $scope.$on('$destroy', restoreBackground);
  }

})(jQuery);
