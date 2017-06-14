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
        '$http',
        '$templateCache',
        '$element',
        'Config',
        'Util',
        'Json',
        controller]
    });

  function template() {
    return 'scripts/subject/subject.template.html';
  }

  function controller($scope, $http, $templateCache, $element, config, util, json) {

    var self = this,
        path = util.getUrlPath().substring(1),
        categoryPath = path.substring(0,path.indexOf('/')),
        subjectPath = path.substring(path.indexOf('/') + 1),
        rootPath = config.json.rootPath;

    //$templateCache.put('task-tpl', 'cvb.gfhj');

    var init = function() {
      self.category = json.getCategory(categoryPath);
      self.subject = json.getSubject(self.category.id, subjectPath);
      self.tasks = json.getSubjectTasks(self.category, self.subject);

    };

    self.getCategoryUrl = function() {
      return util.convertUrl(categoryPath);
    };

    self.tasksClick = function(event, taskid) {console.log(taskid);
      $('html, body').animate({ scrollTop: 0 }, 'fast');

      self.dropBackStyle.display = "block";
      self.displayTaskStyle.display = "block";

      //$http().then(function (result) {
      //  $templateCache.put('task-tpl', '<br>');//result);
      //});

      //subjectTaskContainer
    };

    self.jsons = json;
    self.pageLang = {},
    self.category = {};
    self.subject = {};
    self.tasks = {};
    self.dropBackStyle = {display: "none"};
    self.displayTaskStyle = {display: "none"};
    self.taskTpl = "ff.html";

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
