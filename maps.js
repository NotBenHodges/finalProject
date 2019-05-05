var geoP = d3.json('USStates5m.json')
var stateP = d3.csv('justStates.csv')

Promise.all([geoP,stateP]).then(function(values){
  var geoData = values[0];
  var stateData = values[1];
  drawMap(geoData,stateData)
});

var h = 600;
var w = 800;

var drawMap = function(geoData,stateData){

  var projection = d3.geoAlbersUsa()
                      .translate([w/2,h/2]);

  var stateGenerator = d3.geoPath()
                          .projection(projection);

  var stateDict = {}

  var stateDict2 = {}

  stateData.forEach(function(state){
    stateDict[state.Name.trim()]=state.Postal;
    stateDict[state.Postal.trim()]=state.poverty;
    stateDict[state.FIPS.trim()]=state.AllAges;
    stateDict2[state.FIPS.trim()]=state.Median;
  });
  console.log(stateDict);

  geoData.features.forEach(function(state){
    state.properties.ABBR = stateDict[state.properties.NAME]
    state.properties.ESTIMATE = stateDict[state.properties.ABBR]
    state.properties.ESTIMATE2 = stateDict[state.properties.STATE]
    state.properties.MEDIAN = stateDict2[state.properties.STATE]
    console.log(state.properties.MEDIAN);
  });
  console.log(geoData)

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

  var color = d3.scaleSequential(d3.interpolateGreens)
                .domain([0,4000000]);

  var color2 = d3.scaleSequential(d3.interpolateGreens)
                  .domain([7,20]);

  var color3 = d3.scaleSequential(d3.interpolateGreens)
                  .domain([40000,85000]);


  states.append('path')
        .attr('d',stateGenerator)
        .attr('stroke','green')
        .attr('fill', function(d){
          //console.log(parseInt(d.poverty))
          var str = d.properties.ESTIMATE
          str = str.replace(/,/g,"")
          str = parseInt(str)
          console.log(str)
          return color(str);
        });

  document.getElementById('allPop').onclick = function(d){
    document.getElementById('title').innerHTML = 'Poverty by Population Size'
    states.append('path')
          .attr('d',stateGenerator)
          .attr('stroke','green')
          .attr('fill', function(d){
            //console.log(parseInt(d.poverty))
            var str = d.properties.ESTIMATE
            str = str.replace(/,/g,"")
            str = parseInt(str)
            //console.log(str)
            return color(str);
          });
  };

document.getElementById('allPer').onclick = function(d){
  document.getElementById('title').innerHTML = 'Poverty by Percentage'
  states.append('path')
        .attr('d',stateGenerator)
        .attr('stroke','green')
        .attr('fill', function(d){
          //console.log(parseInt(d.poverty))
          var str = d.properties.ESTIMATE2
          str = str.replace(/,/g,"")
          str = parseInt(str)
          //console.log(str)
          return color2(str);
        });
};

document.getElementById('median').onclick = function(d){
  document.getElementById('title').innerHTML = 'Median Household Income'
  states.append('path')
        .attr('d',stateGenerator)
        .attr('stroke','green')
        .attr('fill', function(d){
          //console.log(parseInt(d.poverty))
          var str = d.properties.MEDIAN
          str = str.replace(/,/g,"")
          str = parseInt(str)
          //console.log(str)
          return color3(str);
        });
};

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

  document.getElementById('allPop').onmouseover = function(d){
    console.log('hello Ben');
  };


/*
  var svg2 = d3.select('body')
                .append('svg')
                .attr('height',100)
                .attr('width',100);

  var xScale = d3.scaleLinear()
                  .domain([0,56])
                  .range([0,100])

  var yScale = d3.scaleLinear()
                  .domain([0,4,080,377])
                  .range([0,100])*/

}
