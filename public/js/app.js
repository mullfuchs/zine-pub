angular.module('ZineApp', ['ui.router', 'ZineCtrls'])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');

  $urlRouterProvider.otherwise('/404');

  $stateProvider
  .state('main', {
    url: '/',
    templateUrl: 'views/main.html',
    controller: 'HomeCtrl'
  })
  .state('404', {
    url: '/404',
    templateUrl: 'views/404.html'
  })
  .state('signup', {
    url: '/signup',
    templateUrl: 'views/userSignup.html',
    controller: 'SignupCtrl'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'views/userLogin.html',
    controller: 'LoginCtrl'
  })
  .state('newzine',{
    url: '/newzine',
    templateUrl: 'views/newzine.html',
    controller: 'NewZineCtrl'
  });
  $locationProvider.html5Mode(true);
}]);