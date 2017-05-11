'use strict';

angular.
  module('core.json').
  factory('Json', ['$resource', '$q', function($resource, $q) {
      var resource = $resource('data/:path/:jsonName.json', {}, {
        query: {
          method: 'GET',
          params: {
            path: '.',
            jsonName: 'categories'
          },
          isArray: true
        }
      });

      var jsons = {
        categories: {},
        subjects: {}
      };

      resource.query({}, function(data) {
          $.each(data, function(i, val) {
            resource.query({path: val.dirName, jsonName: val.dirName}, function(data1) {
              jsons.categories[val.id] = val;
              jsons.subjects[val.id] = data1;
            });
          });
        }
      );

      return jsons;
    }
  ]);
