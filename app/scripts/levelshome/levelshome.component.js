'use strict';

(function ($) {
  // Define the `header` module
  var app = angular.module('app.home');

  // Register `headerList` component, along with its associated controller and template
  app.component('levelsHome', {
    template: '<div ng-include="$ctrl.templateUrl"></div>',
    bindings: {
      jsonData: '<',
      subData: '<'
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

    self.templateUrl = config.templateUrl.levelsHome;

    self.appDetailShow = false;
    self.monDetailShow = false;

    self.langs = {};

    self.$onInit = function () {
      self.langs.suixin = self.jsonData[0];
      self.langs.mongol = self.jsonData[1];
      self.suixinFullText = self.langs.suixin.description + self.langs.suixin.text;
      self.monFullText = self.langs.mongol.description + self.langs.mongol.text;      

      util.setCurrentBackgroundColor();
      
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

    $scope.$on('$destroy', util.restoreBackgroundColor);
  }

})(jQuery);
