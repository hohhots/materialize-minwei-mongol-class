'use strict';

(function($, angular) {

  //set global file cache for $.ajax().
  $.ajaxSetup({
    cache: true
  });

  var config =
    {
      app: {
        urlPrefix: "#!"
      },

      json: {
        categories: "categories.json",
        footer: "footer.json",
        contact: "contact.json",
        about: "about.json",
      },

      home:{
        welcome: "学 - 优美蒙语<br>享 - 蒙古文化"
      },

      subject:{
        progress: "进度",
        targetProgress: "目标进度",
        practice: "练习",
        close: "关闭",
        taskContainer: "subjectTaskContainer",
        workArea: "subjectWorkArea",
        loadFileFail: "下载文件错误！",
        exerciseTag: "app-exercise",
        tasksTitle: {1: "请做", 2: "个练习！"},
        excerciseHtmlId: "exercise",
        answer: "答案",
        checkAnswer: "检查答案",
        noAnswerSelected: "您必须选择一个答案！",
        answerSelectedWrong: "选择不正确！",
        answerSequenceWrong: "您在重复答题或还没有做前一个练习！",
        exerciseNext: "正确！转到下一个",
        watchVideo: "有困难？看视频学习",
        notSupportHtml5Audio: "您的浏览器不支持 HTML5 播放音频。",
        notSupportHtml5Video: "您的浏览器不支持 HTML5 播放视频。"
      },

      templateUrl: {
        header: 'scripts/header/header.template.html',
        mobileDropDown: 'scripts/header/mobileDropDown/mobiledropdown.template.html',
        home: 'scripts/home/home.template.html',
        category: 'scripts/category/category.template.html',
        subject: 'scripts/subject/subject.template.html',
        footer: 'scripts/footer/footer.template.html'
      },

      events: {
        displayExercise: 'displayExerciseEvent',
        exerciseRendered: 'exerciseRenderedEvent',
        exercisePlayed: 'exercisePlayedEvent',
        exerciseNowPlaying: 'exerciseNowPlayingEvent',
        exercisePlayEnd: 'exercisePlayEndEvent',
        exerciseCheck: 'exerciseCheckEvent',
        exerciseCheckPassed: 'exerciseCheckPassedEvent',
        displayVideoPlayer: 'displayVideoPlayerEvent',
        closeVideoPlayer:'closeVideoPlayerEvent',
        closeVideoPlayerMouseLeave: 'closeVideoPlayerMouseLeaveEvent',
        closeVideoPlayerMouseEnter: 'closeVideoPlayerMouseEnterEvent'
      },

      data: {
        data: "data",
        images: "images",
        audios: "audios",
        videos: "videos",
        tasks: "tasks"
      }
    };

  // Define the `core.config` module
  angular.module('core.config', []);

  angular.
    module('core.config').
    constant('Config', config);

})(jQuery, window.angular);
