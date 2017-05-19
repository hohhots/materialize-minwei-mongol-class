'use strict';

// Define the `core.config` module
angular.module('core.config', []);

angular.
  module('core.config').
  factory('config', ['$http', appConfig]);

function appConfig($http) {
  var service = {
    rootDataPath: "data"
  };

  return service;
};
