'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', [function() {

  }])
  .controller('SearchTwitterCtrl', ['$scope', '$interval', function($scope, $interval) {
  	  var socket = io.connect('/main');
  	  // $interval(function(){socket.emit('hashtag', {'value' : 'chicken'});},5000)
  	$scope.tweets = [];
  	$scope.sendSearchToHieu = function() {
	  	$scope.tweets = [];
  		console.log($scope.hashtag);

  		socket.emit('hashtag', {'value' : $scope.hashtag});
  	};

  	socket.on('tweet', function(data) {
  		if ($scope.tweets.length > 1000) {
  			$scope.tweets = $scope.tweets.slice(0,20);
  		}
  		$scope.tweets.unshift(data);
  		console.log(data);
  		$scope.$apply();
  	});
  }])
  .controller("MasterCtrl", function($scope) {
  	//   var socket = io.connect('/main');
  	//   console.log("trying to connect to hieu");
  	//   socket.emit('test', {'kkooo' : 32});
	  // socket.on('datetime', function (data) {
	  //   $scope.dateHieu = data;
	  //   $scope.$apply();
	  //   console.log("hieu sent me something");
	  //   socket.emit('my other event', { my: 'data' });
	  // });
  });


  /*
$$hashKey: "020"
contributors: null
coordinates: null
created_at: "Thu Nov 14 20:36:41 +0000 2013"
entities: Object
hashtags: Array[0]
length: 0
__proto__: Array[0]
symbols: Array[0]
length: 0
__proto__: Array[0]
urls: Array[0]
length: 0
__proto__: Array[0]
user_mentions: Array[1]
0: Object
length: 1
__proto__: Array[0]
__proto__: Object
__defineGetter__: function __defineGetter__() { [native code] }
__defineSetter__: function __defineSetter__() { [native code] }
__lookupGetter__: function __lookupGetter__() { [native code] }
__lookupSetter__: function __lookupSetter__() { [native code] }
constructor: function Object() { [native code] }
get __proto__: function __proto__() { [native code] }
hasOwnProperty: function hasOwnProperty() { [native code] }
isPrototypeOf: function isPrototypeOf() { [native code] }
propertyIsEnumerable: function propertyIsEnumerable() { [native code] }
set __proto__: function __proto__() { [native code] }
toLocaleString: function toLocaleString() { [native code] }
toString: function toString() { [native code] }
valueOf: function valueOf() { [native code] }
favorite_count: 0
favorited: false
filter_level: "medium"
geo: null
id: 401086302852235260
id_str: "401086302852235264"
in_reply_to_screen_name: "jamielea1408"
in_reply_to_status_id: 401084503307067400
in_reply_to_status_id_str: "401084503307067392"
in_reply_to_user_id: 54011130
in_reply_to_user_id_str: "54011130"
lang: "vi"
place: null
retweet_count: 0
retweeted: false
source: "<a href="http://twitter.com/download/iphone" rel="nofollow">Twitter for iPhone</a>"
text: "@jamielea1408 bareeeee faccctttt init chicken"
truncated: false
user: Object
contributors_enabled: false
created_at: "Fri Oct 30 20:41:00 +0000 2009"
default_profile: false
default_profile_image: false
description: "Queen of Altofts"
favourites_count: 280
follow_request_sent: null
followers_count: 396
following: null
friends_count: 1052
geo_enabled: true
id: 86392202
id_str: "86392202"
is_translator: false
lang: "en"
listed_count: 0
location: ""
name: "sammy :-)"
notifications: null
profile_background_color: "ACDED6"
profile_background_image_url: "http://abs.twimg.com/images/themes/theme18/bg.gif"
profile_background_image_url_https: "https://abs.twimg.com/images/themes/theme18/bg.gif"
profile_background_tile: false
profile_banner_url: "https://pbs.twimg.com/profile_banners/86392202/1383690353"
profile_image_url: "http://pbs.twimg.com/profile_images/378800000700090001/2b8dc37eff18ece36070391cc40fb7e3_normal.jpeg"
profile_image_url_https: "https://pbs.twimg.com/profile_images/378800000700090001/2b8dc37eff18ece36070391cc40fb7e3_normal.jpeg"
profile_link_color: "038543"
profile_sidebar_border_color: "EEEEEE"
profile_sidebar_fill_color: "F6F6F6"
profile_text_color: "333333"
profile_use_background_image: true
protected: false
screen_name: "sammywatts09"
statuses_count: 3992
time_zone: "London"
url: null
utc_offset: 0
verified: false
  */