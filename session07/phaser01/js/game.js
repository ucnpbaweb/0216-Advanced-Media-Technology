var game, player, platforms, cursors, stars, score = 0, scoreText, stateText, background, backgroundtile;

window.addEventListener('load', function(){
	var parent = document.getElementById('game');
	game = new Phaser.Game(800, 600, Phaser.AUTO, parent, { preload: preload, create: create, update: update });
}, false);


function preload() {
	game.load.image('ground', 'images/platform.png');
	game.load.image('background', 'images/background.png');
	game.load.image('star', 'images/star.png');
	game.load.spritesheet('player', 'images/sprite01.png', 40, 120);
	game.load.image('backgroundtile', 'images/background01.png');
}

function create() {
	//  We're going to be using physics, so enable the Arcade Physics system
	game.physics.startSystem(Phaser.Physics.ARCADE);

	// Set the size of the world
	game.world.setBounds(0, 0, 800, 600);
	
	//  A simple background for our game
	//game.add.sprite(0, 0, 'background');
	//changed background to tileSprite to make it cover the world
	background = game.add.tileSprite(0, 0, 800, 600, 'background');
	background.fixedToCamera = true;

	backgroundtile = game.add.tileSprite(0, 0, 800, 600, 'backgroundtile');
	backgroundtile.fixedToCamera = true;


	//  The platforms group contains the ground and the 2 ledges we can jump on
	platforms = game.add.group();
	//  We will enable physics for any object that is created in this group
	platforms.enableBody = true;

	// Create a new ground for every 200px
	for(var i = 0; i < game.world.width/200; i++){
		// Here we create the ground.
		var y = game.rnd.integerInRange(game.world.height - 140, game.world.height - 20);
		var ground = platforms.create(i * 200, y, 'ground');
		//  This stops it from falling away when you jump on it
		ground.body.immovable = true;
	}

	//  Now let's create two ledges
	//var ledge = platforms.create(200, 500, 'ground');
	//ledge.body.immovable = true;
	//ledge = platforms.create(-150, 250, 'ground');
	//ledge.body.immovable = true;

	player = game.add.sprite(40, game.world.height - 300, 'player');

	//  We need to enable physics on the player
	game.physics.arcade.enable(player);

	//  Player physics properties. Give the little guy a slight bounce.
	player.body.bounce.y = 0.2;
	player.body.gravity.y = 400;
	player.body.collideWorldBounds = true;

	//  Our two animations, walking left and right.
	player.animations.add('left', [0, 1, 2, 3], 10, true);
	player.animations.add('right', [4, 5, 6, 7], 10, true);

	//  Finally some stars to collect
	stars = game.add.group();
	//  We will enable physics for any star that is created in this group
	stars.enableBody = true;

	// Here we'll create a star for every 80px
	for (var i = 0; i < game.world.width/80; i++){
		//  Create a star inside of the 'stars' group
		var star = stars.create(i * 80, 0, 'star');
		//  Let gravity do its thing
		star.body.gravity.y = 300;
		//  This just gives each star a slightly random bounce value
		star.body.bounce.y = 0.1 + Math.random() * 0.2;
	}

	//  The score
	scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
	scoreText.fixedToCamera = true;

	//  Text
    stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
    scoreText.fixedToCamera = true;
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;

	//  Our controls.
	cursors = game.input.keyboard.createCursorKeys();

	game.camera.follow(player);
}

function update() {
	    //  Collide the player and the stars with the platforms
	    game.physics.arcade.collide(player, platforms);
	    game.physics.arcade.collide(stars, platforms);

		//  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
		game.physics.arcade.overlap(player, stars, collectStar, null, this);

		//  Reset the players velocity (movement)
		player.body.velocity.x = 0;

		if (cursors.left.isDown){
			//  Move to the left
			player.body.velocity.x = -150;
			player.animations.play('left');
			player.moving = 'left';
		}
		else if (cursors.right.isDown){
			//  Move to the right
			player.body.velocity.x = 150;
			player.animations.play('right');
			player.moving = 'right';
		}else{
			//  Stand still
			player.animations.stop();
			player.frame = (player.moving == 'left')? 1 : 4;
		}

		//  Allow the player to jump if they are touching the ground.
		if (cursors.up.isDown && player.body.touching.down){
			player.body.velocity.y = -300;
		}

		backgroundtile.tilePosition.x = -game.camera.x;
		// slow down the background
		//backgroundtile.tilePosition.x = -(game.camera.x * .7);

}

function collectStar (player, star) {
	// Removes the star from the screen
	star.kill();

	//  Add and update the score
	score += 10;
	scoreText.text = 'Score: ' + score;

	if (stars.countLiving() == 0)
    {
        score += 1000;
        scoreText.text = 'Score: ' + score;

        //enemyBullets.callAll('kill',this);
        stateText.text = " You Won, \n Click to restart";
        stateText.visible = true;

        //the "click to restart" handler
        game.input.onTap.addOnce(restart,this);
    }
}

function restart(){
	console.log('reset all...');
}