'use strict';

(function ($location) {

  //set global file cache for $.ajax().
  $.ajaxSetup({
    cache: true
  });

  var config = {
    app: {
      urlPrefix: '#!',
      url: 'root'
    },

    type: {
      css: 'css'
    },

    gender: {
      man: '-m',
      woman: '-w'
    },

    data: {
      data: 'data',
      images: 'images',
      audios: 'audios',
      videos: 'videos',
      tasks: 'tasks'
    },

    dataTypes: {
      images: ['.png', '.jpg'],
      audios: ['.ogg', '.mp3'],
      videos: ['.ogv', '.webm']
    },

    mediaUrl: {
      alphaOrigin: 'data/alphabet/list/',
      alphaList: 'data/alphabet/list/',
      wordBegin: 'data/word/begin/',
      ebook: 'data/ebook/'
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

    alphaCss: {
      practiceEmpty: 'originpractice-empty-alpha',
      variantpracticeEmpty: 'variantpractice-empty-alpha'
    },

    json: {
      categories: 'categories.json',
      footer: 'footer.json',
      contact: 'contact.json',
      about: 'about.json',
      introduction: 'introduction.json'
    },

    home: {
      welcome: '学 - 优美蒙古语<br>懂 - 人与大自然'
    },

    subject: {
      progress: '进度',
      targetProgress: '目标进度',
      practice: '练习',
      close: '关闭',
      taskContainer: 'subjectTaskContainer',
      workArea: 'subjectWorkArea',
      loadFileFail: '下载文件错误！',
      exerciseTag: 'app-exercise',
      tasksTitle: { 1: '请做', 2: '个练习！' },
      excerciseHtmlId: 'exercise',
      answer: '答案',
      checkAnswer: '检查答案',
      noAnswerSelected: '您必须选择一个答案！',
      answerSelectedWrong: '选择不正确！',
      answerSequenceWrong: '您在重复答题或还没有做前一个练习！',
      exerciseNext: '正确！转到下一个',
      watchVideo: '有困难？看视频学习',
      notSupportHtml5Audio: '您的浏览器不支持 HTML5 播放音频。',
      notSupportHtml5Video: '您的浏览器不支持 HTML5 播放视频。'
    },

    alphaLangs: {
      introduction: '简介',
      translate: '翻译',
      practice: '练习',
      clear: '清除',
      ok: '确定',
      exit: '退出',
      back: '返回',
      filter: '筛选',
      selectAlpha: '选择字母',
      selectAll: '全选',
      checkAnswer: '检查答案',
      originAlphaFilterTitle: '筛选字母',
      notSupportHtml5Audio: '您的浏览器不支持 HTML5 播放音频。',
      nextTest: '下一练习',
      testAgain: '重复练习',
      top: '首',
      middle: '中',
      bottom: '末',
      pagePrevious: '前一页',
      pageNext: '下一页',
      audioPlay: '播放音频'
    },

    listPracticeLangs: {
      text: '点击播放按钮听字母读音，然后按读音顺序点击相应空白字母位置选择一个字母，以此类推，选择所有字母。'
    },

    variantPracticeLangs: {
      text: '点击播放按钮听字母读音，然后按读音顺序点击下面每个原形字母下面的相应位置并选择其在字首、字中、字尾的相应变形字母。'
    },

    levelsLangs: {
      previousPage: '上一页',
      nextPage: '下一页',
      selectPage: '选择页'
    },

    classroomLangs: {
      interact: '互动课'
    },

    templateUrl: {
      header: 'scripts/header/header.template.html',
      mobileDropDown: 'scripts/header/mobileDropDown/mobiledropdown.template.html',
      home: 'scripts/home/home.template.html',
      levelsHome: 'scripts/levelshome/levelshome.template.html',
      appLevels: 'scripts/levelshome/levels/levels.template.html',
      appBooks: 'scripts/levelshome/levels/books/books.template.html',
      category: 'scripts/category/category.template.html',

      alphabetorigin: 'scripts/category/alphabet/origin/alphabetorigin.template.html',
      originpractice: 'scripts/category/alphabet/origin/practice/originpractice.template.html',
      alphaOriginFilter: 'scripts/filter/alphaOriginFilter/alphaOriginFilter.template.html',
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
      simplePlayer: 'scripts/player/simplePlayer/simplePlayer.template.html',
      audioPlayer: 'scripts/player/audioPlayer/audioPlayer.template.html',

      word: 'scripts/word/word.template.html',
      mwordInput: 'scripts/word/input/mwordInput.template.html',
      wordPlayer: 'scripts/player/wordPlayer/wordPlayer.template.html',
      wordIme: 'scripts/ime/word/wordIme.template.html'
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
      listpractice: {
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
      },
      levelshome: {
        json: 'data/introduction.json',
        data: 'data/levels/levels.json'
      },
      appLevels: {
        json: 'data/levels/levels.json',
        data: 'data/levels/'
      }
    },

    events: {
      setInputFocus: 'setInputFocusEvent',
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

      setDimension: 'setDimensionEvent',

      startAudioPlay: 'startAudioPlayEvent'
    },

    uiState: {
      root: { name: 'root', url: '/root' },
      home: { name: 'root.home', url: '/home', component: 'appHome' },
      levelsHome: { name: 'root.levelshome', url: '/levelshome', component: 'levelsHome' },
      levels: { name: 'root.levels', url: '/level/{levelid}', component: 'appLevels' },
      books: { name: 'root.levels.books', url: '/{pagenum}', component: 'appBooks' },
      alphaList: { name: 'root.alphalist', url: '/alphalist/{levelid}/{pagenum}', component: 'alphaList' },
      listPractice: { name: 'root.listpractice', url: '/listpractice/{levelid}/{pagenum}', component: 'listPractice' },
      alphaVariant: { name: 'root.alphavariant', url: '/alphavariant/{levelid}/{pagenum}', component: 'alphaVariant' },
      variantPractice: { name: 'root.variantpractice', url: '/variantpractice/{levelid}/{pagenum}', component: 'variantPractice' },
      wordBegin: { name: 'root.wordbegin', url: '/wordbegin/{levelid}/{pagenum}', component: 'wordBegin' },
      wordBeginPractice: { name: 'root.wordbeginpractice', url: '/wordbeginpractice/{levelid}/{pagenum}', component: 'wordbeginPractice' }
    },

    //  set value in util file, and cache value.
    bookPagesName: {},
    bookPaths: {},

    // set value in util file, and cache all books json data.
    booksJson: {},

    ajax: function (url) {
      return function ($http) {
        return $http.get(url, { cache: true })
          .then(function (resp) {
            return resp.data;
          });
      };
    }

  };

  // Define the `core.config` module
  angular.module('core.config', [])
    .constant('Config', config);

})();
