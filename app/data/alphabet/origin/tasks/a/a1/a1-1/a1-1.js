'use strict';

(function($, angular) {

  //angular.module('excercise', []);
  angular
    .module('subject')
    .component('appExcercise', {
      template: '<div ng-include="$ctrl.templateUrl"></div>',
      controller: [
        '$scope',
        controller]
    });

    function controller($scope) {
      var self = this;

      self.templateUrl = $scope.$parent.$ctrl.excerciseHtmlUrl;

      self.$onInit = function() {
        console.log(self.templateUrl);
      };

    }

})(jQuery, window.angular);
