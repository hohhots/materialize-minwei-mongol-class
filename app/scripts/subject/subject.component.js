'use strict';

(function($, angular) {
  // Define the `header` module
  var app = angular.module('subject', ['core.config']);

  app.config(function ($controllerProvider, $provide, $compileProvider, $filterProvider) {
    // Register directives handler
    app.component = function(name, object) {
        $compileProvider.component(name, object);
    return (this);
    };
    // Register controller handler
    app.controller = function( name, constructor ) {
        $controllerProvider.register( name, constructor );
    return( this );
    };
    // Register services handlers
    app.service = function( name, constructor ) {
        $provide.service( name, constructor );
    return( this );
    };
    app.factory = function( name, factory ) {
        $provide.factory( name, factory );
    return( this );
    };
    // Register filters handler
    app.filter = function( name, factory ) {
        $filterProvider.register( name, factory );
    return( this );
    };
  });

  // Register `headerList` component, along with its associated controller and template
  app.component('appSubject', {
      template: '<div ng-include="$ctrl.templateUrl"></div>',
      controller: [
        '$scope',
        '$compile',
        '$http',
        '$templateCache',
        '$element',
        'Config',
        'Util',
        'Json',
        controller]
    });

  function controller($scope, $compile, $http, $templateCache, $element, config, util, json) {

    var self = this,
        path = util.getUrlPath().substring(1),
        categoryPath = path.substring(0,path.indexOf('/')),
        subjectPath = path.substring(path.indexOf('/') + 1),
        excerciseCssElem = '',
        excerciseHtmlElem = '',
        rootPath = config.data.data;

    var init = function() {
      self.category = json.getCategory(categoryPath);
      self.subject = json.getSubject(self.category.id, subjectPath);//console.log(subjectPath);
      self.imagesConfig = json.getResourcesConfig(self.category, self.subject);
      self.audiosConfig = json.getResourcesConfig(self.category, self.subject);
      self.videosConfig = json.getResourcesConfig(self.category, self.subject);
      self.tasksCategory = json.getSubjectTasks(self.category, self.subject);
      self.tasks = json.getTasks(self.category.id, self.subject.id);
      self.excercises = json.excercises;
      self.excerciseConfig = json.excerciseConfig;//console.log(self.excerciseConfig);
    };

    var createExcerciseHtml = function() {
      var elem = $( "#" + config.subject.workArea ).html(config.subject.excerciseTag);
      excerciseHtmlElem = elem.children()[0];
      $compile(excerciseHtmlElem)($scope);
    };

    // Execute by self.currentExerciseId change.
    var loadExcerciseFiles = function() {
      if(!self.currentExerciseId) {
        return;
      }

      var name = self.task.dirName + "-" + self.currentExerciseId;

      //get config json file for excercise
      var cPath = self.taskPath + "/" + name;
      json.setExcerciseConfig(cPath.substring(cPath.indexOf('/') + 1), name + ".json");

      var path = self.taskPath + "/" + name + "/" + name;

      //get css file for excercise
      if(excerciseCssElem != ''){
        excerciseCssElem.remove();
      }
      excerciseCssElem = $('<link/>', {
        rel: 'stylesheet',
        type: 'text/css',
        href: path + '.css'
      }).appendTo('head');

      //set html template file url for excercise
      self.excerciseTemplateUrl = path + ".html";

      //js file for excercise
      $.getScript( path + ".js")
        .done(function( script, textStatus ) {
          createExcerciseHtml();
        })
        .fail(function( jqxhr, settings, exception ) {
          $( "#" + config.subject.workArea ).text(  config.subject.loadFileFail + " - " + path + ".js" );
        });


    };

    var loadTaskComponentFiles =function(subject, task) {
      self.task = task;

      //var elem = $element.find("#" + config.subject.taskContainer);
      //elem.append("dffd");
      var path = self.category.dirName + "/" + self.subject.dirName + "/" + config.data.tasks + "/" + subject.dirName + "/" + task.dirName;

      self.taskPath = config.data.data + "/" + path;

      json.setExercises(path, task.dirName, self);

      self.currentExerciseId = 1;
      //console.log(self.category);
      //console.log(self.subject);
      //console.log(self.tasks);
      //$http().then(function (result) {
      //  $templateCache.put('task-tpl', '<br>');//result);
      //});
    };

    var excerciseRendered = function(event, data) {
      self.exerciseStyle.display = "block";
      self.waitSignContainer.display = "none";
    };

    self.getCategoryUrl = function() {
      return util.convertUrl(categoryPath);
    };

    self.tasksClick = function(event, subject, task) {
      $('html, body').animate({ scrollTop: 0 }, 'fast');

      self.dropBackStyle.display = "block";
      self.displayTaskStyle.display = "block";

      loadTaskComponentFiles(subject, task);


      //subjectTaskContainer
    };

    self.tasksClose = function() {
      self.dropBackStyle.display = "none";
      self.displayTaskStyle.display = "none";

      self.exerciseStyle.display = "none";
      self.waitSignContainer.display = "bock";

      excerciseCssElem.remove();
      excerciseHtmlElem.remove();
      self.currentExerciseId = 0;
    };

    self.jsons = json;
    self.templateUrl = config.templateUrl.subject;
    self.pageLang = {},
    self.category = {};
    self.subject = {};
    self.imagesConfig = {};
    self.audiosConfig = {};
    self.videosConfig = {};
    self.tasksCategory = {};
    self.tasks = {};
    self.task = {};
    self.taskPath = '';
    self.exercise = {};
    self.excerciseConfig = {},
    self.exerciseStyle = {display: "none"};
    self.excerciseTemplateUrl = '';
    self.waitSignContainer = {display: "block"};

    // trigger to load excercise page,
    //0 indicate nothing, 1 indicate excercise 1.
    self.currentExerciseId = 0;

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

    $scope.$watch(function(){return self.currentExerciseId;}, loadExcerciseFiles, true);

    $scope.$on('excerciseRendered', excerciseRendered);
  }

})(jQuery, window.angular);
