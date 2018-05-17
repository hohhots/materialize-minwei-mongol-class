'use strict';

(function () {
  // Define the `header` module
  var app = angular.module('app.category');

  // Register `headerList` component, along with its associated controller and template
  app.component('appAlphalist', {
    template: '<div ng-include="$ctrl.templateUrl"></div>',
    bindings: {
      levelid: '<',
      classroomid: '<',
      subData: '<'
    },
    controller: ['$state', '$scope', '$element', '$http', 'Config', 'Util', 'Json', controller]
  });

  function controller($state, $scope, $element, $http, config, util, json) {
    var self = this;

    // variable for outside access 
    self.templateUrl = config.templateUrl.alphabetlist;
    self.introduction = config.alphaLangs.introduction;
    self.practice = config.alphaLangs.practice;
    self.lang = {
      back: config.alphaLangs.back
    };

    // alpha list data directory hash names array
    self.classes = util.getLevelsSubDirectoryHashNames(self.levelid);
    // classroom directory hash name
    self.dirHash = '';
    self.json = util.getClassroomJson(self.levelid, self.classroomid);

    self.$onInit = function () {
      util.setClasses(self);
    };

    self.alphaClick = function (originName, originDirName, alphaId, alphaName) {
      var dirName = originDirName.substr(0, 1);
      var names = {};
      var url = config.mediaUrl.alphaOrigin;
      var gender = util.getRandomGender();
      names.name = originName + '第' + alphaId + '字母';
      names.audios = {
        mpeg: url + config.data.audios + '/' + dirName + '/' + alphaName + gender + config.dataTypes.audios[1],
        ogg: url + config.data.audios + '/' + dirName + '/' + alphaName + gender + config.dataTypes.audios[0]
      };
      if ((originDirName == 'ga') && (alphaName == 'ge' || alphaName == 'gi' || alphaName == 'gu' || alphaName == 'gu2')) {
        originDirName = 'ha';
      }
      dirName = originDirName.substr(0, 1);
      names.videos = {
        webm: url + config.data.videos + '/' + dirName + '/' + util.convertVideoAlphaName(alphaName) + config.dataTypes.videos[1],
        ogv: url + config.data.videos + '/' + dirName + '/' + util.convertVideoAlphaName(alphaName) + config.dataTypes.videos[0]
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
      names.name = self.json.videoTitle;
      $scope.$broadcast(config.events.playIntroductionVideo, names);
    };

    self.practiceClick = function () {
      $state.go(config.uiState.listPractice.name, {levelid: self.levelid, classroomid: self.classroomid});
    };

    self.backClick = function () {
      $state.go(config.uiState.classRoom.name, {levelid: self.levelid, classroomid: self.classroomid});
    };

    // 'vowelName' format is like 'a' 'e' 'ji' 'go'
    // return 'a10' 'e10' 'j10' 'g40'
    self.getAlphaText = function (vowelName) {
      return util.convertAlphaNameToCode(vowelName);
    };

    self.setModels = function (classes, json) {
      self.classes = classes;
      self.dirHash = classes[self.classroomid - 1];
      self.json = json;

      var order = self.json.orderInList;
      self.alphabets = self.subData.slice(order - 1, order);
    };
  };

})();
