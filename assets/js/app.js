
var settings = {
  sequence: [],
  level: 0,
  play: 0,
  speed: 1000,
  clicked: 0
}

//tile variables
var red = $('#r');
var green = $('#g');
var blue = $('#b');
var yellow = $('#y');

//controls
var startGame;
var currentLevel = $('.current-level');
var gameControl = $('#start');
var strict = $('#strict');
var strictMode = false;
var sequenceLoop;

//audio
var audio1 = new Audio(
  'http://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var audio2 = new Audio(
  'http://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var audio3 = new Audio(
  'http://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var audio4 = new Audio(
  'http://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
var audioBuzzer = new Audio('https://s3-us-west-2.amazonaws.com/guylemon/Buzzer.mp3');


$(document).ready(function() {

  //change opacity and add sound when tile is pressed
  function animate(tiles) {
    if (tiles == "r") {
      red.css('opacity', '0.5');
        audio1.play();
       setTimeout(function() {
      red.css("opacity", "1");
        }, 200);
    } else if (tiles == "b") {
      blue.css('opacity', '0.5');
      audio2.play();
      setTimeout(function() {
      blue.css("opacity", "1");
       }, 200);
    } else if (tiles == "g") {
      green.css('opacity', '0.5');
      audio3.play();
      setTimeout(function() {
      green.css("opacity", "1");
       }, 200);
    } else if (tiles == "y") {
      yellow.css('opacity', '0.5');
      audio4.play();
      setTimeout(function() {
      yellow.css("opacity", "1");
       }, 200);
    }
  }

  //strict mode
  strict.on('click', function() {
    strictMode = true;
    console.log('true');
  });

  //choose random tile
  function getTile() {
    var text = "";
    var possibleTiles = "rgby";

    for(var i = 0; i < 1; i++) {
      text += possibleTiles.charAt(Math.floor(Math.random()* possibleTiles.length));
      //log sequence to array
      settings.sequence.push(text);
      console.log(settings.sequence);
    }

    //loop through sequence
    sequenceLoop = function() {
      setTimeout(function() {
        animate(settings.sequence[settings.play]);
        settings.play++;
        //if level 20 is passed
          //player wins the game
        if(settings.sequence.length === 21) {
          alert('You Won!');
          //restart for a new game
          location.reload();
        } else if (settings.play < settings.sequence.length) {
          sequenceLoop();
        } else {
          settings.play = 0;
          wait();
        }
      }, settings.speed);
    }

    sequenceLoop();
  }

  //check user input
  function wait() {
    $('#r, #y, #g, #b').on('mousedown', function() {
      if(this.id == settings.sequence[settings.clicked]) {
        if(settings.clicked === settings.sequence.length - 1) {
          $('#r, #y, #g, #b').off('mousedown');
            settings.clicked = 0;
            $('#start').trigger('click');

        } else {
          settings.clicked++;
        }
      } else {
        alert('you messed up');
          //if strict mode is not on
          if (strictMode == false) {
            //restart game at 0
            location.reload();
          } else {
            wait();
            sequenceLoop();
          }

        $('#r, #y, #g, #b').off('mousedown');
      }
    });
  }

  //light up tiles and add sound when tile is clicked
  $('#r, #y, #g, #b').on('click', function() {
    animate(this.id);
  });

  //start game
  gameControl.on('click', function() {
      settings.level++;
      getTile();
      //update current level
      currentLevel.text(settings.level);
    });

    //restart game if button is pressed
    $('#restart').on('click', function() {
        location.reload();
    });


});
