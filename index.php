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
				<a href="#" id="new-split">add split</a>
				<a href="#" id="new-player">new player</a>
				<a href="#" id="fill">fill</a>
				<a href="#" id="set-scores">set scores</a>
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
					<td id="<?="$x-$y"?>"><!-- empty --></td>
				<?php endforeach; ?>
			</tr>
		<?php endforeach; ?>
	</table>

	<div id="blind"><!-- empty --></div>

	<form id="player-info" class="info-form">
		<label>
			name
			<input type="text" name="name">
		</label>

		<label>
			email
			<input type="text" name="email">
		</label>

		<input type="submit" value="choose squares">
	</form>

	<form id="splits" class="info-form">
		<table class="splits"><!-- JS --></table>

		<label>
			name
			<input type="text" name="name">
		</label>

		<label>
			percentage of take
			<input type="text" name="split">
		</label>

		<input type="submit" value="add" />

		<a href="#" class="close">close</a>
	</form>

	<form id="scores" class="info-form">
		<table class="splits"><!-- JS --></table>

		<input type="submit" value="submit" />

		<a href="#" class="close">close</a>
	</form>

</body>
</html>