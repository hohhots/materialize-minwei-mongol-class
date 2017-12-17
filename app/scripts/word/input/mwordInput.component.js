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
    self.containerStyle = {};
    self.inputStyle = {};

    var parentElem;
    var input;
    var preventDefaultKeyCodes = [37,38,39,40];

    function setDimension() {
      self.showElement = true;

      var dd = $interval(function () {
        if (!parentElem || !input) {
          parentElem = $element.parent();
          input = $element.find('input');
        } else {
          console.log('find');
          return;
        }
        input.val("");
        console.log(input[0].selectionStart);
        var ow = parentElem.css('Width');
        var oh = parentElem.css('height');

        //self.containerStyle.position = "absolute";
        self.containerStyle.boxSizing = 'content-box';
        self.containerStyle.width = parentElem.css('height');
        self.containerStyle.height = parentElem.css('Width');

        self.inputStyle.position = "absolute";
        self.inputStyle.top = 0;
        self.inputStyle.left = 0;

        setInnerEvent();

        $interval.cancel(dd);

      }, 20);
    };

    function setInnerEvent() {
      input.focus(inputFocued);
      input.keydown(inputKeydown);
      input.keypress(inputKeypress);
      input.keyup(inputKeyup);
    }

    function inputFocued(event) {
      event.stopPropagation();
      $scope.$emit(config.events.mwordInputFocused);
    }

    function inputKeydown(event) {

      var code = (event.keyCode ? event.keyCode : event.which); //to support both methods;


      if (preventDefaultKeyCodes.includes(code)) {
        event.preventDefault();      
      }

      if (code == 38) {
        previousAlpha();
      }

      if (code == 40) {
        nextAlpha();
      }

      console.log(code);
    }

    function inputKeypress(event) {
      event.preventDefault();
      event.stopPropagation();
      console.log('press');
    }

    function inputKeyup(event) {
      event.preventDefault();
      event.stopPropagation();
      console.log('up');
    }

    function nextAlpha() {
      var currentCaretPosition = input[0].selectionStart;

      var nextPosition = currentCaretPosition + 1;
      if (nextPosition < 0) {
        input.setCursorToTextEnd();
      } else {
        input.selectRange(nextPosition);
      }
    }

    function previousAlpha() {
      var currentCaretPosition = input[0].selectionStart;

      var previousPosition = currentCaretPosition - 1;
      console.log(input.selectionStart);
      if (previousPosition < 0) {
        input.selectRange(0);
      } else {
        input.selectRange(previousPosition);
      }
    }

    $.fn.setCursorToTextEnd = function () {
      var $initialVal = this.val();
      this.val($initialVal);
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

    // add listener and hold on to deregister function
    var deregister = [];
    deregister.push($scope.$on(config.events.setDimension, setDimension));
    //deregister.push($scope.$on(config.events.setDimension, getWordSpan));

    // clean up listener when directive's scope is destroyed
    $.each(deregister, function (i, val) {
      $scope.$on('$destroy', val);
    });
  };
})();