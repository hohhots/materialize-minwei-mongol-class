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
          name: 'root.alphaorigin',
          url: '/alphabetorigin',
          template: '<app-alphaorigin />'
        },
        {
          name: 'root.alphalist',
          url: '/alphabetlist',
          template: '<app-alphalist />'
        }, {
          name: 'root.alphavariant',
          url: '/alphabetvariant',
          template: '<app-alphavariant />'
        }

      ]

      // Must redirection before set before state
      $urlRouterProvider.when('/root/alphabet', '/root/alphabet/origin');
      $urlRouterProvider.when('/root', '/root/home');

      // Loop over the state definitions and register them
      states.forEach(function (state) {
        $stateProvider.state(state);
      });

      $urlRouterProvider.otherwise('/root/home');
    }
  ]);
})();
