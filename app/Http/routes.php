<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('index');
});

Route::get('views/{name}', function($name){
	$view = 'partials.'.$name;

	if ( View::exists($view) ){
		return view($view);
	}
	return '';
});

Route::group(['prefix' => 'api'], function(){
	Route::get('authenticate', 'AuthenticateController@index');
	Route::post('authenticate', 'AuthenticateController@store');
	Route::get('authenticate/user', 'AuthenticateController@get');

});