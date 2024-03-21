import { useEffect, useRef, useState } from "react";
import { SYSTEM_URL, formatDate } from "../../global";
import NavBar from "../navbar";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import jsPDF from "jspdf";
import font from "../Amiri-Regular-normal";
import html2canvas from "html2canvas";

function WithDrawDetialsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const tableRef = useRef(null);

  // async function exportToPDF() {
  //   const pdf = new jsPDF("landscape");

  //   const input = tableRef.current;
  //   html2canvas(input, { scale: 1.0 }).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/jpeg", 2.0); // JPEG format with quality 0.75

  //     const pdf = new jsPDF({
  //       // orientation: "landscape", // Set orientation to landscape
  //       unit: "mm", // Use millimeters as the unit for dimensions
  //       format: "a4", // Use A4 size paper
  //     });

  //     const imgProps = pdf.getImageProperties(imgData);
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  //     // Define margin values
  //     const marginLeft = 10; // Left margin in mm
  //     const marginRight = 10; // Right margin in mm
  //     const marginTop = 10; // Top margin in mm
  //     const marginBottom = 10; // Bottom margin in mm

  //     // Calculate the adjusted width and height with margins
  //     const adjustedWidth = pdfWidth - marginLeft - marginRight;
  //     const adjustedHeight = pdfHeight - marginTop - marginBottom;

  //     // Calculate the x and y positions to center the adjusted table
  //     const xPosition =
  //       marginLeft + (pdf.internal.pageSize.getWidth() - pdfWidth) / 2;
  //     const yPosition =
  //       marginTop + (pdf.internal.pageSize.getHeight() - pdfHeight) / 8;

  //     pdf.addImage(
  //       imgData,
  //       "PNG",
  //       xPosition,
  //       yPosition,
  //       adjustedWidth,
  //       adjustedHeight
  //     );
  //     pdf.save(
  //       `سند صرف ${location.state.company_name} - ${location.state.created_at} - ${location.state.withdraw_type}.pdf`
  //     );
  //   });
  // }

  const exportToPDF = () => {
    // Save the current document title
    const originalTitle = document.title;

    // Set the document title to the custom title
    document.title = `سند صرف ${location.state.company_name} - ${location.state.created_at} - ${location.state.withdraw_type}.pdf`;
    window.print();

    window.addEventListener("afterprint", () => {
      document.title = originalTitle;
    });
  };

  return (
    <>
      <NavBar />

      <div className="container text-center" id="no-print">
        <div className="btn btn-warning p-2" onClick={exportToPDF}>
          ⬇️ تحميل
        </div>
      </div>

      <div className="container-fluid text-end m-0">
        <p style={{ fontWeight: "bold", fontSize: "20px" }}>
          {location.state.company_name}
        </p>
      </div>

      <table
        id="mytable"
        ref={tableRef}
        className="table table-sm table-bordered text-center"
        style={{ fontSize: "16px" }}
      >
        <thead>
          <td colSpan={2} className="bg-success text-light">
            سند صرف
          </td>
        </thead>
        <tbody>
          <tr>
            <td className="text-end">
              <p> {location.state.invoice_id} </p>
            </td>
            <td className="text-end">
              <p>
                <b> رقم السند</b>
              </p>
            </td>
          </tr>
          <tr>
            <td className="text-end">
              <p> {location.state.withdraw_number} </p>
            </td>
            <td className="text-end">
              <p>
                <b> تسلسل السند</b>
              </p>
            </td>
          </tr>
          <tr>
            <td className="text-end">
              <p> {location.state.withdraw_type} </p>
            </td>
            <td className="text-end">
              <p>
                <b> : القيد</b>
              </p>
            </td>
          </tr>
          <tr>
            <td className="text-end">
              <p> {location.state.created_at} </p>
            </td>
            <td className="text-end">
              <p>
                <b> : التاريخ</b>
              </p>
            </td>
          </tr>
          <tr>
            <td className="text-end">
              <p> {location.state.out_to} </p>
            </td>
            <td className="text-end">
              <p>
                <b> : الى</b>
              </p>
            </td>
          </tr>

          <tr>
            <td className="text-end">
              <p> {location.state.price_in_dinar} </p>
            </td>
            <td className="text-end">
              <p>
                <b> : مبلغ الدينار</b>
              </p>
            </td>
          </tr>
          <tr>
            <td className="text-end">
              <p> {location.state.price_in_dollar} </p>
            </td>
            <td className="text-end">
              <p>
                <b> : مبلغ الدولار</b>
              </p>
            </td>
          </tr>
          <tr>
            <td className="text-end">
              <p> {location.state.description} </p>
            </td>
            <td className="text-end">
              <p>
                <b> : التفاصيل</b>
              </p>
            </td>
          </tr>
        </tbody>
      </table>

      <footer className="footer d-flex justify-content-between align-items-center">
        <p> الحسابات </p>
        <p> التدقيق </p>

        <p> المستلم </p>
      </footer>
    </>
  );
}
export default WithDrawDetialsPage;
