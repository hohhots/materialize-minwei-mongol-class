'use strict';

(function() {
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
    'app.filter',
    'app.word',
    'app.ime'
  ]);

  app.config(['$stateProvider', '$urlRouterProvider', 'Config',
    function config($stateProvider, $urlRouterProvider, config) {
      var httpJson = function(name) {
        return function($http) {
          return $http.get(config.dataPath[name].json, {cache: true})
            .then(function(resp) {
              return resp.data;
            });
        };
      };

      var httpData = function(name) {
        return function($http) {
          return $http.get(config.dataPath[name].data, {
            cache: true
          }).then(function(resp) {
            return resp.data;
          });
        };
      };

      var resolve = function(path) {
        return {
          jsonData: httpJson(path),
          subData: httpData(path)
        };
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
          name: 'root.levelshome',
          url: '/levelshome',
          component: 'levelsHome'
        },
        {
          name: 'root.alphaorigin',
          url: '/alphabetorigin',
          component: 'appAlphaorigin',
          resolve: resolve('alphabetorigin')
        },
        {
          name: 'root.originpractice',
          url: '/originpractice',
          component: 'originPractice',
          resolve: resolve('alphabetorigin')
        },
        {
          name: 'root.alphalist',
          url: '/alphabetlist',
          component: 'appAlphalist',
          resolve: resolve('alphabetlist')
        },
        {
          name: 'root.listpractice',
          url: '/listpractice',
          component: 'listPractice',
          resolve: resolve('alphabetlist')
        },
        {
          name: 'root.alphavariant',
          url: '/alphabetvariant',
          component: 'appAlphavariant',
          resolve: resolve('alphabetvariant')
        },
        {
          name: 'root.variantpractice',
          url: '/variantpractice',
          component: 'variantPractice',
          resolve: resolve('alphabetvariant')
        },
        {
          name: 'root.wordbegin',
          url: '/wordbegin',
          component: 'appWordbegin',
          resolve: resolve('wordbegin')
        },
        {
          name: 'root.wordbeginpractice',
          url: '/wordbeginpractice',
          component: 'wordbeginPractice',
          resolve: resolve('wordbegin')
        },
        {
          name: 'root.ebookbegin',
          url: '/ebookbegin',
          component: 'appEbookbegin',
          resolve: resolve('ebookbegin')
        }
      ];

      // Must redirection before set and state
      $urlRouterProvider.when('/root', '/root/home');

      // Loop over the state definitions and register them
      states.forEach(function(state) {
        $stateProvider.state(state);
      });

      $urlRouterProvider.otherwise('/root/levelshome');
    }
  ]);
})();
