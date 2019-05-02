var geoDataP = d3.json('USStates5m.json')

geoDataP.then(function(geoData){
  console.log(geoData.features)
  drawMap(geoData)
})

var h = 600;
var w = 800;

var color = d3.scaleQuantize()
              . range(['#babad6','#8282af','#535291',
              '#2f2e7c','#0e0d44']);

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
        .attr('stroke','green')
        .attr('fill','none')

  d3.csv('justStates.csv',function(data){

    console.log(data.poverty);

    d3.json('USStates5m.json',function(json){
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
          })
    })
  })
}
