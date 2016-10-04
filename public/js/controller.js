angular.module('ZineCtrls', ['ZineServices'])
.controller('HomeCtrl', ['$scope', '$http', 'Zine', function($scope, $http, Zine) {
   $scope.zines = {};

   // $scope.zines = Zine.query();
   // console.log($scope.zines);
  $http.get('/api/zines').then(function success(req, res) {
      $scope.zines = req.data;
      //console.log(req);
      //$location.path('/');
  }, function error (res){
      console.log(res);
  });


  $scope.deleteRecipe = function(id, zineIdx) {
    Zine.delete({ id: id }, function success(data) {
      $scope.zines.splice(zineIdx, 1);
    }, function error(data) {
      console.log(data);
    });
  };
}])
.controller('NavCtrl', ['$scope', 'Auth', function($scope, Auth) {
  $scope.Auth = Auth;
  $scope.logout = function() {
    Auth.removeToken();
    console.log('My Token:', Auth.getToken());
  };
}])
.controller('SignupCtrl', ['$scope', '$http', '$location', function($scope, $http, $location)  {
  $scope.user = {
    email: '',
    password: ''
  };
  $scope.userSignup = function() {
    $http.post('/api/users', $scope.user).then(function success(res) {
      $location.path('/');
    }, function error(res) {
      console.log("somethign went wrong ", res);
    });
  };
}])
.controller('LoginCtrl', ['$scope', '$http', '$location', 'Auth', function($scope, $http, $location, Auth) {
  $scope.user = {
    email: '',
    password: ''
  };
  $scope.userLogin = function() {
    $http.post('/api/auth', $scope.user).then(function success(res) {
      Auth.saveToken(res.data.token);
      console.log('Token:', res.data.token)
      $location.path('/');
    }, function error(res) {
      console.log(data);
    });
  };
}])
.controller('NewZineCtrl', ['$scope', '$http', '$location', 'Zine', function($scope, $http, $location, Zine) {
  $scope.zine = {
    title: '',
    description: '',
    image: ''
  };

  $scope.createZine = function() {
    console.log("Clicked new zine button?");
    console.log($scope.zine);
    $http.post('/api/zines', $scope.zine).then(function success(res) {
      console.log(res.data);
      $location.path('/');
    }, function error (res){
      console.log(res);
    });
    // Zine.save($scope.zine, function success(data) {
    //   console.log("Made zine?");
    //   $location.path('/');
    // }, function error(data) {
    //   console.log(data);
    // });
  };

}]);