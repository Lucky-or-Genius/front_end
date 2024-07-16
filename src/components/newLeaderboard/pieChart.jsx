// components/newLeaderboard/pieChart.jsx
import React, { useEffect } from "react";
import * as echarts from "echarts";

const PieChart = () => {
  useEffect(() => {
    var chartDom = document.getElementById("pie-chart");
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "5%",
        left: "center",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          padAngle: 5,
          itemStyle: {
            borderRadius: 10,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 1048, name: "Search Engine" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" },
          ],
        },
      ],
    };

    option && myChart.setOption(option);
  }, []);

  return <div id="pie-chart" style={{ width: "100%", height: "400px" }}></div>;
};

export default PieChart;
