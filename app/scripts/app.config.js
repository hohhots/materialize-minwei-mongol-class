'use strict';

angular.module('learnMongolApp').config(['$stateProvider','$urlRouterProvider',
  function config($stateProvider, $urlRouterProvider) {

    var appHeader = "<header></header>";
    var appFooter = "<footer></footer>";

    var homeT     =  appHeader + '<home></home>' + appFooter;
    var categoryT =  appHeader + '<category></category>' + appFooter;
    var subjectT  =  appHeader + '<subject></subject>' + appFooter;
    var mclassT   =  appHeader + '<class></class>' + appFooter;
    var lessonT   =  appHeader + '<lesson></lesson>' + appFooter;

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
