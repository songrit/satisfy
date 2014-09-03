angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
  ];
})

.controller('SatisfyCtrl', function($scope, $stateParams) {
  var db = new PouchDB('clicks');
  var remote = 'http://localhost:9292/localhost:5984/clicks';
  var opts = {live: true};

  db.replicate.to(remote, opts,function(err,resp) {
    if (err) {
      console.log('replicate err');
    }
  });

  $scope.clickHappy = function() {
    console.log('happy clicked');
    createClick(0);
  };
  $scope.clickNormal = function() {
    console.log('normal clicked');
    createClick(1);
  };
  $scope.clickSad = function() {
    console.log('sad clicked');
    createClick(2);
  };

  createClick = function(mood){
    var click = {
      _id: new Date().toISOString(),
      mood: mood
    };
    db.put(click, function callback(err, result) {
      if (!err) {
        db.info(function(err,info) {
          console.log(info);
        } )
      }
    });
  };

})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('CameraCtrl', function ($scope) {
     $scope.takePic = function() {
        var options =   {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
            encodingType: 0     // 0=JPG 1=PNG
        }
        navigator.camera.getPicture(onSuccess,onFail,options);
    }
    var onSuccess = function(FILE_URI) {
        console.log(FILE_URI);
        $scope.picData = FILE_URI;
        $scope.$apply();
    };
    var onFail = function(e) {
        console.log("On fail " + e);
    }
    $scope.send = function() {
        var myImg = $scope.picData;
        var options = new FileUploadOptions();
        options.fileKey="post";
        options.chunkedMode = false;
        var params = {};
        params.user_token = localStorage.getItem('auth_token');
        params.user_email = localStorage.getItem('email');
        options.params = params;
        var ft = new FileTransfer();
        ft.upload(myImg, encodeURI("https://example.com/posts/"), onUploadSuccess, onUploadFail, options);
    }
})
