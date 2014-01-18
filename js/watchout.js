var h = 450;
var w = 700;

var enemiesCount = 30;
var playerCount = [1];
var enemySpeed = 1500;
var score = 0;
var highScore = 0;

var scoreDisplay = d3.select('body').append('p');
var highScoreDisplay = d3.select('body').append('p');
var svg = d3.select('body').append('svg')
  .attr('height', h)
  .attr('width', w);

scoreDisplay.html('score: ' + score.toFixed(1));
highScoreDisplay.html('high score: ' + score.toFixed(1));

var step = function(){
  var enemies = svg.selectAll('.enemy').data(d3.range(enemiesCount));

  enemies.enter()
    .append('circle')
    .attr('class', 'enemy')
    .attr('r', 10.5)
    .attr('cx', function(){
      return Math.random() * w;
    })
    .attr('cy', function(){
      return Math.random() * h;
    })
    .attr('fill', 'black');


  enemies.transition().duration(enemySpeed).attr('cx', function(){
      return Math.random() * w;
    })
    .attr('cy', function(){
      return Math.random() * h;
  });
};

var player = svg.selectAll('.player').data(playerCount);

player.enter()
  .append('circle')
  .attr('class', 'player')
  .attr('r', 10.5)
  .attr('cx', w/2)
  .attr('cy', h/2)
  .attr('fill', 'blue');


player.on('mousedown', function(event){
  svg.on('mousemove', function(){
    var position = d3.mouse(this);
    player.attr('cx', position[0])
      .attr('cy', position[1]);
  });
});

player.on('mouseup', function(event){
  svg.on('mousemove', function(){});
});

setInterval(function(){
  //enemySpeed = enemySpeed-;
  step();
}, 1500);

//Collision Detection

var checkCollisions = function(){
    //console.log('checking');
  var playerX = Number(d3.selectAll('.player').attr('cx'));
  var playerY = Number(d3.selectAll('.player').attr('cy'));


  d3.selectAll('.enemy').each(function(){
    var enemyX = this.cx.animVal.value;
    var enemyY = this.cy.animVal.value;
    //debugger;
    //console.log(Math.abs(enemyX - playerX));
    if (findDistance(playerX, playerY, enemyX, enemyY) < 21){
      //console.log('COLLISION!', playerX, playerY, enemyX, enemyY);
      if (score > highScore){
        highScore = score;
        highScoreDisplay.html('high score: ' + score.toFixed(1));
      }
      score = 0;
      scoreDisplay.html('score: ' + score.toFixed(1));
    }
  });
};

var findDistance = function(x1, y1, x2, y2) {
  return Math.sqrt( (x1- x2) * (x1-x2) + (y1-y2) * (y1-y2) );
};

setInterval(function(){
  checkCollisions();
}, 10);

setInterval(function(){
  score += .1;
  scoreDisplay.html('score: ' + score.toFixed(1));
  if (highScore < score){
    highScore = score;
    highScoreDisplay.html('high score: ' + score.toFixed(1));
  }
}, 100);



















