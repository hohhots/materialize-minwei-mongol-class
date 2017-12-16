'use strict';

(function () {
  // Define the `header` module
  var app = angular.module('app.word');

  // Register `headerList` component, along with its associated controller and template
  app.component('mwordInput', {
    template: '<div ng-include="$ctrl.templateUrl" class="word-outerContainer"></div>',
    bindings: {
      origintext: '@'
    },
    controller: [
      '$scope',
      '$sce',
      '$element',
      '$interval',
      'Config',
      'wordConfig',
      'Util',
      'Json',
      controller]
  });

  function controller($scope, $sce, $element, $interval, config, wordConfig, util, json) {
    var self = this;

    //define self variables
    self.templateUrl = config.templateUrl.mwordInput;
    self.showElement = false;
    self.containerStyle = {};
    self.inputStyle = {};

    var parentElem;
    var inputElem;

    function setDimension () {
      self.showElement = true;

      var dd = $interval(function () {
        if (!parentElem || !inputElem) {
          parentElem = $element.parent();
          inputElem = $element.find('input');
        }

        var ow = parentElem[0].clientWidth;
        var oh = parentElem[0].clientHeight;

        //self.containerStyle.position = "absolute";
        self.containerStyle.width = oh + 'px';
        self.containerStyle.height = ow + 'px';

        self.inputStyle.fontSize = (ow - 4) + 'px';
        self.inputStyle.lineHeight = ow + 'px';

        self.inputStyle.position = "absolute";
        self.inputStyle.top = inputElem[0].offsetParent.offsetTop;
        self.inputStyle.left = inputElem[0].offsetParent.offsetLeft;

        $interval.cancel(dd);

      }, 20);
    };

    // add listener and hold on to deregister function
    var deregister = [];
    deregister.push($scope.$on(config.events.setDimension, setDimension));
    //deregister.push($scope.$on(config.events.setDimension, getWordSpan));

    // clean up listener when directive's scope is destroyed
    $.each(deregister, function (i, val) {
      $scope.$on('$destroy', val);
    });
  };
})();