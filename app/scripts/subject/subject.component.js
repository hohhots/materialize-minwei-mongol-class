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
        taskCategory = {},
        exerciseCssElem = '',
        exerciseHtmlElem = '',
        exerciseConfig = {},
        exerciseAudios = [],
        exercisePlayedAudioId = -1,
        exerciseFinishedId = 0,
        imagesConfig = {},
        audiosConfig = {},
        videosConfig = {},
        exerciseScope = {},
        videoPlayer = '',
        audioPlayer = '',
        rootPath = config.data.data;

    var init = function() {
      try {
        exerciseFinishedId = 0;

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
        self.checkAnswerLabel = config.subject.checkAnswer;
        exerciseConfig = json.exerciseConfig;
        initExerciseHistoryIcons();
        initExerciseVideos();
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

    var initExerciseHistoryIcons = function() {
      $.each(self.exercises, function(i, val) {
        // Previous excercises display anwser state
        if(i > (self.currentExerciseId - 1)) {
          self.exerciseHistoryIcons[val.id] = "fa-circle-thin";
          self.exerciseHistoryStyle[val.id] = {};
        }
      });
    };

    var setExerciseAudios = function(questions) {
      if(exercisePlayedAudioId == -1) {
        $.each(questions, function(i, v){
          $.each(audiosConfig.audios, function(j, v1) {
            if(v.audio == v1.id) {
              var audio = {};

              var path = config.data.data + "/" + self.category.dirName + "/" + self.subject.dirName + "/" + config.data.audios + "/"  + v1.name + "-";

              exerciseAudios[i] = util.setAudio(path, audiosConfig);
            }
          });
        });

        exercisePlayedAudioId = 0;
      }
    };

    var setCurrentExerciseId = function(exerciseId) {
      self.currentExerciseId = util.setCurrentExerciseId(self.category.id, self.subject.id, taskCategory.id, self.task.id, exerciseId);
    };

    var initExerciseVideos = function() {
      $.each(exerciseConfig.videos, function(i, v){
        $.each(videosConfig.videos, function(j, v1) {
          if(v == v1.id) {
            var video = {};
            video.introduction = v1.introduction;

            var parentPath = config.data.data + "/" + self.category.dirName + "/" + self.subject.dirName + "/";

            var path = 'url(' + parentPath + config.data.videos + "/"  + v1.name + "." + videosConfig.thumbProfix[1] + ")";
            var style = {};
            style.backgroundImage = path;
            video.style = style;

            path = parentPath + config.data.audios + "/"  + v1.name + "-";
            video.audios = util.setAudio(path, audiosConfig);

            path = parentPath + config.data.videos + "/"  + v1.name + ".";
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
      if (data) {
        taskCategory = data[0];
        self.task = data[1];
      }

      //var elem = $element.find("#" + config.subject.taskContainer);
      //elem.append("dffd");
      var path = self.category.dirName + "/" + self.subject.dirName + "/" + config.data.tasks + "/" + taskCategory.dirName + "/" + self.task.dirName;

      self.taskPath = config.data.data + "/" + path;

      json.setExercises(path, self.task.dirName, self);
      // If same task selected, restore previous exercise progress.
      if(!self.currentExerciseId){
        setCurrentExerciseId(1);
      } else {
        // reload previous exercise
        loadExerciseFiles();
      }
    };

    var displayExercise = function(event, data) {
      util.scrollToTop();

      init();

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

      self.playVideoButtonStyle.display = "block";

      videoPlayer = $('video')[0];
      videoPlayer.load();
      $(videoPlayer).on("ended", videoEnded);

      setAudioPlayer(video.audios);
    };

    var setAudioPlayer = function(audio) {
      var gender = (Math.random() > 0.5)?'m':'w';
      self.audioOggUrl = audio[gender].ogg;
      self.audioMp3Url = audio[gender].mp3;

      audioPlayer = $('audio')[0];
      audioPlayer.load();
    };

    var playExerciseAudios = function() {
      setAudioPlayer(exerciseAudios[exercisePlayedAudioId]);
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

    var videoEnded = function(event) {
      self.playVideoButtonStyle.display = "block";
      // Must run $digest(), because thie event fired by html video, out of angular $scope.
      $scope.$digest();
    };

    var exercisePlay = function(event, questions) {
      setExerciseAudios(questions);

      if(exercisePlayedAudioId == exerciseAudios.length) {
        exercisePlayedAudioId = -1;
        audioPlayer.removeEventListener("ended", exercisePlay);
        $scope.$broadcast(config.events.exercisePlayEnd);
        return;
      }

      $timeout(playExerciseAudios());
      audioPlayer.addEventListener("ended", exercisePlay);
      $timeout(function(){
        audioPlayer.load();
        audioPlayer.play();
        $scope.$broadcast(config.events.exerciseNowPlaying, exercisePlayedAudioId);
      });
      exercisePlayedAudioId += 1;

    };

    var exerciseChecked = function(event, checkedId) {
      // On second click, do next exercise.
      if(exerciseFinishedId == exerciseConfig.id){
        setCurrentExerciseId(self.currentExerciseId + 1);
        return;
      }

      self.exerciseWrong = false;

      if(!checkedId){
        self.exerciseWrong = true;
        self.pageLang.exerciseWrong = config.subject.noAnswerSelected;
        return;
      }

      if(exerciseConfig.answer != checkedId) {
        self.exerciseWrong = true;
        self.pageLang.exerciseWrong = config.subject.answerSelectedWrong;
        return;
      }

      var id = exerciseConfig.id;

      if(exerciseFinishedId != (id - 1)) {
        self.exerciseWrong = true;
        self.pageLang.exerciseWrong = config.subject.answerSequenceWrong;
        return;
      }
      exerciseFinishedId = exerciseConfig.id;
      self.exerciseHistoryIcons[id] = "fa-check-circle";
      self.exerciseHistoryStyle[id].color = "#80ac07";

      self.checkAnswerLabel = config.subject.exerciseNext;

      $scope.$broadcast(config.events.exerciseCheckedRight);
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

    self.taskMouseEnter = function(event) {
      $(event.currentTarget).css({"background-color": "#eee"});
    };

    self.taskMouseLeave = function(event) {
      $(event.currentTarget).css({"background-color": "#fff"});
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
      if(videoPlayer.paused) {
        self.playVideoButtonStyle.display = "none";
        videoPlayer.play();
        audioPlayer.play();
      } else {
        videoPlayer.pause();
        audioPlayer.pause();
        self.playVideoButtonStyle.display = "block";
      }
    };

    self.checkButtonClick = function() {
      $scope.$broadcast(config.events.exerciseCheck);
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
    self.exerciseHistoryIcons = {};
    self.exerciseHistoryStyle = {};
    self.exerciseVideos = {};
    self.exerciseStyle = {display: "none"};
    self.exerciseTemplateUrl = '';
    self.exerciseWrong = false;
    self.checkAnswerLabel = '';
    self.waitSignContainer = {display: "block"};
    self.videoPlayerTitle = '';

    // trigger to load exercise page,
    //0 indicate nothing, 1 indicate exercise 1.
    self.currentExerciseId = util.getCurrentExerciseId();

    self.dropBackStyle = {display: "none"};
    self.displayTaskStyle = {display: "none"};
    self.displayVideoStyle = {display: "none"};
    self.playVideoButtonStyle = {};
    self.playVideoStyle = {};
    self.videoPlayerCloseStyle = {};
    self.videoOgvUrl = '';
    self.videoWebmUrl = '';
    self.audioOggUrl = '';
    self.audioMp3Url = '';

    self.pageLang.targetProgress = config.subject.targetProgress;
    self.pageLang.progress = config.subject.progress;
    self.pageLang.practice = config.subject.practice;
    self.pageLang.close = config.subject.close;
    self.pageLang.answer = config.subject.answer;
    self.pageLang.checkAnswer = config.subject.checkAnswer;
    self.pageLang.exerciseWrong = '';
    self.pageLang.watchVideo = config.subject.watchVideo;
    self.pageLang.notSupportHtml5Audio = config.subject.notSupportHtml5Audio;
    self.pageLang.notSupportHtml5Video = config.subject.notSupportHtml5Video;

    // Set event watcher or litsner
    $scope.$watch(function(){return self.jsons;}, init, true);

    $scope.$watch(function(){return self.currentExerciseId;}, loadExerciseFiles, true);

    $scope.$on(config.events.displayExercise, displayExercise);

    $scope.$on(config.events.displayVideoPlayer, displayVideoPlayer);

    $scope.$on(config.events.closeVideoPlayerMouseEnter, closeVideoPlayerMouseEnter);

    $scope.$on(config.events.closeVideoPlayerMouseLeave, closeVideoPlayerMouseLeave);

    $scope.$on(config.events.closeVideoPlayer, closeVideoPlayer);

    $scope.$on(config.events.exerciseRendered, exerciseRendered);

    $scope.$on(config.events.exercisePlayed, exercisePlay);

    $scope.$on(config.events.exerciseCheckAnswer, exerciseChecked);
  }

})(jQuery, window.angular);
