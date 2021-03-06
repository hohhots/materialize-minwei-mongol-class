'use strict';

(function () {

  var wordContainerCellClass = '.word-container-cell';

  var codeToWordMaps = {};

  var unicodeMap = {
    a10: 'e400', a11: 'e401', a14: 'e402', a17: 'e403', a18: 'e404',
    a20: 'e409', a21: 'e40a',
    a30: 'e413', a31: 'e414', a34: 'e415', a35: 'e416', a37: 'e417',
    a40: 'e41d', a41: 'e41e', a44: 'e41f', a47: 'e420',
    a60: 'e427', a61: 'e428',

    n00: 'e431',
    n10: 'e432', n11: 'e433', n14: 'e434', n17: 'e435', n18: 'e436',
    n30: 'e43b', n31: 'e43c', n34: 'e43d', n37: 'e43e',
    n40: 'e445', n41: 'e446', n44: 'e447', n47: 'e448',
    n60: 'e44f', n61: 'e450',

    b00: 'e45a',
    b10: 'e459', b11: 'e45a', b14: 'e45b', b17: 'e45c',
    b30: 'e463', b31: 'e464', b34: 'e465', b37: 'e466',
    b40: 'e46d', b41: 'e46e', b44: 'e46f', b47: 'e470',
    b60: 'e477', b61: 'e478',

    p00: 'e47c',
    p10: 'e47b', p11: 'e47c', p14: 'e47d', p17: 'e47e',
    p30: 'e483', p31: 'e484', p34: 'e485', p37: 'e486',
    p40: 'e48a', p41: 'e48b', p44: 'e48c', p47: 'e48d',
    p60: 'e491', p61: 'e492',

    h00: 'e495',
    h10: 'e496', h11: 'e497', h14: 'e498', h17: 'e499',
    h20: 'e49d', h21: 'e49e', h24: 'e49f', h27: 'e4a0',
    h30: 'e4a3', h31: 'e4a4', h34: 'e4a5', h37: 'e4a6',
    h40: 'e4a9', h41: 'e4aa', h44: 'e4ab', h47: 'e4ac',
    h60: 'e4af', h61: 'e4b0', h64: 'e4b1', h67: 'e4b2',

    g00: 'e4b4',
    g10: 'e4b5', g11: 'e4b6', g14: 'e4b7', g17: 'e4b8',
    g40: 'e4bb', g41: 'e4bc', g44: 'e4bd', g47: 'e4be',

    m00: 'e4c0',
    m10: 'e4c1', m11: 'e4c2', m14: 'e4c3', m17: 'e4c4', m18: 'e4c5',
    m30: 'e4c8', m31: 'e4c9', m34: 'e4ca', m37: 'e4cb',
    m40: 'e4ce', m41: 'e4cf', m44: 'e4d0', m47: 'e4d1',
    m60: 'e4d4', m61: 'e4d5',

    l00: 'e4d7',
    l10: 'e4d8', l11: 'e4d9', l14: 'e4da', l17: 'e4db', l18: 'e4dc',
    l30: 'e4df', l31: 'e4e0', l34: 'e4e1', l37: 'e4e2',
    l40: 'e4e5', l41: 'e4e6', l44: 'e4e7', l47: 'e4e8',
    l60: 'e4eb', l61: 'e4ec',

    s00: 'e4ee',
    s10: 'e4ef', s11: 'e4f0', s14: 'e4f1', s17: 'e4f2',
    s30: 'e4f5', s31: 'e4f6', s34: 'e4f7', s37: 'e4f8',
    s40: 'e4fb', s41: 'e4fc', s44: 'e4fd', s47: 'e4fe',
    s60: 'e501', s61: 'e502',

    x00: 'e504',
    x10: 'e505', x11: 'e506', x14: 'e507', x17: 'e508',
    x30: 'e50b', x31: 'e50c', x34: 'e50d', x37: 'e50e',
    x40: 'e511', x41: 'e512', x44: 'e513', x47: 'e514',
    x60: 'e517', x61: 'e518',

    t00: 'e51a',
    t10: 'e51b', t11: 'e51c', t14: 'e51d', t17: 'e51e',
    t30: 'e521', t31: 'e522', t34: 'e523', t37: 'e524',
    t40: 'e527', t41: 'e528', t44: 'e529', t47: 'e52a',
    t60: 'e52d', t61: 'e52e',

    d00: 'e530',
    d10: 'e531', d30: 'e533', d40: 'e535', d60: 'e537',

    q00: 'e538',
    q10: 'e539', q11: 'e53a', q14: 'e53b', q17: 'e53c',
    q30: 'e53f', q31: 'e540', q34: 'e541', q37: 'e542',
    q40: 'e544', q41: 'e545', q44: 'e546', q47: 'e547',
    q60: 'e54a', q61: 'e54b',

    j00: 'e54d',
    j10: 'e54e', j11: 'e54f', j14: 'e550', j17: 'e551',
    j30: 'e554', j31: 'e555', j34: 'e556', j37: 'e557',
    j40: 'e55a', j41: 'e55b', j44: 'e55c', j47: 'e55d',
    j60: 'e560', j61: 'e561',

    y00: 'e563',
    y10: 'e564', y11: 'e565', y14: 'e566', y17: 'e567', y18: 'e568',
    y30: 'e56b', y31: 'e56c', y34: 'e56d', y37: 'e56e',
    y40: 'e571', y41: 'e572', y44: 'e573', y47: 'e574',
    y60: 'e577', y61: 'e578',

    r00: 'e57a',
    r10: 'e57b', r11: 'e57c', r14: 'e57d', r17: 'e57e', r18: 'e57f',
    r30: 'e582', r31: 'e583', r34: 'e584', r37: 'e585',
    r40: 'e588', r41: 'e589', r44: 'e58a', r47: 'e58b',
    r60: 'e58e', r61: 'e58f',

    w00: 'e591',
    w10: 'e592', w11: 'e593', w14: 'e594', w17: 'e595', w18: 'e596',
    w21: 'e599', w24: 'e59a', w27: 'e59b',

    f00: 'e59f',
    f10: 'e59e', f11: 'e59f', f14: 'e5a0', f17: 'e5a1',
    f20: 'e5b5', f21: 'e5b6', f24: 'e5b7', f27: 'e5b8',
    f30: 'e5a4', f31: 'e5a5', f34: 'e5a6', f37: 'e5a7',
    f40: 'e5aa', f41: 'e5ab', f44: 'e5ac', f47: 'e5ad',
    f60: 'e5b0', f61: 'e5b1', f64: 'e5b2', f67: 'e5b3',

    k00: 'e5bc',
    k10: 'e5bb', k11: 'e5bc', k14: 'e5bd', k17: 'e5be',
    k20: 'e5c0', k21: 'e5c1', k24: 'e5c2', k27: 'e5c3', k28: 'e5c4',
    k30: 'e5c6', k31: 'e5c7', k34: 'e5c8', k37: 'e5c9',
    k40: 'e5cc', k41: 'e5cd', k44: 'e5ce', k47: 'e5cf',
    k60: 'e5d2', k61: 'e5d3', k64: 'e5d4', k67: 'e5d5',

    z00: 'e5f5',
    z10: 'e5f6', z11: 'e5f7', z14: 'e5f8', z17: 'e5f9',
    z20: 'e5fc', z21: 'e5fd', z24: 'e5fe', z27: 'e5ff', z28: 'e600',
    z30: 'e603', z31: 'e604', z34: 'e605', z37: 'e606',
    z40: 'e609', z41: 'e60a', z44: 'e60b', z47: 'e60c',
    z60: 'e60f', z61: 'e610', z64: 'e611', z67: 'e612',

    c00: 'e5d7',
    c10: 'e5d8', c11: 'e5d9', c14: 'e5da', c17: 'e5db',
    c20: 'e5de', c21: 'e5df', c24: 'e5e0', c27: 'e5e1', c28: 'e5e2',
    c30: 'e5e4', c31: 'e5e5', c34: 'e5e6', c37: 'e5e7',
    c40: 'e5ea', c41: 'e5eb', c44: 'e5ec', c47: 'e5ed',
    c60: 'e5f0', c61: 'e5f1', c64: 'e5f2', c67: 'e5f3',

    H00: 'e614',
    H10: 'e615', H11: 'e616', H14: 'e617', H17: 'e618',
    H20: 'e61b', H21: 'e61c', H24: 'e61d', H27: 'e61e',
    H30: 'e621', H31: 'e622', H34: 'e623', H37: 'e624',
    H40: 'e627', H41: 'e628', H44: 'e629', H47: 'e62a',
    H60: 'e62d', H61: 'e62e', H64: 'e62f', H67: 'e630',

    L00: 'e632',
    L10: 'e633', L11: 'e634', L14: 'e635', L17: 'e636',

    e10: 'e639', e11: 'e63b', e13: 'e63d', e14: 'e63f',

    A01: 'e641', A02: 'e643', A03: 'e645', A04: 'e647', A05: 'e649',
    A06: 'e64b', A07: 'e64d', A08: 'e64f', A09: 'e651', A10: 'e653',
    A11: 'e655', A12: 'e657', A15: 'e659', A16: 'e65b', A17: 'e65d',
    A18: 'e65e', A19: 'e660', A20: 'e661'
  };

  var alphaOriginNamesMap = {
    a5: 'a4', a7: 'a6',
    n2: 'n1', n5: 'n4', n7: 'n6',
    b2: 'b1', b5: 'b4', b7: 'b6',
    p2: 'p1', p5: 'p4', p7: 'p6',
    h5: 'h4', h7: 'h6',
    g2: 'h2', g3: 'h3', g5: 'g4', g6: 'h6', g7: 'h6',
    m2: 'm1', m5: 'm4', m7: 'm6',
    l2: 'l1', l5: 'l4', l7: 'l6',
    s2: 's1', s5: 's4', s7: 's6',
    x2: 'x1', x5: 'x4', x7: 'x6',
    t2: 't1', t5: 't4', t7: 't6',
    d2: 'd1', d5: 'd4', d7: 'd6',
    q2: 'q1', q5: 'q4', q7: 'q6',
    j2: 'j1', j5: 'j4', j7: 'j6',
    y2: 'y1', y5: 'y4', y7: 'y6',
    r2: 'r1', r5: 'r4', r7: 'r6',
    w2: 'w1',
    f5: 'f4', f7: 'f6',
    k5: 'k4', k7: 'k6',
    z5: 'z4', z7: 'z6',
    c5: 'c4', c7: 'c6',
    H5: 'H4', H7: 'H6'
  };

  var alphaVariantNamesMap1 = $.extend({}, alphaOriginNamesMap, {
    d1: 't1', d2: 't1', d3: 't3', d4: 't4', d5: 't4', d6: 't6', d7: 't6'
  });
  delete alphaVariantNamesMap1.w2;

  var alphaVariantNamesMap2 = {};
  var alphaVariantNamesMap3 = {};

  var alphaVariantNamesMap4 = $.extend({}, alphaVariantNamesMap1, {
    a2: 'a1', a5: 'a4', a6: 'a4', a7: 'a4',
    n6: 'n4', n7: 'n4',
    b6: 'b4', b7: 'b4',
    p6: 'p4', p7: 'p4',
    m6: 'm4', m7: 'm4',
    l6: 'l4', l7: 'l4',
    s6: 's4', s7: 's4',
    x6: 'x4', x7: 'x4',
    t6: 't4', t7: 't4',
    d6: 't4', d7: 't4',
    q6: 'q4', q7: 'q4',
    j6: 'j4', j7: 'j4',
    y6: 'y4', y7: 'y4',
    r6: 'r4', r7: 'r4'
  });

  var alphaVariantNamesMap5 = {};
  var alphaVariantNamesMap6 = {};

  var alphaVariantNamesMap7 = $.extend({},alphaVariantNamesMap4);
  var alphaVariantNamesMap8 = {};
  var alphaVariantNamesMap9 = {};

  var variantPosition = [0, 1, 4, 7];
  var vowelPosition = [1, 2, 3, 4, 5, 6, 7];
  var consnants = ['n', 'b', 'p', 'h', 'g', 'm', 'l', 's', 'x', 't', 'd', 'q', 'j', 'y', 'r', 'w', 'f', 'k', 'z', 'c', 'H', 'L'];
  var foreigns = ['e', 'f', 'k', 'z', 'c', 'H', 'L'];

  var fifth = {
    a35: 'a35'
  };

  var eighth = {
    a18: 'a18',
    n18: 'n18',
    n28: 'n18',
    m18: 'm18',
    m28: 'm18',
    l18: 'l18',
    l28: 'l18',
    y18: 'y18',
    y28: 'y18',
    r18: 'r18',
    r28: 'r18',
    w18: 'w18',
    k28: 'k28',
    z28: 'z28',
    c28: 'c28'
  };

  var halfAlphas = {
    A01: 'A01',
    A02: 'A02',
    A03: 'A03',
    A04: 'A04',
    A05: 'A05',
    A06: 'A06',
    A07: 'A07',
    A08: 'A08',
    A09: 'A09',
    A10: 'A10',
    A11: 'A11',
    A12: 'A12',
    A13: 'a14',
    A14: 'a17',
    A15: 'A15',
    A16: 'A16',
    A17: 'A17',
    A18: 'A18',
    A19: 'A19',
    A20: 'A20'
  };

  var foreignSingle = {
    e10: 'e10',
    e11: 'e11',
    e12: 'x30',
    e13: 'e13',
    e14: 'e14'
  };

  function createVowelPosition() {
    $.each(vowelPosition, function (voi, voPosition) {
      $.each(variantPosition, function (vai, vaPosition) {
        codeToWordMaps['a' + voPosition + vaPosition] = setAlphaMapName('a' + voPosition, vaPosition) + vaPosition;
      });
    });
  }

  function createConsnantHeadPosition() {
    $.each(consnants, function (ci, consnant) {
      var cons = consnant + '00';
      codeToWordMaps[consnant + 0 + 0] = consnant + '00';
    });
  }

  function createConsnantPosition() {
    createConsnantHeadPosition();
    
    $.each(vowelPosition, function (voi, voPosition) {
      $.each(consnants, function (ci, consnant) {
        // foreign 'L' has one alphas.
        if ((consnant === 'L') && ($.inArray(voPosition, [1]) === -1)) {
          return;
        }
        // consnant 'w' has two alphas.
        if ((consnant === 'w') && ($.inArray(voPosition, [1, 2]) === -1)) {
          return;
        }
        $.each(variantPosition, function (vai, vaPosition) {
          codeToWordMaps[consnant + voPosition + vaPosition] = setAlphaMapName(consnant + voPosition, vaPosition) + vaPosition;
        });
      });
    });

    addToWordMaps(fifth);
    addToWordMaps(eighth);
    addToWordMaps(halfAlphas);
    addToWordMaps(foreignSingle);
  }

  function addToWordMaps(alphas) {
    $.each(alphas, function (i, v) {
      codeToWordMaps[i] = v;
    });
  }

  function createWordsMap() {
    createVowelPosition();
    createConsnantPosition();

    // console.log(codeToWordMaps, Object.keys(codeToWordMaps).length);
  }

  function setMonWord(str, div) {
    $.each(codeToWordMaps, function (key, value) {
      var re = new RegExp(key, "g");
      if (div) {
        str = str.replace(re, '<span>' + String.fromCharCode(parseInt(unicodeMap[value], 16)) + '</span>');
      } else {
        str = str.replace(re, value);
      }
    });

    return str;
  }

  function getVowels() {
    return vowelPosition;
  }

  // origin a5 -> a4
  function setAlphaMapName(name, position) {
    position = position || 0;
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

    if (!temp) {
      temp = name;
    }

    return temp;
  }

  function getAlphaMapName(alphaName) {
    var temp = codeToWordMaps[alphaName];
    /* if (!temp) {
      temp = alphaName;
    } */
    return temp;
  }

  //alpha format is like 'a10' 'b20' 's30'
  function getAlphaAllVariants(alpha) {
    var prefix = alpha.substr(0, 2);
    var variants = [];

    for (var i = 0; i < 10; i++) {
      if (codeToWordMaps[prefix + i]) {
        variants.push(prefix + i);
      }
    }

    return variants;
  }

  // half format is like 'A01' 'A13'
  function getHalfVariants (half) {
    var position;
    var variants = [half];

    if (half.indexOf('A0') === -1) {
      position = half.substring(1);
    } else {
      position = half.substring(2);
    }
    position = parseInt(position, 10);

    if ((position + 1) >= 10) {
      variants.push('A' + (position + 1));
    } else {
      variants.push('A0' + (position + 1));
    }

    return variants;
  }

  function getHalfFirstVariant (half) {
    var name;
    var position;

    if (half.indexOf('A0') === -1) {
      position = half.substring(1);
    } else {
      position = half.substring(2);
    }
    position = parseInt(position, 10);

    if ((position % 2) == 0) {
      --position;
    }
    if (position >= 10) {
      name = 'A' + position;
    } else {
      name = 'A0' + position;
    }

    return name;
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
        //positionCode = k;
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
    var temp = setAlphaMapName(name, position);

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

  function wordHasHalfAlphas(word) {
    var has = false;

    if (word.indexOf('A') > -1) {
      has = true;
    }

    return has;
  }

  function wordHasForeignAlphas(word) {
    var has = false;

    $.each(foreigns, function (i, v) {
      if (word.indexOf(v) > -1) {
        has = true;
      }
    });

    return has;
  }

  var config = {
    wordContainerCellClass: wordContainerCellClass,
    template: "scripts/word/word.template.html",
    setAlphaMapName: setAlphaMapName,
    getVowels: getVowels,
    getAlphaAllVariants: getAlphaAllVariants,
    getUnicode: getUnicode,
    getMongolCode: getMongolCode,
    alphaCodeExist: alphaCodeExist,
    setMonWord: setMonWord,
    convertAlphaNameToCode: convertAlphaNameToCode,
    alphaPositions: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    getAlphaMapName: getAlphaMapName,
    wordHasHalfAlphas: wordHasHalfAlphas,
    getHalfVariants: getHalfVariants,
    getHalfFirstVariant: getHalfFirstVariant,
    wordHasForeignAlphas: wordHasForeignAlphas
  };

  createWordsMap();

  angular.module('app.word').
    constant('wordConfig', config);

})();