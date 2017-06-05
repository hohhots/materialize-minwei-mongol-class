'use strict';

(function($, angular) {
  // Define the `header` module
  angular.module('footer', ['core.json']);

  // Register `headerList` component, along with its associated controller and template
  angular
    .module('footer')
    .component('appFooter', {
      templateUrl: template,
      controller: ['Json', '$scope', appFooterController]
    });

    function template() {
      return 'scripts/footer/footer.template.html';
    }

    function appFooterController(json, scope) {
      var self = this;

      self.jsons = json;
    }

})(jQuery, window.angular);
