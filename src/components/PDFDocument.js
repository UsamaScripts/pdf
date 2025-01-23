// src/components/PDFDocument.js
import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

// Sample dummy data for a simple table
const dummyData = [
  { id: 1, name: "Alpha", value: 100 },
  { id: 2, name: "Bravo", value: 200 },
  { id: 3, name: "Charlie", value: 300 },
];

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#f9fafb",
    fontSize: 12,
    fontFamily: "Helvetica", // default PDF font
    color: "#111827",
  },
  header: {
    backgroundColor: "#1f2937",
    color: "#ffffff",
    padding: 10,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  section: {
    backgroundColor: "#ffffff",
    borderRadius: 6,
    padding: 15,
    marginBottom: 15,
    border: "1pt solid #e5e7eb",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#111827",
  },
  text: {
    lineHeight: 1.5,
  },
  divider: {
    marginVertical: 10,
    height: 1,
    backgroundColor: "#e5e7eb",
  },
  image: {
    width: 120,
    height: 120,
    objectFit: "cover",
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: "center",
  },
  chartImage: {
    width: 250,
    height: 150,
    alignSelf: "center",
    marginBottom: 10,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    fontSize: 10,
    color: "#6b7280",
    textAlign: "center",
  },

  // Table styles
  table: {
    display: "flex",
    width: "100%",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCellHeader: {
    flex: 1,
    backgroundColor: "#f3f4f6", // light gray
    borderRightWidth: 1,
    borderColor: "#e5e7eb",
    padding: 5,
    fontWeight: "bold",
  },
  tableCell: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: "#e5e7eb",
    padding: 5,
  },
});

const PDFDocument = ({ userData }) => {
  const currentYear = new Date().getFullYear();

  return (
    <Document>
      {/* Page 1 */}
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Dynamic PDF Example</Text>
        </View>

        {/* Intro Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Welcome</Text>
          <Text style={styles.text}>Hello, {userData.name || "User"}!</Text>
          <View style={styles.divider} />
          <Text style={styles.text}>
            This PDF is generated dynamically based on your data. You can add
            images, charts, and more below.
          </Text>
        </View>

        {/* Photo Section (if user uploaded a photo) */}
        {userData.photo && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Photo</Text>
            <Image style={styles.image} src={userData.photo} />
          </View>
        )}

        {/* Summary Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.text}>
            {userData.summary || "Your summary goes here..."}
          </Text>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>© {currentYear} - Confidential</Text>
      </Page>

      {/* Page 2 */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Additional Info</Text>
        </View>

        {/* Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Details</Text>
          <Text style={styles.text}>
            {userData.details || "More details or data-driven content..."}
          </Text>
        </View>

        {/* Chart Section (if chartData is available) */}
        {userData.chartData && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Chart</Text>
            <Image style={styles.chartImage} src={userData.chartData} />
            <Text style={styles.text}>
              This bar chart is generated from user-provided values.
            </Text>
          </View>
        )}

        {/* Table with dummy data */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sample Table</Text>
          <View style={styles.table}>
            {/* Header Row */}
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>ID</Text>
              <Text style={styles.tableCellHeader}>Name</Text>
              <Text style={styles.tableCellHeader}>Value</Text>
            </View>

            {/* Data Rows */}
            {dummyData.map((row) => (
              <View style={styles.tableRow} key={row.id}>
                <Text style={styles.tableCell}>{row.id}</Text>
                <Text style={styles.tableCell}>{row.name}</Text>
                <Text style={styles.tableCell}>{row.value}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.footer}>Page 2 • © {currentYear}</Text>
      </Page>

      {/* Add more <Page> components if needed for up to 10-15 pages */}
    </Document>
  );
};

export default PDFDocument;
