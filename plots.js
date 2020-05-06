function buildMetadata(county_select) {
  d3.json("JsonAllHomes.json").then((data) => {
    var Davidson = data.Davidson;
    var Williamson = data.Williamson;
    var Rutherford = data.Rutherford;
    var Sumner = data.Sumner;
    var Wilson = data.Wilson;
    var Maury = data.Maury;
    var Robertson = data.Robertson;
    var Dickson = data.Dickson;
    var Cheatham = data.Cheatham;
    var Hickman = data.Hickman;
    var Macon = data.Macon;
    var Smith = data.Smith;
    var Cannon = data.Cannon;
    var Trousdale = data.Trousdale;
    var date = data.date;
    
    var AllHomes = [{id:"Davidson", AllHomes: Davidson},
    {id:"Williamson", AllHomes: Williamson},
    {id:"Rutherford", AllHomes: Rutherford},
    {id:"Sumner", AllHomes: Sumner},
    {id:"Wilson", AllHomes: Wilson},
    {id:"Maury", AllHomes: Maury},
    {id:"Robertson", AllHomes: Robertson},
    {id:"Dickson", AllHomes: Dickson},
    {id:"Cheatham", AllHomes: Cheatham},
    {id:"Hickman", AllHomes: Hickman},
    {id:"Macon", AllHomes: Macon},
    {id:"Smith", AllHomes: Smith},
    {id:"Cannon", AllHomes: Cannon},
    {id:"Trousdale", AllHomes: Trousdale}
    ];

    //console.log(AllHomes);
    // Filter the data for the object with the desired county
    var resultArray = AllHomes.filter(sampleObj => sampleObj.id == county_select);
    var result = resultArray[0];
    var county_allhomes_g = [];
    var county_allhomes = [];
    var county_date = [];
    for (var i = 0; i < 51; ++i) {
      county_allhomes_g.push(100*(result.AllHomes[i] - result.AllHomes[i-12])/result.AllHomes[i-12]);
      county_allhomes.push(result.AllHomes[i]);
      county_date.push(date[i]);
    };

    // Combine both plots
    var plot_homes_g1 = {
      x: county_date,
      y: county_allhomes_g,
      yaxis: 'y',
      xaxis: "x",
      name: 'House value yearly growth (%)',
      type: "scatter",
      mode: "lines",
      orientation: "h"
    };

    var plot_homes_l1 = {
      x: county_date,
      y: county_allhomes,
      yaxis: 'y2',
      xaxis: "x",
      name: 'House value ($)',
      type: "scatter",
      mode: "lines",
      orientation: "h"

    };

    var plot_homes_both = [plot_homes_g1, plot_homes_l1];

    var layout_both = {
      autosize: false,
      width: 1000,
      height: 650,
      hovermode: "x unified",
      yaxis: {
        domain: [0.52, 1],
        type: "linear",
        anchor: 'x',
        range: [-5, 17],
        //autorange: true,
        title: 'House Price yearly growth (%)',
        titlefont: {
          family: 'Arial, sans-serif',
          size: 14,
          color: 'grey'}
      },
      legend: {traceorder: 'reversed'},
      yaxis2: {
        domain: [0, 0.48],
        type: "linear",
        anchor: 'x',
        range: [85000, 550000],
        //autorange: true,
        title: 'House Value ($)',
        titlefont: {
          family: 'Arial, sans-serif',
          size: 14,
          color: 'grey'
        }
      },
      xaxis: {
        autorange: true,
        type: "date",
        title: 'Timeline',
        anchor: 'y2',
        titlefont: {
          family: 'Arial, sans-serif',
          size: 18,
          color: 'grey'
          
        }
      }
    
    };
    Plotly.newPlot("both", plot_homes_both, layout_both);
    console.log(plot_homes_both)




  
  });
}
//buildMetadata("Davidson")
function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selCounty");
  // Assign the value of the dropdown menu option to a variable
  var county = selector.property("value");
  // //Use the first sample from the list to build the initial plots
  buildMetadata(county);
}

function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildMetadata(newSample);
}


// //Initialize the dashboard
 init();

