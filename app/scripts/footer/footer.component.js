'use strict';

// Define the `header` module
angular.module('footer', ['core.json']);

// Register `headerList` component, along with its associated controller and template
angular
  .module('footer')
  .component('appFooter', {
    templateUrl: 'scripts/footer/footer.template.html',
    controller: ['Json', '$scope', appFooterController]
  });

  function appFooterController(json, scope) {
    var self = this;

    self.jsons = json;
  }
