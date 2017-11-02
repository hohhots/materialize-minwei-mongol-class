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
      n31: '<span class="hawang-ni1"></span>',
      g23: '<span class="hawang-he3"></span>',
      m41: '<span class="hawang-mo1"></span>',
      d43: '<span class="hawang-to3"></span>',
      a21: '<span class="hawang-e1"></span>',
      b22: '<span class="hawang-ba2"></span>',
      s43: '<span class="hawang-so3"></span>',
    };

    var setMonText = function (str) {
      str = str.replace(/n31/g, replaceTag);
      str = str.replace(/g23/g, replaceTag);
      str = str.replace(/m41/g, replaceTag);
      str = str.replace(/d43/g, replaceTag);
      str = str.replace(/a21/g, replaceTag);
      str = str.replace(/b22/g, replaceTag);
      str = str.replace(/s43/g, replaceTag);
      self.monText = $sce.trustAsHtml(str);
    };

    function replaceTag(tag) {
      return tagsToReplace[tag] || tag;
    }

  };
})();