import React, { useEffect } from "react";
import * as echarts from "echarts";

const Chart = ({ data }) => {
  useEffect(() => {
    // Flatten the nested arrays in labels and values
    const flattenedLabels = data?.labels?.flat();
    const flattenedValues = data?.values?.flat();

    // Convert the flattened labels from epoch to a readable date format
    const category = flattenedLabels?.map((label) => {
      const date = new Date(label);
      return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join(
        "-"
      );
    });

    // Option for the chart
    const option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: category,
        axisLine: {
          lineStyle: {
            color: "#ccc",
          },
        },
      },
      yAxis: {
        type: "value",
        axisLine: {
          lineStyle: {
            color: "#ccc",
          },
        },
        splitLine: {
          lineStyle: {
            color: "#cccccc00",
          },
        },
      },
      series: [
        {
          name: "Value",
          type: "line",
          smooth: true,
          data: flattenedValues,
          lineStyle: {
            color: "#14c8d4",
            width: 2,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#14c8d480" },
              { offset: 1, color: "rgba(0, 255, 0, 0)" },
            ]),
          },
          symbol: "none", // Hide the dots
          symbolSize: 0, // Set symbol size to 0
        },
      ],
    };

    // Initialize the chart
    const chartDom = document.getElementById("chart");
    const myChart = echarts.init(chartDom);
    option && myChart.setOption(option);

    // Cleanup on unmount
    return () => {
      myChart.dispose();
    };
  }, [data]);

  return <div id="chart" style={{ width: "100%", height: "400px" }} />;
};

export default Chart;
