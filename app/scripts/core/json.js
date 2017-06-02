'use strict';

// Define the `core.json` module
angular.module('core.json', ['ngResource', 'core.config']);

angular.
  module('core.json').
  factory('Json', ['$resource', 'Config', appJson]);

function appJson($resource, config) {
  var url = config.json.rootPath;
  var resources = {};
  var resource;

  var setResource = function(turl){
    if(resources[turl]) {
      resource = resources[turl];
    } else {
      resources[turl] = resource = $resource(turl + '/:path/:fileName', {}, {
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
    }
  }

  var getHomeJson = function() {
    setResource(url);

    resource.query({}, function(data) {
        $.each(data, function(i, val) {
          jsons.categories[val.id] = val;

          resource.query({path: val.dirName, fileName: val.dirName + ".json"}, function(data1) {
            $.each(data1, function(j, val1) {
              if(!jsons.subjects[val.id]){
                jsons.subjects[val.id] = {};
              }
              jsons.subjects[val.id][val1.id] = val1;

              if(!jsons.classes[val.id]){
                jsons.classes[val.id] = {};
              }
              if(!jsons.classes[val.id][val1.id]){
                jsons.classes[val.id][val1.id] = {};
              }

              if(val.id == 1){ //Just for data alphabet, MUST REMOVE AFTER DATA COMPLETE.
                setResource(url + "/" + val.dirName);
                resource.query({path: val1.dirName, fileName: val1.dirName + ".json"}, function(data2) {
                $.each(data2, function(k, val2) {
                    jsons.classes[val.id][val1.id][val2.id] = val2;
                  })
                });
              }  //Just for data alphabet
            })
          });
        });
      }
    );

    resource.query({fileName: config.json.contact}, function(data) {
        $.each(data, function(i, val) {
          jsons.contacts[val.id] = val;
        });
      }
    );

    resource.query({fileName: config.json.about}, function(data) {
        $.each(data, function(i, val) {
          jsons.about[val.id] = val;
        });
      }
    );

  };

  //Use this get category data according to access url
  //www.xxxx.com/#!/dirname
  var getCategoryJson = function(dirname) {
    var ob = {};

    $.each(jsons.categories, function(i, val) {
      if(val.dirName == dirname) {
        ob = val;
      }
    })

    return ob;
  };

  var jsons = {
    categories: {},
    subjects: {},
    classes: {},
    contacts: {},
    about: {},
    getHome: getHomeJson,
    getCategory: getCategoryJson,
  };

  return jsons;
};
