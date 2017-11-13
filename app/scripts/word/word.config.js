'use strict';

(function () {

  var mongolPrefix = '<span class="';
  var mongolSuffix = '"></span>';

  var setMonWord = function (str) {
    $.each(config.wordToReplaceMap, function (key, value) {
      var replace = key;
      var re = new RegExp(replace,"g");
      str = str.replace(re, '<span class="hawang-' + value + '"></span>');
    });

    return str;
  };

  var alphaListNamesMap = {
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
  };

  var alphaVariantNamesMap1 = $.extend({}, alphaListNamesMap, {
    ge: "he", gi: "hi", gu: "hu", gu2: "hu"
  });
  var alphaVariantNamesMap2 = $.extend({}, alphaVariantNamesMap1, {
    e: "a", u: "o", u2: "o",
    nu: "no", nu2: "no",
    bu: "bo", bu2: "bo",
    pu: "po", pu2: "po",
    mu: "mo", mu2: "mo",
    lu: "lo", lu2: "lo",
    su: "so", su2: "so",
    xu: "xo", xu2: "xo",
    tu: "to", tu2: "to",
    da: 'ta', de: 'ta', di: 'ti', do: 'to', do2: 'to', du: "to", du2: "to",
    qu: "qo", qu2: "qo",
    ju: "jo", ju2: "jo",
    yu: "yo", yu2: "yo",
    ru: "ro", ru2: "ro",
  });
  var alphaVariantNamesMap3 = {};

  var result = alphaVariantNamesMap3, key, obj = alphaVariantNamesMap2;
  for (key in obj) {
    if (obj.hasOwnProperty(key) && (key !== 'we')) {
      result[key] = obj[key];
    }
  }

  var convertAlphas = function (tag) {

    var position = tag.substring(tag.length - 1);
    var name = tag.substring(0, tag.length - 1);
    var converted = '';

    switch (position) {
      case '1':
        converted = alphaVariantNamesMap1[name];
        break;
      case '2':
        converted = alphaVariantNamesMap2[name];
        break;
      case '3':
        converted = alphaVariantNamesMap3[name];
        break;
      default:
        converted = alphaListNamesMap[name];
    }

    if (converted) {
      converted = converted + position;
    } else {
      converted = tag;
    }

    return converted;
  };

  var fontPosition = [1, 2, 3];
  var vowels = ['a', 'e', 'i', 'o', 'o2', 'u', 'u2'];
  var letters = ['a', 'n', 'b', 'p', 'h', 'g', 'm', 'l', 's', 'x', 't', 'd', 'q', 'j', 'y', 'r', 'w'];

  var createAlphaPosition = function (alpha) {
    $.each(vowels, function (index1, value1) {
      if ((alpha == letters[16]) && (index1 > 1)) {
        return;
      }
      $.each(fontPosition, function (index2, value2) {
        var va = alpha;
        if (alpha == value1) {
          value1 = '';
        }
        if ((index1 != 0) && (alpha == letters[0])) {
          va = '';
        }
        config.wordToReplaceMap[alpha + (index1 + 1) + value2] = convertAlphas(va + value1 + value2);
      });
    });
  };

  var createFourthAlphas = function () {
    config.wordToReplaceMap['n14'] = convertAlphas('na4');
    config.wordToReplaceMap['n24'] = convertAlphas('na4');
    config.wordToReplaceMap['m14'] = convertAlphas('ma4');
    config.wordToReplaceMap['m24'] = convertAlphas('ma4');
    config.wordToReplaceMap['l14'] = convertAlphas('la4');
    config.wordToReplaceMap['l24'] = convertAlphas('la4');
    config.wordToReplaceMap['y14'] = convertAlphas('ya4');
    config.wordToReplaceMap['y24'] = convertAlphas('ya4');
    config.wordToReplaceMap['r14'] = convertAlphas('ra4');
    config.wordToReplaceMap['r24'] = convertAlphas('ra4');
    config.wordToReplaceMap['w14'] = convertAlphas('wa4');
  };


  var config = {
    template: "scripts/word/word.template.html",
    wordToReplaceMap: {},
    setMonWord: setMonWord
  };


  $.each(letters, function (index, value) {
    var conv = value;
    if (value != vowels[0]) {
      conv = conv + vowels[0];
    }
    config.wordToReplaceMap[value + '00'] = conv;
    createAlphaPosition(value);
  });

  createFourthAlphas();

  //console.log(config.wordToReplaceMap);
  angular.module('app.word').
    constant('wordConfig', config);

})();