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

function CompanyDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [deposits, setDeposits] = useState([]);
  const [withdraws, setWithdraws] = useState([]);

  async function loadDeposits() {
    setLoading(true);
    await fetch(SYSTEM_URL + "company_deposits/" + location.state.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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
        // console.log(data);
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

  async function loadWithdraws() {
    setLoading(true);
    await fetch(SYSTEM_URL + "company_withdraws/" + location.state.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.token}`,
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
        setWithdraws(data);
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
      dataField: "mr",
      text: "السيد",
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
  useEffect(() => {
    loadDeposits();
    loadWithdraws();
  }, []);
  return (
    <>
      <NavBar />
      <div className="container text-center">
        <h3> آسم الشركة</h3>
        <h3>{location.state.name} </h3>
      </div>

      <hr />
      <div className="container text-center">
        <h1 className="text-success border rounded"> الادخالات</h1>
      </div>
      <BootstrapTable
        className="text-center"
        hover={true}
        bordered={true}
        bootstrap4
        keyField="id"
        columns={depositsColumns}
        data={deposits}
        pagination={pagination}
        filter={filterFactory()}
      />
      <hr />
      <div className="container text-center">
        <h1 className="text-danger border rounded"> الصرفيات</h1>
      </div>
      <BootstrapTable
        className="text-center"
        hover={true}
        bordered={true}
        bootstrap4
        keyField="id"
        columns={withdrawsColumns}
        data={withdraws}
        pagination={pagination}
        filter={filterFactory()}
      />
    </>
  );
}
export default CompanyDetailsPage;
