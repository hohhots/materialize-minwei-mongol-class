'use strict';

(function () {
  // Define the `header` module
  var app = angular.module('app.word');

  // Register `headerList` component, along with its associated controller and template
  app.component('monWord', {
    template: '<div ng-include="$ctrl.templateUrl"></div>',
    bindings: {
      orgintext: '@'
    },
    controller: [
      '$scope',
      '$sce',
      '$element',
      '$interval',
      'Config',
      'Util',
      'Json',
      controller]
  });

  function controller($scope, $sce, $element, $interval, config, util, json) {
    var self = this;

    //define self variables
    self.templateUrl = config.templateUrl.word;

    self.$postLink = function () {
      self.containerStyle.position = "absolute";
      self.containerStyle.width = parentElem.height();
      self.containerStyle.height = parentElem.width();

      setMonText(self.orgintext);
    };

    self.containerStyle = {};
    self.monText = '';

    var parentElemClass = ".wordbegin-word";
    var parentElem = $element.parents(parentElemClass);

    var tagsToReplace = {
      n31: '<i class="hawang-ni1"></i>',
      g23: '<i class="hawang-he3"></i>'
    };

    var setMonText = function (str) {
      str = str.replace(/n31/g, replaceTag);
      str = str.replace(/g23/g, replaceTag);
      self.monText = $sce.trustAsHtml(str);
    };

    function replaceTag(tag) {
      return tagsToReplace[tag] || tag;
    }

  };
})();