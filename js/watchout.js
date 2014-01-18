var h = 450;
var w = 700;

var enemiesCount = 30;
var playerCount = [1];
var enemySpeed = 700;

var svg = d3.select('body').append('svg')
  .attr('height', h)
  .attr('width', w);




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
}, 1000);

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
    if (Math.abs(enemyX - playerX) < 10 && Math.abs(enemyY-playerY) < 10){
      console.log('COLLISION!');
    }
  });
};

setInterval(function(){
  checkCollisions();
}, 10);



//playerX === enemyX && playerY === enemyY

//Math.abs(enemyX - playerX) < 5 && Math.abs(enemyY-playerY) < 5


















