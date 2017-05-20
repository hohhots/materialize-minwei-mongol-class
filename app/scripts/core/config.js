'use strict';

// Define the `core.config` module
angular.module('core.config', []);

angular.
  module('core.config').
  factory('Config',
    function appConfig() {
      var configData = {
        rootDataPath: "data",
        categoriesFile: "categories.json",
        contactFile: "contact.json",
        aboutFile: "contact.json",
      };

      return configData;
    }
  );
