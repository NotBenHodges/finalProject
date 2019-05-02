var geoP = d3.json('USStates5m.json')
var stateP = d3.csv('justStates.csv')

Promise.all([geoP,stateP]).then(function(values){
  var geoData = values[0];
  var stateData = values[1];
  drawMap(geoData,stateData)
});

var h = 600;
var w = 800;

var color = d3.scaleQuantize()
              .range(['#babad6','#8282af','#535291',
              '#2f2e7c','#0e0d44']);

var drawMap = function(geoData,stateData){

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
        .attr('stroke','green')
        .attr('fill','white');

  var stateDict = {}
  stateData.forEach(function(state){
    stateDict[state.Name.trim()]=state.Postal;
  });
  console.log(stateDict);

  geoData.features.forEach(function(state){
    state.properties.ABBR= stateDict[state.properties.NAME];
    console.log(state.properties.ABBR);
  });

  states.append('text')
        .text(function(d){
          return d.properties.ABBR;
        })
        .attr('x',function(d){
          return stateGenerator.centroid(d)[0];
        })
        .attr('y',function(d){
          return stateGenerator.centroid(d)[1];
        });


    color.domain([
      d3.min(stateData, function(d){
        return d.poverty;
      }),
      d3.max(stateData, function(d){
        return d.poverty;
      })
    ]);

      svg.selectAll('g')
          .data(geoData.features)
          .enter()
          .append('path')
          .attr('d',stateGenerator)
          .style('fill',function(d){
            var value = d.properties.value;

            if (value){
              return color(value);
            }
            else{
              return 'white';
            }})
}
