'use strict';

// Define the `learnMongolApp` module
angular.module('learnMongolApp', [
  'ui.router',
  'header',
  'home',
  'category',
  'subject',
  'class',
  'lesson',
  'footer'
]);

angular.module('learnMongolApp').config(['$stateProvider','$urlRouterProvider',
  function config($stateProvider, $urlRouterProvider) {

    var appHeader = "<app-header></app-header>";
    var appFooter = "<app-footer></app-footer>";

    var homeT     =  appHeader + '<app-home></app-home>' + appFooter;
    var categoryT =  appHeader + '<app-category></app-category>' + appFooter;
    var subjectT  =  appHeader + '<app-subject></app-subject>' + appFooter;
    var mclassT   =  appHeader + '<app-class></app-class>' + appFooter;
    var lessonT   =  appHeader + '<app-lesson></app-lesson>' + appFooter;

    // An array of state definitions
    var states = [
      {
        name: 'home',
        url: '/',
        template: homeT
      },

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
    ]

    $urlRouterProvider.otherwise('/');

    // Loop over the state definitions and register them
    states.forEach(function(state) {
      $stateProvider.state(state);
    });
  }
]);
