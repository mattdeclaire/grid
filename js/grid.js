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
			for (x = 0; x < game.splits.length; x++) {
				total += game.splits[x].split;
			}

			if (total >= 100) {
				$('#blind, #split').hide();
				return false;
			}

			$(':input', '#split').val('');
			$('#blind, #split').show();
			$('[name=name]', '#split').focus();
			return false;
		});

		$('#split').submit(function() {
			var split = {
				name: $('[name=name]', this).val(),
				split: parseInt($('[name=split]', this).val(), 10)
			};

			game.splits.push(split);

			$('#splits').append(
				"<tr>" +
				"<td class='name'>" + split.name + "</td>" +
				" " +
				"<td class='split'>" + split.split + "%</td>" +
				"</tr>"
			);

			$('#new-split').click();

			return false;
		});

		// new player

		$('#new_player').click(function() {
			$(':input', '#player-info').val('');
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

		// close forms
		$('form .close').click(function() {
			$(this).add('#blind').hide();
			return false;
		});

		// handle square clicks
		$('#grid td').click(function() {
			if (current_player) {
				var pos = this.id.split('-');
				var x = parseInt(pos[1], 10);
				var y = parseInt(pos[0], 10);

				if (game.grid[x][y]) return;

				game.grid[x][y] = current_player;
				$(this)
					.removeClass('available')
					.text(current_player.name);

				check_squares();
			}

			return false;
		});


		// handle full grid

		var squares_left = function() {
			for (x = 0; x < 10; x++) {
				for (y = 0; y < 10; y++) {
					if (!game.grid[x][y]) return true;
				}
			}
			return false;
		};

		var check_squares = function() {
			// ditch if any squares are left
			if (squares_left()) return;

			$('body').removeClass('player-selected');
			console.log('get scores');
		};
	});
})(jQuery);