'use strict';

(function () {
  // Define the `header` module
  var app = angular.module('app.word');

  // Register `headerList` component, along with its associated controller and template
  app.component('monWord', {
    template: '<div ng-include="$ctrl.templateUrl" class="word-outerContainer"></div>',
    bindings: {
      origintext: '@'
    },
    controller: [
      '$scope',
      '$sce',
      '$element',
      '$interval',
      'wordConfig',
      'Util',
      'Json',
      controller]
  });

  function controller($scope, $sce, $element, $interval, config, util, json) {
    var self = this;

    //define self variables
    self.templateUrl = config.template;
    self.monText = '';
    self.containerStyle = {};

    self.$onChanges = function (changes) {
      setDimension();
      if (changes['origintext']) {
        self.monText = $sce.trustAsHtml(config.setMonWord(self.origintext));
      }
    };

    var parentElem;

    var setDimension = function () {
      var dd = $interval(function () {
        if (!parentElem) {
          parentElem = $element.find('.word-outerContainer');
        }

        var ow = parentElem[0].offsetWidth;
        var oh = parentElem[0].offsetHeight;

        self.containerStyle.position = "absolute";
        self.containerStyle.width = oh + 'px';
        self.containerStyle.height = ow + 'px';

        $interval.cancel(dd);
      }, 20);
    };

  };
})();