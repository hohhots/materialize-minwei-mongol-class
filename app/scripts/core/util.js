'use strict';

(function ($) {
  // Define the `core.util` module
  var app = angular.module('core.util', [
    'core.config'
  ]);

  app.service('Util', ['$location', 'Config', function ($location, config) {
    var isTouchScreen = 'init';

    var currentExerciseId = {};

    var utils = {
      scrollToTop: function () {
        $('html, body').animate({ scrollTop: 0 }, 'fast');
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
            temp = config.alphaListNamesMap[alphaName];
            break;
          case 1:
            temp = config.alphaVariantNamesMap1[alphaName];
            break;
          case 2:
            temp = config.alphaVariantNamesMap2[alphaName];
            break;
          case 3:
            temp = config.alphaVariantNamesMap3[alphaName];
            break;
          default:
        }
        if (temp) {
          alphaName = temp;
        }
        return alphaName;
      },

      convertVideoAlphaName: function (alphaName) {
        var temp = config.alphaVideoNamesMap[alphaName];
        if (temp) {
          alphaName = temp;
        }
        return alphaName;
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

      practiceDone: function (alphas) {
        var done = true;
        $.each(alphas, function (i, v) {
          if (!v.answered) {
            done = false;
          }
        });
        return done;
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

    };

    return utils;
  }
  ]);
})(jQuery);
