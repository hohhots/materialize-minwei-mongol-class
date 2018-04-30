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
    'app.filter',
    'app.word',
    'app.ime'
  ]);

  app.config(['$stateProvider', '$urlRouterProvider', 'Config',
    function config($stateProvider, $urlRouterProvider, config) {

      var resolve = function (name) {
        return {
          jsonData: config.ajax(config.dataPath[name].json),
          subData: config.ajax(config.dataPath[name].data)
        };
      };

      var uiState = config.uiState;

      var states = [
        {
          name: uiState.root.name,
          url: uiState.root.url,
          template: '<app-header /><ui-view /><app-footer />'
        },
        {
          name: uiState.home.name,
          url: uiState.home.url,
          component: uiState.home.component
        },
        {
          name: uiState.levelsHome.name,
          url: uiState.levelsHome.url,
          component: uiState.levelsHome.component,
          resolve: resolve('levelshome')
        },
        {
          name: uiState.levels.name,
          url: uiState.levels.url,
          component: uiState.levels.component,
          resolve: {
            levelid: function ($stateParams) {
              return $stateParams.levelid;
            }
          }
        },
        {
          name: uiState.classRoom.name,
          url: uiState.classRoom.url,
          component: uiState.classRoom.component,
          resolve: {
            levelid: function ($stateParams) {
              return $stateParams.levelid;
            },
            classroomid: function ($stateParams) {
              return $stateParams.classroomid;
            }
          }
        },
        {
          name: uiState.alphaOrigin.name,
          url: uiState.alphaOrigin.url,
          component: uiState.alphaOrigin.component,
          resolve: {
            levelid: function ($stateParams) {
              return $stateParams.levelid;
            },
            classroomid: function ($stateParams) {
              return $stateParams.classroomid;
            },
            jsonData: config.ajax(config.dataPath['alphabetorigin'].json),
            subData: config.ajax(config.dataPath['alphabetorigin'].data)
          }
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
      $urlRouterProvider.when(uiState.root.name, uiState.root.url);

      // Loop over the state definitions and register them
      states.forEach(function (state) {
        $stateProvider.state(state);
      });

      $urlRouterProvider.otherwise(uiState.root.url + uiState.levelsHome.url);
    }
  ]);
})();
