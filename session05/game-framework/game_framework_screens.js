mathgame.game = (function(){
	var showScreen = function(screenId){
		//run the screen module
		mathgame.screens[screenId].run();
		// display the screen
		var currentScreen = document.querySelector('#game .screen.active');
		if(currentScreen) currentScreen.classList.remove('active');
		document.getElementById(screenId).classList.add('active');
	};

	return {
		showScreen : showScreen
	}
})();

mathgame.screens.splashscreen = (function(){
	var firstrun = true;

	var setup = function(){
		document.getElementById('splashscreen').addEventListener('click', function(){
			mathgame.game.showScreen('mainmenu');
		}, false);
	};

	var run = function(){
		if(firstrun){
			setup();
			firstrun = false;
		}
	};

	return {
		run : run
	}
})();

mathgame.screens.mainmenu = (function(){
	var firstrun = true;

	var setup = function(){
		document.getElementById('mainmenu').addEventListener('click', function(e){
			if(e.target.tagName == 'BUTTON'){
				mathgame.game.showScreen(e.target.name);
			}
		}, false);
	};

	var run = function(){
		if(firstrun){
			setup();
			firstrun = false;
		}
	};

	return {
		run : run
	}
})();

mathgame.screens.gamescreen = (function(){

	var setup = function(){
		mathgame.board.initialize();
	};

	var run = function(){
		setup();
	};

	return {
		run : run
	}
})();

mathgame.screens.highscore = (function(){
	var firstrun = true;

	var setup = function(){
		document.getElementById('highscore').addEventListener('click', function(){
			mathgame.game.showScreen('mainmenu');
		}, false);
	};

	var run = function(){
		if(firstrun){
			setup();
			firstrun = false;
		}
	};

	return {
		run : run
	}
})();

mathgame.screens.aboutscreen = (function(){
	var firstrun = true;

	var setup = function(){
		document.getElementById('aboutscreen').addEventListener('click', function(){
			mathgame.game.showScreen('mainmenu');
		}, false);
	};

	var run = function(){
		if(firstrun){
			setup();
			firstrun = false;
		}
	};

	return {
		run : run
	}
})();