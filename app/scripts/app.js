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

      var resolve = function(name) {
        return {
          jsonData: config.ajax(config.dataPath[name].json),
          subData: config.ajax(config.dataPath[name].data)
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
          component: 'levelsHome',
          resolve: resolve('levelshome')
        },
        {
          name: 'root.levels',
          url: '/level/{levelid}',
          component: 'appLevels',
          resolve: {
            levelid: function($stateParams) {
              return $stateParams.levelid;
            }
          }
        },
        {
          name: 'root.levels.classroom',
          url: '/classroom/{classroomid}',
          component: 'appClassroom'
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
      states.forEach(function (state) {
        $stateProvider.state(state);
      });

      $urlRouterProvider.otherwise('/root/levelshome');
    }
  ]);
})();
