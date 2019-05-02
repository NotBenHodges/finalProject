var geoP = d3.json('USStates5m.json')
var stateP = d3.csv('justStates.csv')

Promise.all([geoP,stateP]).then(function(values){
  var geoData = values[0];
  var stateData = values[1];
  drawMap(geoData,stateData)
});
/*
geoP.then(function(geoData){
  drawMap(geoData)
});
*/
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

  var counties = svg.append('g')
                  .attr('id','counties')
                  .selectAll('g')
                  .data(geoData.features)
                  .enter()
                  .append('g')
                  .classed('county',true);

  counties.append('path')
        .attr('d',stateGenerator)
        .attr('stroke','green')
        .attr('fill','white');

  var stateDict = {}
  stateData.forEach(function(state){
    stateDict[state.Name.trim()]=state;
  })
  console.log(stateDict);

  

/*
  d3.csv('justStates.csv',function(data){

    console.log(data.poverty);

    color.domain([
      d3.min(data, function(d){
        return d.poverty;
      }),
      d3.max(data, function(data){
        return d.poverty;
      })
    ]);

    d3.json('USStates5m.json',function(json){
      console.log('hello world');
      for (var i = 0; i < data.length; i++){

        var dataState = data[i].name;
        var dataValue = parseFloat(data[i].poverty);

        for (var n = 0; n < json.features.length; n++){
          var jsonState = json.features[n].properties.name;
          if(dataState == jsonState){
            json.features[n].properties.value = dataValue;
            break;
          }
        }
      }
      svg.selectAll('path')
          .data(json.features)
          .enter()
          .append('path')
          .attr('d',path)
          .style('fill',function(d){
            var value = d.properties.value;

            if (value){
              return color(value);
            }
            else{
              return 'white';
            }
          });
    });
  });*/
}
