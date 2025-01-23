import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFDocument from "./components/PDFDocument";

function App() {
  const [userData, setUserData] = useState({
    name: "",
    summary: "",
    details: "",
    photo: "",
  });

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file upload, converting it to base64
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prev) => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Generate Your PDF</h1>

      <div>
        <label>Name: </label>
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleInputChange}
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label>Summary: </label>
        <textarea
          name="summary"
          value={userData.summary}
          onChange={handleInputChange}
          placeholder="Write something here..."
        />
      </div>

      <div>
        <label>Details: </label>
        <textarea
          name="details"
          value={userData.details}
          onChange={handleInputChange}
          placeholder="Additional details..."
        />
      </div>

      <div>
        <label>Photo: </label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>

      {/* PDF Download Button */}
      <PDFDownloadLink
        document={<PDFDocument userData={userData} />}
        fileName="user_document.pdf"
        style={{
          display: "inline-block",
          marginTop: 20,
          padding: "10px 20px",
          backgroundColor: "blue",
          color: "white",
          textDecoration: "none",
        }}
      >
        {({ blob, url, loading, error }) =>
          loading ? "Generating PDF..." : "Download PDF"
        }
      </PDFDownloadLink>
    </div>
  );
}

export default App;
