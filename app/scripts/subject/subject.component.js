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
        excerciseHtmlUrl = '',
        rootPath = config.json.rootPath;

    var init = function() {
      self.category = json.getCategory(categoryPath);
      self.subject = json.getSubject(self.category.id, subjectPath);
      self.tasksCategory = json.getSubjectTasks(self.category, self.subject);
      self.tasks = json.getTasks(self.category.id, self.subject.id);
      self.excercises = json.excercises;
    };

    var createExcerciseHtml = function() {
      var elem = $( "#" + config.subject.workArea ).html(config.subject.excerciseTag);
      $compile(elem.contents())($scope);
    };

    // Execute by self.currentExerciseId change.
    var loadExcerciseFiles = function() {
      if(!self.currentExerciseId) {
        return;
      }

      var name = self.task.dirName + "-" + self.currentExerciseId;
      var path = self.taskPath + "/" + name + "/" + name;

      //get css file for excercise
      excerciseCssElem = $('<link/>', {
        rel: 'stylesheet',
        type: 'text/css',
        href: path + '.css'
      }).appendTo('head');

      //get html file for excercise
      /**$.get( path + ".html")
        .done(function( cont, textStatus ) {
          excerciseHtmlElem = cont;
        })
        .fail(function( jqxhr, settings, exception ) {
          $( "#" + config.subject.workArea ).text( config.subject.loadFileFail + " - " + path + ".html");
        });
        **/
      excerciseHtmlUrl = path + ".html";
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
      //config.json.rootPath + "/" +
      var path = self.category.dirName + "/" + self.subject.dirName + "/" + config.json.tasksDir + "/" + subject.dirName + "/" + task.dirName;

      self.taskPath = config.json.rootPath + "/" + path;

      json.setExercises(path, task.dirName, self);

      self.currentExerciseId = 1;
      //console.log(self.category);
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

      loadTaskComponentFiles(subject, task);


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
    self.task = {};
    self.taskPath = '';
    self.exercises = {};

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
  }

})(jQuery, window.angular);
