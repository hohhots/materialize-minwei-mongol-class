'use strict';

(function () {
  // Define the `header` module
  var app = angular.module('app.category');

  // Register `headerList` component, along with its associated controller and template
  app.component('appWordbegin', {
    template: '<div ng-include="$ctrl.templateUrl"></div>',
    bindings: {
      jsonData: '<',
      subData: '<'
    },
    controller: ['$scope', '$element', '$interval', 'Config', 'Util', 'Json', controller]
  });

  function controller($scope, $element, $interval, config, util, json) {
    var self = this;

    // variable for outside access 
    self.templateUrl = config.templateUrl.wordBegin;
    self.introduction = config.alphaLangs.introduction;
    self.translate = config.alphaLangs.translate;
    self.practice = config.alphaLangs.practice;
    self.hideMean = false;
    self.wordbeginView = {};
    self.wordbeginView.styles = {};

    self.translateClick = function () {
      self.hideMean = !self.hideMean;
      if (self.wordbeginView.styles.width == (viewWidth + widthUnit)) {
        self.wordbeginView.styles.width = viewWidth / 2 + widthUnit;
      } else {
        self.wordbeginView.styles.width = viewWidth + widthUnit;
      }
    };

    self.alphaClick = function (word) {
      console.log(word);
    };

    var viewWidth = 72;
    var widthUnit = 'px';

    var init = function () {
      self.wordbeginView.styles.width = viewWidth + widthUnit;
    };

    init();
  };
})();
