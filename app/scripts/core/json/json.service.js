'use strict';

angular.
  module('core.json').
  factory('Json', ['$resource', function($resource) {
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

      var init = resource.query({}, function(data) {
          jsons.categories = data;

          $.each(data, function(i, val) {
            resource.query({path: val.dirName, jsonName: val.dirName}, function(data1) {
              jsons.subjects[val.id] = data1;
            });
          });
        });

      var getCategoryColor = function(id) {
        var color = "";

        $.each(jsons.categories, function(i, val) {
          if(id == val.id) {
            color = val.color;
          }
        });

        return color;
      };

      var jsons = {
        categories: [],
        subjects: {},
        getCategoryColor: getCategoryColor
      };

      return jsons;
    }
  ]);
