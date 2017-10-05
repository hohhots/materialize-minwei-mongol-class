'use strict';

(function($) {

  //set global file cache for $.ajax().
  $.ajaxSetup({
    cache: true
  });

  var config =
    {
      app: {
        urlPrefix: "#!",
        url: "root"
      },

      gender: {
        man: '-m',
        woman: '-w'
      },

      data: {
        data: "data",
        images: "images",
        audios: "audios",
        videos: "videos",
        tasks: "tasks"
      },

      dataTypes: {
        images: [".png"],
        audios: [".ogg", ".mp3"],
        videos: [".ogv", ".webm"]
      },

      mediaUrl: {
        alphaOrigin: 'data/alphabet/list/'
      },

      alphaVideosNamesMap: {
        o2: "o", u2: "u",
        ne: "na", no2: "no", nu2: "nu",
        be: "ba", bo2: "bo", bu2: "bu",
        pe: "pa", po2: "po", pu2: "pu",
        ho2: "ho", hu2: "hu",
        ge: "he", gi: "hi", go2: "go", gu2: "gu",
        me: "ma", mo2: "mo", mu2: "mu",
        le: "la", lo2: "lo", lu2: "lu",
        se: "sa", so2: "so", su2: "su",
        she: "sha", sho2: "sho", shu2: "shu",
        te: "ta", to2: "to", tu2: "tu",
        de: "da", do2: "do", du2: "du",
        che: "cha", cho2: "cho", chu2: "chu",
        zhe: "zha", zho2: "zho", zhu2: "zhu",
        ye: "ya", yo2: "yo", yu2: "yu",
        re: "ra", ro2: "ro", ru2: "ru",
        we: "wa"
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

      alphaLangs: {
        alphaFilter: "过滤根字母"
      },

      templateUrl: {
        header: 'scripts/header/header.template.html',
        mobileDropDown: 'scripts/header/mobileDropDown/mobiledropdown.template.html',
        home: 'scripts/home/home.template.html',
        category: 'scripts/category/category.template.html',
        alphabetorigin: 'scripts/category/alphabet/origin/alphabetorigin.template.html',
        alphabetlist: 'scripts/category/alphabet/list/alphabetlist.template.html',
        alphabetvariant: 'scripts/category/alphabet/variant/alphabetvariant.template.html',
        subject: 'scripts/subject/subject.template.html',
        footer: 'scripts/footer/footer.template.html',
        simplePlayer: "scripts/player/simplePlayer/simplePlayer.template.html",
        alphaOriginFilter: "scripts/filter/alphaOriginFilter/alphaOriginFilter.template.html"
      },

      dataPath: {
        alphabetorigin: {
          json:'data/alphabet/origin/origin.json',
          data:'data/alphabet/origin/data.json'
        },
        alphabetlist: {
          json:'data/alphabet/list/list.json',
          data:'data/alphabet/list/data.json'
        },
        alphabetvariant: {
          json:'data/alphabet/variant/variant.json',
          data:'data/alphabet/list/data.json'
        }
      },

      events: {
        playAlphaVideo: 'playAlphaVideoEvent',
        playIntroductionVideo: 'playIntroductionVideoEvent',
        displayExercise: 'displayExerciseEvent',
        exerciseRendered: 'exerciseRenderedEvent',
        exercisePlayed: 'exercisePlayedEvent',
        exerciseTitlePlayed: 'exerciseTitlePlayedEvent',
        exerciseNowPlaying: 'exerciseNowPlayingEvent',
        exercisePlayEnd: 'exercisePlayEndEvent',
        exerciseCheck: 'exerciseCheckEvent',
        exerciseCheckPassed: 'exerciseCheckPassedEvent',
        displayVideoPlayer: 'displayVideoPlayerEvent',
        closeVideoPlayer:'closeVideoPlayerEvent',
        closeVideoPlayerMouseLeave: 'closeVideoPlayerMouseLeaveEvent',
        closeVideoPlayerMouseEnter: 'closeVideoPlayerMouseEnterEvent'
      }
    };

  // Define the `core.config` module
  angular.module('core.config', []).
    constant('Config', config);

})(jQuery);
