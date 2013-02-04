<!DOCTYPE html>
<?php // <html manifest="grid.appcache"> ?>
<html>
<head>
	<title>GRID</title>

	<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">

	<link rel="stylesheet" type="text/css" href="/css/site.css">

	<script src="/js/jquery-1.9.0.min.js"></script>
	<script src="/js/grid.js"></script>
</head>
<body>
	<table id="grid">
		<tr>
			<th colspan="11">
				<a href="#" id="new_player">new player</a>
			</th>
		<tr>
			<th></th>
			<?php foreach (range(0, 9) as $x): ?>
				<th><?=$x?></th>
			<?php endforeach; ?>
		</tr>

		<?php foreach (range(0, 9) as $y): ?>
			<tr>
				<th><?=$y?></th>
				<?php foreach (range(0, 9) as $x): ?>
					<td id="<?="$x-$y"?>"></td>
				<?php endforeach; ?>
			</tr>
		<?php endforeach; ?>
	</table>

	<div id="blind"></div>

	<form id="player_info">
		<label>
			name
			<input type="text" name="name">
		</label>

		<label>
			email
			<input type="text" name="email">
		</label>

		<input type="submit" value="GO">
	</form>

</body>
</html>