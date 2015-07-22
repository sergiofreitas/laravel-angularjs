<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<link rel="stylesheet" type="text/css" href="<?php echo asset(elixir('css/app.css')) ?>">
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=RobotoDraft:300,400,500,700,400italic">
</head>
<body ng-app="FormKeep">
	
	<div ui-view></div>

    <script src="<?php echo asset('js/dependencies.js') ?>"></script>
    <script src="<?php echo asset(elixir('js/app.js')) ?>"></script>
</body>
</html>