'use strict';

(function () {
  // Define the `header` module
  var app = angular.module('app.category');

  // Register `headerList` component, along with its associated controller and template
  app.component('appAlphaorigin', {
    template: '<div ng-include="$ctrl.templateUrl"></div>',
    bindings: {
      levelid: '<',
      classroomid: '<',
      jsonData: '<',
      subData: '<'
    },
    controller: ['$scope', '$element', 'Config', 'Util', 'Json', controller]
  });

  function controller($scope, $element, config, util, json) {
    var self = this;

    //define self variables
    self.templateUrl = config.templateUrl.alphabetorigin;
    self.introduction = config.alphaLangs.introduction;
    self.practice = config.alphaLangs.practice;

    // ser value for self variables
    self.alphaClick = function (id, name) {
      var dirName = name.substr(0,1);
      var names = {};
      var url = config.mediaUrl.alphaOrigin;
      var gender = util.getRandomGender();
      names.name = self.subData[id - 1].name;
      names.audios = {
        mpeg: url + config.data.audios + '/' + dirName + '/' + name + gender + config.dataTypes.audios[1],
        ogg: url + config.data.audios + '/' + dirName + '/' + name + gender + config.dataTypes.audios[0]
      };
      names.videos = {
        webm: url + config.data.videos + '/' + dirName + '/' + name + config.dataTypes.videos[1],
        ogv: url + config.data.videos + '/' + dirName + '/' + name + config.dataTypes.videos[0]
      };
      $scope.$broadcast(config.events.playAlphaVideo, names);
    };

    self.introductionClick = function () {
      var names = {};
      var url = config.mediaUrl.alphaOrigin;
      names.videos = {
        ogv: url + config.data.videos + '/origin' + config.dataTypes.videos[0],
        webm: url + config.data.videos + '/origin' + config.dataTypes.videos[1]
      };
      names.name = self.jsonData[0].name;
      $scope.$broadcast(config.events.playIntroductionVideo, names);
    };

    self.practiceClick = function () {
      util.changePath(config.pagesUrl.originPractice);
    };
  };

})();
