import HighchartsReact from "highcharts-react-official";
import * as Highcharts from "highcharts";

const chartOptions = {
   chart: {
      type: "line",
   },
   title: {
      text: null,
   },
   xAxis: {
      categories: ["2015", "2016", "2017", "2018", "2019", "2020"],
      title: {
         text: "Year",
      },
   },
   yAxis: {
      categories: ["0k", "15k", "30k", "45k", "60k", "75k"],
      title: {
         text: "Dollars",
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
   series: [
      {
         //  regression: true,
         type: "line",
         color: "grey",
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
         type: "spline",
         color: "red",
         name: "Observations",
         data: [1, 1.5, 2.8, 3.5, 3.9, 4.2],
         marker: {
            radius: 1,
         },
      },
   ],
};

const MockFiile = () => {
   return (
      <div>
         <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </div>
   );
};

export default MockFiile;
