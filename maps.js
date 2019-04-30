var geoDataP = d3.json('gz_2010_us_050_00_5m.json')

geoDataP.then(function(geoData){
  console.log(geoData)
  drawMap(geoData)
})

var drawMap = function(geoData){
  var screen = {width:700, height:600}
  var projection = d3.geoAlbersUSA();
  var svg = d3.select('svg')
  var states = svg.append('g')
                  .attr('id','states')
                  .selectAll('g')
                  .data(geoData.features)
                  .enter()
                  .append('g')
                  .classed('state',true);
}
