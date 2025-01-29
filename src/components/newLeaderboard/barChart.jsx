import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const BarChart = ({ data, isVisible }) => {
  const chartRef = useRef(null);
  const containerRef = useRef(null);

  const defaultCategories = [
    ["Economy", 0],
    ["Finance", 0],
    ["Politics", 0],
    ["Sci & Tech", 0],
    ["Social & Health", 0],
    ["Other", 0],
  ];

  const categories =
    data && data.message !== "No data found for the given userId"
      ? data.categories.map((category) => [category.Category, category.count])
      : defaultCategories;

  useEffect(() => {
    const initChart = () => {
      if (!containerRef.current) return;

      const myChart = echarts.init(containerRef.current);
      chartRef.current = myChart;

      const option = {
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
        series: [
          {
            type: "bar",
            itemStyle: {
              color: function (params) {
                const colorPalette = [
                  "#5470C6",
                  "#91CC75",
                  "#EE6666",
                  "#FAC858",
                  "#73C0DE",
                  "#3BA272",
                  "#FC8452",
                  "#9A60B4",
                  "#EA7CCC",
                ];
                return colorPalette[params.dataIndex % colorPalette.length];
              },
              borderRadius: [12, 12, 0, 0],
            },
          },
        ],
      };

      myChart.setOption(option);

      const handleResize = () => {
        if (myChart) {
          myChart.resize();
        }
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        myChart.dispose();
      };
    };

    initChart();
  }, [categories]);

  useEffect(() => {
    if (isVisible && chartRef.current) {
      chartRef.current.resize(); // Resize the chart when the tab becomes visible
    }
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "400px" }}
      className="font-raleway"
    ></div>
  );
};

export default BarChart;
