// src/components/ChartGenerator.js
import React, { useRef, useEffect } from "react";
import { Bar } from "react-chartjs-2";

/**
 * Renders a bar chart in the DOM (which can be hidden),
 * then calls onDataUrlChange() with the base64 image.
 */
const ChartGenerator = ({ chartValues, onDataUrlChange }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = chartRef.current;
      const canvas = chartInstance.canvas;
      const dataUrl = canvas.toDataURL("image/png");
      onDataUrlChange(dataUrl);
    }
  }, [chartValues, onDataUrlChange]);

  const data = {
    labels: ["Value 1", "Value 2", "Value 3", "Value 4", "Value 5"],
    datasets: [
      {
        label: "User Data",
        data: chartValues, // e.g. [12,19,3,5,2]
        backgroundColor: "rgba(54,162,235, 0.5)",
      },
    ],
  };

  const options = {
    responsive: false,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ width: 400, height: 250 }}>
      <Bar data={data} options={options} ref={chartRef} />
    </div>
  );
};

export default ChartGenerator;
