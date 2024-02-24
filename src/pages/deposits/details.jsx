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

function DepositDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const tableRef = useRef(null);

  async function exportToPDF() {
    const pdf = new jsPDF("landscape");

    const input = tableRef.current;
    html2canvas(input, { scale: 3.0 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 2.0); // JPEG format with quality 0.75

      const pdf = new jsPDF({
        // orientation: "landscape", // Set orientation to landscape
        unit: "mm", // Use millimeters as the unit for dimensions
        format: "a4", // Use A4 size paper
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // Define margin values
      const marginLeft = 10; // Left margin in mm
      const marginRight = 10; // Right margin in mm
      const marginTop = 10; // Top margin in mm
      const marginBottom = 10; // Bottom margin in mm

      // Calculate the adjusted width and height with margins
      const adjustedWidth = pdfWidth - marginLeft - marginRight;
      const adjustedHeight = pdfHeight - marginTop - marginBottom;

      // Calculate the x and y positions to center the adjusted table
      const xPosition =
        marginLeft + (pdf.internal.pageSize.getWidth() - pdfWidth) / 2;
      const yPosition =
        marginTop + (pdf.internal.pageSize.getHeight() - pdfHeight) / 8;

      pdf.addImage(
        imgData,
        "PNG",
        xPosition,
        yPosition,
        adjustedWidth,
        adjustedHeight
      );
      pdf.save(
        `سند ايداع ${location.state.company_name} - ${location.state.created_at} - ${location.state.received_from}.pdf`
      );
    });
  }

  return (
    <>
      <NavBar />

      <hr />

      <div className="container text-center">
        <div className="btn btn-warning p-2" onClick={exportToPDF}>
          {" "}
          ⬇️ تحميل
        </div>
      </div>
      <hr />

      <table id="mytable" ref={tableRef} className="table p-2 text-center mt-4">
        <thead className="mt-4">
          <tr>
            <td> </td>
            <td
              colSpan={4}
              className="text-center bg-success text-light rounded"
            >
              <div className="container text-center">
                <div className="container">
                  <h3>
                    شركة
                    <b>
                      {"  "}
                      {location.state.company_name} {"  "}
                    </b>
                  </h3>
                </div>
                <h4>
                  <b> قسم الحسابات</b>
                </h4>
                <h4>
                  <b>سند ايداع</b>
                </h4>
              </div>
            </td>
            <td> </td>
          </tr>
        </thead>
        <tbody style={{ borderStyle: "" }}>
          <tr>
            <td></td> <td></td> <td></td>{" "}
            <td className="text-end">
              {" "}
              <h4> {location.state.invoice_id} </h4>
            </td>
            <td className="text-end">
              {" "}
              <h4>
                {" "}
                <b> رقم السند</b>{" "}
              </h4>
            </td>
          </tr>
          <tr>
            <td></td> <td></td> <td></td>{" "}
            <td className="text-end">
              {" "}
              <h4> {location.state.deposit_number} </h4>
            </td>
            <td className="text-end">
              {" "}
              <h4>
                {" "}
                <b> تسلسل السند</b>{" "}
              </h4>
            </td>
          </tr>
          <tr>
            <td></td> <td></td> <td></td>{" "}
            <td className="text-end">
              {" "}
              <h4> {location.state.received_from} </h4>
            </td>
            <td className="text-end">
              {" "}
              <h4>
                {" "}
                <b> : نوع الحساب</b>{" "}
              </h4>
            </td>
          </tr>
          <tr>
            <td></td> <td></td> <td></td>{" "}
            <td className="text-end">
              {" "}
              <h4> {location.state.created_at} </h4>
            </td>
            <td className="text-end">
              {" "}
              <h4>
                {" "}
                <b> : التاريخ</b>{" "}
              </h4>
            </td>
          </tr>
          <tr>
            <td></td> <td></td> <td></td>{" "}
            <td className="text-end">
              {" "}
              <h4> {location.state.price_in_dinar} </h4>
            </td>
            <td className="text-end">
              {" "}
              <h4>
                {" "}
                <b> : مبلغ الدينار</b>{" "}
              </h4>
            </td>
          </tr>
          <tr>
            <td></td> <td></td> <td></td>{" "}
            <td className="text-end">
              {" "}
              <h4> {location.state.price_in_dollar} </h4>
            </td>
            <td className="text-end">
              {" "}
              <h4>
                {" "}
                <b> : مبلغ الدولار</b>{" "}
              </h4>
            </td>
          </tr>
          <tr>
            <td></td> <td></td> <td></td>{" "}
            <td className="text-end">
              {" "}
              <h4> {location.state.description} </h4>
            </td>
            <td className="text-end">
              {" "}
              <h4>
                {" "}
                <b> : التفاصيل</b>{" "}
              </h4>
            </td>
          </tr>
          <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />{" "}
          <br /> <br /> <br /> <br /> <br /> <br /> <br />
          <br /> <br /> <br />
          <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />{" "}
          <br /> <br /> <br /> <br /> <br /> <br /> <br />
          <br /> <br /> <br />
          <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />{" "}
          <tr>
            <td></td> <td></td>{" "}
            <td className="text-end">
              {" "}
              <h4> التدقيق </h4>
            </td>
            <td></td>
            <td className="text-start">
              {" "}
              <h4> الحسابات </h4>
            </td>
          </tr>
          <br /> <br /> <br />
        </tbody>
      </table>
    </>
  );
}
export default DepositDetailsPage;
