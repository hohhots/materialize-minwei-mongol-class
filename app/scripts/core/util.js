'use strict';

(function ($) {
  // Define the `core.util` module
  var app = angular.module('core.util', [
    'core.config',
    'core.anchorScroll'
  ]);

  app.service('Util', ['$location', '$http', 'Config', 'wordConfig', 'anchorSmoothScroll', function ($location, $http, config, wordConfig, anchorScroll) {
    var isTouchScreen = 'init';

    var currentExerciseId = {};

    var currentBackgroundColor = '';

    var variantPracticePosition = {};

    var utils = {
      scrollToTop: function () {
        $('html, body').animate({ scrollTop: 0 }, 'fast');
      },

      gotoElement: function (eID) {
        // set the location.hash to the id of
        // the element you wish to scroll to.
        //$location.hash('bottom'`)`;

        // call $anchorScroll()
        anchorScroll.scrollTo(eID);
      },

      restoreBackgroundColor: function () {
        $('body').css('background', currentBackgroundColor);
      },

      setCurrentBackgroundColor: function () {
        currentBackgroundColor = $('body').css('background');
      },

      getRandomGender: function () {
        var gender = config.gender['man'];
        if (Math.random() >= 0.5) {
          gender = config.gender['woman'];
        }
        return gender;
      },

      convertAlphaName: function (alphaName, variantPosition) {
        variantPosition = variantPosition || 0;
        var temp = '';
        switch (variantPosition) {
          case 0:
            temp = wordConfig.alphaListNamesMap[alphaName];
            break;
          case 1:
            temp = wordConfig.alphaVariantNamesMap1[alphaName];
            break;
          case 2:
            temp = wordConfig.alphaVariantNamesMap2[alphaName];
            break;
          case 3:
            temp = wordConfig.alphaVariantNamesMap3[alphaName];
            break;
          case 4:
            temp = wordConfig.alphaVariantNamesMap4[alphaName];
            break;
          default:
        }
        if (temp) {
          alphaName = temp;
        }
        return alphaName;
      },

      convertVideoAlphaName: function (alphaName) {
        var temp = wordConfig.alphaOriginNamesMap[alphaName];
        if (temp) {
          alphaName = temp;
        }
        return alphaName;
      },

      // 'name' format is like 'a' 'e' 'ji' 'go'
      // return 'a10' 'e10' 'j10' 'g40'
      convertAlphaNameToCode: function (name) {
        return wordConfig.convertAlphaNameToCode(this.convertVideoAlphaName(name));
      },

      // 'name' format is like 'a' 'e' 'ji' 'go'
      // return 'a10' 'e10' 'j10' 'g40'
      convertVariantNameToCode: function (name, position) {
        var temp = wordConfig.convertAlphaNameToCode(this.convertAlphaName(name, position));

        if (temp != '') {
          temp = temp.substr(0, 2) + position;
        }

        if ((position == 4) && (!wordConfig.fourthAlphaExist(temp))) {
          temp = '';
        }

        return temp;
      },

      fourthAlphaExist: function (vowelName) {//console.log(vowelName);
        var temp = this.convertVariantNameToCode(vowelName, 4);//console.log(temp);
        if (wordConfig.fourthAlphaExist(temp)) {
          return true;
        }
        return false;
      },

      getPlayerIconClass: function (playedAudioId) {
        var css = "fa-play-circle-o w3-text-teal";
        if (playedAudioId) {
          css = "fa-stop-circle-o w3-text-red";
        }
        return css;
      },

      allAnswerCorrect: function (answerAlphas) {
        var correct = true;
        $.each(answerAlphas, function (i, v) {
          if (!v) { return; }
          if (v.error || !v.correct) {
            correct = false;
          }
        });
        return correct;
      },

      alphaAnswered: function (alpha) {
        if (!!alpha.error || !!alpha.correct) {
          return true;
        }
        return false;
      },

      allAlphaAnswered: function (answerAlphas) {
        //console.log(answerAlphas);
        var self = this;
        var ans = true;
        $.each(answerAlphas, function (i, alpha) {
          if (!self.alphaAnswered(alpha)) {
            ans = false;
            return false;
          }
        });
        return ans;
      },

      //for slide down and up animation,
      //elem is jquery element.
      //down, if down or up
      slideDownUp: function (elem, down) {
        if (down) {
          elem.slideDown();
        } else {
          elem.slideUp();
        }
      },

      // Determine if browse form touchable screen
      isTouchScreen: function () {
        if (isTouchScreen == 'init') {
          try {
            document.createEvent("TouchEvent");
            isTouchScreen = true;
          }
          catch (e) {
            isTouchScreen = false;
          }
        }

        return isTouchScreen;
      },

      getUrlPath: function (type) {
        var path = $location.path();
        if (type === 'category') {
          path = path.replace('/' + config.app.url + '/', '')
        }

        return path;
      },

      upperFirstLetter: function (str) {
        var f = str.substring(0, 1);
        return str.replace(f, f.toUpperCase());
      },

      changePath: function (path) {
        $location.path("/" + config.app.url + "/" + path);
      },

      convertUrl: function (url) {
        url = url ? url : '';

        return config.app.urlPrefix + "/" + config.app.url + "/" + url;
      },

      deconvertUrl: function (url) {
        url = url ? url : '';
        var pre = config.app.url + "/";
        return url.substring(+pre.length);
      },

      setAudio: function (path, audiosConfig) {
        var audios = {};

        $.each(audiosConfig.genderProfix, function (i, val) {
          if (!audios[val]) {
            audios[val] = {};
          }
          $.each(audiosConfig.audioProfix, function (j, v1) {
            audios[val][v1] = path + val + "." + v1;
          });
        });

        return audios;
      },

      setCurrentExerciseId: function (categoryId, subjectId, taskCategoryId, taskId, exerciseId) {
        if (!currentExerciseId[categoryId]) {
          currentExerciseId[categoryId] = {};
        }
        if (!currentExerciseId[categoryId][subjectId]) {
          currentExerciseId[categoryId][subjectId] = {};
        }
        if (!currentExerciseId[categoryId][subjectId][taskCategoryId]) {
          currentExerciseId[categoryId][subjectId][taskCategoryId] = {};
        }
        if (!currentExerciseId[categoryId][subjectId][taskCategoryId][taskId]) {
          currentExerciseId[categoryId][subjectId][taskCategoryId][taskId] = exerciseId;
        }

        return exerciseId;
      },

      getCurrentExerciseId: function (categoryId, subjectId, taskCategoryId, taskId) {
        try {
          if (!currentExerciseId[categoryId][subjectId][taskCategoryId][taskId]) {
            return 0;
          }
        } catch (err) {
          return 0;
        }

        return currentExerciseId[categoryId][subjectId][taskCategoryId][taskId];
      },

      //value form must like '88px'
      getNumOfDim: function (value) {
        return value.substr(0, value.lastIndexOf("p"));
      },

      // Get the key code that trigg event.
      getEventKeyCode: function (event) {
        return event.keyCode ? event.keyCode : event.which;
      },

      // Get levels directory hash names
      getLevelsJson: function (levelId) {
        var json = angular.copy(config.dataPath['appLevels']);

        json.data = json.data + levelId + '/main.json';
        return json;
      },

      // Set LvelsSubDirectoryHashNames
      setBookPagesName: function (levelId, hashNames) {
        if (!config.bookPagesName.levelId) {
          config.bookPagesName.levelId = hashNames;
        }
      },

      setBookPath: function (levelId, bookPath) {
        if (!config.bookPaths.levelId) {
          config.bookPaths.levelId = bookPath;
        }
      },

      getBookPagesName: function (levelid) {
        return config.bookPagesName.levelId;
      },

      getBookPath: function (levelid) {
        return config.bookPaths.levelId;
      },

      // call from other object, to set it's classes.
      setBook: function (self) {
        utils.self = self;
        var json = utils.getLevelsJson(self.levelid);
        if (!self.classes) {
          $http.get(json.data, { cache: true }).then(function (resp) {
            utils.classes = (resp.data)[0].pages;
            utils.setBookPagesName(self.levelid, utils.classes);
            utils.getJsonFile();
          });
        } else {
          utils.getJsonFile();
        }
      },

      getJsonFile: function () {
        var self = utils.self;
        var classes = utils.classes || self.classes;

        if (self.bookJson !== []) {
          var json = utils.getBooksUrl(self);
          $http.get(json, { cache: true }).then(utils.setJson);
        } else {
          self.setModels(classes, self.bookJson);
        }
      },

      setJson: function (resp) {
        var self = utils.self;
        var classes = utils.classes || self.classes;

        var json = (resp.data)[0];

        self.setModels(classes, json);

        utils.setBooksJson(self.levelid, self.pagenum, json);
      },

      getBooksUrl: function (self) {
        var classes = utils.classes || self.classes;
        var dataUrl = config.dataPath['appLevels'].data;
        var url = dataUrl + self.levelid + '/' + classes[self.pagenum - 1] + '.json';
        return url;
      },

      setBooksJson: function (levelid, classroomid, json) {
        if (!config.booksJson[levelid]) {
          config.booksJson[levelid] = {};
        }
        config.booksJson[levelid][classroomid] = json;
      },

      getBookJson: function (levelid, pagenum) {
        try {
          return config.booksJson.levelId.classroomid;
        } catch (error) {
          return '';
        }
      },

      getVariantPracticePosition: function(levelid, pagenum) {
        if (!variantPracticePosition[levelid]) {
          variantPracticePosition[levelid] = {};
        }
        var p = variantPracticePosition[levelid][pagenum];
        if(!p) {
          variantPracticePosition[levelid][pagenum] = 1;
        } else {
          if (p === 3) {
            variantPracticePosition[levelid][pagenum] = 1;
          } else {
            variantPracticePosition[levelid][pagenum] = ++p;
          }
        }
        return variantPracticePosition[levelid][pagenum];
      }
    };

    return utils;
  }
  ]);
})(jQuery);
