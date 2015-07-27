(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var app = angular.module('FormKeep', ['ngMaterial', 'ui.router', 'satellizer']);

app.config(function ($stateProvider, $urlRouterProvider, $authProvider, $httpProvider, $provide) {

	function redirectWhenLoggedOut($q, $injector) {
		return {
			responseError: function responseError(rejection) {
				var $state = $injector.get('$state'),
				    reasons = ['token_not_provided', 'token_expired', 'token_absent', 'token_invalid'];

				angular.forEach(reasons, function (v, k) {
					if (rejection.data.error === v) {
						localStorage.removeItem('user');
						$state.go('auth');
					}
				});

				return $q.reject(rejection);
			}
		};
	}

	$provide.factory('redirectWhenLoggedOut', redirectWhenLoggedOut);
	$httpProvider.interceptors.push('redirectWhenLoggedOut');

	$authProvider.loginUrl = 'http://localhost/formkeep/api/authenticate';
	$urlRouterProvider.otherwise('/auth');
	$stateProvider.state('auth', {
		url: '/auth',
		templateUrl: 'views/login',
		controller: 'AuthController as auth'
	});

	$stateProvider.state('users', {
		url: '/users',
		templateUrl: 'views/users',
		controller: 'UserController as user'
	});
});

app.run(function ($rootScope, $state) {

	$rootScope.$on('$stateChangeStart', function (event, toState) {
		var user = JSON.parse(localStorage.getItem('user'));

		if (user) {
			$rootScope.authenticated = true;
			$rootScope.currentUser = user;

			if (toState.name === 'auth') {
				event.preventDefault();
				$state.go('users');
			}
		}
	});
});

app.controller('AuthController', AuthController);
app.controller('UserController', UserController);

function AuthController($auth, $state, $http, $rootScope) {
	var vm = this;

	vm.loginError = false;
	vm.loginErrorText;

	vm.login = function () {
		var credentials = {
			email: vm.email,
			password: vm.password
		};

		$auth.login(credentials).then(function (data) {
			return $http.get('api/authenticate/user');
		}, function (err) {
			vm.loginError = true;
			vm.loginErrorText = err.data.error;
		}).then(function (response) {

			var user = JSON.stringify(response.data.user);

			localStorage.setItem('user', user);
			$rootScope.authenticated = true;
			$rootScope.currentUser = response.data.user;

			$state.go('users');
		});
	};
}

function UserController($http, $auth, $rootScope) {
	var vm = this;

	vm.users;
	vm.error;

	vm.getUsers = function () {

		$http.get('api/authenticate').success(function (data) {
			vm.users = data;
		}).error(function (err) {
			vm.error = err;
		});
	};

	vm.logout = function () {
		$auth.logout().then(function () {
			localStorage.removeItem('user');

			$rootScope.authenticated = false;
			$rootScope.currentUser = null;
		});
	};
}

},{}]},{},[1]);
