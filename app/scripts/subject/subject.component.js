'use strict';

(function($, angular) {
  // Define the `header` module
  var app = angular.module('subject', ['core.config']);

  app.filter("trustUrl", ['$sce', function ($sce) {
        return function (recordingUrl) {
            return $sce.trustAsResourceUrl(recordingUrl);
        };
    }]);

  app.config(function ($controllerProvider, $provide, $compileProvider, $filterProvider) {
    // Register directives handler
    app.component = function(name, object) {
      $compileProvider.component(name, object);
      return (this);
    };
    // Register controller handler
    app.controller = function(name, constructor) {
      $controllerProvider.register(name, constructor);
      return (this);
    };
    // Register services handlers
    app.service = function(name, constructor) {
      $provide.service(name, constructor);
      return (this);
    };
    app.factory = function(name, factory) {
      $provide.factory(name, factory);
      return (this);
    };
    // Register filters handler
    app.filter = function(name, factory) {
      $filterProvider.register(name, factory);
      return (this);
    };
  });

  // Register `headerList` component, along with its associated controller and template
  app.component('appSubject', {
      template: '<div ng-include="$ctrl.templateUrl"></div>',
      controller: [
        '$rootScope',
        '$scope',
        '$compile',
        '$http',
        '$timeout',
        '$element',
        'Config',
        'Util',
        'Json',
        controller]
    });

  function controller($rootScope, $scope, $compile, $http, $timeout, $element, config, util, json) {

    var self = this,
        path = util.getUrlPath().substring(1),
        categoryPath = path.substring(0, path.indexOf('/')),
        subjectPath = path.substring(path.indexOf('/') + 1),
        exerciseCssElem = '',
        exerciseHtmlElem = '',
        exerciseConfig = {},
        imagesConfig = {},
        audiosConfig = {},
        videosConfig = {},
        exerciseScope = {},
        videoPlayer = '',
        videoPlayed = false,
        rootPath = config.data.data;

    var init = function() {
      try {
        self.category = json.getCategory(categoryPath);
        self.subject = json.getSubject(self.category.id, subjectPath);

        json.setResourcesConfig(self.category, self.subject);
        imagesConfig = json.images[self.category.id][self.subject.id];
        audiosConfig = json.audios[self.category.id][self.subject.id];
        videosConfig = json.videos[self.category.id][self.subject.id];

        json.setSubjectTasks(self.category, self.subject);
        self.tasksCategory = json.subjectTasks[self.category.id][self.subject.id];
        self.tasks = json.getTasks(self.category.id, self.subject.id);
        self.exercises = json.exercises;
        exerciseConfig = json.exerciseConfig;
        setExerciseVideos();
      } catch (err) {}
    };

    var exerciseCompiled = function(elem) {
      // In jquery an element called with remove(), trigger $destroy event.
      exerciseHtmlElem.on('$destroy', function() {
        exerciseScope.$destroy();
      });

      $scope.$broadcast('hi', 'hi!');
    };

    var createExerciseHtml = function() {
      var elem = $('#' + config.subject.workArea).html(config.subject.exerciseTag);

      exerciseScope = $scope.$new();
      exerciseHtmlElem = $compile(elem.children()[0])(exerciseScope);
      $timeout(exerciseCompiled);

    };

    var setExerciseVideos = function() {
      $.each(exerciseConfig.videos, function(i, v){
        $.each(videosConfig.videos, function(j, v1) {
          if(v == v1.id) {
            var video = {};
            video.introduction = v1.introduction;

            var path = 'url(' + config.data.data + "/" + self.category.dirName + "/" + self.subject.dirName + "/" + config.data.videos + "/"  + v1.name + "." + videosConfig.thumbProfix[1] + ")";
            var style = {};
            style.backgroundImage = path;
            video.style = style;

            path = config.data.data + "/" + self.category.dirName + "/" + self.subject.dirName + "/" + config.data.videos + "/"  + v1.name + ".";
            var videos = {};
            $.each(videosConfig.videoProfix, function(k, v2) {
              videos[v2] = path + v2;
            });
            video.videos = videos;

            self.exerciseVideos[i] = video;
          }
        });
      });
    };

    // Execute by self.currentExerciseId change.
    var loadExerciseFiles = function() {
      if(!self.currentExerciseId) {
        return;
      }

      var name = self.task.dirName + "-" + self.currentExerciseId;

      //get config json file for exercise
      var cPath = self.taskPath + "/" + name;
      json.setExerciseConfig(cPath.substring(cPath.indexOf('/') + 1), name + ".json");

      var path = self.taskPath + "/" + name + "/" + name;

      //get css file for exercise
      if(exerciseCssElem != ''){
        exerciseCssElem.remove();
      }
      exerciseCssElem = $('<link/>', {
        rel: 'stylesheet',
        type: 'text/css',
        href: path + '.css'
      }).appendTo('head');

      //set html template file url for exercise
      self.exerciseTemplateUrl = path + ".html";

      //js file for exercise
      $.getScript( path + ".js")
        .done(function( script, textStatus ) {
          createExerciseHtml();
        })
        .fail(function( jqxhr, settings, exception ) {
          $( "#" + config.subject.workArea ).text(  config.subject.loadFileFail + " - " + path + ".js" );
        });


    };

    var loadTaskComponentFiles =function(data) {
      var subject = data[0];
      var task = data[1];

      self.task = task;

      //var elem = $element.find("#" + config.subject.taskContainer);
      //elem.append("dffd");
      var path = self.category.dirName + "/" + self.subject.dirName + "/" + config.data.tasks + "/" + subject.dirName + "/" + task.dirName;

      self.taskPath = config.data.data + "/" + path;

      json.setExercises(path, task.dirName, self);

      self.currentExerciseId = 1;
    };

    var displayExercise = function(event, data) {
      util.scrollToTop();

      self.dropBackStyle.display = "block";
      self.displayTaskStyle.display = "block";

      loadTaskComponentFiles(data);
    };

    var exerciseRendered = function(event, data) {
      self.exerciseStyle.display = "block";
      self.waitSignContainer.display = "none";
    };

    var displayVideoPlayer = function(event, video) {
      util.scrollToTop();

      self.videoPlayerTitle = video.introduction;
      self.dropBackStyle.zIndex = 1060;
      self.displayVideoStyle.display = "block";
      self.playVideoStyle.backgroundImage = video.style.backgroundImage;
      self.videoOgvUrl = video.videos.ogv;
      self.videoWebmUrl = video.videos.webm;

      videoPlayer = document.getElementsByTagName('video')[0];
      videoPlayer.load();
    };

    var closeVideoPlayerMouseEnter = function(event, data) {
      self.videoPlayerCloseStyle.opacity = 0.8;
    };

    var closeVideoPlayerMouseLeave = function(event, data) {
      self.videoPlayerCloseStyle = {};
    };

    var closeVideoPlayer = function(event, data) {
      self.displayVideoStyle.display = "none";
      self.dropBackStyle.zIndex = 1040;
    };

    self.getCategoryUrl = function() {
      return util.convertUrl(categoryPath);
    };

    self.getTasksTitle = function() {
      var exerCount = 0;
      $.each(self.exercises, function(i, val) {
        exerCount++;
      });
      return config.subject.tasksTitle[1] + exerCount + config.subject.tasksTitle[2];
    };

    self.getExerciseHtmlId = function(exerciseId) {
      return config.subject.excerciseHtmlId + exerciseId;
    };

    self.tasksClick = function(event, data) {
      $scope.$emit(config.events.displayExercise, data);
    };

    self.tasksClose = function() {
      self.dropBackStyle.display = "none";
      self.displayTaskStyle.display = "none";

      self.exerciseStyle.display = "none";
      self.waitSignContainer.display = "bock";

      // remove all event listeners created with ""$on" in angular
      //exerciseScope.$destroy();

      // remove elements and all event listeners in jquery
      exerciseCssElem.remove();
      exerciseHtmlElem.remove();

      self.currentExerciseId = 0;
    };

    self.videoTitleClick = function(video) {
      $scope.$emit(config.events.displayVideoPlayer, video);
    };

    self.videoPlayerCloseClick = function(video) {
      $scope.$emit(config.events.closeVideoPlayer, video);
    };

    self.videoPlayerCloseMouseEnter = function() {
      $scope.$emit(config.events.closeVideoPlayerMouseEnter, '');
    };

    self.videoPlayerCloseMouseLeave = function() {
      $scope.$emit(config.events.closeVideoPlayerMouseLeave, '');
    };

    self.playVideo = function() {
      if(!videoPlayed){
        videoPlayer.play();
      } else {
        videoPlayer.pause();
      }
      videoPlayed = !videoPlayed;
    };

    self.jsons = json;
    self.templateUrl = config.templateUrl.subject;
    self.pageLang = {};
    self.category = {};
    self.subject = {};
    self.tasksCategory = {};
    self.tasks = {};
    self.task = {};
    self.taskPath = '';
    self.exercises = {};
    self.exerciseVideos = {};
    self.exerciseStyle = {display: "none"};
    self.exerciseTemplateUrl = '';
    self.waitSignContainer = {display: "block"};
    self.videoPlayerTitle = '';

    // trigger to load exercise page,
    //0 indicate nothing, 1 indicate exercise 1.
    self.currentExerciseId = 0;

    self.dropBackStyle = {display: "none"};
    self.displayTaskStyle = {display: "none"};
    self.displayVideoStyle = {display: "none"};
    self.playVideoStyle = {};
    self.videoPlayerCloseStyle = {};
    self.videoOgvUrl = '';
    self.videoWebmUrl = '';

    self.pageLang.targetProgress = config.subject.targetProgress;
    self.pageLang.progress = config.subject.progress;
    self.pageLang.practice = config.subject.practice;
    self.pageLang.close = config.subject.close;
    self.pageLang.answer = config.subject.answer;
    self.pageLang.checkAnswer = config.subject.checkAnswer;
    self.pageLang.watchVideo = config.subject.watchVideo;
    self.pageLang.notSupportHtml5Video = config.subject.notSupportHtml5Video;

    self.taskMouseEnter = function(event) {
      $(event.currentTarget).css({"background-color": "#eee"});
    };

    self.taskMouseLeave = function(event) {
      $(event.currentTarget).css({"background-color": "#fff"});
    };

    // Set event watcher or litsner
    $scope.$watch(function(){return self.jsons;}, init, true);

    $scope.$watch(function(){return self.currentExerciseId;}, loadExerciseFiles, true);

    $scope.$on(config.events.displayExercise, displayExercise);

    $scope.$on(config.events.displayVideoPlayer, displayVideoPlayer);

    $scope.$on(config.events.closeVideoPlayerMouseEnter, closeVideoPlayerMouseEnter);

    $scope.$on(config.events.closeVideoPlayerMouseLeave, closeVideoPlayerMouseLeave);

    $scope.$on(config.events.closeVideoPlayer, closeVideoPlayer);

    $scope.$on(config.events.exerciseRendered, exerciseRendered);
  }

})(jQuery, window.angular);
