'use strict';

(function () {
  // Define the `header` module
  var app = angular.module('app.word');

  // Register `headerList` component, along with its associated controller and template
  app.component('mwordInput', {
    template: '<div ng-include="$ctrl.templateUrl" class="word-outerContainer"></div>',
    bindings: {
      origintext: '@'
    },
    controller: [
      '$scope',
      '$sce',
      '$element',
      '$interval',
      'Config',
      'wordConfig',
      'Util',
      'Json',
      controller]
  });

  function controller($scope, $sce, $element, $interval, config, wordConfig, util, json) {
    var self = this;

    //define self variables
    self.templateUrl = config.templateUrl.mwordInput;
    self.showElement = false;
    self.inputStyle = {};

    self.$postLink = function () {
      var dd = $interval(function () {
        if (!parentElem.length || !container.length || !input.length) {
          parentElem = $element.parent();
          input = $element.find('input');
          container = input.parent();
          return;
        }

        input.val(originUnicode);

        $interval.cancel(dd);
      }, 10);
    };

    var parentElem = [];
    var container = [];
    var input = [];
    var preventDefaultKeyCodes = [38, 40];
    var eventSetted = false;
    // Save input unicode value.
    var originUnicode = '';

    function setDimension(event) {
      self.showElement = true;

      container.css('boxSizing', 'content-box');
      container.width(parentElem.css('height'));
      container.height(parentElem.css('Width'));

      setInnerEvent();

      input.focus();
    };

    function setInnerEvent() {
      if (!eventSetted) {
        eventSetted = true;
        input.focus(inputFocued);
        input.blur(inputBlured);
        input.keydown(inputKeydown);
        input.keypress(inputKeypress);
        input.keyup(inputKeyup);
      }
    }

    function inputFocued(event) {
      preventDefault(event);
    }

    function inputBlured(event) {
      preventDefault(event);
    }

    function inputKeydown(event) {

      var code = util.getEventKeyCode(event); //to support both methods;

      if (preventDefaultKeyCodes.includes(code)) {
        event.preventDefault();
      }

      if (code == 38) {
        previousAlpha();
      }

      if (code == 40) {
        nextAlpha();
      }
    }

    function inputKeypress(event) {
      preventDefault(event);
    }

    function inputKeyup(event) {
      originUnicode = input.val();
    }

    function nextAlpha(position) {
      var currentCaretPosition = position;
      if (!position) {
        currentCaretPosition = input[0].selectionStart;
      }

      var nextPosition = currentCaretPosition + 1;
      if (nextPosition > input.val().length) {
        input.setCursorToTextEnd();
      } else {
        input.selectRange(nextPosition);
      }

    }

    function previousAlpha(position) {
      var currentCaretPosition = position;
      if (!position) {
        currentCaretPosition = input[0].selectionStart;
      }

      var previousPosition = currentCaretPosition - 1;
      if (previousPosition < 0) {
        input.selectRange(0);
      } else {
        input.selectRange(previousPosition);
      }

    }

    $.fn.setCursorToTextEnd = function () {
      var $initVal = this.val();
      this.val($initVal);
    };

    $.fn.selectRange = function (start, end) {
      if (end === undefined) {
        end = start;
      }
      return this.each(function () {
        if ('selectionStart' in this) {
          this.selectionStart = start;
          this.selectionEnd = end;
        } else if (this.setSelectionRange) {
          this.setSelectionRange(start, end);
        } else if (this.createTextRange) {
          var range = this.createTextRange();
          range.collapse(true);
          range.moveEnd('character', end);
          range.moveStart('character', start);
          range.select();
        }
      });
    };

    function preventDefault(event) {
      event.preventDefault();
      event.stopPropagation();
      var code = util.getEventKeyCode(event);
    }

    function setInputFocus(event) {
      input.focus();
    }

    function addImeAlpha(event, alpha) {
      addAlphaUnicode(alpha);
    }

    function addAlphaUnicode(alpha) {
      input.focus();

      var position = input[0].selectionStart;
      var val = input.val();
      originUnicode = val.substr(0, position) + String.fromCharCode('0x' + wordConfig.getUnicode(alpha)) + val.substr(position);
      input.val(originUnicode);
      nextAlpha(position);
    }

    function backAlphaUnicode() {
      input.focus();

      var position = input[0].selectionStart;
      var val = input.val();
      input.val(val.substr(0, position - 1) + val.substr(position));
      previousAlpha(position);
    }

    function backSpace() {
      backAlphaUnicode();

      inputKeyup();
    }

    function closeIme(event, done) {
      var word = input.val();
      var codes = '';
      // If done is true, emit input value.
      if (done) {
        for (var i = 0; i < word.length; i++) {
          codes += wordConfig.getMongolCode(word[i]);
        }

        $scope.$emit(config.events.wordImeDone, codes);
      }

      originUnicode = '';
      input.val(originUnicode);
    }

    // add listener and hold on to deregister function
    var deregister = [];
    deregister.push($scope.$on(config.events.setDimension, setDimension));
    deregister.push($scope.$on(config.events.setInputFocus, setInputFocus));
    deregister.push($scope.$on(config.events.wordInputBackSpace, backSpace));
    deregister.push($scope.$on(config.events.setImeAlpha, addImeAlpha));
    deregister.push($scope.$on(config.events.closeIme, closeIme));

    // clean up listener when directive's scope is destroyed
    $.each(deregister, function (i, val) {
      $scope.$on('$destroy', val);
    });
  };
})();