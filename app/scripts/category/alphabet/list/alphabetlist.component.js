'use strict';

(function () {
  // Define the `header` module
  var app = angular.module('app.category');

  // Register `headerList` component, along with its associated controller and template
  app.component('appAlphalist', {
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
    self.templateUrl = config.templateUrl.alphabetlist;
    self.introduction = config.alphaLangs.introduction;
    self.practice = config.alphaLangs.practice;

    self.alphaClick = function (originName, originDirName, alphaId, alphaName) {
      var names = {}; console.log();
      var url = config.mediaUrl.alphaOrigin;
      var gender = util.getRandomGender();
      names.name = originName + '第' + alphaId + '字母';
      names.audios = {
        mpeg: url + config.data.audios + '/' + originDirName + '/' + alphaName + gender + config.dataTypes.audios[1],
        ogg: url + config.data.audios + '/' + originDirName + '/' + alphaName + gender + config.dataTypes.audios[0]
      };
      if ((originDirName == 'ga') && (alphaName == 'ge' || alphaName == 'gi')) {
        originDirName = 'ha';
      }
      names.videos = {
        webm: url + config.data.videos + '/' + originDirName + '/' + util.convertVideoAlphaName(alphaName) + config.dataTypes.videos[1],
        ogv: url + config.data.videos + '/' + originDirName + '/' + util.convertVideoAlphaName(alphaName) + config.dataTypes.videos[0]
      };
      $scope.$broadcast(config.events.playAlphaVideo, names);
    };

    self.introductionClick = function () {
      var names = {};
      var url = config.mediaUrl.alphaOrigin;
      names.videos = {
        ogv: url + config.data.videos + '/list' + config.dataTypes.videos[0],
        webm: url + config.data.videos + '/list' + config.dataTypes.videos[1]
      };
      names.name = self.jsonData[0].name;
      $scope.$broadcast(config.events.playIntroductionVideo, names);
    };

    self.practiceClick = function () {
      util.changePath(config.pagesUrl.listPractice);
    };
  };

})();
