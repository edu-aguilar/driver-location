angular.module('starter.controllers', []);
angular.module('starter.services', []);

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'MenuController as vm'
  })

  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
        controller: 'LoginController as vm'
      }
    }
  })

  .state('app.driverHome', {
    url: '/driver',
    params: { channel: null },
    views: {
      'menuContent': {
        templateUrl: 'templates/driverHome.html',
        controller: 'DriverHomeController as vm'
      }
    }
  })

  .state('app.listenerHome', {
    url: '/listener',
    params: { channel: null },
    views: {
      'menuContent': {
        templateUrl: 'templates/listenerHome.html',
        controller: 'ListenerHomeController as vm'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});
