// src/App.js
import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFDocument from "./components/PDFDocument";
import ChartGenerator from "./components/ChartGenerator";

function App() {
  const [userData, setUserData] = useState({
    name: "",
    summary: "",
    details: "",
    photo: "", // store base64 of uploaded photo
    chartData: "", // store base64 of the generated chart
  });

  // We'll store numeric chart values separately, then feed them to the hidden ChartGenerator.
  const [chartValues, setChartValues] = useState([12, 19, 3, 5, 2]);

  // Handle text inputs for name, summary, details
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  // Convert uploaded photo to base64
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prev) => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle comma-separated chart input
  const handleChartInput = (e) => {
    const { value } = e.target;
    if (!value) return setChartValues([]);
    // Convert comma-separated string to array of numbers
    const arr = value.split(",").map((num) => parseFloat(num.trim()) || 0);
    setChartValues(arr);
  };

  // Callback from ChartGenerator to receive the chart's base64 data
  const handleChartDataUrlChange = (dataUrl) => {
    setUserData((prev) => ({ ...prev, chartData: dataUrl }));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Create Your PDF (Hidden Chart)</h1>

      {/* Name */}
      <div style={{ marginBottom: 10 }}>
        <label>Name: </label>
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />
      </div>

      {/* Summary */}
      <div style={{ marginBottom: 10 }}>
        <label>Summary: </label>
        <textarea
          name="summary"
          value={userData.summary}
          onChange={handleChange}
          placeholder="Write a summary..."
        />
      </div>

      {/* Details */}
      <div style={{ marginBottom: 10 }}>
        <label>Details: </label>
        <textarea
          name="details"
          value={userData.details}
          onChange={handleChange}
          placeholder="Additional details..."
        />
      </div>

      {/* Photo Upload */}
      <div style={{ marginBottom: 10 }}>
        <label>Photo: </label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>

      {/* Chart Data Input (Comma-separated) */}
      <div style={{ marginBottom: 10 }}>
        <label>Chart Values (comma-separated): </label>
        <input
          type="text"
          defaultValue="12,19,3,5,2"
          onChange={handleChartInput}
        />
      </div>

      {/* Hidden Chart Generator */}
      <div style={{ display: "none" }}>
        <ChartGenerator
          chartValues={chartValues}
          onDataUrlChange={handleChartDataUrlChange}
        />
      </div>

      {/* PDF Download Button */}
      <PDFDownloadLink
        document={<PDFDocument userData={userData} />}
        fileName="user_document.pdf"
        style={{
          display: "inline-block",
          marginTop: 20,
          padding: "10px 20px",
          backgroundColor: "#1f2937",
          color: "#fff",
          textDecoration: "none",
        }}
      >
        Dowload PDF
      </PDFDownloadLink>
    </div>
  );
}

export default App;
