'use strict';

(function () {
  var app = angular.module('app', [
    'ui.router',
    'app.root',
    'app.header',
    'app.home',
    'app.category',
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
          name: uiState.books.name,
          url: uiState.books.url,
          component: uiState.books.component,
          resolve: {
            pagenum: function ($stateParams) {
              return $stateParams.pagenum;
            }
          }
        },
        {
          name: uiState.alphaList.name,
          url: uiState.alphaList.url,
          component: uiState.alphaList.component,
          resolve: {
            levelid: function ($stateParams) {
              return $stateParams.levelid;
            },
            pagenum: function ($stateParams) {
              return $stateParams.pagenum;
            },
            subData: config.ajax(config.dataPath['alphabetlist'].data)
          }
        },
        {
          name: uiState.listPractice.name,
          url: uiState.listPractice.url,
          component: uiState.listPractice.component,
          resolve: {
            levelid: function ($stateParams) {
              return $stateParams.levelid;
            },
            pagenum: function ($stateParams) {
              return $stateParams.pagenum;
            },
            subData: config.ajax(config.dataPath['alphabetlist'].data)
          }
        },
        {
          name: uiState.alphaVariant.name,
          url: uiState.alphaVariant.url,
          component: uiState.alphaVariant.component,
          resolve: {
            levelid: function ($stateParams) {
              return $stateParams.levelid;
            },
            pagenum: function ($stateParams) {
              return $stateParams.pagenum;
            },
            jsonData: config.ajax(config.dataPath['alphabetvariant'].json),
            subData: config.ajax(config.dataPath['alphabetvariant'].data)
          }
        },
        {
          name: uiState.variantPractice.name,
          url: uiState.variantPractice.url,
          component: uiState.variantPractice.component,
          resolve: {
            levelid: function ($stateParams) {
              return $stateParams.levelid;
            },
            pagenum: function ($stateParams) {
              return $stateParams.pagenum;
            },
            jsonData: config.ajax(config.dataPath['alphabetvariant'].json),
            subData: config.ajax(config.dataPath['alphabetvariant'].data)
          }
        },
        {
          name: uiState.wordBegin.name,
          url: uiState.wordBegin.url,
          component: uiState.wordBegin.component,
          resolve: {
            levelid: function ($stateParams) {
              return $stateParams.levelid;
            },
            pagenum: function ($stateParams) {
              return $stateParams.pagenum;
            },
            jsonData: config.ajax(config.dataPath['wordbegin'].json)
          }
        },
        {
          name: uiState.wordBeginPractice.name,
          url: uiState.wordBeginPractice.url,
          component: uiState.wordBeginPractice.component,
          resolve: {
            levelid: function ($stateParams) {
              return $stateParams.levelid;
            },
            pagenum: function ($stateParams) {
              return $stateParams.pagenum;
            },
            jsonData: config.ajax(config.dataPath['wordbegin'].json)
          }
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
