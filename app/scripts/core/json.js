'use strict';

(function($, angular) {
  // Define the `core.json` module
  angular.module('core.json', ['ngResource', 'core.config', 'core.util']);

  angular.
    module('core.json').
    factory('Json', ['$resource', 'Config', 'Util', appJson]);

  function appJson($resource, config, util) {
    var url = config.json.rootPath;
    var resources = {};
    var resource;
    var postFix = util.upperFirstLetter(config.json.tasksDir) + ".json";

    var setResource = function(turl){
      turl = turl?(url + "/" + turl):url;

      if(resources[turl]) {
        resource = resources[turl];
      } else {
        resource = resources[turl] = $resource(turl + '/:path/:fileName', {}, {
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
      setResource();

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
                  setResource(val.dirName);
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
        jsons.subjectTasks[cat.id] = {};
        jsons.tasks[cat.id] = {};
      }

      if(!jsons.tasks[cat.id][sub.id]){
        jsons.subjectTasks[cat.id][sub.id] = {};
        jsons.tasks[cat.id][sub.id] = {};
      }

      //if(jsons.tasks[cat.id][sub.id] != {}){
      //  return jsons.tasks[cat.id][sub.id];
      //}

      var catPath = cat.dirName;
      var subPath = sub.dirName;
      var path = catPath + "/" + subPath + "/" + config.json.tasksDir;

      setResource(path);
      resource.query({fileName: subPath + postFix}, function(data) {
          $.each(data, function(i, val) {
              jsons.subjectTasks[cat.id][sub.id][val.id] = val;

              setResource(path + "/" + val.dirName);
              resource.query({fileName: val.dirName + postFix}, function(data2) {
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

      return jsons.subjectTasks[cat.id][sub.id];
    }

    var getTasksJson = function(catid, subid) {
      if(!catid || !subid) {
        return;
      }
      return jsons.tasks[catid][subid];
    };

    var setExcerciseConfigJson = function(path, file) {
      setResource(path);

      resource.query({fileName: file}, function(data) {
        jsons.excerciseConfig = data[0];
      });
    };

    var setExercisesJson = function(path, prefix) {
      setResource(path);

      resource.query({fileName: prefix + postFix}, function(data) {
        $.each(data, function(i, val) {
            jsons.excercises[val.id] = val;
          });
      });
    }

    var jsons = {
      categories: {},
      subjects: {},
      classes: {},
      subjectTasks: {},
      tasks: {},
      excercises: {},
      excerciseConfig: {},
      footer: {},
      contacts: {},
      about: {},
      getCategory: getCategoryJson,
      getSubject: getSubjectJson,
      getSubjectTasks: getSubjectTasksJson,
      getTasks: getTasksJson,
      setExcerciseConfig: setExcerciseConfigJson,
      setExercises: setExercisesJson
    };

    getJsonData();

    return jsons;
  };
})(jQuery, window.angular);
