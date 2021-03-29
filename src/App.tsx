import * as Highcharts from "react-highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useState } from "react";

const t = ["#19381F", "#88292F", "#A2A79E"];
// chartOptions will be in the callback function as follows --- chart.options
// chart line colors --- chart.legend

// this can be another way to update the chart info and styles

function regression(x: any, y: any, typ: any) {
   var type = typ == null ? "linear" : typ;
   var N = x.length;
   var slope;
   var intercept;
   var SX = 0;
   var SY = 0;
   var SXX = 0;
   var SXY = 0;
   var SYY = 0;
   var Y = [];
   var X = [];

   if (type == "linear") {
      X = x;
      Y = y;
   } else if (type == "exp" || type == "exponential") {
      for (var i = 0; i < y.length; i++) {
         // ignore points <= 0, log undefined.
         if (y[i] <= 0) {
            N--;
         } else {
            X.push(x[i]);
            Y.push(Math.log(y[i]));
         }
      }
   }

   for (var i = 0; i < N; i++) {
      SX = SX + X[i];
      SY = SY + Y[i];
      SXY = SXY + X[i] * Y[i];
      SXX = SXX + X[i] * X[i];
      SYY = SYY + Y[i] * Y[i];
   }

   slope = (N * SXY - SX * SY) / (N * SXX - SX * SX);
   intercept = (SY - slope * SX) / N;

   return [slope, intercept];
}

function linearRegression(X: any, Y: any) {
   var ret;
   ret = regression(X, Y, "linear");
   return [ret[0], ret[1]];
}

function expRegression(X: any, Y: any) {
   var ret;
   var x = X;
   var y = Y;
   ret = regression(x, y, "exp");
   var base = Math.exp(ret[0]);
   var coeff = Math.exp(ret[1]);
   return [base, coeff];
}

function fitData(data: any, typ: any) {
   var type = typ == null ? "linear" : typ;
   var ret;
   var res;
   var x = [];
   var y = [];
   var ypred = [];

   for (i = 0; i < data.length; i++) {
      if (
         data[i] != null &&
         Object.prototype.toString.call(data[i]) === "[object Array]"
      ) {
         if (data[i] != null && data[i][0] != null && data[i][1] != null) {
            x.push(data[i][0]);
            y.push(data[i][1]);
         }
      } else if (data[i] != null && typeof data[i] === "number") {
         //If type of X axis is category
         x.push(i);
         y.push(data[i]);
      } else if (
         data[i] != null &&
         Object.prototype.toString.call(data[i]) === "[object Object]"
      ) {
         if (data[i] != null && data[i].x != null && data[i].y != null) {
            x.push(data[i].x);
            y.push(data[i].y);
         }
      }
   }

   if (type == "linear") {
      ret = linearRegression(x, y);
      for (var i = 0; i < x.length; i++) {
         res = ret[0] * x[i] + ret[1];
         ypred.push([x[i], res]);
      }

      return {
         data: ypred,
         slope: ret[0],
         intercept: ret[1],
         y: function (x: any) {
            return this.slope * x + this.intercept;
         },
         x: function (y: any) {
            return (y - this.intercept) / this.slope;
         },
      };
   } else if (type == "exp" || type == "exponential") {
      ret = expRegression(x, y);
      for (var i = 0; i < x.length; i++) {
         res = ret[1] * Math.pow(ret[0], x[i]);
         ypred.push([x[i], res]);
      }
      ypred.sort();

      return {
         data: ypred,
         base: ret[0],
         coeff: ret[1],
      };
   }
}

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
      </div>
   );
}

export default App;
