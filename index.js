//const lottie = require('./lottie');
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.7;
const duckPlayer = document.getElementById('playerIdDuck');

const gravity = 1;
const movementSpeed = 10;
const jumpSpeed = 20;
let isGrounded = false;

class Player {
	constructor() {
		this.position = {
			x: 100,
			y: 100,
		};
		this.velocity = {
			x: 0,
			y: 0,
		};
		this.width = 100;
		this.height = 100;
	}

	draw() {
		c.fillStyle = 'red';
		c.fillRect(this.position.x, this.position.y, this.width, this.height);
	}

	/*Change sprite to svg
    updatePlayer(){
		//duckPlayer.style.position = 'absolute';
		//duckPlayer.style.top = '100px';
		//var transform = " translate(5,5)";
		var transform = " translate("+this.position.x+","+this.position.y+")";
    	//duckPlayer.setAttribute(this.position.x, this.position.y);
		duckPlayer.setAttribute("transform", transform);
		
    }*/

	update() {
		this.draw();
		//this.updatePlayer();

		//Updates Horizontal Movement
		this.position.x += this.velocity.x;

		//Checks for ground
		if (this.position.y + this.height + this.velocity.y <= canvas.height) {
			console.log(canvas.height);
			this.position.y += this.velocity.y;
			this.velocity.y += gravity;
		} else {
			this.velocity.y = 0;
			isGrounded = true;
		}

		//Border checking
		/*if(this.position.x >= canvas.width - 10){
            player.velocity.x = -player.velocity.x;
        }*/
	}
}

const player = new Player();

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);
	player.update();
}

animate();

/*WASD controls*/
addEventListener('keydown', ({ keyCode }) => {
	console.log(keyCode);
	switch (keyCode) {
		case 87:
			//up
			if (isGrounded === true) {
				console.log('is jumping');
				player.velocity.y = -jumpSpeed;
				isGrounded = false;
			}
			break;
		case 68:
			//right
			player.velocity.x = movementSpeed;
			break;
		case 65:
			//left
			player.velocity.x = -movementSpeed;
			break;
	}
});
addEventListener('keyup', ({ keyCode }) => {
	console.log(keyCode);
	switch (keyCode) {
		case 87:
			//up
			//force svg to have an id
			fetch('data.json', {})
				.then((data) => {
					return data.json();
				})
				.then(function (animdata) {
					if (document.getElementById('jsoncontainer').hasChildNodes() === false) {
						//checks if already having svg
						//bodymovin.loadAnimation({
						bodymovin.loadAnimation({
							container: document.getElementById('jsoncontainer'),
							animationData: animdata,
							istrue: true,
							//name: 'animation1test',
						});
					}
				})
				.catch(function (error) {
					console.error('Something went wrong');
				});

			player.velocity.y = 0;
			break;
		case 68:
			//Deletes svg element
			if (document.getElementById('jsoncontainer').hasChildNodes() === true) {
				console.log(document.getElementById('jsoncontainer'));
				/*fetch(document.getElementById('jsoncontainer').childNodes[0]).then((data) => {
					console.log('worked..');
				});*/

				document.getElementById('jsoncontainer').removeChild(document.getElementById('jsoncontainer').childNodes[0]);
			}
			//
			player.velocity.x = 0;
			break;
		case 65:
			//left
			player.velocity.x = 0;
			break;
	}
});

/*Button controls*/
function moveJump() {
	if (isGrounded === true) {
		console.log('is jumping');
		player.velocity.y = -jumpSpeed;
		isGrounded = false;
	}
	console.log('clicking the button');
}
function moveLeft() {
	player.velocity.x = -movementSpeed;
}
function moveRight() {
	player.velocity.x = movementSpeed;
	console.log('now moving');
}

/* Fix movement release*/
function jumpRelease() {
	player.velocity.y = 0;
}
function moveRelease() {
	player.velocity.x = 0;
	console.log('released');
}

/*
.svgClass .circleClass{
    animation: aMoveUnit 1s infinite ease-in-out;
}
@keyframes aMoveUnit{
*/

/*const player = document.addEventListener*/
