var app = angular.module('flapperNews', ['ui.router']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    });
   $stateProvider
    .state('posts', {
	  url: '/posts/{id}',
	  templateUrl: '/posts.html',
	  controller: 'PostsCtrl'
	});
  $urlRouterProvider.otherwise('home');
}]);


app.factory('posts', [function(){
  var o = {
    posts: [{title: 'Raising A Mathematician',upvotes: 5,
                         comments: [
		    {author: 'Anup', body: 'Cool post!', upvotes: 10},
		    {author: 'Nilesh', body: 'Great idea. Everything is best!', upvotes: 4}
		  ]},
  {title: 'Maths Magic', upvotes: 2,
                        comments: [
		    {author: 'Praful', body: 'Excellent post!', upvotes: 2},
		    {author: 'Omkar', body: 'Great Website!', upvotes: 3}
		  ]},
  {title: 'Maths World', upvotes: 15,
  comments: [
		    {author: 'Anmol', body: 'Post it All', upvotes: 5},
		    {author: 'Sourabh', body: 'Best work done!', upvotes: 6}
		  ]}
  ]
  };
  return o;
}]);

app.controller('MainCtrl', [
'$scope',
'posts',
function($scope,posts){
  $scope.test = 'Hello world!';
  $scope.posts = posts.posts;
  $scope.addPost = function(){
	  if(!$scope.title || $scope.title === '') { return; }
	  $scope.posts.push({
	    title: $scope.title,
	    link: $scope.link,
	    upvotes: 0,
		comments: [
		    {author: 'Anup', body: 'Cool post!', upvotes: 0},
		    {author: 'Nilesh', body: 'Great idea. Everything is best!', upvotes: 0}
		  ]
	  });
	  $scope.title = '';
	  $scope.link = '';
    };
  $scope.incrementUpvotes = function(post) {
      post.upvotes += 1;
  };

    }
]);

app.controller('PostsCtrl', [
'$scope',
'$stateParams',
'posts',
function($scope, $stateParams, posts){
	$scope.post = posts.posts[$stateParams.id];
	$scope.addComment = function(){
	  if($scope.body === '') { return; }
	  $scope.post.comments.push({
	    body: $scope.body,
	    author: 'user',
	    upvotes: 0
	  });
	  $scope.body = '';
	};
}]);

