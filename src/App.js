import React, { useState, useEffect } from "react";
import "./App.css";
// import ApexChart from "./Line-Chart";
import ReactApexChart from "react-apexcharts";
import data from "./data.json";

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "status",
          data: [...props.data],
        },
      ],
      options: {
        chart: {
          type: "area",
          stacked: false,
          height: 350,
          zoom: {
            type: "x",
            enabled: true,
            autoScaleYaxis: true,
          },
          toolbar: {
            autoSelected: "zoom",
          },
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0,
        },
        title: {
          text: "Server Downtime",
          align: "left",
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100],
          },
        },
        yaxis: {
          labels: {
            formatter: function (val) {
              return val;
            },
          },
          title: {
            text: "Downtime",
          },
        },
        xaxis: {
          type: "datetime",
          categories: [...props.categories],
        },
        tooltip: {
          shared: false,
          x: {
            format: props.format,
          },
          y: {
            formatter: function (val) {
              return val;
            },
          },
        },
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="area"
          height={350}
        />
      </div>
    );
  }
}
function calculateDowntime(p) {
  var count = 0;
  console.log(p.length);
  for (var i = 0; i < p.length; i++) {
    if (p[i] === 0) count++;
  }
  console.log(count);
  return count;
}

function App() {
  const [filterValue, setfilterValue] = useState("thisWeek");
  // const now = new Date();
  // console.log(now);
  // console.log(Object.values(data));

  // useEffect(() => {
  //   return () => {};
  // }, [filterValue]);

  return (
    <div className="App">
      {console.log("rerendered")}
      <select
        id="categories"
        name="categories"
        onChange={(e) => {
          // console.log(e.target.value);
          setfilterValue(e.target.value);
          console.log(filterValue);
        }}
      >
        <option value="today">today</option>
        <option value="thisWeek">this week</option>
        <option value="thisMonth">this month</option>
      </select>
      {filterValue === "today" ? (
        <ApexChart
          categories={Object.keys(data["11/7/20"])}
          data={Object.values(data["11/7/20"])}
          format={"H"}
        />
      ) : filterValue === "thisWeek" ? (
        <ApexChart
          categories={Object.keys(data)}
          data={Object.values(data).map((element) => {
            // console.log(element);
            // console.log(Object.values(element));
            return calculateDowntime(Object.values(element));
          })}
          format={"dd/MM/yy"}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default App;
