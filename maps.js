var geoDataP = d3.json('https://d3js.org/us-10m.v1.json')

geoDataP.then(function(geoData){
  console.log(geoData.features)
  drawMap(geoData)
})

/*
var drawMap = function(geoData){
  var screen = {width:700, height:600}
  var projection = d3.geoAlbersUSA()
  var stateGenerator = d3.geoPath()
                          .projection(projection);
  var svg = d3.select('svg')
  var states = svg.append('g')
                  .attr('id','states')
                  .selectAll('g')
                  .data(geoData.features)
                  .enter()
                  .append('g')
                  .classed('state',true);
  states.append('path')
        .attr('d',stateGenerator)
        .attr('stroke','red')
        .attr('fill','none')
}
*/
