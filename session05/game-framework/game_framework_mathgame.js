mathgame.board = (function(){
	var settings, board, questionDiv, statsDiv, resultDiv, gamestate = {}, total;

	var initialize = function(){
		settings = mathgame.settings;

		board = document.getElementById('board');
		board.classList.remove('hide');
		questionDiv = document.getElementById('question');
		statsDiv = document.getElementById('stats');
		resultDiv = document.getElementById('result');
		resultDiv.classList.add('hide');
		resultDiv.addEventListener('click', function(){
			mathgame.game.showScreen('mainmenu');
		}, false);
		document.forms.answer.addEventListener('submit', answerhandler, false);

		total = 5;
		gamestate.count = 0;
		gamestate.hits = 0;
		updatestats();
		askquestion();
	};

	var answerhandler = function(e){
		e.preventDefault();
		if(parseInt(e.target.answer.value) == gamestate.question.result){
			gamestate.hits++;
		}
		gamestate.count++;
		updatestats();
		if(gamestate.count < total){
			askquestion();
		} else {
			stop();
		}
	};

	var askquestion = function(){
		document.forms.answer.reset();
		gamestate.question = generatequestion();
		questionDiv.innerHTML = "Calulate: " + gamestate.question.v1 + "+" + gamestate.question.v2;
	};

	var generatequestion = function(){
		var result = Math.round(Math.random()*98);
		var v1 = Math.round(Math.random()*(result-1));
		var v2 = result - v1;
		return {'v1' : v1, 'v2' : v2, 'result' : result};
	};

	var updatestats = function(){
		statsDiv.innerHTML = 'Hits: ' + gamestate.hits + '/' + total;
	};


	var stop = function(){
		resultDiv.innerHTML = '<p>game stoped - hits: ' + gamestate.hits + '</p><p>Click to continue</p>';
		resultDiv.classList.remove('hide');
		board.classList.add('hide');
	};

	return {
		initialize : initialize
	}
})();