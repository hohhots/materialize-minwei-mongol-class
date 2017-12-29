'use strict';

(function () {

  var wordContainerCellClass = '.word-container-cell';

  var mongolPrefix = '<span class="';
  var mongolSuffix = '"></span>';

  var unicodeMap = {
    a: 'e9d6', a1: 'e9d7', a2: 'e9d8', a3: 'e9d9',
    e: 'e9da', e1: 'e9db',
    i: 'e9dc', i1: 'e9dd', i2: 'e9de', i3: 'e9df',
    o: 'e9e0', o1: 'e9e1', o2: 'e9e2', o3: 'e9e3',
    u: 'e9e4', u1: 'e9e5',

    na: 'e9c7', na1: 'e9c8', na2: 'e9c9', na3: 'e9ca', na4: 'e9cb',
    ni: 'e9cc', ni1: 'e9cd', ni2: 'e9ce', ni3: 'e9cf',
    no: 'e9d0', no1: 'e9d1', no2: 'e9d2', no3: 'e9d3',
    nu: 'e9d4', nu1: 'e9d5',

    ba: 'e9b9', ba1: 'e9ba', ba2: 'e9bb', ba3: 'e9bc',
    bi: 'e9bd', bi1: 'e9be', bi2: 'e9bf', bi3: 'e9c0',
    bo: 'e9c1', bo1: 'e9c2', bo2: 'e9c3', bo3: 'e9c4',
    bu: 'e9c5', bu1: 'e9c6',

    pa: 'e9ab', pa1: 'e9ac', pa2: 'e9ad', pa3: 'e9ae',
    pi: 'e9af', pi1: 'e9b0', pi2: 'e9b1', pi3: 'e9b2',
    po: 'e9b3', po1: 'e9b4', po2: 'e9b5', po3: 'e9b6',
    pu: 'e9b7', pu1: 'e9b8',

    ha: 'e997', ha1: 'e998', ha2: 'e999', ha3: 'e99a',
    he: 'e99b', he1: 'e99c', he2: 'e99d', he3: 'e99e',
    hi: 'e99f', hi1: 'e9a0', hi2: 'e9a1', hi3: 'e9a2',
    ho: 'e9a3', ho1: 'e9a4', ho2: 'e9a5', ho3: 'e9a6',
    hu: 'e9a7', hu1: 'e9a8', hu2: 'e9a9', hu3: 'e9aa',

    ga: 'e98f', ga1: 'e990', ga2: 'e991', ga3: 'e992',
    go: 'e993', go1: 'e994', go2: 'e995', go3: 'e996',

    ma: 'e980', ma1: 'e981', ma2: 'e982', ma3: 'e984', ma4: 'e983',
    mi: 'e985', mi1: 'e986', mi2: 'e987', mi3: 'e988',
    mo: 'e989', mo1: 'e98a', mo2: 'e98b', mo3: 'e98c',
    mu: 'e98d', mu1: 'e98e',

    la: 'e971', la1: 'e972', la2: 'e973', la3: 'e974', la4: 'e975',
    li: 'e976', li1: 'e977', li2: 'e978', li3: 'e979',
    lo: 'e97a', lo1: 'e97b', lo2: 'e97c', lo3: 'e97d',
    lu: 'e97e', lu1: 'e97f',

    sa: 'e963', sa1: 'e964', sa2: 'e965', sa3: 'e966',
    si: 'e967', si1: 'e968', si2: 'e969', si3: 'e96a',
    so: 'e96b', so1: 'e96c', so2: 'e96d', so3: 'e96e',
    su: 'e96f', su1: 'e970',

    xa: 'e955', xa1: 'e956', xa2: 'e957', xa3: 'e958',
    xi: 'e959', xi1: 'e95a', xi2: 'e95b', xi3: 'e95c',
    xo: 'e95d', xo1: 'e95e', xo2: 'e95f', xo3: 'e960',
    xu: 'e961', xu1: 'e962',

    ta: 'e947', ta1: 'e948', ta2: 'e949', ta3: 'e94a',
    ti: 'e94b', ti1: 'e94c', ti2: 'e94d', ti3: 'e94e',
    to: 'e94f', to1: 'e950', to2: 'e951', to3: 'e952',
    tu: 'e953', tu1: 'e954',

    da: 'e93f', da1: 'e940',
    di: 'e941', di1: 'e942',
    do: 'e943', do1: 'e944',
    du: 'e945', du1: 'e946',

    qa: 'e931', qa1: 'e932', qa2: 'e933', qa3: 'e934',
    qi: 'e935', qi1: 'e936', qi2: 'e937', qi3: 'e938',
    qo: '1f332', qo1: 'e93a', qo2: 'e93b', qo3: 'e93c',
    qu: 'e93d', qu1: 'e93e',

    ja: 'e923', ja1: 'e924', ja2: 'e925', ja3: 'e926',
    ji: 'e927', ji1: 'e928', ji2: 'e929', ji3: 'e92a',
    jo: 'e92b', jo1: 'e92c', jo2: 'e92d', jo3: 'e92e',
    ju: 'e92f', ju1: 'e930',

    ya: 'e914', ya1: 'e915', ya2: 'e916', ya3: 'e917', ya4: 'e918',
    yi: 'e919', yi1: 'e91a', yi2: 'e91b', yi3: 'e91c',
    yo: 'e91d', yo1: 'e91e', yo2: 'e91f', yo3: 'e920',
    yu: 'e921', yu1: 'e922',

    ra: 'e905', ra1: 'e906', ra2: 'e907', ra3: 'e908', ra4: 'e909',
    ri: 'e90a', ri1: 'e90b', ri2: 'e90c', ri3: 'e90d',
    ro: 'e90e', ro1: 'e90f', ro2: 'e910', ro3: 'e911',
    ru: 'e912', ru1: 'e913',

    wa: 'e900', wa1: 'e901', wa2: 'e902', wa3: 'e903', wa4: 'e904'
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
  var alphaVariantNamesMap3 = alphaVariantNamesMap2;//{};

  /**var result = alphaVariantNamesMap3, key, obj = alphaVariantNamesMap2;
  for (key in obj) {
    if (obj.hasOwnProperty(key) && (key !== 'we')) {
      result[key] = obj[key];
    }
  }
  **/

  function setMonWord(str) {
    $.each(config.wordToReplaceMap, function (key, value) {
      var replace = key;
      var re = new RegExp(replace, "g");
      str = str.replace(re, '<span class="hawang-' + value + '"></span>');
    });

    return str;
  }

  function convertAlphas(code) {
    var position = code.substring(code.length - 1);
    var name = code.substring(0, code.length - 1);
    var converted = '';

    switch (position) {
      case '0':
        converted = alphaVariantNamesMap1[name];
        break;
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
      converted = code;
    }

    if (converted.substring(converted.length - 1) == '0') {
      converted = converted.substring(0, converted.length - 1);
    }

    return converted;
  };

  var fontPosition = [0, 1, 2, 3];
  var vowels = ['a', 'e', 'i', 'o', 'o2', 'u', 'u2'];
  var consnants = ['n', 'b', 'p', 'h', 'g', 'm', 'l', 's', 'x', 't', 'd', 'q', 'j', 'y', 'r', 'w'];

  function getVowels() {
    return vowels;
  };

  function createVowelPosition() {
    $.each(vowels, function (index, vowel) {
      $.each(fontPosition, function (index1, position) {
        config.wordToReplaceMap['a' + (index + 1) + position] = convertAlphas(vowel + position);
      });
    });
  }

  function createConsnantPosition() {
    $.each(vowels, function (index, vowel) {
      $.each(consnants, function (index1, letter) {
        // Letter 'w' has two alphas.
        if ((letter == 'w') && ($.inArray(vowel, ['a', 'e']) == -1)) {
          return;
        }
        $.each(fontPosition, function (index2, position) {
          config.wordToReplaceMap[letter + (index + 1) + position] = convertAlphas(letter + vowel + position);
        });
      });
    });
  }

  function createFourthAlphas() {
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
  }

  function getAlphaAllVariants(listalpha) {
    var prefix = listalpha.substr(0, 2);
    var lists = [listalpha, prefix + '1', prefix + '2', prefix + '3'];
    if (config.wordToReplaceMap[prefix + '4']) {
      lists.push(prefix + '4');
    }
    return lists;
  }

  // Convert a11 to e9da
  function getUnicode(alpha) {
    return unicodeMap[config.wordToReplaceMap[alpha]];
  }

  // Convert e9da to a11
  function getMongolCode(unicode) {
    var code = '';
    var positionCode = '';
    $.each(unicodeMap, function (k, v) {
      if (unicode.charCodeAt(0).toString(16) == v) {
        positionCode = k;
        $.each(config.wordToReplaceMap, function (k1, v1) {
          if (k == v1) {
            code = k1;
            // Exit each() loop.
            return false;
          }
        });
        // Exit each() loop.
        return false;
      }
    });
    return code;
  }

  var config = {
    wordContainerCellClass: wordContainerCellClass,
    template: "scripts/word/word.template.html",
    wordToReplaceMap: {},
    getVowels: getVowels,
    getAlphaAllVariants: getAlphaAllVariants,
    getUnicode: getUnicode,
    getMongolCode: getMongolCode,
    setMonWord: setMonWord
  };

  createVowelPosition();
  createConsnantPosition();

  createFourthAlphas();

  console.log(config.wordToReplaceMap);
  angular.module('app.word').
    constant('wordConfig', config);

})();