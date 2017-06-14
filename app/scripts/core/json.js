'use strict';

// Define the `core.json` module
angular.module('core.json', ['ngResource', 'core.config', 'core.util']);

angular.
  module('core.json').
  factory('Json', ['$resource', 'Config', 'Util', appJson]);

function appJson($resource, config, util) {
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

  var getJsonData = function() {
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

    resource.query({fileName: config.json.footer}, function(data) {
        $.each(data, function(i, val) {
          jsons.footer[val.id] = val;
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

  var getSubjectJson = function(catId, dirname) {
    var ob = {};

    $.each(jsons.subjects[catId], function(i, val) {
      if(val.dirName == dirname) {
        ob = val;
      }
    })

    return ob;
  };

  var getSubjectTasksJson = function(cat, sub) {
    if(!cat.dirName || !sub.dirName) {
      return;
    }

    if(!jsons.tasks[cat.id]){
      jsons.tasks[cat.id] = {};
    }

    if(!jsons.tasks[cat.id][sub.id]){
      jsons.tasks[cat.id][sub.id] = {};
    }

    //if(jsons.tasks[cat.id][sub.id] != {}){
    //  return jsons.tasks[cat.id][sub.id];
    //}

    var catPath = cat.dirName;
    var subPath = sub.dirName;
    var path = catPath + "/" + subPath + "/" + config.json.taskDir;
    var fileEnd = util.upperFirstLetter(config.json.taskDir) + ".json";

    setResource(url + "/" + path);
    resource.query({fileName: subPath + fileEnd}, function(data) {
        $.each(data, function(i, val) {

            setResource(url + "/"+ path + "/" + val.dirName);
            resource.query({fileName: val.dirName + fileEnd}, function(data2) {
                $.each(data2, function(j, val1) {
                    if(!jsons.tasks[cat.id][sub.id][val.id]){
                      jsons.tasks[cat.id][sub.id][val.id] = {};
                    }
                    jsons.tasks[cat.id][sub.id][val.id][val1.id] = val1;
                  }
                )
              }
            );

          }
        )
      }
    );

    return jsons.tasks[cat.id][sub.id];
  }

  var jsons = {
    categories: {},
    subjects: {},
    classes: {},
    tasks: {},
    footer: {},
    contacts: {},
    about: {},
    getCategory: getCategoryJson,
    getSubject: getSubjectJson,
    getSubjectTasks: getSubjectTasksJson
  };

  getJsonData();

  return jsons;
};
