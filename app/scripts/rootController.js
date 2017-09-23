(function() {
  'use strict';

  angular.
    module('app').
    controller('rootController', ['$scope', rootController]);

    function rootController($scope) {
      var self = this;

      var bodyStyle = {overflowY: "auto"};

      // body style change trigger element
      var triggerElem = {};

      self.getBodyStyle = function() {
        return bodyStyle;
      };

      self.setBodyStyle = function(style) {
        bodyStyle = style;
      };

      self.toggleBodyStyle = function(e) {
        if(bodyStyle.overflowY == "auto") {
          bodyStyle.overflowY = "hidden";
          triggerElem = e.currentTarget;
        } else {
          // If trigger is same dom element with previous trigger
          if(triggerElem === e.currentTarget) {
            bodyStyle.overflowY = "auto";
            triggerElem = {};
          }
        }
      };
    }
})();
