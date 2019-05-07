var geo2P = d3.json('USCounties5m.json')
var state2P = d3.csv('statesAndCounties.csv')

Promise.all([geo2P,state2P]).then(function(values){
  var geoData2 = values[0];
  var stateData2 = values[1];
  drawMap2(geoData2,stateData2)
});

var w = 600;
var h = 800;

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
