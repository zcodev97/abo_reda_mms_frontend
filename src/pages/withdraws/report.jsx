import jsPDF from "jspdf";
import "jspdf-autotable";
import DateTimePicker from "react-datetime-picker";
import { useRef, useState } from "react";
import Select from "react-select";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import font from "../Amiri-Regular-normal";
import NavBar from "../navbar";
import Loading from "../loading";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import { SYSTEM_URL, formatDate } from "../../global";
import html2canvas from "html2canvas";
import { useLocation } from "react-router-dom";

function WithDrawReportPage() {
  const navigate = useNavigate();
  const tableRef = useRef(null);
  const input = tableRef.current;

  const [startFirstDate, setStartFirstDate] = useState(new Date());
  const [endFirstDate, setEndFirstDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [totalDinar, setTotalDinar] = useState(0);
  const [totalDollar, setTotalDollar] = useState(0);
  const [activeSearch, setActiveSearch] = useState(false);

  const [loading, setLoading] = useState(false);

  function exportToPDF() {
    const pdf = new jsPDF("landscape");

    const input = tableRef.current;
    html2canvas(input, { scale: 5.0 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 20); // JPEG format with quality 0.75

      const pdf = new jsPDF({
        orientation: "landscape", // Set orientation to landscape
        unit: "mm", // Use millimeters as the unit for dimensions
        format: "a4", // Use A4 size paper
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // Define margin values
      const marginLeft = 2; // Left margin in mm
      const marginRight = 2; // Right margin in mm
      const marginTop = 5; // Top margin in mm
      const marginBottom = 5; // Bottom margin in mm

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
        "jpeg",
        xPosition,
        yPosition,
        adjustedWidth,
        adjustedHeight
      );
      pdf.save(
        `تقرير الصرفيات ${formatDate(startFirstDate)} - ${formatDate(
          endFirstDate
        )}.pdf`
      );
    });
    // pdf.addFileToVFS("Amiri-Regular-normal.ttf", font);
    // pdf.addFont("Amiri-Regular-normal.ttf", "Amiri-Regular", "normal");

    // pdf.setFont("Amiri-Regular", "normal");

    // pdf.autoTable({
    //   head: [
    //     Object.keys(Object.values(data.reverse())[0]).map((header, index) => {
    //       return header;
    //     }),
    //   ],
    //   body: Object.values(data.reverse()).map((header, index) =>
    //     Object.values(header).map((sh, si) => sh)
    //   ),
    //   styles: {
    //     font: "Amiri-Regular",
    //     fontSize: 10,
    //     fontStyle: "bold",
    //   },
    //   headStyles: {
    //     fontStyle: "bold",
    //   },

    //   didParseCell: function (data) {
    //     if (data.row.index === 0) {
    //       // Set style for header cells

    //       data.cell.styles.halign = "center"; // Text alignment for header cells
    //     } else {
    //       // Set style for data cells

    //       data.cell.styles.halign = "center"; // Text alignment for data cells
    //     }
    //   },
    // });

    // pdf.save(
    //   `Invoice - from ${formatDate(startFirstDate)}- to ${formatDate(
    //     endFirstDate
    //   )}.pdf`
    // );
  }
  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      navigate("/withdraw_details", {
        state: {
          invoice_id: row.invoice_id,
          container: row.container,
          company_name: row.company_name,
          price_in_dinar: row.price_in_dinar,
          price_in_dollar: row.price_in_dollar,
          description: row.description,
          withdraw_type: row.withdraw_type,
          created_at: row.created_at,
        },
      });
    },
  };

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 15,
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prePageText: "<",
    showTotal: true,
    alwaysShowAllBtns: true,
  });

  async function loadWithdraws() {
    setLoading(true);

    await fetch(
      SYSTEM_URL +
        `withdraws_report/?date_from=${formatDate(
          startFirstDate
        )}&date_to=${formatDate(endFirstDate)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setTotalDinar(
          data.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.price_in_dinar;
          }, 0)
        );

        setTotalDollar(
          data.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.price_in_dollar;
          }, 0)
        );
        data.map((i) => {
          i.price_in_dinar = i.price_in_dinar.toLocaleString("en-US", {
            style: "currency",
            currency: "IQD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          });

          i.price_in_dollar = i.price_in_dollar.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          });

          i.created_at = formatDate(new Date(i.created_at));
          i.company_name = i.company_name.title;
          i.container = i.container.name;
          i.withdraw_type = i.withdraw_type.title;
        });
        setData(data);
      })
      .catch((error) => {
        alert(error);
      });
    setLoading(false);
  }
  const withdrawsColumns = [
    {
      dataField: "created_at",
      text: "تاريخ الانشاء",
      sort: true,
      filter: activeSearch ? textFilter() : null,
    },
    {
      dataField: "description",
      text: "التفاصيل",
      sort: true,
      filter: activeSearch ? textFilter() : null,
    },
    {
      dataField: "price_in_dollar",
      text: "مبلغ الدولار",
      sort: true,
      filter: activeSearch ? textFilter() : null,
    },

    {
      dataField: "price_in_dinar",
      text: "مبلغ الدينار",
      sort: true,
      filter: activeSearch ? textFilter() : null,
    },
    {
      dataField: "withdraw_type",
      text: "السيد",
      sort: true,
      filter: activeSearch ? textFilter() : null,
    },
    {
      dataField: "company_name",
      text: "اسم الشركة",
      sort: true,
      filter: activeSearch ? textFilter() : null,
    },
    {
      dataField: "container",
      text: "القاصة",
      sort: true,
      filter: activeSearch ? textFilter() : null,
    },
    {
      dataField: "invoice_id",
      text: "تسلسل السجل",
      sort: true,
      filter: activeSearch ? textFilter() : null,
    },
  ];
  function convertToNormalNumber(price) {
    // Remove commas, currency symbols, and other non-numeric characters
    const strippedPrice = price.replace(/[^0-9.]/g, "");

    // Convert the remaining string to a number
    const normalNumber = parseFloat(strippedPrice);

    return normalNumber;
  }

  function afterFilter(newResult, newFilters) {
    setTotalDinar(
      newResult.reduce((accumulator, currentItem) => {
        return accumulator + convertToNormalNumber(currentItem.price_in_dinar);
      }, 0)
    );

    setTotalDollar(
      newResult.reduce((accumulator, currentItem) => {
        return accumulator + convertToNormalNumber(currentItem.price_in_dollar);
      }, 0)
    );
  }
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <NavBar />

      <div className="container-fluid p-2 mt-2  border-primary text-dark rounded ">
        <h3 className="text-center" id="test">
          <b> تقرير الصرفيات </b>
        </h3>

        <div className="container text-end">
          <btn
            className="btn btn-primary text-light "
            onClick={() => {
              setActiveSearch(!activeSearch);
            }}
          >
            <b> {activeSearch ? "اخفاء" : "تفعيل"} البحث</b>
          </btn>
        </div>

        <div className="container    rounded p-4 mt-2 mb-2 ">
          <table className="table">
            <thead>
              <tr>
                <td>
                  <div
                    className="container btn border border-2  border-danger text-danger  text-center"
                    onClick={exportToPDF}
                  >
                    <b> تحميل 📁 </b>
                  </div>
                </td>
                <td>
                  <div
                    className="container btn btn-light border border-2 border-primary text-primary"
                    onClick={loadWithdraws}
                  >
                    <b> تنفيذ </b>
                  </div>
                </td>
                <td>
                  <div className="container  text-end ">
                    <DateTimePicker
                      key={2}
                      clearIcon={null}
                      format={"y-MM-dd"}
                      onChange={setEndFirstDate}
                      value={endFirstDate}
                    />
                  </div>
                </td>
                <td>الى</td>
                <td>
                  <div className="container  text-end ">
                    <DateTimePicker
                      key={1}
                      clearIcon={null}
                      format={"y-MM-dd"}
                      onChange={setStartFirstDate}
                      value={startFirstDate}
                    />
                  </div>
                </td>
                <td>من</td>
              </tr>
            </thead>
          </table>
        </div>

        <div className="table-responsive border " id="mytable" ref={tableRef}>
          <div
            className="container-fluid"
            style={{ height: 500, overflow: "auto" }}
          >
            <BootstrapTable
              className="text-center"
              hover={true}
              bordered={true}
              striped={true}
              bootstrap4
              keyField="id"
              columns={withdrawsColumns}
              data={data}
              rowEvents={rowEvents}
              filter={filterFactory({ afterFilter })}
            />
            <div className="container text-center">
              <table className="table table-hover table-bordered">
                <tbody>
                  <tr>
                    <td>
                      {totalDinar.toLocaleString("en-US", {
                        style: "currency",
                        currency: "IQD",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td>مجموع الدينار</td>
                  </tr>
                  <tr>
                    <td>
                      {totalDollar.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td>مجموع الدولار</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <table className="table table-strpied">
            <tbody>
              <br /> <br /> <br /> <br /> <br /> <br /> <br />
              <br /> <br /> <br />
              <tr>
                <td></td>
                <td>
                  <h4> التدقيق </h4>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>

                <td className="text-end">
                  <h4> الحسابات </h4>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default WithDrawReportPage;
