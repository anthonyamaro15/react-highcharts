import HighchartsReact from "highcharts-react-official";
import * as Highcharts from "highcharts";

const chartOptions = {
   chart: {
      type: null,
   },
   title: {
      text: null,
   },
   xAxis: {
      categories: ["2015", "2016", "2017", "2018", "2019", "2020"],
      title: {
         text: "Year",
      },
      //   accessibility: {
      //      rangeDescription: "Range: 2015 to 2020",
      //   },
   },
   yAxis: {
      categories: ["0", "15000", "30000", "45000", "60000", "75000"],
      title: {
         text: "Dollars",
      },
      //   accessibility: {
      //      rangeDescription: "Range: 15000 to 75000",
      //   },
   },
   plotOptions: {
      line: {
         dataLabels: {
            enabled: false,
         },

         enableMouseTracking: false,
      },
   },
   tooltip: {
      formatter: function (this: any) {
         return `$${String(this.y)}`;
      },
   },
   series: [
      {
         type: "line",
         color: "grey",
         name: "Regression Line",
         dashStyle: "dash",
         data: [
            [0, 1.11],
            [5, 4.51],
         ],
         line: {
            dataLabels: {
               enabled: false,
            },
         },
         /** this functions uses the same data to display the trendline */
         //  data: (function (this: any) {
         //     return fitData([0, 720, 200, 675, 340, 564], null)?.data;
         //  })(),
         //  data: [0, 120, 200, 675, 340, 564, 19000, 20000, 250000, 54308, 45673],
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
         type: "spline",
         color: "red",
         name: "Observations",
         data: [1, 1.5, 2.8, 3.5, 3.9, 4.2],
         //  data: [0, 720, 200, 675, 340, 564],

         marker: {
            radius: 1,
         },
      },
   ],
};

const MockFiile = () => {
   return (
      <div className="mockup">
         <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </div>
   );
};

export default MockFiile;
