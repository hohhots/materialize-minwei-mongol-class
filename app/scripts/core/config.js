'use strict';

(function () {

  //set global file cache for $.ajax().
  $.ajaxSetup({
    cache: true
  });

  var config = {
    app: {
      urlPrefix: "#!",
      url: "root"
    },

    type: {
      css: 'css'
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
      alphaOrigin: 'data/alphabet/list/',
      alphaList: 'data/alphabet/list/',
      ebookBegin: 'data/ebook/begin/'
    },

    pagesUrl: {
      alphaOrigin: 'alphabetorigin',
      originPractice: 'originpractice',

      alphaList: 'alphabetlist',
      listPractice: 'listpractice',

      alphaVariant: 'alphabetvariant',
      variantPractice: 'variantpractice',

      wordBegin: 'wordbegin',
      wordbeginPractice: 'wordbeginpractice'
    },

    alphaListNamesMap: {
      o2: "o", u2: "u",
      ne: "na", no2: "no", nu2: "nu",
      be: "ba", bo2: "bo", bu2: "bu",
      pe: "pa", po2: "po", pu2: "pu",
      ho2: "ho", hu2: "hu",
      go2: "go", gu2: "gu",
      me: "ma", mo2: "mo", mu2: "mu",
      le: "la", lo2: "lo", lu2: "lu",
      se: "sa", so2: "so", su2: "su",
      xe: "xa", xo2: "xo", xu2: "xu",
      te: "ta", to2: "to", tu2: "tu",
      de: "da", do2: "do", du2: "du",
      qe: "qa", qo2: "qo", qu2: "qu",
      je: "ja", jo2: "jo", ju2: "ju",
      ye: "ya", yo2: "yo", yu2: "yu",
      re: "ra", ro2: "ro", ru2: "ru",
      we: "wa"
    },

    alphaVideoNamesMap: {},

    alphaVariantNamesMap1: {},
    alphaVariantNamesMap2: {},
    alphaVariantNamesMap3: {},
    alphaVariantNamesMap4: {},

    alphaCss: {
      practiceEmpty: 'originpractice-empty-alpha',
      variantpracticeEmpty: 'variantpractice-empty-alpha'
    },

    json: {
      categories: "categories.json",
      footer: "footer.json",
      contact: "contact.json",
      about: "about.json",
    },

    home: {
      welcome: "学 - 优美蒙古语<br>懂 - 人与大自然"
    },

    subject: {
      progress: "进度",
      targetProgress: "目标进度",
      practice: "练习",
      close: "关闭",
      taskContainer: "subjectTaskContainer",
      workArea: "subjectWorkArea",
      loadFileFail: "下载文件错误！",
      exerciseTag: "app-exercise",
      tasksTitle: { 1: "请做", 2: "个练习！" },
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
      introduction: "简介",
      translate: "翻译",
      practice: "练习",
      clear: '清除',
      ok: "确定",
      exit: "退出",
      filter: "筛选",
      selectAlpha: "选择字母",
      selectAll: "全选",
      checkAnswer: "检查答案",
      originAlphaFilterTitle: "筛选字母",
      notSupportHtml5Audio: "您的浏览器不支持 HTML5 播放音频。",
      nextTest: '下一练习',
      top: '首',
      middle: '中',
      bottom: '尾',
      pagePrevious: '前一页',
      pageNext: '下一页',
      audioPlay: '播放音频'
    },

    templateUrl: {
      header: 'scripts/header/header.template.html',
      mobileDropDown: 'scripts/header/mobileDropDown/mobiledropdown.template.html',
      home: 'scripts/home/home.template.html',
      category: 'scripts/category/category.template.html',

      alphabetorigin: 'scripts/category/alphabet/origin/alphabetorigin.template.html',
      originpractice: 'scripts/category/alphabet/origin/practice/originpractice.template.html',
      alphaOriginFilter: "scripts/filter/alphaOriginFilter/alphaOriginFilter.template.html",
      originRandom: 'scripts/category/alphabet/origin/originRandom/originRandom.template.html',

      alphabetlist: 'scripts/category/alphabet/list/alphabetlist.template.html',
      listpractice: 'scripts/category/alphabet/list/practice/listpractice.template.html',
      listRandom: 'scripts/category/alphabet/list/listRandom/listRandom.template.html',

      alphabetvariant: 'scripts/category/alphabet/variant/alphabetvariant.template.html',
      variantpractice: 'scripts/category/alphabet/variant/practice/variantpractice.template.html',
      variantRandom: 'scripts/category/alphabet/variant/variantRandom/variantRandom.template.html',

      wordBegin: 'scripts/category/word/begin/wordBegin.template.html',
      wordbeginpractice: 'scripts/category/word/begin/practice/wordbeginpractice.template.html',
      ebookBegin: 'scripts/category/ebook/begin/ebookBegin.template.html',

      subject: 'scripts/subject/subject.template.html',
      footer: 'scripts/footer/footer.template.html',
      simplePlayer: "scripts/player/simplePlayer/simplePlayer.template.html",

      word: "scripts/word/word.template.html",
      mwordInput: "scripts/word/input/mwordInput.template.html",
      wordPlayer: "scripts/player/wordPlayer/wordPlayer.template.html",
      wordIme: "scripts/ime/word/wordIme.template.html"
    },

    dataPath: {
      alphabetorigin: {
        json: 'data/alphabet/origin/origin.json',
        data: 'data/alphabet/origin/data.json'
      },
      alphabetlist: {
        json: 'data/alphabet/list/list.json',
        data: 'data/alphabet/list/data.json'
      },
      alphabetvariant: {
        json: 'data/alphabet/variant/variant.json',
        data: 'data/alphabet/list/data.json'
      },
      wordbegin: {
        json: 'data/word/begin/begin.json',
        data: 'data/word/begin/data.json'
      },
      ebookbegin: {
        json: 'data/ebook/begin/begin.json',
        data: 'data/ebook/begin/data.json'
      }
    },

    events: {
      setInputFocus: "setInputFocusEvent",
      stopPlayers: 'stopPlayersEvent',
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
      closeVideoPlayer: 'closeVideoPlayerEvent',
      closeVideoPlayerMouseLeave: 'closeVideoPlayerMouseLeaveEvent',
      closeVideoPlayerMouseEnter: 'closeVideoPlayerMouseEnterEvent',
      displayAlphaFilter: 'displayAlphaFilterEvent',
      filtAlphaVariants: 'filtAlphaVariantsEvent',
      displayOriginRandom: 'displayOriginRandomEvent',
      closeOriginRandom: 'closeOriginRandomEvent',
      selectRandomAlphas: 'selectRandomAlphasEvent',

      listDisplayRandomAlpha: 'listDisplayRandomAlphaEvent',
      listHideRandomAlpha: 'listHideRandomAlpha',
      listRandomAlphaSelected: 'listRandomAlphaSelectedEvent',

      variantRandomAlphaSelected: 'variantRandomAlphaSelectedEvent',
      variantDisplayRandomAlpha: 'variantDisplayRandomAlphaEvent',
      variantHideRandomAlpha: 'variantHideRandomAlphaEvent',

      wordGetWordSpans: 'wordGetWordSpansEvent',
      setWordAnimationElement: 'setWordAnimationElementEvent',
      playWordAnimation: 'playWordAnimationEvent',
      startWordIme: 'startWordImeEvent',

      mwordInputFocused: 'mwordInputFocusedEvent',
      wordInputBackSpace: 'wordInputBackSpaceEvent',
      setImeAlpha: 'setImeAlphaEvent',
      closeIme: 'closeImeEvent',
      wordImeDone: 'wordImeDoneEvent',

      setDimension: "setDimensionEvent"
    }
  };

  config.alphaVideoNamesMap = $.extend({}, config.alphaListNamesMap, {
    ge: "he", gi: "hi", gu: "hu", gu2: "hu"
  });

  config.alphaVariantNamesMap1 = config.alphaVideoNamesMap;
  config.alphaVariantNamesMap2 = $.extend({}, config.alphaVariantNamesMap1, {
    e: "a", u: "o", u2: "o",
    nu: "no", nu2: "no",
    bu: "bo", bu2: "bo",
    pu: "po", pu2: "po",
    mu: "mo", mu2: "mo",
    lu: "lo", lu2: "lo",
    su: "so", su2: "so",
    xu: "xo", xu2: "xo",
    tu: "to", tu2: "to",
    du: "do", du2: "do",
    qu: "qo", qu2: "qo",
    ju: "jo", ju2: "jo",
    yu: "yo", yu2: "yo",
    ru: "ro", ru2: "ro"
  });

  config.alphaVariantNamesMap3 = config.alphaVariantNamesMap2;

  $.each(config.alphaVariantNamesMap3, function (key, val) {
    if (key != 'we') {
      config.alphaVariantNamesMap4[key] = val;
    }
  });

  // Define the `core.config` module
  angular.module('core.config', []).
    constant('Config', config);

})();
