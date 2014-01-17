var h = 450;
var w = 700;

var enemiesCount = 30;

var svg = d3.select('body').append('svg')
  .attr('height', h+'%')
  .attr('width', w +'%');

svg.selectAll('circle').data(d3.range(enemiesCount))
  .enter()
  .append('circle')
  .attr('r', 10.5)
  .attr('cx', function(){
    return Math.random() * w;
  })
  .attr('cy', function(){
    return Math.random() * h;
  })
  .attr('fill', 'black');