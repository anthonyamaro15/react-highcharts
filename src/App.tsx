import * as Highcharts from "react-highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useState } from "react";
import { fitData } from "./utils";

const t = ["#19381F", "#88292F", "#A2A79E"];
// chartOptions will be in the callback function as follows --- chart.options
// chart line colors --- chart.legend

// this can be another way to update the chart info and styles

var sourceData = [
   [0, 99.75],
   [1, 99.77],
   [2, 99.78],
   [3, 99.84],
   [4, 99.82],
   [5, 99.82],
   [6, 99.76],
   [7, 99.78],
   [8, 99.8],
   [9, 99.65],
   [10, 99.94],
   [11, 99.8],
];
const updatedSeries = [
   {
      name: "Tokyo",
      data: [
         7.0,
         6.9,
         9.5,
         14.5,
         18.4,
         21.5,
         25.2,
         26.5,
         23.3,
         18.3,
         13.9,
         9.6,
         8.9,
      ],
      color: "#19381F",
   },
   {
      name: "London",
      data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8],
      color: "#A2A79E",
   },
];
const chartOptions = {
   chart: {
      type: "line",
   },
   title: {
      text: "Monthly Average Temperature",
   },
   subtitle: {
      text: "Source: WorldClimate.com",
   },
   xAxis: {
      categories: [
         "Jan",
         "Feb",
         "Mar",
         "Apr",
         "May",
         "Jun",
         "Jul",
         "Aug",
         "Sep",
         "Oct",
         "Nov",
         "Dec",
      ],
   },
   yAxis: {
      title: {
         text: "Temperature (°C)",
      },
   },
   plotOptions: {
      line: {
         dataLabels: {
            enabled: true,
         },
         enableMouseTracking: false,
      },
   },
   series: updatedSeries,
};

const chartOption2 = {
   chart: {
      type: "spline",
   },
   title: {
      text: "RNA",
      x: -20, //center
   },
   subtitle: {
      text: "Outage Reasons",
      x: -20,
   },
   xAxis: {
      categories: [
         "18-Jul-14",
         "19-Jul-14",
         "20-Jul-14",
         "21-Jul-14",
         "22-Jul-14",
         "23-Jul-14",
         "24-Jul-14",
         "25-Jul-14",
         "26-Jul-14",
         "27-Jul-14",
         "28-Jul-14",
         "29-Jul-14",
      ],
   },
   yAxis: {
      title: {
         text: "Outage",
      },
      plotLines: [
         {
            value: 0,
            width: 1,
            color: "#808080",
         },
      ],
   },
   tooltip: {
      valueSuffix: "",
   },
   legend: {
      layout: "vertical",
      //align: 'right',
      //verticalAlign: 'middle',
      borderWidth: 0,
   },
   series: [
      {
         regression: true,
         name: "RNA - CP ( Radio Network Availability - Customer Perceived)",
         data: sourceData,
      },
      {
         type: "line",
         dashStyle: "dash",
         marker: { enabled: false },
         /* function returns data for trend-line */
         // data: (function() {
         //   return fitData(sourceData).data;
         // })()
         data: (function (this: any) {
            return fitData(sourceData, null)?.data;
         })(),
      },
   ],
   credits: {
      enabled: false,
   },
};

const thirdChart = {
   title: {
      text: "Scatter plot with regression line",
   },
   xAxis: {
      min: -0.5,
      max: 5.5,
   },
   yAxis: {
      min: 0,
   },
   series: [
      {
         type: "line",
         name: "Regression Line",
         dashStyle: "dash",
         data: [
            [0, 1.11],
            [5, 4.51],
         ],
         marker: {
            enabled: false,
         },
         states: {
            hover: {
               lineWidth: 0,
            },
         },
         enableMouseTracking: false,
      },
      {
         type: "line",
         name: "Observations",
         data: [1, 1.5, 2.8, 3.5, 3.9, 4.2],
         marker: {
            radius: 4,
         },
      },
   ],
};
function App() {
   const testing = (chart: any) => {
      // console.log('before ', chart);
      // chart.options.colors = t
      // chart.legend.allItems[0].color = t[0];
   };
   return (
      <div>
         <HighchartsReact
            hicharts={Highcharts}
            options={chartOptions}
            callback={testing}
         />
         <HighchartsReact hicharts={Highcharts} options={chartOption2} />
         <HighchartsReact hicharts={Highcharts} options={thirdChart} />
      </div>
   );
}

export default App;
