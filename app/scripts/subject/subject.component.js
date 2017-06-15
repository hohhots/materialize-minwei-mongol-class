'use strict';

(function($, angular) {
  // Define the `header` module
  angular.module('subject', ['core.config']);

  // Register `headerList` component, along with its associated controller and template
  angular
    .module('subject')
    .component('appSubject', {
      template: '<div ng-include="$ctrl.templateUrl"></div>',
      controller: [
        '$scope',
        '$http',
        '$templateCache',
        '$element',
        'Config',
        'Util',
        'Json',
        controller]
    });

  function controller($scope, $http, $templateCache, $element, config, util, json) {

    var self = this,
        path = util.getUrlPath().substring(1),
        categoryPath = path.substring(0,path.indexOf('/')),
        subjectPath = path.substring(path.indexOf('/') + 1),
        rootPath = config.json.rootPath;

    var init = function() {
      self.category = json.getCategory(categoryPath);
      self.subject = json.getSubject(self.category.id, subjectPath);
      self.tasksCategory = json.getSubjectTasks(self.category, self.subject);
      self.tasks = json.getTasks(self.category.id, self.subject.id);
      //console.log(self.tasks);
    };

    var loadComponentFiles =function(subject, task) {
      //var elem = $element.find("#subjectTaskContainer");
      //elem.html("dffd");
      console.log(self.category.dirName + "/" + self.subject.dirName + "/" + config.json.tasksDir + "/" + subject.dirName + "/" + task.dirName);

    //  console.log(self.category);
      //console.log(self.subject);
      //console.log(self.tasks);
      //$http().then(function (result) {
      //  $templateCache.put('task-tpl', '<br>');//result);
      //});
    };

    self.getCategoryUrl = function() {
      return util.convertUrl(categoryPath);
    };

    self.tasksClick = function(event, subject, task) {
      $('html, body').animate({ scrollTop: 0 }, 'fast');

      self.dropBackStyle.display = "block";
      self.displayTaskStyle.display = "block";

      loadComponentFiles(subject, task);


      //subjectTaskContainer
    };

    self.templateUrl = config.templateUrl.subject;

    self.tasksClose = function() {
      self.dropBackStyle.display = "none";
      self.displayTaskStyle.display = "none";
    };

    self.jsons = json;
    self.pageLang = {},
    self.category = {};
    self.subject = {};
    self.tasksCategory = {};
    self.tasks = {};
    self.dropBackStyle = {display: "none"};
    self.displayTaskStyle = {display: "none"};

    self.pageLang.targetProgress = config.subject.targetProgress;
    self.pageLang.progress = config.subject.progress;
    self.pageLang.practice = config.subject.practice;
    self.pageLang.close = config.subject.close;

    self.taskMouseEnter = function(event) {
      $(event.currentTarget).css({"background-color": "#eee"});
    };

    self.taskMouseLeave = function(event) {
      $(event.currentTarget).css({"background-color": "#fff"});
    };

    $scope.$watch(function(){return self.jsons;}, init, true);
  }

})(jQuery, window.angular)
