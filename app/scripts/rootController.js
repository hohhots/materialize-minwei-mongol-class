(function(angular) {
  'use strict';

  angular.
    module('learnMongolApp').
    controller('rootController', ['$scope', rootController]);

    function rootController($scope) {
      var self = this;

      var bodyStyle = {overflowY: "auto"};

      self.getBodyStyle = function() {
        return bodyStyle;
      };

      self.setBodyStyle = function(style) {
        bodyStyle = style;
      };

      self.toggleBodyStyle = function() {
        if(bodyStyle.overflowY == "auto") {
          bodyStyle.overflowY = "hidden";
        } else {
          bodyStyle.overflowY = "auto";
        }
      };
    }
})(window.angular);
