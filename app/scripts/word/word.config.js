'use strict';

(function () {

  var wordContainerCellClass = '.word-container-cell';

  var mongolPrefix = '<span class="';
  var mongolSuffix = '"></span>';

  var unicodeMap = {
    a: 'e400', a1: 'e401', a2: 'e402', a3: 'e403', a4: 'e404',
    e: 'e409', e1: 'e40a',
    i: 'e413', i1: 'e414', i2: 'e415', i3: 'e416',
    o: 'e41e', o1: 'e41f', o2: 'e420', o3: 'e421',
    u: 'e427', u1: 'e428',

    na: 'e432', na1: 'e433', na2: 'e434', na3: 'e435', na4: 'e436',
    ni: 'e43b', ni1: 'e43c', ni2: 'e43d', ni3: 'e43e',
    no: 'e445', no1: 'e446', no2: 'e447', no3: 'e448',
    nu: 'e44f', nu1: 'e450',

    ba: 'e459', ba1: 'e45a', ba2: 'e45b', ba3: 'e45c',
    bi: 'e463', bi1: 'e464', bi2: 'e465', bi3: 'e466',
    bo: 'e46d', bo1: 'e46e', bo2: 'e46f', bo3: 'e470',
    bu: 'e477', bu1: 'e478',

    pa: 'e47b', pa1: 'e47c', pa2: 'e47d', pa3: 'e47e',
    pi: 'e483', pi1: 'e484', pi2: 'e485', pi3: 'e486',
    po: 'e48a', po1: 'e48b', po2: 'e48c', po3: 'e48d',
    pu: 'e491', pu1: 'e492',

    ha: 'e496', ha1: 'e497', ha2: 'e498', ha3: 'e499',
    he: 'e49d', he1: 'e49e', he2: 'e49f', he3: 'e4a0',
    hi: 'e4a3', hi1: 'e4a4', hi2: 'e4a5', hi3: 'e4a6',
    ho: 'e4a9', ho1: 'e4aa', ho2: 'e4ab', ho3: 'e4ac',
    hu: 'e4af', hu1: 'e4b0', hu2: 'e4b1', hu3: 'e4b2',

    ga: 'e4b5', ga1: 'e4b6', ga2: 'e4b7', ga3: 'e4b8',
    go: 'e4bb', go1: 'e4bc', go2: 'e4bd', go3: 'e4be',

    ma: 'e4c1', ma1: 'e4c2', ma2: 'e4c3', ma3: 'e4c4', ma4: 'e4c5',
    mi: 'e4c8', mi1: 'e4c9', mi2: 'e4ca', mi3: 'e4cb',
    mo: 'e4ce', mo1: 'e4cf', mo2: 'e4d0', mo3: 'e4d1',
    mu: 'e4d4', mu1: 'e4d5',

    la: 'e4d8', la1: 'e4d9', la2: 'e4da', la3: 'e4db', la4: 'e4dc',
    li: 'e4df', li1: 'e4e0', li2: 'e4e1', li3: 'e4e2',
    lo: 'e4e5', lo1: 'e4e6', lo2: 'e4e7', lo3: '4e8',
    lu: 'e4eb', lu1: 'e4ec',

    sa: 'e4ef', sa1: 'e4f0', sa2: 'e4f1', sa3: 'e4f2',
    si: 'e4f5', si1: 'e4f6', si2: 'e4f7', si3: 'e4f8',
    so: 'e4fb', so1: 'e4fc', so2: 'e4fd', so3: 'e4fe',
    su: 'e501', su1: 'e502',

    xa: 'e505', xa1: 'e506', xa2: '507', xa3: 'e508',
    xi: 'e50b', xi1: 'e50c', xi2: 'e50d', xi3: 'e50e',
    xo: 'e511', xo1: 'e512', xo2: 'e513', xo3: 'e514',
    xu: 'e517', xu1: 'e518',

    ta: 'e51b', ta1: 'e51c', ta2: 'e51d', ta3: 'e94e',
    ti: 'e521', ti1: 'e522', ti2: 'e523', ti3: 'e524',
    to: 'e527', to1: 'e528', to2: 'e529', to3: 'e52a',
    tu: 'e52d', tu1: 'e52e',

    da: 'e531',// da1: 'e532',
    di: 'e533',// di1: 'e534',
    do: 'e535',// do1: 'e536',
    du: 'e537',// du1: 'e538',

    qa: 'e539', qa1: 'e53a', qa2: 'e53b', qa3: 'e53c',
    qi: 'e53f', qi1: 'e540', qi2: 'e541', qi3: 'e542',
    qo: 'e544', qo1: 'e545', qo2: 'e546', qo3: 'e547',
    qu: 'e54a', qu1: 'e54b',

    ja: 'e54e', ja1: 'e54f', ja2: 'e550', ja3: 'e551',
    ji: 'e554', ji1: 'e555', ji2: 'e556', ji3: 'e557',
    jo: 'e55a', jo1: 'e55b', jo2: 'e55c', jo3: 'e55d',
    ju: 'e560', ju1: 'e561',

    ya: 'e564', ya1: 'e565', ya2: 'e566', ya3: 'e567', ya4: 'e568',
    yi: 'e56b', yi1: 'e56c', yi2: 'e56d', yi3: 'e56e',
    yo: 'e571', yo1: 'e572', yo2: 'e573', yo3: 'e574',
    yu: 'e577', yu1: 'e578',

    ra: 'e57b', ra1: 'e57c', ra2: 'e57d', ra3: 'e57e', ra4: 'e57f',
    ri: 'e582', ri1: 'e583', ri2: 'e584', ri3: 'e585',
    ro: 'e588', ro1: 'e589', ro2: 'e58a', ro3: 'e58b',
    ru: 'e58e', ru1: 'e58f',

    wa: 'e592', wa1: 'e593', wa2: 'e594', wa3: 'e595', wa4: 'e596',
    we1: 'e599', we2: 'e59a', we3: 'e59b'
  };

  var alphaListNamesMap = {
    o2: 'o', u2: 'u',
    ne: 'na', no2: 'no', nu2: 'nu',
    be: 'ba', bo2: 'bo', bu2: 'bu',
    pe: 'pa', po2: 'po', pu2: 'pu',
    ho2: 'ho', hu2: 'hu',
    go2: 'go', gu2: 'gu',
    me: 'ma', mo2: 'mo', mu2: 'mu',
    le: 'la', lo2: 'lo', lu2: 'lu',
    se: 'sa', so2: 'so', su2: 'su',
    xe: 'xa', xo2: 'xo', xu2: 'xu',
    te: 'ta', to2: 'to', tu2: 'tu',
    de: 'da', do2: 'do', du2: 'du',
    qe: 'qa', qo2: 'qo', qu2: 'qu',
    je: 'ja', jo2: 'jo', ju2: 'ju',
    ye: 'ya', yo2: 'yo', yu2: 'yu',
    re: 'ra', ro2: 'ro', ru2: 'ru',
    we: 'wa'
  };

  var alphaVariantNamesMap1 = $.extend({}, alphaListNamesMap, {
    ge: 'he', gi: 'hi', gu: 'hu', gu2: 'hu'
  });
  var alphaVariantNamesMap2 = $.extend({}, alphaVariantNamesMap1, {
    e: 'a', u: 'o', u2: 'o',
    nu: 'no', nu2: 'no',
    bu: 'bo', bu2: 'bo',
    pu: 'po', pu2: 'po',
    mu: 'mo', mu2: 'mo',
    lu: 'lo', lu2: 'lo',
    su: 'so', su2: 'so',
    xu: 'xo', xu2: 'xo',
    tu: 'to', tu2: 'to',
    qu: 'qo', qu2: 'qo',
    ju: 'jo', ju2: 'jo',
    yu: 'yo', yu2: 'yo',
    ru: 'ro', ru2: 'ro'
  });
  var alphaVariantNamesMap3 = alphaVariantNamesMap2;

  function setMonWord(str, div) {
    $.each(config.wordToReplaceMap, function (key, value) {
      var replace = key;
      var re = new RegExp(key, "g");
      if (div) {
        str = str.replace(re, '<span class="hawang-' + value + '"></span>');
      } else {
        str = str.replace(re, value);
      }
    });

    return str;
  }

  // convert a0 a1 a2 a3 to a a1 a2 a3
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
    config.wordToReplaceMap['a14'] = 'a4';
    config.wordToReplaceMap['n14'] = 'na4';
    config.wordToReplaceMap['n24'] = 'na4';
    config.wordToReplaceMap['m14'] = 'ma4';
    config.wordToReplaceMap['m24'] = 'ma4';
    config.wordToReplaceMap['l14'] = 'la4';
    config.wordToReplaceMap['l24'] = 'la4';
    config.wordToReplaceMap['y14'] = 'ya4';
    config.wordToReplaceMap['y24'] = 'ya4';
    config.wordToReplaceMap['r14'] = 'ra4';
    config.wordToReplaceMap['r24'] = 'ra4';
    config.wordToReplaceMap['w14'] = 'wa4';
  }

  //listalpha format is like 'a10' 'b20' 's30'
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

  // 'name' format is like 'a' 'e' 'ji' 'go'
  // return 'a10' 'e10' 'j10' 'g40'
  function convertAlphaNameToCode(name) {
    var code = '';

    $.each(config.wordToReplaceMap, function (key, value) {
      if (value == name) {
        code = key;
        // exit each loop
        return false;
      }
    });

    return code;
  }

  function fourthAlphaExist(alpha) {
    if (config.wordToReplaceMap[alpha]) {
      return true;
    }
    return false;
  }

  var config = {
    wordContainerCellClass: wordContainerCellClass,
    template: "scripts/word/word.template.html",
    wordToReplaceMap: {},
    getVowels: getVowels,
    getAlphaAllVariants: getAlphaAllVariants,
    getUnicode: getUnicode,
    getMongolCode: getMongolCode,
    fourthAlphaExist: fourthAlphaExist,
    setMonWord: setMonWord,
    convertAlphaNameToCode: convertAlphaNameToCode
  };

  createVowelPosition();
  createConsnantPosition();

  createFourthAlphas();

  angular.module('app.word').
    constant('wordConfig', config);

})();