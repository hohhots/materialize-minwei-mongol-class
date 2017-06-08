'use strict';

(function($, angular) {
  // Define the `header` module
  angular.module('subject', []);

  // Register `headerList` component, along with its associated controller and template
  angular
    .module('subject')
    .component('appSubject', {
      templateUrl: 'scripts/subject/subject.template.html',
      controller: [
        '$scope',
        '$element',
        'Config',
        'Util',
        'Json',
        controller]
    });

  function template() {
    return 'scripts/subject/subject.template.html';
  }

  function controller($scope, $element, config, util, json) {

    var self = this,
        beginStickyElemId = "categoryBeginSticky",
        elem = $element.find("#" + beginStickyElemId),
        path = util.getUrlPath().substring(1),
        rootPath = config.json.rootPath;
console.log(path);
    var init = function() {
      //self.category = json.getCategory(path);

    };

    self.jsons = json;
    self.category = {};
    self.subjects = {};
    self.subjectsStyle = {};
    self.classes = {};
    self.classesStyle = {};
    self.ListItemLinkStyle = {};
    self.subjectItemStyle = {};
    self.headerStickyHide = true;

    $scope.$watch(function(){return self.jsons;}, init, true);
  }

})(jQuery, window.angular)
