import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

// We won't register any custom fonts; we'll use the PDF default (often Helvetica).
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#f9fafb", // light background
    fontSize: 12,
    fontFamily: "Helvetica", // default PDF font
    color: "#111827", // near-black text
  },
  header: {
    backgroundColor: "#1f2937", // dark gray
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
    // Subtle shadow effect - won't show up as a true shadow in PDF
    // but we'll keep it for design clarity
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
    backgroundColor: "#e5e7eb", // light gray
  },
  image: {
    width: 100,
    height: 100,
    objectFit: "cover",
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: "center",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    fontSize: 10,
    color: "#6b7280", // medium gray
    textAlign: "center",
  },
});

const PDFDocument = ({ userData }) => {
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
            images, links, charts, and more.
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
        <Text style={styles.footer}>
          © {new Date().getFullYear()} - Confidential
        </Text>
      </Page>

      {/* Page 2 (example). Duplicate as needed for 10-15 pages */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Additional Info</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Details</Text>
          <Text style={styles.text}>
            {userData.details || "More details or data-driven content..."}
          </Text>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>Page 2 • © {new Date().getFullYear()}</Text>
      </Page>

      {/* Add more pages here if needed */}
    </Document>
  );
};

export default PDFDocument;
