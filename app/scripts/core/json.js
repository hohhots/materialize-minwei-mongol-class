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

  var getHomeJson = function(contact, about) {
    resource.query({}, function(data) {
        $.each(data, function(i, val) {
          jsons.categories[val.id] = val;

          resource.query({path: val.dirName, fileName: val.dirName + ".json"}, function(data1) {
            $.each(data1, function(j, val1) {
              if(!jsons.subjects[val.id]){
                jsons.subjects[val.id] = {};
              }
              jsons.subjects[val.id][val1.id] = val1;

              resource.query({path: val.dirName + "/" +val1.dirName, fileName: val1.dirName + ".json"}, function(data2) {
                $.each(data2, function(k, val2) {
                  if(!jsons.classes[val.id]){
                    jsons.classes[val.id] = {};
                    jsons.classes[val.id][val1.id] = {};
                  }
                  jsons.classes[val.id][val1.id][val2.id] = val2;
                })
              });
            })
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

  var getCategoryJson = function(dirname) {
    var ob = {};

    $.each(jsons.categories, function(i, val) {
      if(val.dirName == dirname) {
        ob = val;
      }
    })

    return ob;
  };

  var getClassesJson = function(dir, filename) {

  };

  var jsons = {
    categories: {},
    subjects: {},
    classes: {},
    contacts: {},
    about: {},
    getHome: getHomeJson,
    getCategory: getCategoryJson,
    getClasses: getClassesJson
  };

  return jsons;
};
