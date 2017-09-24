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
    'app.footer'
  ]);

  app.config(['$stateProvider', '$urlRouterProvider', 'Config',
    function config($stateProvider, $urlRouterProvider, config) {

      //var homeT     =  appHeader + '<app-home></app-home>' + appFooter;
      //var categoryT =  appHeader + '<app-category></app-category>' + appFooter;
      //var subjectT  =  appHeader + '<app-subject></app-subject>' + appFooter;
      //var mclassT   =  appHeader + '<app-class></app-class>' + appFooter;
      //var lessonT   =  appHeader + '<app-lesson></app-lesson>' + appFooter;

      // An array of state definitions
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
            jsonData: function ($http) {
              return $http.get(config.dataPath['alphabetorigin'].json, { cache: true })
                .then(function (resp) {return resp.data; });
            },
            subData: function () {
              return 'asd';
            }
          }
        },
        {
          name: 'root.alphalist',
          url: '/alphabetlist',
          component: '<app-alphalist />'
        },
        {
          name: 'root.alphavariant',
          url: '/alphabetvariant',
          component: '<app-alphavariant />'
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
