$(document).ready(function(){
   var canvas = document.getElementById("canvas");
   var context = canvas.getContext("2d");
   var menuMusic = document.getElementById("main-menu-music");
   var playMusic = document.getElementById("play-music");   
   var victoryMusic = document.getElementById("victory-music");
   var gameOverMusic =  document.getElementById("game-over-music");
   var paddleSFX = document.getElementById("sfx-paddle-moving");
   var paddleBallSFX = document.getElementById("sfx-pong-paddle");
   var doublePointsSFX = document.getElementById("double-points");
   var timerId;   
   var FPS = 30;
   var count = 0;
   var showRandomParticles = false;  
   var showSinglePlayer = false;
   var showMultiPlayer = false;  
   var showVersus = false;  
   var keyDown = []; 
   var KeyboardVector; // Keyboard vect or variable  
   var code; // keycode
   var playerScore = 0;
   var player2Score = 0;
   var totalScore = 0;
   var totalPoints = 1; 
   var useVictoryLimit = false;
   var pointsLimit; 
   var cpu = false;
   var dp = false;
   var caughtDoublePoints = false;
   var caughtDoublePointsP2 = false;
   var lastHitPlayer1 = false;
   var lastHitPlayer2 = true;
   var humanPlayer = true;
   var caughtDoublePointsCpu = false;
   var countHits = 0, countHitsP2 = 0, countHitsCpu = 0; 
   var cpuScore = 0;
   var playerVsCpuScore = 0;
   var easy = false, medium = true, hard = false;
   var gameOver = 1; 
   var playerVict = false;
   var player2Vict = false;
   var cpuVict = false;
  
   $("#options-field, .menu, #main, #back-button, #controls-field, .afterscreen").hide();
   
   $("#title, #subtitle, canvas").one("click", function(){
        $("#options-title").hide(); 
        $("#title, #subtitle").effect("explode");  
        $("#main, .menu, .menu-titles").show("slow");
        showRandomParticles = true;  
        menuMusic.play(); 
   });  
   
   $(function() {
    $( document ).tooltip({  
      position: {
        my: "center bottom-20", 
        at: "center top",
        using: function( position, feedback ) { 
          $( this ).css( position );
          $( "<div>" ) 
            .addClass( "arrow" )
            .addClass( feedback.vertical )
            .addClass( feedback.horizontal ) 
            .appendTo( this );
        }  
      }  
    });
  });
  
   $("#single-player").click(function(){ 
        $(".menu, .menu-titles, #main").hide("slow"); 
        $("#back-button").show();
        menuMusic.pause();
        playMusic.play(); 
        showRandomParticles = false;
        showSinglePlayer = true;
   });
   
   $("#multiplayer").click(function(){
      $(".menu, .menu-titles, #main").hide("slow");
      $("#back-button").show();
      menuMusic.pause();
      playMusic.play(); 
      showRandomParticles = false;
      showMultiPlayer = true;
   });
   
   $("#versus").click(function(){ 
     $(".menu, .menu-titles, #main").hide("slow");
     $("#back-button").show();
     menuMusic.pause();
     playMusic.play();
     showRandomParticles = false;
     showVersus = true;
   });
  
   $("#options").click(function(){  
       $(".menu-titles, .menu, #main").hide();   
       $("#options-title, #options-field").show("slow");   
       $("#difficulty").hide();
   }); 
   
   $("#ai").click(function(){
       $("#difficulty").show("slow"); 
   });
  
   $("#player-2").click(function(){
       $("#difficulty").hide("slow");
   });
   
   $("#controls").click(function(){
       $("#options-field").hide("slow");
       $("#controls-field").show();
   });
  
   $(".menu, #back, #back-button").hover(function () {   
	$(this).toggleClass("highlighted");  
   });  
   
   $(".esc").click(function(){   
       $("#options-field, #controls-field").hide(); 
       $("#main, .menu, .menu-titles").show("slow");
   }); 
   
   $("#back-button").click(function(){
       playerVict = false;
       player2Vict = false;
       showSinglePlayer = false;  
       showMultiPlayer = false;
       showVersus = false; 
       showRandomParticles = true;
       $("#back-button, .afterscreen").hide();
       $("#main, .menu, .menu-titles").show("slow");
       playMusic.pause(); 
       doublePointsSFX.pause();
       victoryMusic.pause(); 
       gameOverMusic.pause();
       menuMusic.play();
        
       // restore everything to its default setting
         for ( var i = 0; i < particle.length; i++ ){   
             if ( particle.length != 1 && !showVersus ){
               particle.splice(i, 1);
             }
         }
                dp = false;
				particle[0].x = 500;
				particle[0].y = 200; 
				particle[0].vx = -200;
				particle[0].vy = 200;
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
				lastHitPlayer1 = false;
				lastHitPlayer2 = false;
				singleplayer.life = 3;
   });
  
   $("#options-menu li").hover(function(){
       $(this).toggleClass("options-highlighted");
   });
  
   $("#keyboard").click(function(){     
        radioSwitch("#mouse", "#keyboard"); 
   });
  
   $("#mouse").click(function(){
        radioSwitch("#keyboard", "#mouse");             
   });     
   
   $("#easy").click(function(){
       easy = true; medium = false; hard = false;
       cpu = true; humanPlayer = false;
       radioSwitch("#medium", "#easy");
       radioSwitch("#hard", "#easy");
   });
   
   $("#medium").click(function(){
       medium = true; easy = false; hard = false;
       cpu = true; humanPlayer = false;
       radioSwitch("#easy", "#medium");
       radioSwitch("#hard", "#medium" );
   });
  
   $("#hard").click(function(){
       hard = true; easy = false; medium = false;
       cpu = true; humanPlayer = false;
       radioSwitch("#easy", "#hard");
       radioSwitch("#medium", "#hard");
   });
  
   $("#player-2").click(function(){
        radioSwitch("#ai", "#player-2");
	     humanPlayer = true;
         cpu = false;
   }); 
  
   $("#ai").click(function(){
        radioSwitch("#player-2", "#ai");
	    humanPlayer = false;
        cpu = true;
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
   
   $(function () { 
		$("#bgm-volume-value, #sfx-volume-value").slider({ 
			orientation: "horizontal",
			min: 0, 
			max: 10,
			value: 8,
			slide: bgmVolVal,
			change: bgmVolVal
		});  
   }); 
  
   function bgmVolVal(){
        menuMusic.volume = $("#bgm-volume-value").slider("value") / 10;
        playMusic.volume = $("#bgm-volume-value").slider("value") / 10;
        victoryMusic.volume = $("#bgm-volume-value").slider("value") / 10;
        gameOverMusic.volume = $("#bgm-volume-value").slider("value") / 10;
        paddleSFX.volume = $("#sfx-volume-value").slider("value") / 10;
        paddleBallSFX.volume = $("#sfx-volume-value").slider("value") / 10;
   } 
  
   
   $(function () {
		$("#red, #green, #blue").slider({
			orientation: "horizontal",
			range: "min",
			max: 255,
			slide: refreshSwatch,
			change: refreshSwatch
		});
		$("#red").slider("value", 255);
		$("#green").slider("value", 25);
		$("#blue").slider("value", 25);
  });
   
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
  
// Particle Array  
var particles = [];  
for ( var i = 0; i < 50; i++ ) {
    particles.push({ 
        // Create random values for each of these:
        x: randNum( 30, canvas.width - 30 ), 
        y: randNum( 30, canvas.height - 30 ),
        vx: randNum( -200, 200),
        vy: randNum( -200, 200),
        radius: 50,
        color: "rgba(255, 25, 25, .5)" 
    }); 
}

function draw() {
    context.clearRect( 0, 0, canvas.width, canvas.height );
  if ( showRandomParticles ){
    for ( var i = 0; i < particles.length; i++ ) {
        var p = particles[i];
        context.beginPath();
        context.arc( p.x, p.y, p.radius, 0, 3 * Math.PI, false);
        context.fillStyle = p.color;     
        context.fill();
    }
  }  
  if ( showSinglePlayer ){
      drawSingleArena();
      drawBoard();
      drawPlayer(singleplayer);
      drawParticle();
  }  
  if ( showMultiPlayer ){
      drawSingleArena();
      drawBoard();
      drawPlayer(singleplayer); 
      drawPlayer(multiplayer);
      drawParticle();
  }
  if ( showVersus ){
      drawArena();
      versusScore();
      drawPlayer(player);
      if ( humanPlayer )
        drawPlayer(player2);
      else 
         drawPlayer(computer);
    
  if ( dp )  
    doublePoints.draw();
    
      drawParticle();
  }
  if ( playerVict || player2Vict || cpuVict ){
      showVict();
  }
  if ( singleplayer.life <= 0 )
    showGameOver();
}
  
// Game loop update function 
function updateMenuParticles() { 
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
		ay: 0, 
		width: 10,
		height: 40,
		color: "#357EC7",
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
                    paddleBallSFX.play();
				}
			}
			
			if (d3top > computer.x && d3top < (computer.x + 5)) {
				if (d3x < 30 + p.radius + 5) { 
					p.vx = p.vx * 1.005;
					p.vy = -p.vy * 1.005;
                    paddleBallSFX.play(); 
				}
			}
			  
            if (d4x<0){ 
              if ( easy )
				computer.vy = -450; 
              if ( medium )
                computer.vy = -550;
              if ( hard )
                computer.vy = -650;
            }  
			else if (d4x > 0){        
              if ( easy )
				computer.vy = 450;
              if ( medium )
                computer.vy = 550;
              if ( hard )
                computer.vy = 650;
            }  
            if ( d3top < 400 && easy || medium )
               computer.vy = 0;
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
			context.font = "30px Black Ops One";
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
          
            if (this.x > player.x && this.x <= player.x + player.width && this.y >= player.y && this.y <= player.y + player.height){
              dp = false;
              caughtDoublePoints = true;
            } 
			if ( this.x > player2.x && this.x <= player2.x + player2.width && this.y >= player2.y && this.y <= player2.y + player2.height ){
              dp = false;
              caughtDoublePointsP2 = true;
}	 
            if ( this.x > computer.x && this.x <= computer.x + computer.width && this.y >= computer.y && this.y <= computer.y + computer.height ){
              dp = false;
              caughtDoublePointsCpu = true;
            }
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

function drawParticle()  {
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
          
		
                       if ( showSinglePlayer || showMultiPlayer) 
		           {
					if ( p.y + p.radius >= singleplayer.y && p.y + p.radius <= singleplayer.y + singleplayer.width && singleplayer.x <= p.x + p.radius && singleplayer.x + singleplayer.width >= p.x + p.radius ) {
                        paddleBallSFX.play();
						p.vy = -p.vy * 1.0005;
						lastHitPlayer1 = true;
						lastHitPlayer2 =  false;  
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
 
                    if ( singleplayer.life <= 0 ){
                      playMusic.pause();
                      gameOverMusic.play(); 
                      showGameOver();
                      if(showSinglePlayer)
                        gameOver = 2;
                      if ( showMultiPlayer)
                        gameOver = 3;
                      showSinglePlayer = false;
                      showMultiPlayer = false; 
                    }
                     
					if (p.y - p.radius < 60 && lastHitPlayer1) {
						playerScore++;
						totalScore++;
						count++; 
						
						if ( singleplayer.width > 30 )
					    		singleplayer.width--;
					}

 					if ( showMultiPlayer ) 
					{ 
						if ( p.y + p.radius >= multiplayer.y && p.y + p.radius <= multiplayer.y + multiplayer.width && multiplayer.x <= p.x + p.radius && multiplayer.x + multiplayer.width >= p.x + p.radius ){
                            paddleBallSFX.play(); 
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
					
						if (p.y - p.radius < 60 && lastHitPlayer2) {
							player2Score++;
							totalScore++;
							count++;
				    
							if ( multiplayer.width > 30 )
				        			multiplayer.width--;
						}
					}
		       }
		       
        
		       if ( showVersus ) 	  
		       {
  // player - ball collision
				if (p.x > player.x && p.x <= player.x + player.width && p.y >= player.y && p.y <= player.y + player.height) {
                    paddleBallSFX.play();
					p.vx = -p.vx * 1.0005; 
					player.color = "red";  
				}
                
				    if (p.x > player2.x && p.x <= player2.x + player2.width && p.y >= player2.y && p.y <= player2.y + player2.height && humanPlayer ) {
                    paddleBallSFX.play(); 
					p.vx = -p.vx * 1.0005; 
					player2.color = "#5660FF"; 
				}  
			 	                       
                   if ( cpuScore > playerScore && cpuScore === 10){
                     gameOverMusic.play();
                     cpuVict = true;
                     playerVict = false;
                     player2Vict = false;
                     computer.vict++;
                   } 
                 
                 if ( playerScore >= 10 || player2Score >= 10){
                   doublePointsSFX.pause();
                   playMusic.pause();
                   showVersus = false;
                   showRandomParticles = true;
                     
                   if ( playerScore > cpuScore ){
                     victoryMusic.play();
                     player.vict++;
                     gameOver = 2;
                     playerVict = true;
                     player2Vict = false;
                     cpuVict = false;
                   }
                   if ( playerScore > player2Score && humanPlayer){ 
                     victoryMusic.play();
                     player.vict++;
                     gameOver = 2; 
                     playerVict = true; 
                     player2Vict = false; 
                     cpuVict = false;
                   } 
                   if ( player2Score > playerScore ){
                     victoryMusic.play();
                     player2.vict++;
                     gameOver = 2;
                     playerVict = false; 
                     player2Vict = true;
                     cpuVict = false;
                   }
                 }
                  
				/* particle points */ 
             if ( p.x - p.radius < 60 && p.y - p.radius >= 230 && p.y - p.radius <= 430 ){
               if ( caughtDoublePointsCpu && countHitsCpu < 3 )
                 cpuScore += 2;
               else
                    cpuScore++;
                    
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
                 
				if (p.x - p.radius < 70 && p.y - p.radius >= 230 && p.y - p.radius <= 430 && humanPlayer ){ 
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
					    randNum2 = Math.floor(Math.random()*3); 
				    	}     
				}   
				
				if (p.y - p.radius >= 230 && p.y - p.radius <= 430 && p.x - p.radius > 820 ){
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
					 
						if ( count < 3 )
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
        }
} 
	  
function showVict() {
	    dp = false;
        showVersus = false;
	    for ( var i = 0; i < particle.length; i++ ){
	        if ( particle.length != 1 ) 
	            particle.splice(i,1); 
	    }
		if (playerVict || playerScore > cpuScore && cpu || playerScore > player2Score && humanPlayer) { 
			context.fillStyle = "rgb(150,140,130)"; 
			context.fillText("Player 1 Wins", 15, 105); 
			context.fillStyle = "Blue";
			context.fillText("Score ratio:", 15, 130);
			context.fillStyle = "Green"; 
            if ( humanPlayer ) 
                context.fillText(playerScore + ":" + player2Score, 15, 160);
            if ( !humanPlayer )
                context.fillText(playerScore + ":" + cpuScore, 15, 160 );
			context.fillStyle = "rgb(200,255,100)";
			context.fillText("Victory Ratio:", 15, 195);
			context.fillStyle = "rgb(100,40,250)";
            if ( humanPlayer )
			  context.fillText(player.vict + ":" + player2.vict, 15, 220);
            if ( cpu )
              context.fillText(player.vict + ":" + computer.vict, 15, 220 );     
		}
		 
		if (player2Vict) {  
			    context.fillStyle = "rgb(150,140,130)";
			if ( humanPlayer )
                context.fillText("Player 2 Wins", 15, 105); 
          
			context.fillStyle = "Blue";
			context.fillText("Score ratio:", 15, 130);
			context.fillStyle = "Green";   
			if ( humanPlayer )
                context.fillText(player2Score + ":" + playerScore, 15, 160);
		
			context.fillStyle = "rgb(200,255,100)";
			context.fillText("Victory Ratio:", 15, 195);
			context.fillStyle = "rgb(100,40,250)";
			if ( humanPlayer )
                context.fillText(player2.vict + ":" + player.vict, 15, 220);
			
		} 
		
        if ( cpuVict ){
          showVersus = false;
          showRandomParticles = true; 
          context.fillStyle = "rgb(150,140,130)";
          context.fillText("AI Wins", 15, 105 );
          context.fillStyle = "Blue";
		  context.fillText("Score ratio:", 15, 130);
          context.fillStyle = "Green";
          context.fillText(cpuScore + ":" + playerScore, 15, 160 );
          context.fillStyle = "rgb(200,255,100)";
		  context.fillText("Victory Ratio:", 15, 195);
		  context.fillStyle = "rgb(100,40,250)";
          context.fillText(computer.vict + ":" + player.vict, 15, 220 );
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
			$(".menu li").show();
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
	       
	       
	   $("#mm").click(function () {
		    gameOverMusic.pause();
		    menuMusic.play();    
			$(".afterscreen").hide("slow"); 
			playerScore = 0;
			player2Score = 0;
            singleplayer.life = 3;
			$("#main").show(); 
			$(".menu, .menu-titles").show();
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
            singleplayer.life = 3;
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
    
function drawBoard() { // draw the scores    
	context.fillStyle = "red";
	context.font = "30px Black Ops One";
	context.fillText("P1 Score:" + playerScore, 150, 30); 
	
    if (showSinglePlayer || showMultiPlayer)
		context.fillStyle = "rgb(100,100,100)";
		context.fillText("Life: " + singleplayer.life, 40, 30);
	if (showMultiPlayer) {
		context.fillStyle = "#357EC7";
		context.font = "30px Black Ops One";
		context.fillText("P2 Score:" + player2Score, 335, 30);
		context.fillStyle = "Green";
		context.fillText("Total Score:" + totalScore, 520, 30);
	}
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
         	if (keyDown[O.upKey] && O.y >= 70){ // up
                paddleSFX.play();
				O.y -= 10; 
            }
			else if (keyDown[O.downKey] && O.y + O.height + 10 < 650){ //down                 
                paddleSFX.play();
				O.y += 10;
            }
            else if (keyDown[O.leftKey] && O.x >= 65) { // left 
                paddleSFX.play();
				O.x -= 10;
            }
			else if (keyDown[O.rightKey] && O.x + O.width + 10 < 455){ // right 
                paddleSFX.play();
				O.x += 10;
            } 
	    }
  
		if (O === player2) {
			if (keyDown[O.upKey] && O.y >= 70){
                paddleSFX.play(); 
				O.y -= 10;
            }
			else if (keyDown[O.downKey] && O.y + O.height + 10 < 650){
                paddleSFX.play();
				O.y += 10;
            }
			else if (keyDown[O.leftKey] && O.x + O.width + 10 >= 485){
                paddleSFX.play();
				O.x -= 10;
            }
			else if (keyDown[O.rightKey] && O.x <= 820){
                paddleSFX.play();
				O.x += 10;
            }
		}
		if (O === singleplayer && showMultiPlayer) {
			if (keyDown[O.leftKeyM] && O.x + O.width + 10 >= 139.5){
                paddleSFX.play();
				O.x -= 25;
            }
			if (keyDown[O.rightKeyM] && O.x < 784.9){
                paddleSFX.play();
				O.x += 25;  
            }
		}
		else if (O === singleplayer) {
			if (keyDown[O.leftKey] && O.x + O.width + 10 >= 139.5){
				paddleSFX.play();
                O.x -= 25;
            }
			if (keyDown[O.rightKey] && O.x <= 784.9){
                paddleSFX.play();
				O.x += 25;
            }
		}
		if (O === multiplayer) {
			if (keyDown[O.leftKey] && O.x + O.width + 10 >= 139.5){
                paddleSFX.play();
				O.x -= 25;
            }
			if (keyDown[O.rightKey] && O.x <= 784.9){
                paddleSFX.play();
				O.x += 25;
            } 
		} 
} 

// shows the score for versus   
function versusScore() {  
		context.fillStyle = "red";
		context.font = "30px Black Ops One";
		// scores 
		if (!humanPlayer || cpu){
            context.fillText("P1: " + playerScore, 200, 25 );
            context.fillStyle = "#357ec7";
			context.fillText("AI:  " + cpuScore, 600, 25); 
            if ( caughtDoublePointsCpu ){
                context.fillStyle = "yellow";
                context.fillText("x2", 700, 25 );
            }
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
			    context.fillText("x2", 700, 25 );
			}
		}
        
  if ( caughtDoublePoints || caughtDoublePointsP2 || caughtDoublePointsCpu ){
      playMusic.pause();
      doublePointsSFX.play();
  }
  else{
    doublePointsSFX.pause();
    playMusic.play();
  }
} 
  
function radioSwitch(first,second){
          $(first).attr("checked", false);
          $(second).attr("checked", true);
}
  
function randNum( min, max ) {
    return Math.random() * ( max - min ) + min;
}
   
function tick() {
    draw();
    if ( showRandomParticles )
      updateMenuParticles();
    if ( showSinglePlayer || showMultiPlayer ){
      drawBoard();
      updateParticle();
    } 
    if ( showVersus ){
      updateParticle();
        if ( !humanPlayer ){
            computer.update();
            check();
        }  
    } 
    if ( dp )
      doublePoints.update();
}

timerId = window.setInterval( tick, 1000 / FPS );
  
});          
