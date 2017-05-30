'use strict';

// Define the `core.json` module
angular.module('core.json', ['ngResource', 'core.config']);

angular.
  module('core.json').
  factory('Json', ['$resource', 'Config', appJson]);

function appJson($resource, config) {
  var url = config.json.rootPath + '/:path/:fileName';

  var resource = $resource(url, {}, {
    query: {
      method: 'GET',
      params: {
        path: '.',
        fileName: 'categories.json'
      },
      isArray: true,
      cache: true
    }
  });

  var getResource = function(path, fileName) {

  };

  var getHomeJson = function(contact, about) {
    resource.query({}, function(data) {
        $.each(data, function(i, val) {
          resource.query({path: val.dirName, fileName: val.dirName + ".json"}, function(data1) {
            jsons.categories[val.id] = val;
            jsons.subjects[val.id] = data1;
          });
        });
      }
    );

    resource.query({fileName: contact}, function(data) {
        $.each(data, function(i, val) {
          jsons.contacts[val.id] = val;
        });
      }
    );

    resource.query({fileName: about}, function(data) {
        $.each(data, function(i, val) {
          jsons.about[val.id] = val;
        });
      }
    );

  };


  var jsons = {
    categories: {},
    subjects: {},
    contacts: {},
    about: {},
    getHome: getHomeJson
  };

  return jsons;
};
