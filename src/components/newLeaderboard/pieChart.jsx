import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const PieChart = ({ isVisible }) => {
  const chartRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const initChart = () => {
      if (!containerRef.current) return;

      const myChart = echarts.init(containerRef.current);
      chartRef.current = myChart;

      const option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
          textStyle: {
            color: "white",
          },
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
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
                color: "white",
              },
            },
            labelLine: {
              show: false,
            },
            data: [{ value: 1, name: "Youtube" }],
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
  }, []);

  useEffect(() => {
    if (isVisible && chartRef.current) {
      chartRef.current.resize(); // Resize the chart when the tab becomes visible
    }
  }, [isVisible]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "400px" }}></div>
  );
};

export default PieChart;
