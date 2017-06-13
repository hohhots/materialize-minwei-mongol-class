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
        path = util.getUrlPath().substring(1),
        categoryPath = path.substring(0,path.indexOf('/')),
        subjectPath = path.substring(path.indexOf('/') + 1),
        rootPath = config.json.rootPath;

    var init = function() {
      self.category = json.getCategory(categoryPath);
      self.subject = json.getSubject(self.category.id, subjectPath);
      self.tasks = json.getSubjectTasks(self.category, self.subject);
console.log(self.tasks);
    };

    self.getCategoryUrl = function() {
      return util.convertUrl(categoryPath);
    };

    self.jsons = json;
    self.pageLang = {},
    self.category = {};
    self.subject = {};
    self.tasks = {};

    self.pageLang.targetProgress = config.subject.targetProgress;
    self.pageLang.progress = config.subject.progress;

    $scope.$watch(function(){return self.jsons;}, init, true);
  }

})(jQuery, window.angular)
