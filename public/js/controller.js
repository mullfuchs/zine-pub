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
.controller('ZineShowCtrl', ['$scope', '$stateParams', 'Zine', function($scope, $stateParams, Zine){
    $scope.zine = {};
 //$stateParams.id
    Zine.get({id: $stateParams.id}, function success(data) {
      $scope.zine = data;
      console.log(data);
    }, function error(data) {
      console.log(data);
    });



}])
.controller('NewZineCtrl', ['$scope', '$http', '$location', 'Zine', function($scope, $http, $location, Zine) {
  $scope.zine = {
    title: '',
    description: '',
    image: '',
    pages: [],
    backgroundImage: ''
  };

  $scope.currentPage = {
    heading: '',
    pageText: '',
    bgImage: ''
  }

  $scope.previewPages = [];

  $scope.zineTitle = $scope.zine.title;
  $scope.canvas = document.getElementById('zinecover');

  $.cloudinary.config({ cloud_name: 'dlbfgtkpr', api_key: '398147833635538'})

  // var ctx = $scope.canvas.getContext('2d');
  // ctx.fillStyle = "#FFA500";
  // ctx.fillRect (0, 0, 350, 550);
  // ctx.font = "48px sans-serif";
  // ctx.fillText($scope.zine.title.toString(), 10, 50);

  // $scope.$watch('zine.title', function(){
  //     ctx.save();
  //     ctx.setTransform(1, 0, 0, 1, 0, 0);
  //     ctx.clearRect(0, 0, $scope.canvas.width, $scope.canvas.height);
  //     ctx.restore();
  //     $scope.redraw();
  // });

  // $("#image-bg").change(function(e){
  //   var URL = window.URL;
  //   var url = URL.createObjectURL(e.target.files[0]);
  //   $scope.zine.image = new Image();
  //   $scope.zine.image.src = url;

  //   $scope.zine.image.onload = function() {
  //     $scope.redraw();
  //   }
  // });

  $scope.$watch('currentPage.bgImage',function(newVal, oldVal){
    console.log(newVal);
    console.log(oldVal);
  });

  $scope.redraw = function(){
    if($scope.zine.image){
      img_width = $scope.zine.image.width;
      img_height = $scope.zine.image.height;
      ctx.drawImage($scope.zine.image, 0, 0, img_width, img_height);
    }
    ctx.fillText($scope.zine.title.toString(), 10, 50);
  }

  $scope.addPage = function() {
    console.log("adding page?");
    //var newPage = $scope.canvas.toDataURL();
    //var data = newPage.replace(/^data:image\/\w+;base64,/, "");
    //var buf = new Buffer(data, 'base64');
    //$scope.previewPages.push(newPage);
    var newPage = {
      title: $scope.currentPage.heading,
      description: $scope.currentPage.pageText,
      backgroundImage: $scope.currentPage.bgImage
    }
    console.log(newPage);
    $scope.zine.pages.push(newPage);
  };

  $scope.createZine = function() {
    console.log("Clicked new zine button?");
    $scope.zine.image = 'image goes here';
    //$scope.zine.pages = [];
    console.log($scope.zine);

    $http.post('/api/zines', $scope.zine).then(function success(res) {
      console.log('added zine to db');
      $location.path('/');
    }, function error (res){
      console.log(res);
    });

  };

}]);