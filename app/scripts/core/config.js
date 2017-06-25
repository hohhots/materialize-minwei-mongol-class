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
        exerciseTag: "<app-exercise></app-exercise>",
        tasksTitle: {1: "请做", 2: "个练习！"},
        excerciseHtmlId: "exercise",
        answer: "答案",
        checkAnswer: "检查答案",
        watchVideo: "有困难？看视频学习"
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
        exerciseRendered: 'exerciseRenderedEvent',
        displayVideoPlayer: 'displayVideoPlayerEvent'
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
