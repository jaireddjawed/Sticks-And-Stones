// last - updated 6 / 8 / 14 
$(document).ready(function () {
	// Get the canvas element
	var canvas = document.getElementById("canvas");
	var menuMusic = document.getElementById("main-menu-music");
	var playMusic = document.getElementById("play-music"); 
	var victoryMusic = document.getElementById("victory-music");
	var gameOverMusic = document.getElementById("game-over-music");
	// Get our 2D context for drawing
	var context = canvas.getContext("2d");
	// scores  
	var playerScore = 0;
	var player2Score = 0; 
	var playerVsCpuScore = 0;
	var cpuScore = 0; 
	// decide what will be shown   
	var showRandomParticles = false;
	// Frames-per-second   
	var showSinglePlayer = false;
	var showMultiPlayer = false; 
	var showVersus = false; 
	var options = false;
	var dp = false;
	var timerId; // tick variable 
	var FPS = 30; // frames - per - second  
	var keyDown = []; 
	var KeyboardVector; // Keyboard vect or variable 
	var code; // keycode
	var totalScore = 0; // total score of both players 
	/* variables to check who last hit the ball */
	var lastHitPlayer1 = false; 
	var lastHitPlayer2 = false; 
	var h;
	var count = 0;
	var humanPlayer = true;
	var cpu = false; 
	var difficulty = 0; 
	var playerVict = false; 
	var player2Vict = false;  
	var cpuVict = false;
	var totalPoints = 0;
	var usedNum = false;
	var gameOver = 1;
	var useVictoryLimit = false;
	var pointsLimit;
    var caughtDoublePoints = false; 
    var caughtDoublePointsP2 = false;
    var caughtDoublePointsCpu = false;
    var countHits = 0, countHitsP2 = 0, countHitsCpu = 0;
    
	$(function () {
		$("#slider, #slider2").slider({ 
			orientation: "horizontal",
			min: 0,
			max: 10,
			value: 8,
			slide: volVal,
			change: volVal  
		}); 
	}); 
	
    function volVal(){
        menuMusic.volume = $("#slider").slider("value") / 10;
        playMusic.volume = $("#slider").slider("value") / 10;
        victoryMusic.volume = $("#slider").slider("value") / 10 ;
        gameOverMusic.volume = $("#slider").slider("value") / 10;
    } 
 
	$(function () {
		$(document).tooltip({
			position: { 
				my: "center bottom-20",
				at: "center top",
				using: function (position, feedback) {
					$(this).css(position);
					$("<div>")
						.addClass("arrow")
						.addClass(feedback.vertical)
						.addClass(feedback.horizontal)
						.appendTo(this);
				}
			}
		});
		
		// hidden objects
		$("h1").hide();
		$(".menu").hide();
		$(".endMenu").hide();
		$("#afterscreen").hide();
		$("#mainmdiv").hide(); 
		$("#replaydiv").hide();
		$("#submit").hide();
		$("#back").hide();
		$("#volume").hide();
		$("#slider, #slider2").hide(); 
		$("#cp").hide();
		$("#red, #green, #blue, #swatch").hide();
		$("button").show();
		$("#opt").hide();
		$("input[type='radio']").hide();
		$("span").hide();
		$("#opver").hide(); 
		$("#colorpicker").hide();
		$(".afterscreen").hide(); 
        $("#slider, #slider2").hide(); 
        $("ul, input").hide();
        menuMusic.pause();
        
	$("canvas, p, #subtitle").one("click", function () {
			$("p").hide("slow");
			$("h1").show("slow");
			$("#replay").hide();
			$("#mainm").hide();
			$("#p1wins").hide();
			$("#p2wins").hide();
			$(".menu").show("slow");
			$("#back").hide();
			$("#vol-opt-list, #opt, #versus-mode, #first-control-explanation, #second-control").hide();
			showRandomParticles = true;
			menuMusic.play();  
		});
		
		$(".menu").hover(function () {
			$(this).toggleClass("highlighted"); 
		});
		
	$("#playSingle, #singlePlayer").click(function () {
			$("h1").hide("slow");
			$("div").hide("slow");
			$("#back").show(); 
			showSinglePlayer = true;
			showRandomParticles = false;    
			menuMusic.pause();
			playMusic.play();
		});
		
	$("#playMulti, #multiPlayer").click(function () {
			$("h1").hide("slow"); 
			$("div").hide("slow"); 
			$("#back").show(); 
			showMultiPlayer = true; 
			showRandomParticles = false;
			menuMusic.pause();
			playMusic.play(); 
		}); 
		 
	$("#playVersus, #versus").click(function () {
			$("h1").hide("slow");
			$("div").hide("slow");
			$("#back").show();
			if ( !useVictoryLimit )
			    totalPoints = 10;
			else
			    totalPoints = pointsLimit;
			playerScore = 0;
			player2Score = 0;
			showRandomParticles = false;
			showVersus = true;
			playerVsCpuScore = 0;  
			cpuScore = 0;
			player2.x = 790;
			player2.y = 190;
			player.x = 100; 
			player.y = 190;
			playerVsCpu.x = 100;
			playerVsCpu.y = 190;
			computer.x = 790;
			computer.y = 190; 
			computer.vx = 0;
			computer.vy = 0;
			menuMusic.pause(); 
			playMusic.play(); 
		});
	});
	 
	$("#options, #op").click(function () {
		$("div").hide("slow");
		$("h1").hide("slow"); 
		$("#back").show();
		$("#volume").show();
		$("#cp").show();
		$("#opt").show("slow");
		$("span").show(); 
		$("#opver").show(); 
		$("ul").show();
		$("#hp, #c, #controls, #second-controls, #first-control-explanation, #second-control").hide();
	});
	
	$("#submit").click(function(){ 
	    useVictoryLimit = true;
	    pointsLimit = parseInt(document.getElementById("points").value, 10);
	});
	
	$("#human-player").click(function () {
		$("#cpu").attr("checked", false);
		humanPlayer = true; 
		cpu = false;
	});
	
	$("#cpu").click(function () {
		$("#human-player").attr("checked", false);
		cpu = true;
		humanPlayer = false;
	});
	
	$(".volume").click(function(){  
        $("ul").hide("slow");
        $("#slider, #slider2, #vol-opt-list").show("slow");  
	});
	 
	$(".photos").click(function(){
	    $("ul").hide("slow");
	    $("input[name='photo-name'], input[name='submit-photo']").show("slow");
	});
	
	$(".user").click(function(){ 
        $("ul").hide("slow");
        $("input[type='radio'], #hp, #c, #versus-mode, #points, #submit").show(); 
	});  
	 
	$(".cp").click(function () {
	    $("ul").hide("slow");
		$("#cp, span, input[type='radio'], #opver").hide("slow");
		$("#colorpicker").show();
		$("#volume, #slider, #slider2").hide();
		$("#red, #green, #blue, #swatch").show();
		$("#red").css("background", "#ef2929");
		$("#red").css("border-color", "#ef2929");
		$("#green").css("background", "#8ae234");
		$("#green").css("border-color", "#8ae234");
		$("#blue").css("background", "#729fcf");
		$("#blue").css("border-color", "#729fcf");
	}); 
	
	$(".controls").click(function(){
	    $("ul").hide("slow");
	    $("#controls, #second-controls, #first-control-explanation, #second-control").show("slow");
	});
	
	$("controls li, #second-controls li").hover(function(){
	    $(this).toggleClass("hi-lited-controls");
	    
	    KeyboardVector = function(){
	       if ( code === 87 ) // w key 
	          $(".w").toggleClass("hi-lited-controls");
	       if ( code === 65 ) // a key
	          $(".a").toggleClass("hi-lited-controls");
	       if ( code === 83 ) // s key
	          $(".s").toggleClass("hi-lited-controls");
	       if ( code === 68 )  // d key 
	          $(".d").toggleClass("hi-lited-controls");
	       if ( code === 38 ) // up key
	          $(".up").toggleClass("hi-lited-controls");
	       if ( code === 39 ) // right key
	          $(".right").toggleClass("hi-lited-controls");
	       if ( code === 40 ) // down key
	          $(".down").toggleClass("hi-lited-controls");
	       if ( code === 37 ) // left key 
	          $(".left").toggleClass("hi-lited-controls");
	    };
	});
	
	$("#back").click(function () {
		showSinglePlayer = false;
		showMultiPlayer = false;
		showVersus = false;
		showRandomParticles = true; 
		$(".menu").show("slow");
		$("#back, ul").hide();
		$("h1").show("slow");
		$("#slider, #slider2").hide();
		$("#red, #green, #blue, #swatch").hide();
		$("#cp").hide();
		$("#opt").hide(); 
		$("input[type='radio'], #hp, #c").hide();
		$("#colorpicker").hide();
		playerVict = false; 
		player2Vict = false;
		$(".afterscreen, #vol-opt-list, #versus-mode, input, #first-control-explanation, #second-control").hide();
		playMusic.pause();
		menuMusic.play();
	});
	
	window.onkeydown = function (e) {
		// IE stuff
		e = e || event;
		// Set keycode 
		keyDown[code = e.keyCode || e.which] = true;
		if (KeyboardVector)
			KeyboardVector();
	};
	
	window.onkeyup = function (e) {
		// IE stuff 
		e = e || event;
		// Clear keycode
		code = keyDown[e.keyCode || e.which] = undefined;
	};
	
	// Game loop draw function 
	function draw() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		if (showRandomParticles && !showSinglePlayer && !showMultiPlayer) {
			for (var i = 0; i < particles.length; i++) {
				var p = particles[i];
				context.beginPath();
				context.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
				context.fillStyle = p.color;
				context.fill();
			}
		} 
		if (showSinglePlayer) {
			drawSingleArena();
			drawBoard();
			drawParticle();
			drawPlayer(singleplayer); 
		} 
		if (showMultiPlayer) { 
			drawSingleArena();
			drawBoard();
			drawParticle();
			drawPlayer(singleplayer);
			drawPlayer(multiplayer);
		}
		if (showVersus) {
			if (humanPlayer) {
				drawArena();
				versusScore();
				drawParticle();
				drawPlayer(player);
				drawPlayer(player2);
			}
			else if (cpu) {
				drawArena();
				drawParticle();
				drawPlayer(playerVsCpu);
				drawPlayer(computer);
				versusScore();
			}
		}
		if (dp)
			doublePoints.draw();
		if (playerVict || player2Vict && !showSinglePlayer && !showMultiPlayer)
			showVict();
			if ( gameOver === 2 || gameOver === 3 )
			showGameOver();
	}
	 
	// Particle Array
	var particles = [];
	for (var i = 0; i <= 50; i++) { 
		particles.push({
			// Create random values for each of these: 
			x: randNum(30, canvas.width - 30),
			y: randNum(30, canvas.height - 30),
			vx: randNum(-200, 200),
			vy: randNum(-200, 200),
			radius: 50,
			color: "rgba(255, 25, 25, .5)"
		});
	}

	function hexFromRGB(r, g, b) {
		var hex = [
			r.toString(16),
			g.toString(16),
			b.toString(16)
		];
		$.each(hex, function (nr, val) {
			if (val.length === 1) {
				hex[nr] = "0" + val;
			}
		});
		return hex.join("").toUpperCase();
	}

	function refreshSwatch() {
		var red = $("#red").slider("value"),
			green = $("#green").slider("value"),
			blue = $("#blue").slider("value"),
			hex = hexFromRGB(red, green, blue);
		$("#swatch").css("background-color", "#" + hex );
	}
	
	$(function () {
		$("#red, #green, #blue").slider({
			orientation: "horizontal",
			range: "min",
			max: 255,
			value: 127,
			slide: refreshSwatch,
			change: refreshSwatch
		});
		$("#red").slider("value", 255);
		$("#green").slider("value", 25);
		$("#blue").slider("value", 25);
	});
	 
	// Game loop update function 
	function updateParticles() {
		var red = $("#red").slider("value"),
			green = $("#green").slider("value"),
			blue = $("#blue").slider("value");
		for (var i = 0; i < particles.length; i++) {
			var p = particles[i];
			p.x += p.vx / FPS;
			p.y += p.vy / FPS;
			if ((p.x - p.radius) < 0) {
				p.x = p.radius;
				p.vx = -p.vx;
				p.color = "rgb(" + red + "," + green + "," + blue + ")";
			}
			if ((p.x + p.radius) > canvas.width) {
				p.x = canvas.width - p.radius;
				p.vx = -p.vx;
				p.color = "rgba(" + red + "," + green + "," + blue + ", .5)";
			}
			if ((p.y - p.radius) < 0) {
				p.y = p.radius;
				p.vy = -p.vy;
				p.color = "rgba(" + red + "," + green + "," + blue + ", .5)";
			}
			if ((p.y + p.radius) > canvas.height) {
				p.y = canvas.height - p.radius;
				p.vy = -p.vy;
				p.color = "rgb(" + red + "," + green + "," + blue + ")";
			}
		}
	}
 
	function randNum(min, max) {
		return Math.random() * (max - min) + min;
	}
	
	var singleplayer = { // draw player in singlePLayer  
		color: "rgba(255,0,0,.6)",
		height: 10,
		width: 60,
		x: 200,
		y: 600,
		cornerRadius: 10,
		leftKey: 37,
		rightKey: 39,
		leftKeyM: 65,
		rightKeyM: 68,
		life: 3
	};
	
	var multiplayer = {
		color: "rgba(0,0,255,.6)",
		height: 10,
		width: 60,
		cornerRadius: 10,
		x: 300,
		y: 600,
		leftKey: 37,
		rightKey: 39
	};
	
	// player variables 
	var player = {
		color: "rgba(255,0,0,.6)",
		height: 40,
		width: 10,
		upKey: 87,
		downKey: 83,
		leftKey: 65,
		rightKey: 68,
		x: 100,
		y: 190,
		cornerRadius: 10,
		vict: 0 
	};
	
	var player2 = {
		color: "#357EC7",
		height: 40,
		width: 10,
		upKey: 38,
		downKey: 40,
		leftKey: 37,
		rightKey: 39,
		x: 790,
		y: 190,
		cornerRadius: 10,
		vict: 0 
	};
	
    var playerVsCpu = {
		color: "rgba(255,0,0,.6)",
		height: 40,  
		width: 10,
		upKey: 38,
		downKey: 40, 
		x: 100,
		y: 190,
		cornerRadius: 10
	};
	
    var computer = {
		x: 790,
		y: 190,
		cornerRadius: 10,
		vx: 0,
		vy: 0,
		ax: 0,
		ay: 2,
		width: 10,
		height: 40,
		color: "#357EC7",
		up: false,
		down: false, 
		vict: 0,
		update: function () {
			this.vx += this.ax / FPS;
			this.vy += this.ay / FPS;
			this.x += this.vx / FPS;
			this.y += this.vy / FPS;
			if ((this.x) < 0) {
				this.x = 0;
				this.vx = 0;
			}
			if ((this.x + this.width) > canvas.width) {
				this.x = canvas.width - this.width;
				this.vx = 0;
			}
		}
	};
 
	function check() {
		for (var i = 0; i < particle.length; i++) {
            
            var p = particle[i];
			var d3top = (p.x - p.radius);
			var d3x = Math.abs(p.y - (computer.x + 30));
			var d4x = p.y - (computer.y + 30);
			
			if (cpu) {
				if (p.x >= computer.x && p.x <= computer.x + computer.width && p.y >= computer.y && p.y <= computer.y + computer.height && cpu ){
					p.vx = -p.vx * 1.0005;
				}
			}
			
			if (d3top > computer.x && d3top < (computer.x + 5)) {
				if (d3x < 30 + p.radius + 5) {
					p.vx = p.vx * 1.005;
					p.vy = -p.vy * 1.005;
				}
			}
			
            if (d4x<0)
				computer.vy = -350; 
			else if (d4x > 0) 
				computer.vy = 350;
		}
	}
	
	var doublePoints = {
		text: "2x",
		x: randNum(70,830),
		y: randNum(70,630), 
		vx: -200,
		vy:  200,
		draw: function () {
			context.beginPath();
			context.font = "30px Raleway";
			context.fillText(this.text, this.x, this.y);
			context.fillStyle = "yellow";
			context.fill();
		}, 
		update: function () { 
			this.x += this.vx / FPS;
			this.y += this.vy / FPS; 
			
			if (60 <= this.x)
				this.vx = -this.vx * 1.0005;
			if (70 <= this.y)
				this.vy = -this.vy * 1.0005;
			if (660 >= this.y) 
				this.vy = -this.vy * 1.0005;
			if (830 >= this.x)
				this.vx = -this.vx * 1.0005;
				 
            if (this.x >= player.x && this.x <= player.x + player.width && this.y >= player.y && this.y <= player.y + player.height && humanPlayer ) {
					caughtDoublePoints = true;
					dp = false;
					doublePoints.vx = -200;
					doublePoints.vy =  200;
				} 
			
			if (this.x >= player2.x && this.x <= player2.x + player2.width && this.y >= player2.y && this.y <= player2.y + player2.height && humanPlayer ) {
					caughtDoublePointsP2 = true;
					dp = false;
					doublePoints.vx = -200;
					doublePoints.vy =  200;
				}
				
			if ( cpu && this.x >= computer.x && this.x <= computer.x + computer.width && this.y >= computer.y && this.y <= computer.y + computer.height ){
			    caughtDoublePointsCpu = true;
			    dp = false;
			    doublePoints.vx = -200; 
				doublePoints.vy =  200;
			}
			
			if ( cpu && this.x >= playerVsCpu.x && this.x <= playerVsCpu.x + playerVsCpu.width && this.y >= playerVsCpu.y && this.y <= playerVsCpu.y + playerVsCpu.height ){
		    caughtDoublePoints = true;
		    dp = false;
		    doublePoints.vx = -200;
			doublePoints.vy =  200;
		 }
		}
	};  
	
	var slowBall = {
	    color:"lightblue",
	    x:500,
	    y:200,
	    radius:10,
	    vx:-200,
	    vy:200,
	    draw: function(){
	        context.beginPath();
	        context.arc(this.x,this.y,this.radius, 0, 2 * Math.PI );
	        context.fillStyle = this.color;
	        context.fill();
	    }
	};
	
	// ball color neon purple #bc13fe
	var particle = [];
	particle.push({ 
		x: 500,
		y: 200,
		radius: 10, 
		// velocity  
		vx: -200,
		vy: 200,
		ax: 10,
		ay: 10,
		color: "rgba(0,255,0,.6)"
	});

	function drawParticle() {
		for (var i = 0; i < particle.length; i++) {
			var p = particle[i];
			context.beginPath();
			context.shadowBlur = 20;
			context.shadowColor = "black";
			context.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
			context.fillStyle = p.color;
			context.fill();
		} 
	} 

	function updateParticle() { 
	    var randNum;
	    var randNum2; 
		
		for (var i = 0; i < particle.length; i++) {
			singleplayer.color = "rgba(255,0,0,.6)";
			multiplayer.color = "rgba(0,0,255,.6)";
			player.color = "rgba(255,0,0,.6)";
			playerVsCpu.color = "rgba(255,0,0,.6)"; 
			 
			var p = particle[i];  
			p.vx += p.ax / FPS;
			p.vy += p.ay / FPS;
			p.x += p.vx / FPS;
			p.y += p.vy / FPS;
			
			if (70 < p.x) 
				p.vx = -p.vx * 1.0005;
			if (70 < p.y)
				p.vy = -p.vy * 1.0005;
			if (830 > p.x)  
				p.vx = -p.vx * 1.0005;
			if (625 > p.y)
				p.vy = -p.vy * 1.0005;
		
			if (showVersus && humanPlayer ) {
				// player - ball collision  
				if (p.x > player.x && p.x <= player.x + player.width && p.y >= player.y && p.y <= player.y + player.height) {
					p.vx = -p.vx * 1.0005;
					player.color = "red";
				}
				
				if (humanPlayer) {
					if (p.x > player2.x && p.x <= player2.x + player2.width && p.y >= player2.y && p.y <= player2.y + player2.height) {
						p.vx = -p.vx * 1.0005; 
						player2.color = "#5660FF";
					}
                	 
					if (playerScore === totalPoints || player2Score === totalPoints && showVersus ) {
						showRandomParticles = true;
						showVersus = false;
						if (playerScore > player2Score || playerVsCpuScore > cpuScore ) {
							playerVict = true;
							player2Vict = false;
							cpuVict = false;
		 		 			player.vict++;
						}
						if ( player2Score > playerScore ){
							player2Vict = true;
							playerVict = false; 
							cpuVict = false;
							player2.vict++;
						}  
						if ( cpuScore > playerVsCpuScore )
						{
						    playerVict = false;
						    player2Vict = false;
						    cpuVict = true;
						    computer.vict++;
						}
				}
            }	 
			 
				/* particle points */
				if (p.x - p.radius < 60 && p.y - p.radius >= 230 && p.y - p.radius <= 430 && humanPlayer ){ 
				randNum = Math.floor(Math.random()*3);
			    randNum2 = Math.floor(Math.random()*3);
			    
				    if ( caughtDoublePointsP2 &&  countHitsP2 < 3 ){
				        player2Score += 2;
				        countHitsP2++;
				    }
				    else
					    player2Score++; 
					if ( countHits === 2 )
				        caughtDoublePointsP2 = false;
				        
					count++; 
					p.y = 100; 
					p.x = 350;
					p.vx = 200;
					p.vy = 200;
					
					if ( count < 3 ) 
                    particle.push({
						x: 750,
						y: 200,
						radius: 10,
						// velocity   
						vx: 200,
						vy: 200,
						ax: 10,
						ay: 10,
						color: "rgba(0,255,0,.6)"
					}); 
					
					if ( randNum === randNum2 )
					    dp = true;
					else{ 
					    randNum = Math.floor(Math.random()*3);
					    randNum2 = MMath.floor(Math.random()*3); 
				    }     
				}   
				
				if (p.y - p.radius >= 230 && p.y - p.radius <= 430 && p.x - p.radius > 820 && humanPlayer ){
				randNum = Math.floor(Math.random()*3);
			    randNum2 = Math.floor(Math.random()*3);
			        
		        if ( caughtDoublePoints && countHits < 3 ) { 
				     playerScore += 2; 
				     countHits++; 
		        }
				else     
				     playerScore++; 
					 count++; 
					 
			    if ( countHits === 2 )
			       caughtDoublePoints = false;
			       
					p.y = 100; 
					p.x = 500;
					p.vx = -200; 
					p.vy = 200;
					
					if ( count < 3)
                    particle.push({
						x: 550,
						y: 200,
						radius: 10, 
						// velocity  
						vx: -200,
						vy: 200,
						ax: 10,
						ay: 10, 
						color: "rgba(0,255,0,.6)"
					}); 
					 
				if ( randNum === randNum2 )
					    dp = true;
			    else{
			        randNum = Math.floor(Math.random()*3);
			        randNum2 = Math.floor(Math.random()*3);
			    }
				}  
				
			}
			   
			if (cpu) {
				if (p.x >= playerVsCpu.x && p.x <= playerVsCpu.x + playerVsCpu.width && p.y >= playerVsCpu.y && p.y <= playerVsCpu.y + playerVsCpu.height) {
					p.vx = -p.vx * 1.0005; 
					playerVsCpu.color = "red";
				}
				
				if (playerVsCpuScore === totalPoints || cpuScore === totalPoints && showVersus ) {
					showVersus = false;
					showRandomParticles = true;
					if ( playerScore > player2Score && humanPlayer || playerVsCpuScore > cpuScore && cpu )
					{
					    playerVict = true;
					    player2Vict = false;
					    cpuVict = false;
					    player.vict++;
					}
					else if ( player2Score > playerScore ){
					    playerVict = false;
					    cpuVict = false;
					    player2Vict = true;
					    player2.vict++;
					}
				}  
				
				if ( p.x - p.radius < 60 && p.y - p.radius >= 230 && p.y - p.radius <= 430 ){
                    cpuScore++;
                    count++;
			       
                    p.y = 100;
                    p.x = 450;
                    p.vx = -200;
                    p.vy = 200; 
                    
                    if ( count < 3 )
                    particle.push({
						x: 500,
						y: -200,
						radius: 10,
				 		// velocity  
						vx: 200,
						vy: 200, 
						ax: 10, 
						ay: 10,
						color: "rgba(0,255,0,.6)"
					});
					
				} 
				
				if ( p.y - p.radius >= 230 && p.y - p.radius <= 430 && p.x - p.radius > 820 ){  
			        playerVsCpuScore++;
			        count++;
			        
                    p.y = 100;
                    p.x = 550;
                    p.vx = -200;
                    p.vy = 200; 
                    
                    if ( count < 3 ){
                        particle.push({ 
						x: 500,
						y: 200,
						radius: 10,
						// velocity  
						vx: -200,
						vy: 200,
						ax: 10,
						ay: 10,
						color: "rgba(0,255,0,.6)"
					});
					
	
		if ( playerVsCpu.height >= 30 )
		{
			playerVsCpu.height--;
					
if (keyDown[playerVsCpu.upKey] && O.y >= 70)
					O.y -= 15;
if (keyDown[playerVsCpu.downKey] && O.y + O.height + 10 < 650)
					O.y += 15;
					}
                    }
				}
			}
			
		if (showSinglePlayer || showMultiPlayer) {
				if (p.y - p.radius < 60 && lastHitPlayer1) {
					playerScore++;
					totalScore++;
					count++; 
					if ( player.width > 30 )
					    player.width--;
				}
				
				if (p.y - p.radius < 60 && lastHitPlayer2) {
					player2Score++;
					totalScore++;
					count++;
				    if ( player.width > 30 )
				        player2.width--;
				}
				
				if (p.y - p.radius < 60 && count <= 3 && totalScore > 1 ) {
					particle.push({
						x: 500,
						y: 200,
						radius: 10,
						// velocity  
						vx: -200, 
						vy: 200,
						ax: 10,
						ay: 10, 
						color: "rgba(0,255,0,.6)"
					});
				}
				
				if ( singleplayer.life === 0 ) 
				{
				    if ( showSinglePlayer){
				        showSinglePlayer = false;
				        gameOver = 2;
				    }
				    if ( showMultiPlayer ){
				        showMultiPlayer = false;
				        gameOver = 3;
				    }
				    playMusic.pause();
				} 
				
			    // player - ball collision cont.       
        if (p.y + p.radius >= singleplayer.y && p.y + p.radius <= singleplayer.y + singleplayer.width && singleplayer.x <= p.x + p.radius && singleplayer.x + singleplayer.width >= p.x + p.radius) {
					p.vy = -p.vy * 1.0005;
					lastHitPlayer1 = true;
					lastHitPlayer2 = false;
					singleplayer.color = "red";
				}
	
				if (p.y > singleplayer.y + singleplayer.height + p.radius) {
					//reset the ball position on the pad if it goes below it
					p.y = 100;
					p.x = 250;
					p.vx = -200;
					p.vy = 200; 
					singleplayer.life--; 
				}
				
				if (showMultiPlayer) {
					if (p.y + p.radius >= multiplayer.y && p.y + p.radius <= multiplayer.y + multiplayer.width && multiplayer.x <= p.x + p.radius && multiplayer.x + multiplayer.width >= p.x + p.radius) { 
						p.vy = -p.vy * 1.0005; 
						lastHitPlayer2 = true;
						lastHitPlayer1 = false;
						multiplayer.color = "blue";
			    }
					
					if (p.y > multiplayer.y + multiplayer.height + p.radius && lastHitPlayer2) {
						//reset the ball position on the pad if it goes below it
						p.y = 100;
						p.x = 250;
						p.vx = -200;
						p.vy = 200;
						singleplayer.life--;
					}
				}
			} 
		}
		
		$("#back").click(function () {
			particle.x = 500;
			particle.y = 200; 
			particle.vx = -150;
			particle.vy = 150;
			playerScore = 0;
			player2Score = 0;
			totalScore = 0;
			player.x = 100;
			player.y = 190;
			player2.x = 790;
			player2.y = 190;
			singleplayer.x = 200;
			singleplayer.y = 600;
			multiplayer.x = 300;
			multiplayer.y = 600;
			dp = false;
			computer.x = 790;
			computer.y = 190;
			computer.vx = 0;
			computer.vy = 0;
			lastHitPlayer1 = false;
			lastHitPlayer2 = false;
			singleplayer.life = 3;
			computer.x = 790;
			computer.y = 190;
			computer.vx = 0;
			computer.vy = 0;
			caughtDoublePoints = false;
			caughtDoublePointsP2 = false;
		});
	}

	function drawSingleArena() {
		// draw the single/multiplayer arena  
		context.fillStyle = "rgba(100,300,220,.6)";
		context.fillRect(60, 50, 790, 10);
		context.fillRect(50, 50, 10, 600);
		context.fillRect(50, 650, 800, 10);
		context.fillRect(850, 50, 10, 610);
		context.fillRect(60, 500, 790, 10);
		context.fillStyle = "rgba(200,200,200,.5)";
		context.fillRect(50, 50, 800, 600);
	}

	function drawBoard() { // draw the scores    
		context.fillStyle = "red";
		context.font = "30px Raleway";
		context.fillText("P1 Score:" + playerScore, 140, 30);
		if (showSinglePlayer || showMultiPlayer)
			context.fillStyle = "rgb(100,100,100)";
		    context.fillText("Life: " + singleplayer.life, 40, 30);
		if (showMultiPlayer) {
			context.fillStyle = "#357EC7";
			context.font = "30px Raleway";
			context.fillText("P2 Score:" + player2Score, 290, 30);
			context.fillStyle = "Green";
			context.fillText("Total Score:" + totalScore, 445, 30);
		}
	}
	
	// draw the arena
	function drawArena() {
		context.fillStyle = "rgba(100,300,220,.6)";
		context.fillRect(50, 50, 800, 600);
		context.fillRect(450, 60, 10, 580);
		context.fillRect(60, 230, 130, 10);
		context.fillRect(190, 230, 10, 210);
		context.fillRect(60, 430, 130, 10);
		context.fillRect(710, 230, 130, 10);
		context.fillRect(700, 230, 10, 200);
		context.fillRect(700, 430, 140, 10);
		context.fillStyle = "rgba(200,200,200,.5)";
		context.fillRect(60, 60, 780, 580);
	} 
	 
	// shows the score for versus   
	function versusScore() { 
		context.fillStyle = "red";
		context.font = "30px Raleway";
		// scores 
		if (cpu){
            context.fillText("P1: " + playerVsCpuScore, 200, 25 );
            context.fillStyle = "#357ec7";
			context.fillText("AI:  " + cpuScore, 600, 25); 
		}
		else{ 
            context.fillStyle = "red";
            context.fillText("P1: " + playerScore, 200, 25);
            if ( caughtDoublePoints ){
			    context.fillStyle = "yellow";
			    context.fillText("x2", 275, 25 );
			}
            context.fillStyle = "#357EC7";
			context.fillText("P2: " + player2Score, 600, 25);
			if ( caughtDoublePointsP2 ){
			    context.fillStyle = "yellow";
			    context.fillText("x2", 675, 25 );
			}
		}
	} 

	function showVict() {
	    dp = false;
	    for ( var i = 0; i < particle.length; i++ ){
	        if ( particle.length != 1 ) 
	            particle.splice(i,1); 
	    }
		if (playerVict || playerScore > cpuScore && cpu || playerScore > player2Score && humanPlayer) {
		    playMusic.pause();
		    victoryMusic.play(); 
			context.fillStyle = "rgb(150,140,130)";
			context.fillText("Player 1 Wins", 15, 105); 
			context.fillStyle = "Blue";
			context.fillText("Score ratio:", 15, 130);
			context.fillStyle = "Green";
            if ( humanPlayer ) 
                context.fillText(playerScore + ":" + player2Score, 15, 160);
            if ( cpu )
                context.fillText(playerVsCpuScore + ":" + cpuScore, 15, 160 );
			context.fillStyle = "rgb(200,255,100)";
			context.fillText("Victory Ratio:", 15, 195);
			context.fillStyle = "rgb(100,40,250)";
            if ( humanPlayer )
			  context.fillText(player.vict + ":" + player2.vict, 15, 220);
            if ( cpu )
              context.fillText(player.vict + ":" + computer.vict, 15, 220 );     
		}
		 
		if (player2Vict) {  
		    playMusic.pause();
		    if ( player2Score > playerScore )
		        victoryMusic.play();
		    else
		        gameOverMusic.play();
			    context.fillStyle = "rgb(150,140,130)";
			if ( humanPlayer )
                context.fillText("Player 2 Wins", 15, 105); 
			if ( cpu && cpuScore > playerVsCpuScore )
                context.fillText("AI Wins", 15, 105 );
          
			context.fillStyle = "Blue";
			context.fillText("Score ratio:", 15, 130);
			context.fillStyle = "Green";   
			if ( humanPlayer )
                context.fillText(player2Score + ":" + playerScore, 15, 160);
			if ( cpu )
                context.fillText(cpuScore + ":" + playerVsCpuScore, 15, 160 );
			context.fillStyle = "rgb(200,255,100)";
			context.fillText("Victory Ratio:", 15, 195);
			context.fillStyle = "rgb(100,40,250)";
			if ( humanPlayer )
                context.fillText(player2.vict + ":" + player.vict, 15, 220);
			if ( cpu ) 
                context.fillText(computer.vict + ":" + playerVsCpu.vict, 15, 220 );
		} 
		
		$(".afterscreen").show();
		
		$(".afterscreen").hover(function () {
			$(this).toggleClass("highlighted");
		}); 
		
		caughtDoublePoints = false;
		caughtDoublePointsP2 = false;
			
		$("#replay").click(function () { 
		    victoryMusic.pause();
		    gameOverMusic.pause();
		    playMusic.play();
			$(".afterscreen").hide();
			showRandomParticles = false;
			playerScore = 0;
			player2Score = 0;
			playerVict = false;
			player2Vict = false;
			showVersus = true;
			playerVsCpuScore = 0;
			cpuScore = 0;
			player2.x = 790;
			player2.y = 190;
			player.x = 100; 
			player.y = 190;
			playerVsCpu.x = 100;
			playerVsCpu.y = 190;
			computer.x = 790;
			computer.y = 190;
			computer.vx = 0;
			computer.vy = 0;
		});
		 
		$("#mm").click(function () {
		    victoryMusic.pause();
		    gameOverMusic.pause();
		    menuMusic.play();    
			$(".afterscreen").hide("slow");
			playerScore = 0;
			player2Score = 0;
			playerVict = false;
			player2Vict = false; 
			$("#main").show(); 
			$(".menu").show();
			$(".main-text").show();
			$(".menu2").show();
			$("#back").hide();
		});
	}
 
    function showGameOver(){
        dp = false;
	    for ( var i = 0; i < particle.length; i++ ){
	        if ( particle.length != 1 ) 
	            particle.splice(i,1); 
	    }
	   
	        gameOverMusic.play();  
	        showRandomParticles = true;
	        context.fillStyle = "rgb(150,140,130)";
	        context.font = "45px Raleway bold"; 
	        context.fillText("Game Over!", 15, 105 );
	        context.font = "30px Raleway"; 
	        context.fillStyle = "Blue";
	        context.fillText("Player Score: " + playerScore, 20, 140 );  
	        context.fillStyle = "Green";
	        if ( gameOver === 3 ){
	            context.fillText("Player 2 Score: " + player2Score, 20, 170 );
	            context.fillStyle = "rgb(200,150,255)";
	            context.fillText("Total Score: "+ totalScore, 20, 200 ); 
	       }  
	       
	       $(".afterscreen").show();
	       singleplayer.life = 3;
	       
	   $("#mm").click(function () {
		    gameOverMusic.pause();
		    menuMusic.play();    
			$(".afterscreen").hide("slow");
			playerScore = 0;
			player2Score = 0;
			$("#main").show(); 
			$(".menu").show();
			$(".main-text").show();
			$(".menu2").show();
			$("#back").hide("slow");
			gameOver = 1;
		});
		  
		$("#replay").click(function () { 
		    gameOverMusic.pause();
		    playMusic.play();
			$(".afterscreen").hide("slow");
			showRandomParticles = false;
			playerScore = 0; 
			player2Score = 0;
			playerVict = false;
			player2Vict = false;
			if ( gameOver === 2 )
			    showSinglePlayer = true;
			if ( gameOver === 3 )
			    showMultiPlayer = true;
			gameOver = 1;
			singleplayer.x = 200;
			singleplayer.y = 600;
			multiplayer.x = 300; 
			multiplayer.y = 600;
		});
    } 
    
	//draw the players 
	function drawPlayer(O) {
		context.lineJoin = "round";
		context.lineWidth = O.cornerRadius;
		context.beginPath();
		context.strokeStyle = O.color;
		context.strokeRect(O.x + (O.cornerRadius / 2), O.y + (O.cornerRadius / 2), O.width - O.cornerRadius, O.height - O.cornerRadius);
		context.fillRect(O.x + (O.cornerRadius / 2), O.y + (O.cornerRadius / 2), O.width - O.cornerRadius, O.height - O.cornerRadius);
		context.fill();
		if (O === player) {
			if (keyDown[O.upKey] && O.y >= 70) // up 
				O.y -= 10;
			else if (keyDown[O.downKey] && O.y + O.height + 10 < 650) // down    
				O.y += 10;
			else if (keyDown[O.leftKey] && O.x >= 65) // left 
				O.x -= 10;
			else if (keyDown[O.rightKey] && O.x + O.width + 10 < 455) // right 
				O.x += 10;
		}
		if (cpu) {
			if (O === playerVsCpu) {
				if (keyDown[O.upKey] && O.y >= 70)
					O.y -= 10;
				if (keyDown[O.downKey] && O.y + O.height + 10 < 650)
					O.y += 10;
			}
		}
		if (O === player2) {
			if (keyDown[O.upKey] && O.y >= 70)
				O.y -= 10;
			else if (keyDown[O.downKey] && O.y + O.height + 10 < 650)
				O.y += 10;
			else if (keyDown[O.leftKey] && O.x + O.width + 10 >= 485)
				O.x -= 10;
			else if (keyDown[O.rightKey] && O.x <= 820)
				O.x += 10;
		}
		if (O === singleplayer && showMultiPlayer) {
			if (keyDown[O.leftKeyM] && O.x + O.width + 10 >= 139.5)
				O.x -= 25;
			if (keyDown[O.rightKeyM] && O.x < 784.9)
				O.x += 25;
		}
		else if (O === singleplayer) {
			if (keyDown[O.leftKey] && O.x + O.width + 10 >= 139.5)
				O.x -= 25;
			if (keyDown[O.rightKey] && O.x <= 784.9)
				O.x += 25;
		}
		if (O === multiplayer) {
			if (keyDown[O.leftKey] && O.x + O.width + 10 >= 139.5)
				O.x -= 25;
			if (keyDown[O.rightKey] && O.x <= 784.9)
				O.x += 25;
		} 
	}

	function tick() {
		draw();
		if (showVersus || showSinglePlayer || showMultiPlayer) {
			updateParticle();
			if (cpu)
				check();
		}
		if (showRandomParticles)
			updateParticles();
		if (dp)
			doublePoints.update();
		if (cpu)
			computer.update();
	}
	timerId = window.setInterval(tick, 1000 / FPS);
});
