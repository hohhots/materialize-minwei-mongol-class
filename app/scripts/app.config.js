'use strict';

angular.module('learnMongolApp').config(['$stateProvider','$urlRouterProvider',
  function config($stateProvider, $urlRouterProvider) {

    var appHeader = "<app-header></app-header>";
    var appFooter = "<app-footer></app-footer>";

    var homeT     =  appHeader + '<app-home></app-home>' + appFooter;
    var categoryT =  appHeader + '<app-category></app-category>' + appFooter;
    var subjectT  =  appHeader + '<app-subject></app-subject>' + appFooter;
    var mclassT   =  appHeader + '<app-class></app-class>' + appFooter;
    var lessonT   =  appHeader + '<app-lesson></app-lesson>' + appFooter;

    var home = {
      name: 'home',
      url: '/',
      template: homeT
    };

    var category = {
      name: 'category',
      url: '/{categoryName}',
      template: categoryT
    };

    var subject = {
      name: 'subject',
      url: '/{categoryName}/{subjectName}',
      template: subjectT
    };

    var mclass = {
      name: 'class',
      url: '/{categoryName}/{subjectName}/{className}',
      template: mclassT
    };

    var lesson = {
      name: 'lesson',
      url: '/{categoryName}/{subjectName}/{className}/{lesson}',
      template: lessonT
    };

    $urlRouterProvider.otherwise('/');

    $stateProvider.state(home);
    $stateProvider.state(category);
    $stateProvider.state(subject);
    $stateProvider.state(mclass);
    $stateProvider.state(lesson);
  }
]);
