// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'angles'])

.run(function($ionicPlatform) {
  console.log('app.js');
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })
    .state('app.satisfy', {
      url: "/satisfy",
      views: {
        'menuContent' :{
          templateUrl: "templates/satisfy.html",
          controller: 'SatisfyCtrl'
        }
      }
    })
    .state('app.report', {
      url: "/report",
      views: {
        'menuContent' :{
          templateUrl: "templates/report.html",
          controller: 'ReportCtrl'
        }
      }
    })
    .state('app.data', {
      url: "/data",
      views: {
        'menuContent' :{
          templateUrl: "templates/data.html",
          controller: 'DataCtrl'
        }
      }
    })
    .state('app.settings', {
      url: "/settings",
      views: {
        'menuContent' :{
          templateUrl: "templates/settings.html",
          controller: 'DataCtrl'
        }
      }
    })
    .state('app.about', {
      url: "/about",
      views: {
        'menuContent' :{
          templateUrl: "templates/about.html",
          controller: 'DataCtrl'
        }
      }
    })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/satisfy');
});
