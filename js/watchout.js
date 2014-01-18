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

// svg.on('mouseup', function(){
//     var position = d3.mouse(this);
//     player.attr('cx', position[0])
//       .attr('cy', position[1]);
// });


setInterval(function(){
  //enemySpeed = enemySpeed-;
  step();
}, 1000);