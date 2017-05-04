'use strict';

angular.
  module('core.json').
  factory('Json', ['$resource',
    function($resource) {
      return $resource('data/:path/:jsonName.json', {}, {
        query: {
          method: 'GET',
          params: {
            path: '.',
            jsonName: 'main'
          },
          isArray: true
        }
      });
    }
  ]);
