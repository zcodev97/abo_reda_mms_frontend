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

function DepositsReportPage() {
  const navigate = useNavigate();
  const tableRef = useRef(null);
  const input = tableRef.current;

  const [startFirstDate, setStartFirstDate] = useState(new Date());
  const [endFirstDate, setEndFirstDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [totalDinar, setTotalDinar] = useState(0);
  const [totalDollar, setTotalDollar] = useState(0);
  const [activeSearch, setActiveSearch] = useState(false);
  const [reportTitle, setReportTitle] = useState("");

  const [loading, setLoading] = useState(false);

  const exportToPDF = () => {
    // Save the current document title
    const originalTitle = document.title;

    // Set the document title to the custom title
    document.title = `تقرير الايداعات  - ${reportTitle} -  ${formatDate(
      startFirstDate
    )} - ${formatDate(endFirstDate)}.pdf`;
    window.print();

    window.addEventListener("afterprint", () => {
      document.title = originalTitle;
    });
  };

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

  async function loadDeposits() {
    setLoading(true);

    await fetch(
      SYSTEM_URL +
        `deposits_report/?date_from=${formatDate(
          startFirstDate
        )}&date_to=${formatDate(endFirstDate)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);

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
        window.deposits_report_data = data;
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
        });
        setData(data);
      })
      .catch((error) => {
        alert(error);
      });
    setLoading(false);
  }
  const depositsColumns = [
    {
      dataField: "created_at",
      text: "تاريخ الانشاء",
      sort: true,
      filter: activeSearch ? textFilter() : null,
    },
    {
      dataField: "received_from",
      text: "استلام من",
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
      dataField: "deposit_number",
      text: "تسلسل",
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

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 10000,
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prePageText: "<",
    showTotal: true,
    alwaysShowAllBtns: true,
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <NavBar />

      {loading ? (
        <Loading />
      ) : (
        <div className="container-fluid p-2 mt-2  border-primary text-dark rounded ">
          <style>
            {`
            @media print {
              @page {
                size: landscape;
              }
            }
          `}
          </style>
          <h3 className="text-center" id="test">
            <b> تقرير الايداعات </b>
          </h3>

          <div className="container text-center" id="no-print">
            <btn
              className="btn btn-primary text-light "
              onClick={() => {
                setActiveSearch(!activeSearch);
              }}
            >
              <b> {activeSearch ? "اخفاء" : "تفعيل"} البحث</b>
            </btn>
          </div>

          <div className="container d-flex justify-content-between align-items-center">
            <div
              className="btn btn-light border border-2 border-warning text-dark m-2"
              onClick={() => {
                // console.log(reportTitle.length);
                if (reportTitle.length === 0) {
                  alert("الرجاء ادخال عنوان للتقرير ");
                  return;
                }
                exportToPDF();
              }}
              id="no-print"
            >
              <b>طباعة</b>
            </div>

            <div
              className="btn btn-light border border-2 border-primary text-primary"
              onClick={() => {
                loadDeposits();
              }}
              id="no-print"
            >
              <b> تنفيذ </b>
            </div>

            <div
              id="no-print"
              className="container"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DateTimePicker
                key={2}
                clearIcon={null}
                format={"y-MM-dd"}
                onChange={setEndFirstDate}
                value={endFirstDate}
              />

              <div className="p-3 text-center"> الى</div>
            </div>

            <div
              id="no-print"
              className="container"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DateTimePicker
                key={1}
                clearIcon={null}
                format={"y-MM-dd"}
                onChange={setStartFirstDate}
                value={startFirstDate}
              />

              <div className="p-3 text-center"> من</div>
            </div>
          </div>

          <div className="table" id="mytable" ref={tableRef}>
            <div
              className="container text-center "
              style={{ marginTop: "20px" }}
            >
              <p>عنوان التقرير</p>
              <input
                onChange={(e) => {
                  setReportTitle(e.target.value);
                }}
                type="text"
                className="form-control text-center"
                id="reportTitle"
                style={{
                  fontSize: "20px",
                  borderStyle: "outset",
                }}
                dir="rtl"
              />
            </div>
            <div
              className="container-fluid"
              style={{ overflowX: "auto", width: "100%", fontSize: "14px" }}
            >
              <BootstrapTable
                hover={true}
                bordered={true}
                striped={true}
                bootstrap4
                keyField="id"
                columns={depositsColumns}
                data={data}
                pagination={pagination}
                filter={filterFactory({ afterFilter })}
              />
            </div>
          </div>
        </div>
      )}

      <div className="container d-flex justify-content-between align-items-center">
        <table className="table table-sm text-center ">
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

      <footer className="footer">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <p> الحسابات </p>
          <p> التدقيق </p>

          <p> المستلم </p>
        </div>
      </footer>
    </>
  );
}

export default DepositsReportPage;
