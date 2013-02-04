(function($) {
	var game = {
		grid: [],
		players: [],
		scores: []
	};

	var x, y, current_player;

	for (x = 0; x < 10; x++) {
		game.grid[x] = [];
		for (y = 0; y < 10; y++) {
			game.grid[x][y] = 0;
		}
	}

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

		// handle square clicks
		$('#grid td').click(function() {
			if (current_player) {
				var pos = this.id.split('-');
				var x = parseInt(pos[1], 10);
				var y = parseInt(pos[0], 10);
				game.grid[x][y] = current_player;
				$(this).text(current_player.name);
			}

			return false;
		});

		$('#new_player').click(function() {
			$(':input', '#player_info').val('');
			$('#blind, #player_info').show();
			$('[name=name]', '#player_info').focus();
			return false;
		});

		// handle form submissions
		$('#player_info').submit(function() {
			current_player = {
				name: $('[name=name]', this).val(),
				email: $('[name=email]', this).val()
			};

			console.log(current_player);

			game.players.push(current_player);

			$('#blind, #player_info').hide();
			return false;
		});
	});
})(jQuery);