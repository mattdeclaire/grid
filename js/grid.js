(function($) {
	var game = {
		grid: [],
		splits: [],
		players: [],
		scores: []
	};

	var x, y, current_player;

	// on page load
	$(function() {
		// toggle landscape mode
		$(window).bind('onorientationchange resize', function(event) {
			$('body').toggleClass(
				'landscape',
				event.orientation ?
					event.orientation == 'landscape' :
					$(window).width() > 980
			);
		}).resize();

		// local data
		var save = function(data) {
			if ('localStorage' in window && window['localStorage'] !== null) {
				// TODO: get toJSON func
				// localStorage['grid'] = $.toJSON(data);
			}
		};

		// set up grid
		for (x = 0; x < 10; x++) {
			game.grid[x] = [];
			for (y = 0; y < 10; y++) {
				game.grid[x][y] = 0;
				$('#' + x + '-' + y).addClass('available');
			}
		}

		// new split
		$('#new-split').click(function() {
			var total = 0;
			$.each(game.splits, function() {
				total += this.split;
			});

			if (total >= 100) {
				$('#blind, #splits').hide();
				return false;
			}

			var splits = $('#splits');
			$(':input:not(:submit)', splits).val('');
			splits.add('#blind').show();
			$('[name=name]', splits).focus();

			return false;
		});

		$('#splits').submit(function() {
			var split = {
				name: $('[name=name]', this).val(),
				split: parseInt($('[name=split]', this).val(), 10)
			};

			game.splits.push(split);

			$('.splits', this).append(
				"<tr>" +
				"<td class='name'>" + split.name + "</td>" +
				"<td class='split'>" + split.split + "%</td>" +
				"</tr>"
			);

			$('#new-split').click();

			return false;
		});

		// new player
		$('#new-player').click(function() {
			$(':input:not(:submit)', '#player-info').val('');
			$('#blind, #player-info').show();
			$('[name=name]', '#player-info').focus();
			return false;
		});

		$('#player-info').submit(function() {
			current_player = {
				name: $('[name=name]', this).val(),
				email: $('[name=email]', this).val()
			};

			game.players.push(current_player);

			$('body').addClass('player-selected');

			$('#blind, #player-info').hide();
			return false;
		});

		// fill
		$('#fill').click(function() {
			if (!game.players.length) return false;

			$.each(squares_left(), function(ndx, square) {
				assign(
					square.x,
					square.y,
					game.players[ndx % game.players.length]
				);
			});

			return false;
		});

		// set scores
		$('#set-scores').click(function() {
			// ditch if any squares are left
			if (squares_left().length) return false;

			$(':input:not(:submit)', '#scores').val('');
			$('#blind, #scores').show();

			var splits = $('#scores .splits');
			console.log(splits);
			$.each(game.splits, function() {
				console.log(this);
				splits.append(
					'<tr>' +
					'<td>' + this.name + '</td>' +
					'<td>' + this.split + '</td>' +
					'<td><input type="text" name="split[]"></td>' +
					'<td><input type="text" name="split[]"></td>' +
					'</tr>'
				);
			});

			return false;
		});

		$('#scores').submit(function() {
			// TODO: dole monies

			return false;
		});

		// close forms
		$('form .close').click(function() {
			$(this).closest('.info-form').add('#blind').hide();
			return false;
		});

		// handle square clicks
		$('#grid td').click(function() {
			if (current_player) {
				var pos = this.id.split('-');
				var x = parseInt(pos[1], 10);
				var y = parseInt(pos[0], 10);

				if (game.grid[x][y]) return;
				assign(x, y, current_player);
			}

			return false;
		});

		// assign square
		var assign = function(x, y, player) {
			if (game.grid[x][y]) return;

			game.grid[x][y] = player;
			$('#'+y+'-'+x)
				.removeClass('available')
				.text(player.name);
		};

		// get unassigned squares
		var squares_left = function() {
			var x, y, squares = [];

			for (x = 0; x < 10; x++) {
				for (y = 0; y < 10; y++) {
					if (!game.grid[x][y]) squares.push({x: x, y: y});
				}
			}

			return squares;
		};
	});
})(jQuery);