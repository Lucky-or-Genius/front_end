// components/newLeaderboard/barChart.jsx
import React, { useEffect } from "react";
import * as echarts from "echarts";

const BarChart = ({ data }) => {
  const categories = data?.categories.map((category) => [
    category.Category,
    category.count,
  ]);
  useEffect(() => {
    var chartDom = document.getElementById("main");
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      tooltip: {
        textStyle: {
          fontFamily: "Raleway, sans-serif",
        },
      },
      dataset: {
        source: [["Category", "Count"], ...categories],
      },
      xAxis: {
        type: "category",
        axisLabel: {
          textStyle: {
            fontFamily: "Raleway, sans-serif",
            color: "white",
          },
        },
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        axisLabel: {
          textStyle: {
            fontFamily: "Raleway, sans-serif",
            color: "white",
          },
        },
        splitLine: {
          show: false,
        },
      },
      series: [{ type: "bar" }],
    };

    option && myChart.setOption(option);
  }, [categories]);

  return (
    <div
      id="main"
      style={{ width: "100%", height: "400px" }}
      className="font-raleway"
    ></div>
  );
};

export default BarChart;
