'use strict';

(function () {
  // Define the `header` module
  var app = angular.module('app.category');

  // Register `headerList` component, along with its associated controller and template
  app.component('appAlphavariant', {
    template: '<div ng-include="$ctrl.templateUrl"></div>',
    bindings: {
      jsonData: '<',
      subData: '<'
    },
    controller: ['$scope', '$element', 'Config', 'Util', 'Json', controller]
  });

  function controller($scope, $element, config, util, json) {
    var self = this;

    // variable for outside access
    self.data = [];
    self.introduction = config.alphaLangs.introduction;
    self.templateUrl = config.templateUrl.alphabetvariant;
    self.alphaFilter = config.alphaLangs.filter;

    self.$onInit = function () {
      self.data = self.subData;
    };

    self.alphaFilterClick = function () {
      $scope.$broadcast(config.events.displayAlphaFilter);
    };

    self.introductionClicked = function () {
      var names = {};
      var url = config.mediaUrl.alphaOrigin;
      names.videos = {
        ogv: url + config.data.videos + '/variant' + config.dataTypes.videos[0],
        webm: url + config.data.videos + '/variant' + config.dataTypes.videos[1]
      };
      names.name = self.jsonData[0].name;
      $scope.$broadcast(config.events.playIntroductionVideo, names);
    };

    var filtAlphaVariants = function (event, alphaIds) {
      if (alphaIds.length == 0) {
        self.$onInit();
        return;
      }
      var td = angular.copy(self.subData);
      td = td.filter(function (alpha) {
        return alphaIds.indexOf(alpha.id) > -1;
      });
      self.data = td;
    };

    // add listener and hold on to deregister function
    var deregister = [];
    deregister.push($scope.$on(config.events.filtAlphaVariants, filtAlphaVariants));

    //deregister.push(videoElem.on('ended', videoEnded));
    // clean up listener when directive's scope is destroyed
    $.each(deregister, function (i, val) {
      $scope.$on('$destroy', val);
    });
  };

})();
