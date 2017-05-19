'use strict';

// Define the `core.json` module
angular.module('core.json', ['ngResource']);

angular.
  module('core.json').
  factory('Json', ['$resource', appJson]);

function appJson($resource) {
  var resource = $resource('data/:path/:fileName.json', {}, {
    query: {
      method: 'GET',
      params: {
        path: '.',
        fileName: 'categories'
      },
      isArray: true
    }
  });

  var jsons = {
    categories: {},
    subjects: {},
    contacts: {},
    about: {}
  };

  resource.query({}, function(data) {
      $.each(data, function(i, val) {
        resource.query({path: val.dirName, fileName: val.dirName}, function(data1) {
          jsons.categories[val.id] = val;
          jsons.subjects[val.id] = data1;
        });
      });
    }
  );

  resource.query({fileName: "contact"}, function(data) {
      $.each(data, function(i, val) {
        jsons.contacts[val.id] = val;
      });
    }
  );

  resource.query({fileName: "about"}, function(data) {
      $.each(data, function(i, val) {
        jsons.about[val.id] = val;
      });
    }
  );

  return jsons;
};
