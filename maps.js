var geoP = d3.json('USStates5m.json')
var stateP = d3.csv('justStates.csv')
var geo2P = d3.json('USCounties5m.json')
var state2P = d3.csv('statesAndCounties.csv')

Promise.all([geoP,stateP,geo2P,state2P]).then(function(values){
  var geoData = values[0];
  var stateData = values[1];
  var geoData2 = values[2];
  var stateData2 = values[3];
  drawMap(geoData,stateData)
  //drawMap2(geoData2,stateData2)
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

  var stateDict3 = {}

  var stateDict4 = {}

  stateData.forEach(function(state){
    stateDict[state.Name.trim()]=state.Postal;
    stateDict[state.Postal.trim()]=state.poverty;
    stateDict[state.FIPS.trim()]=state.AllAges;
    stateDict2[state.FIPS.trim()]=state.Median;
    stateDict3[state.FIPS.trim()]=state.Age017;
    stateDict3[state.Name.trim()]=state.Age017Per;
    stateDict4[state.FIPS.trim()]=state.Fam;
    stateDict4[state.Name.trim()]=state.FamPer;
  });
  console.log(stateDict3);

  geoData.features.forEach(function(state){
    state.properties.ABBR = stateDict[state.properties.NAME]
    state.properties.ESTIMATE = stateDict[state.properties.ABBR]
    state.properties.ESTIMATE2 = stateDict[state.properties.STATE]
    state.properties.MEDIAN = stateDict2[state.properties.STATE]
    state.properties.ESTIMATE3 = stateDict3[state.properties.STATE]
    state.properties.ESTIMATE4 = stateDict3[state.properties.NAME]
    state.properties.ESTIMATE5 = stateDict4[state.properties.STATE]
    state.properties.ESTIMATE6 = stateDict4[state.properties.NAME]
    //console.log(state.properties.ESTIMATE4);
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
                .domain([61000,2000000]);

  var color2 = d3.scaleSequential(d3.interpolateGreens)
                  .domain([7,20]);

  var color3 = d3.scaleSequential(d3.interpolateGreens)
                  .domain([40000,85000]);

  var color4 = d3.scaleSequential(d3.interpolateGreens)
                  .domain([20000,700000]);

  var color5 = d3.scaleSequential(d3.interpolateGreens)
                .domain([10,30]);

  var color6 = d3.scaleSequential(d3.interpolateGreens)
                  .domain([20000,700000]);

  var color7 = d3.scaleSequential(d3.interpolateGreens)
                  .domain([10,30]);

  var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  states.append('path')
        .attr('d',stateGenerator)
        .attr('stroke','green')
        .attr('fill', function(d){
          var str = d.properties.ESTIMATE
          str = str.replace(/,/g,"")
          str = parseInt(str)
          console.log(str)
          return color(str);
        })
        .on("mouseover", function(d) {
              tooltip.transition()
              .duration(200)
              .style("opacity", .9);
              tooltip.html(d.properties.ESTIMATE)
              .style("left", (d3.event.pageX) + "px")
              .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            tooltip.transition()
            .duration(500)
            .style("opacity", 0);
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

document.getElementById('under').onclick = function(d){
  document.getElementById('title').innerHTML = 'Poverty by Population Size'
  states.append('path')
        .attr('d',stateGenerator)
        .attr('stroke','green')
        .attr('fill', function(d){
          //console.log(parseInt(d.poverty))
          var str = d.properties.ESTIMATE3
          str = str.replace(/,/g,"")
          str = parseInt(str)
          //console.log(str)
          return color4(str);
        });
};

document.getElementById('underPer').onclick = function(d){
  document.getElementById('title').innerHTML = 'Poverty by Population Size'
  states.append('path')
        .attr('d',stateGenerator)
        .attr('stroke','green')
        .attr('fill', function(d){
          //console.log(parseInt(d.poverty))
          var str = d.properties.ESTIMATE4
          str = str.replace(/,/g,"")
          str = parseInt(str)
          //console.log(str)
          return color5(str);
        });
};

document.getElementById('fam').onclick = function(d){
  document.getElementById('title').innerHTML = 'Poverty by Population Size'
  states.append('path')
        .attr('d',stateGenerator)
        .attr('stroke','green')
        .attr('fill', function(d){
          //console.log(parseInt(d.poverty))
          var str = d.properties.ESTIMATE5
          str = str.replace(/,/g,"")
          str = parseInt(str)
          //console.log(str)
          return color6(str);
        });
};

document.getElementById('famPer').onclick = function(d){
  document.getElementById('title').innerHTML = 'Poverty by Population Size'
  states.append('path')
        .attr('d',stateGenerator)
        .attr('stroke','green')
        .attr('fill', function(d){
          //console.log(parseInt(d.poverty))
          var str = d.properties.ESTIMATE6
          str = str.replace(/,/g,"")
          str = parseInt(str)
          //console.log(str)
          return color7(str);
        });
};
/*
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
  };*/
}

var drawMap2 = function(geoData,stateData){

  var projection = d3.geoAlbersUsa()
                      .translate([w/2,h/2]);

  var stateGenerator = d3.geoPath()
                          .projection(projection);

  var countyDict = {}

  var countyDict2 = {}

  var countyDict3 = {}

  var countyDict4 = {}

  var countyDict5 = {}

  stateData.forEach(function(county){
    countyDict[county.FIPS.trim()]=county.poverty;
    countyDict2[county.FIPS.trim()]=county.AllAges;
    countyDict3[county.FIPS.trim()]=county.Median;
    countyDict4[county.FIPS.trim()]=county.Age017;
    countyDict4[county.Name.trim()]=county.Age017Per;
    countyDict5[county.FIPS.trim()]=county.Fam;
    countyDict5[county.Name.trim()]=county.FamPer;
  });
  console.log(countyDict2);

  geoData.features.forEach(function(county){
    county.properties.ESTIMATE = countyDict[county.properties.COUNTY]
    county.properties.ESTIMATE2 = countyDict[county.properties.COUNTY]
    county.properties.MEDIAN = countyDict3[county.properties.COUNTY]
    county.properties.ESTIMATE3 = countyDict4[county.properties.COUNTY]
    county.properties.ESTIMATE4 = countyDict4[county.properties.NAME]
    county.properties.ESTIMATE5 = countyDict5[county.properties.COUNTY]
    county.properties.ESTIMATE6 = countyDict5[county.properties.NAME]
    //console.log(county.properties.ESTIMATE);
  });
  console.log(geoData)

  var svg = d3.select('.s')
              .attr('height',h)
              .attr('width',w);

  var counties = svg.append('g')
                  .attr('id','counties')
                  .selectAll('g')
                  .data(geoData.features)
                  .enter()
                  .append('g')
                  .classed('county',true);

  var color = d3.scaleSequential(d3.interpolateGreens)
                .domain([0,10000]);

  var color2 = d3.scaleSequential(d3.interpolateGreens)
                  .domain([10,30]);

  var color3 = d3.scaleSequential(d3.interpolateGreens)
                  .domain([40000,85000]);

  var color4 = d3.scaleSequential(d3.interpolateGreens)
                  .domain([0,20000]);

  var color5 = d3.scaleSequential(d3.interpolateGreens)
                .domain([10,50]);

  var color6 = d3.scaleSequential(d3.interpolateGreens)
                  .domain([0,5000]);

  var color7 = d3.scaleSequential(d3.interpolateGreens)
                  .domain([10,50]);

  var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);


  var counter = 0;

  counties.append('path')
        .attr('d',stateGenerator)
        .attr('stroke','green')
        .attr('fill', function(d){
          counter += 1
          var str = d.properties.ESTIMATE
          str = str.replace(/,/g,"")
          str = parseInt(str)
          //console.log(counter)
          return color(str);
        })
        .on("mouseover", function(d) {
              tooltip.transition()
              .duration(200)
              .style("opacity", .9);
              tooltip.html(d.properties.NAME)
              .style("left", (d3.event.pageX) + "px")
              .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            tooltip.transition()
            .duration(500)
            .style("opacity", 0);
          });

  document.getElementById('allPop2').onclick = function(d){
    document.getElementById('title2').innerHTML = 'Poverty by Population Size'
    counties.append('path')
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

document.getElementById('allPer2').onclick = function(d){
  document.getElementById('title2').innerHTML = 'Poverty by Percentage'
  counties.append('path')
        .attr('d',stateGenerator)
        .attr('stroke','green')
        .attr('fill', function(d){
          //console.log(parseInt(d.poverty))
          var str = d.properties.ESTIMATE2
          //str = str.replace(/,/g,"")
          str = parseInt(str)
          //console.log(str)
          return color2(str);
        });
};

document.getElementById('median2').onclick = function(d){
  document.getElementById('title2').innerHTML = 'Median Household Income'
  counties.append('path')
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

document.getElementById('under2').onclick = function(d){
  document.getElementById('title2').innerHTML = 'Poverty by Population Size'
  counties.append('path')
        .attr('d',stateGenerator)
        .attr('stroke','green')
        .attr('fill', function(d){
          //console.log(parseInt(d.poverty))
          var str = d.properties.ESTIMATE3
          str = str.replace(/,/g,"")
          str = parseInt(str)
          //console.log(str)
          return color4(str);
        });
};

document.getElementById('underPer2').onclick = function(d){
  document.getElementById('title2').innerHTML = 'Poverty by Population Size'
  counties.append('path')
        .attr('d',stateGenerator)
        .attr('stroke','green')
        .attr('fill', function(d){
          //console.log(parseInt(d.poverty))
          var str = d.properties.ESTIMATE4
          //str = str.replace(/,/g,"")
          str = parseInt(str)
          //console.log(str)
          return color5(str);
        });
};

document.getElementById('fam2').onclick = function(d){
  document.getElementById('title2').innerHTML = 'Poverty by Population Size'
  counties.append('path')
        .attr('d',stateGenerator)
        .attr('stroke','green')
        .attr('fill', function(d){
          //console.log(parseInt(d.poverty))
          var str = d.properties.ESTIMATE5
          str = str.replace(/,/g,"")
          str = parseInt(str)
          //console.log(str)
          return color6(str);
        });
};

document.getElementById('famPer2').onclick = function(d){
  document.getElementById('title2').innerHTML = 'Poverty by Population Size'
  counties.append('path')
        .attr('d',stateGenerator)
        .attr('stroke','green')
        .attr('fill', function(d){
          //console.log(parseInt(d.poverty))
          var str = d.properties.ESTIMATE6
          //str = str.replace(/,/g,"")
          str = parseInt(str)
          //console.log(str)
          return color7(str);
        });
};
}
