'use strict';

(function () {
  var app = angular.module('app', [
    'ui.router',
    'app.root',
    'app.header',
    'app.home',
    'app.category',
    'app.subject',
    'app.class',
    'app.lesson',
    'app.footer',
    'app.player',
    'app.filter'
  ]);

  app.config(['$stateProvider', '$urlRouterProvider', 'Config',
    function config($stateProvider, $urlRouterProvider, config) {

      var httpJson = function(name){
        return function ($http) {
          return $http.get(config.dataPath[name].json, { cache: true })
            .then(function (resp) {return resp.data; });
        }
      };

      var httpData = function(name){
        return function ($http) {
          return $http.get(config.dataPath[name].data, { cache: true })
            .then(function (resp) {return resp.data; });
        }
      };

      var states = [
        {
          name: 'root',
          url: '/root',
          template: '<app-header /><ui-view /><app-footer />'
        },
        {
          name: 'root.home',
          url: '/home',
          component: 'appHome'
        },
        {
          name: 'root.alphaorigin',
          url: '/alphabetorigin',
          component: 'appAlphaorigin',
          resolve: {
            jsonData: httpJson('alphabetorigin'),
            subData: httpData('alphabetorigin')
          }
        },
        {
          name: 'root.originpractice',
          url: '/originpractice',
          component: 'originPractice',
          resolve: {
            jsonData: httpJson('alphabetorigin'),
            subData: httpData('alphabetorigin')
          }
        },
        {
          name: 'root.alphalist',
          url: '/alphabetlist',
          component: 'appAlphalist',
          resolve: {
            jsonData: httpJson('alphabetlist'),
            subData: httpData('alphabetlist')
          }
        },
        {
          name: 'root.alphavariant',
          url: '/alphabetvariant',
          component: 'appAlphavariant',
          resolve: {
            jsonData: httpJson('alphabetvariant'),
            subData: httpData('alphabetvariant')
          }
        }
      ]


      // Must redirection before set before state
      $urlRouterProvider.when('/root', '/root/home');

      // Loop over the state definitions and register them
      states.forEach(function (state) {
        $stateProvider.state(state);
      });

      $urlRouterProvider.otherwise('/root/home');
    }
  ]);
})();
