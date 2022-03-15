import React, { useState, useEffect } from "react";
import "./App.css";
// import ApexChart from "./Line-Chart";
import ReactApexChart from "react-apexcharts";
import jsonData from "./data.json";

function calculateDowntime(p) {
  var count = 0;
  for (var i = 0; i < p.length; i++) {
    if (p[i] === 0) count++;
  }
  // console.log(count);
  return count;
}

function App() {
  const series = [
    {
      name: "status",
      data: [
        ...Object.values(jsonData).map((element, index) => {
          return {
            x: Object.keys(jsonData)[index],
            y: calculateDowntime(Object.values(element)),
          };
        }),
      ],
    },
  ];
  const options = {
    chart: {
      type: "line",
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
    stroke: {
      curve: "straight",
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
      // categories: [...Object.keys(jsonData)],
    },
    tooltip: {
      shared: false,
      x: {
        format: "dd/MM/yy",
      },
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
  };

  // const [data, setdata] = useState(

  // );
  // const [categories, setcategories] = useState();
  // const [format, setformat] = useState();
  const [filterValue, setfilterValue] = useState("thisWeek");

  const [chartOptions, setchartOptions] = useState(options);
  const [chartSeries, setchartSeries] = useState(series);

  // const now = new Date();
  // console.log(now);
  // console.log(Object.values(jsonData));

  // useEffect(() => {
  //   return () => {};
  // }, [filterValue]);

  useEffect(() => {
    const fetchData = () => {
      if (filterValue === "thisWeek") {
        setchartOptions({
          ...chartOptions,
          [chartOptions.tooltip.x.format]: "dd/MM/yy",
        });
        setchartSeries([
          {
            name: "status",
            data: [
              ...Object.values(jsonData).map((element, index) => {
                return {
                  x: Object.keys(jsonData)[index],
                  y: calculateDowntime(Object.values(element)),
                };
              }),
            ],
          },
        ]);
      } else if (filterValue === "thisMonth") {
        setchartOptions({
          ...chartOptions,
          // [chartOptions.xaxis.categories]: Object.keys(jsonData),
          [chartOptions.tooltip.x.format]: "dd/MM/yy",
        });
        setchartSeries([
          {
            name: "status",
            data: [
              ...Object.values(jsonData).map((element, index) => {
                return {
                  x: Object.keys(jsonData)[index],
                  y: calculateDowntime(Object.values(element)),
                };
              }),
            ],
          },
        ]);
      } else {
        const lastData =
          Object.values(jsonData)[Object.values(jsonData).length - 1];
        console.log(lastData);
        setchartOptions({
          ...chartOptions,
          [chartOptions.xaxis.categories]: Object.keys(lastData),
          [chartOptions.tooltip.x.format]: "H",
          [chartOptions.stroke.curve]: "stepline",
          [chartOptions.xaxis.type]: "time",
        });
        console.log("entered else");
        // const tmp = [34, 44, 54, 21, 12, 43, 33, 23, 66, 66, 58];
        console.log(tmp);
        console.log(chartSeries);
        setchartSeries([
          {
            name: "wbwbwebwebw",
            data: [
              ...Object.values(lastData).map((value, index) => {
                return {
                  x: Object.keys(lastData)[index],
                  y: value,
                };
              }),
            ],
          },
        ]);
        setchartSeries([
          {
            name: "wbwbwebwebw",
            data: tmp,
            // [
            //   ...Object.values(lastData).map((value, index) => {
            //     return {
            //       x: Object.keys(lastData)[index],
            //       y: value,
            //     };
            //   }),
            // ],
          },
        ]);
        console.log(filterValue);
        console.log(chartSeries);
      }
    };
    fetchData();
  }, [filterValue]);

  return (
    <div className="App">
      {/* {console.log(Object.values(jsonData)[Object.values(jsonData).length - 1])} */}
      <select
        id="categories"
        name="categories"
        onChange={(e) => {
          // console.log(e.target.value);
          setfilterValue(e.target.value);
          // console.log(filterValue);
        }}
      >
        <option value="thisWeek">this week</option>
        <option value="today">today</option>
        <option value="thisMonth">this month</option>
      </select>

      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="area"
        height={350}
      />

      {/* <ApexChart
        categories={Object.keys(jsonData)}
        data={Object.values(jsonData).map((element) => {
          // console.log(element);
          // console.log(Object.values(element));
          return calculateDowntime(Object.values(element));
        })}
        format={"dd/MM/yy"}
      /> */}

      {/* <ApexChart
        categories={Object.keys(jsonData["11/7/20"])}
        data={Object.values(jsonData["11/7/20"])}
        format={"H"}
      /> */}
    </div>
  );
}

export default App;
