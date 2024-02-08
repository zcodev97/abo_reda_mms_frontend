import { useEffect, useState } from "react";
import { SYSTEM_URL, formatDate } from "../../global";
import NavBar from "../navbar";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";

function DepositsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [deposits, setDeposits] = useState([]);
  const [withdraws, setWithdraws] = useState([]);

  async function loadDeposits() {
    setLoading(true);
    await fetch(SYSTEM_URL + "deposits/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
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
        setDeposits(data);
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  const depositsColumns = [
    {
      dataField: "created_at",
      text: "تاريخ الانشاء",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "received_from",
      text: "استلام من",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "description",
      text: "التفاصيل",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "price_in_dollar",
      text: "مبلغ الدولار",
      sort: true,
      filter: textFilter(),
    },

    {
      dataField: "price_in_dinar",
      text: "مبلغ الدينار",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "company_name",
      text: "اسم الشركة",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "container",
      text: "القاصة",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "invoice_id",
      text: "تسلسل السجل",
      sort: true,
      filter: textFilter(),
    },
  ];

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

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      navigate("/deposit_details", {
        state: {
          invoice_id: row.invoice_id,
          container: row.container,
          company_name: row.company_name,
          price_in_dinar: row.price_in_dinar,
          price_in_dollar: row.price_in_dollar,
          description: row.description,
          received_from: row.received_from,
          created_at: row.created_at,
        },
      });
    },
  };

  useEffect(() => {
    loadDeposits();
  }, []);
  return (
    <>
      <NavBar />

      <hr />
      <div className="container text-center">
        <h1 className="text-success"> الايداعات</h1>
      </div>
      <div className="container text-center">
        <div
          className="btn btn-primary m-2"
          onClick={() => {
            navigate("/add_deposit");
          }}
        >
          <b> اضافة</b>
        </div>
        <div
          className="btn btn-success m-2"
          onClick={() => {
            navigate("/deposits_report");
          }}
        >
          <b> تقرير </b>
        </div>
      </div>
      <BootstrapTable
        className="text-center"
        hover={true}
        bordered={true}
        bootstrap4
        keyField="id"
        columns={depositsColumns}
        data={deposits}
        rowEvents={rowEvents}
        pagination={pagination}
        filter={filterFactory()}
      />
    </>
  );
}
export default DepositsPage;
