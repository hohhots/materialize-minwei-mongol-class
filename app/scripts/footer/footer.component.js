'use strict';

(function($, angular) {
  // Define the `header` module
  angular.module('footer', ['core.json']);

  // Register `headerList` component, along with its associated controller and template
  angular
    .module('footer')
    .component('appFooter', {
      template: '<div ng-include="$ctrl.templateUrl"></div>',
      controller: ['Config', 'Json', appFooterController]
    });

    function template() {
      return 'scripts/footer/footer.template.html';
    }

    function appFooterController(config, json) {
      var self = this;

      self.templateUrl = config.templateUrl.footer;

      self.jsons = json;
    }

})(jQuery, window.angular);
