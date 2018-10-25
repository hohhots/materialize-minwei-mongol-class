'use strict';

(function () {

  var wordContainerCellClass = '.word-container-cell';

  var codeToWordMaps = {};

  var unicodeMap = {
    a: 'e400', a1: 'e401', a4: 'e402', a7: 'e403', a8: 'e404',
    e: 'e409', e1: 'e40a',
    i: 'e413', i1: 'e414', i4: 'e415', i7: 'e417',
    o: 'e41d', o1: 'e41e', o4: 'e41f', o7: 'e420',
    u: 'e427', u1: 'e428',

    na: 'e432', na1: 'e433', na4: 'e434', na7: 'e435', na8: 'e436',
    ni: 'e43b', ni1: 'e43c', ni4: 'e43d', ni7: 'e43e',
    no: 'e445', no1: 'e446', no4: 'e447', no7: 'e448',
    nu: 'e44f', nu1: 'e450',

    ba: 'e459', ba1: 'e45a', ba4: 'e45b', ba7: 'e45c',
    bi: 'e463', bi1: 'e464', bi4: 'e465', bi7: 'e466',
    bo: 'e46d', bo1: 'e46e', bo4: 'e46f', bo7: 'e470',
    bu: 'e477', bu1: 'e478',

    pa: 'e47b', pa1: 'e47c', pa4: 'e47d', pa7: 'e47e',
    pi: 'e483', pi1: 'e484', pi4: 'e485', pi7: 'e486',
    po: 'e48a', po1: 'e48b', po4: 'e48c', po7: 'e48d',
    pu: 'e491', pu1: 'e492',

    ha: 'e496', ha1: 'e497', ha4: 'e498', ha7: 'e499',
    he: 'e49d', he1: 'e49e', he4: 'e49f', he7: 'e4a0',
    hi: 'e4a3', hi1: 'e4a4', hi4: 'e4a5', hi7: 'e4a6',
    ho: 'e4a9', ho1: 'e4aa', ho4: 'e4ab', ho7: 'e4ac',
    hu: 'e4af', hu1: 'e4b0', hu4: 'e4b1', hu7: 'e4b2',

    ga: 'e4b5', ga1: 'e4b6', ga4: 'e4b7', ga7: 'e4b8',
    go: 'e4bb', go1: 'e4bc', go4: 'e4bd', go7: 'e4be',

    ma: 'e4c1', ma1: 'e4c2', ma4: 'e4c3', ma7: 'e4c4', ma8: 'e4c5',
    mi: 'e4c8', mi1: 'e4c9', mi4: 'e4ca', mi7: 'e4cb',
    mo: 'e4ce', mo1: 'e4cf', mo4: 'e4d0', mo7: 'e4d1',
    mu: 'e4d4', mu1: 'e4d5',

    la: 'e4d8', la1: 'e4d9', la4: 'e4da', la7: 'e4db', la8: 'e4dc',
    li: 'e4df', li1: 'e4e0', li4: 'e4e1', li7: 'e4e2',
    lo: 'e4e5', lo1: 'e4e6', lo4: 'e4e7', lo7: 'e4e8',
    lu: 'e4eb', lu1: 'e4ec',

    sa: 'e4ef', sa1: 'e4f0', sa4: 'e4f1', sa7: 'e4f2',
    si: 'e4f5', si1: 'e4f6', si4: 'e4f7', si7: 'e4f8',
    so: 'e4fb', so1: 'e4fc', so4: 'e4fd', so7: 'e4fe',
    su: 'e501', su1: 'e502',

    xa: 'e505', xa1: 'e506', xa4: 'e507', xa7: 'e508',
    xi: 'e50b', xi1: 'e50c', xi4: 'e50d', xi7: 'e50e',
    xo: 'e511', xo1: 'e512', xo4: 'e513', xo7: 'e514',
    xu: 'e517', xu1: 'e518',

    ta: 'e51b', ta1: 'e51c', ta4: 'e51d', ta7: 'e51e',
    ti: 'e521', ti1: 'e522', ti4: 'e523', ti7: 'e524',
    to: 'e527', to1: 'e528', to4: 'e529', to7: 'e52a',
    tu: 'e52d', tu1: 'e52e',

    da: 'e531', di: 'e533', do: 'e535', du: 'e537',

    qa: 'e539', qa1: 'e53a', qa4: 'e53b', qa7: 'e53c',
    qi: 'e53f', qi1: 'e540', qi4: 'e541', qi7: 'e542',
    qo: 'e544', qo1: 'e545', qo4: 'e546', qo7: 'e547',
    qu: 'e54a', qu1: 'e54b',

    ja: 'e54e', ja1: 'e54f', ja4: 'e550', ja7: 'e551',
    ji: 'e554', ji1: 'e555', ji4: 'e556', ji7: 'e557',
    jo: 'e55a', jo1: 'e55b', jo4: 'e55c', jo7: 'e55d',
    ju: 'e560', ju1: 'e561',

    ya: 'e564', ya1: 'e565', ya4: 'e566', ya7: 'e567', ya8: 'e568',
    yi: 'e56b', yi1: 'e56c', yi4: 'e56d', yi7: 'e56e',
    yo: 'e571', yo1: 'e572', yo4: 'e573', yo7: 'e574',
    yu: 'e577', yu1: 'e578',

    ra: 'e57b', ra1: 'e57c', ra4: 'e57d', ra7: 'e57e', ra8: 'e57f',
    ri: 'e582', ri1: 'e583', ri4: 'e584', ri7: 'e585',
    ro: 'e588', ro1: 'e589', ro4: 'e58a', ro7: 'e58b',
    ru: 'e58e', ru1: 'e58f',

    wa: 'e592', wa1: 'e593', wa4: 'e594', wa7: 'e595', wa8: 'e596',
    we1: 'e599', we4: 'e59a', we7: 'e59b'
  };

  var alphaOriginNamesMap = {
    o2: 'o', u2: 'u',
    ne: 'na', no2: 'no', nu2: 'nu',
    be: 'ba', bo2: 'bo', bu2: 'bu',
    pe: 'pa', po2: 'po', pu2: 'pu',
    ho2: 'ho', hu2: 'hu',
    ge: 'he', gi: 'hi', go2: 'go', gu: 'hu', gu2: 'hu',
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

  var alphaVariantNamesMap1 = $.extend({}, alphaOriginNamesMap, {
    da: 'ta', de: 'ta', di: 'ti', do: 'to', do2: 'to', du: 'tu', du2: 'tu'
  });
  delete alphaVariantNamesMap1.we;

  var alphaVariantNamesMap2 = {};
  var alphaVariantNamesMap3 = {};

  var alphaVariantNamesMap4 = $.extend({}, alphaVariantNamesMap1, {
    e: 'a', u: 'o', u2: 'o',
    nu: 'no', nu2: 'no',
    bu: 'bo', bu2: 'bo',
    pu: 'po', pu2: 'po',
    mu: 'mo', mu2: 'mo',
    lu: 'lo', lu2: 'lo',
    su: 'so', su2: 'so',
    xu: 'xo', xu2: 'xo',
    tu: 'to', tu2: 'to',
    du: 'to', du2: 'to',
    qu: 'qo', qu2: 'qo',
    ju: 'jo', ju2: 'jo',
    yu: 'yo', yu2: 'yo',
    ru: 'ro', ru2: 'ro'
  });

  var alphaVariantNamesMap5 = {};
  var alphaVariantNamesMap6 = {};

  var alphaVariantNamesMap7 = $.extend({},alphaVariantNamesMap4);
  var alphaVariantNamesMap8 = $.extend({},alphaVariantNamesMap4);
  var alphaVariantNamesMap9 = {};

  var fontPosition = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  var vowels = ['a', 'e', 'i', 'o', 'o2', 'u', 'u2'];
  var consnants = ['n', 'b', 'p', 'h', 'g', 'm', 'l', 's', 'x', 't', 'd', 'q', 'j', 'y', 'r', 'w'];

  function createVowelPosition() {
    $.each(vowels, function (index, vowel) {
      $.each(fontPosition, function (index1, position) {
        codeToWordMaps['a' + (index + 1) + position] = convertAlphas(vowel + position);
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
          codeToWordMaps[letter + (index + 1) + position] = convertAlphas(letter + vowel + position);
        });
      });
    });
  }

  function createEighthAlphas() {
    codeToWordMaps.a18 = 'a8';
    codeToWordMaps.n18 = 'na8';
    codeToWordMaps.n28 = 'na8';
    codeToWordMaps.m18 = 'ma8';
    codeToWordMaps.m28 = 'ma8';
    codeToWordMaps.l18 = 'la8';
    codeToWordMaps.l28 = 'la8';
    codeToWordMaps.y18 = 'ya8';
    codeToWordMaps.y28 = 'ya8';
    codeToWordMaps.r18 = 'ra8';
    codeToWordMaps.r28 = 'ra8';
    codeToWordMaps.w18 = 'wa8';
  }

  function createWordsMap() {
    createVowelPosition();
    createConsnantPosition();

    createEighthAlphas();
    console.log(codeToWordMaps, Object.keys(codeToWordMaps).length);
  }

  function setMonWord(str, div) {
    $.each(codeToWordMaps, function (key, value) {
      var re = new RegExp(key, "g");
      if (div) {
        str = str.replace(re, String.fromCharCode(parseInt(unicodeMap[value], 16)));
      } else {
        str = str.replace(re, value);
      }
    });

    return str;
  }

  function getVowels() {
    return vowels;
  }

  function getAlphaMapName(name, position) {
    position = parseInt(position, 10);
    var temp = '';

    switch (position) {
      case 0:
        temp = alphaOriginNamesMap[name];
        break;
      case 1:
        temp = alphaVariantNamesMap1[name];
        break;
      case 2:
        temp = alphaVariantNamesMap2[name];
        break;
      case 3:
        temp = alphaVariantNamesMap3[name];
        break;
      case 4:
        temp = alphaVariantNamesMap4[name];
        break;
      case 5:
        temp = alphaVariantNamesMap5[name];
        break;
      case 6:
        temp = alphaVariantNamesMap6[name];
        break;
      case 7:
        temp = alphaVariantNamesMap7[name];
        break;
      case 8:
        temp = alphaVariantNamesMap8[name];
        break;
      case 9:
        temp = alphaVariantNamesMap9[name];
        break;
      default:
    }

    return temp;
  }

  //listalpha format is like 'a10' 'b20' 's30'
  function getAlphaAllVariants(listalpha) {
    var prefix = listalpha.substr(0, 2);
    var lists = [listalpha, prefix + '1', prefix + '2', prefix + '3'];
    if (codeToWordMaps[prefix + '4']) {
      lists.push(prefix + '4');
    }
    return lists;
  }

  // Convert a11 to e9da
  function getUnicode(alpha) {
    return unicodeMap[codeToWordMaps[alpha]];
  }

  // Convert e9da to a11
  function getMongolCode(unicode) {
    var code = '';

    $.each(unicodeMap, function (k, v) {
      if (unicode.charCodeAt(0).toString(16) == v) {
        positionCode = k;
        $.each(codeToWordMaps, function (k1, v1) {
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

  // a0 a; a1 a1; a2 a2; a3 a3
  // be0 ba; be1 ba1; be2 ba2; be3 ba3
  function convertAlphas(code) {
    var name = code.substring(0, code.length - 1);
    var position = code.substring(code.length - 1);
    var temp = getAlphaMapName(name, position);

    if (temp) {
      temp += position;
    } else {
      temp = code;
    }

    if (temp.substring(temp.length - 1) == '0') {
      temp = temp.substring(0, temp.length - 1);
    }

    return temp;
  }

  function alphaCodeExist(alpha) {
    if (codeToWordMaps[alpha]) {
      return true;
    }
    return false;
  }

  // 'name' format is like 'a' 'e' 'ji' 'go'
  // return 'a10' 'e10' 'j10' 'g40'
  function convertAlphaNameToCode(name, position) {
    if (position) {
      name += position;
    }
    var code = '';

    $.each(codeToWordMaps, function (key, value) {
      if (value === name) {
        code = key;
        // exit each loop
        return false;
      }
    });

    return code;
  }

  var config = {
    wordContainerCellClass: wordContainerCellClass,
    template: "scripts/word/word.template.html",
    getAlphaMapName: getAlphaMapName,
    getVowels: getVowels,
    getAlphaAllVariants: getAlphaAllVariants,
    getUnicode: getUnicode,
    getMongolCode: getMongolCode,
    alphaCodeExist: alphaCodeExist,
    setMonWord: setMonWord,
    convertAlphaNameToCode: convertAlphaNameToCode
  };

  createWordsMap();

  angular.module('app.word').
    constant('wordConfig', config);

})();