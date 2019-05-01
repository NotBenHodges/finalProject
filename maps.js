var geoDataP = d3.json('USStates5m.json')

geoDataP.then(function(geoData){
  console.log(geoData.features)
  drawMap(geoData)
})

var h = 600;
var w = 800;

var drawMap = function(geoData){
  var screen = {width:700, height:600};
  var projection = d3.geoAlbersUsa()
                      .translate([w/2,h/2]);
  var stateGenerator = d3.geoPath()
                          .projection(projection);

  var svg = d3.select('svg')
              .attr('height',h)
              .attr('width',w);

  var states = svg.append('g')
                  .attr('id','states')
                  .selectAll('g')
                  .data(geoData.features)
                  .enter()
                  .append('g')
                  .classed('state',true);

  states.append('path')
        .attr('d',stateGenerator)
        .attr('stroke','blue')
        .attr('fill','none')
}
