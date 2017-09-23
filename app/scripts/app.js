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

  app.config(['$stateProvider', '$urlRouterProvider',
    function config($stateProvider, $urlRouterProvider) {

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
          template: '<app-home />'
        },
        {
          name: 'root.alphabet',
          url: '/alphabet',
          template: '<app-category />'
        }
        /**
                {
                  name: 'category',
                  url: '/{categoryName}',
                  template: categoryT
                },
        
                {
                  name: 'subject',
                  url: '/{categoryName}/{subjectName}',
                  template: subjectT
                },
        
                {
                  name: 'class',
                  url: '/{categoryName}/{subjectName}/{className}',
                  template: mclassT
                },
        
                {
                  name: 'lesson',
                  url: '/{categoryName}/{subjectName}/{className}/{lesson}',
                  template: lessonT
                }
                **/
      ]

      // Loop over the state definitions and register them
      states.forEach(function (state) {
        $stateProvider.state(state);
      });

      $urlRouterProvider.when('/root', '/root/home')
      $urlRouterProvider.otherwise('/root/home');


    }
  ]);
})();
