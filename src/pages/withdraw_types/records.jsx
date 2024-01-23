import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { SYSTEM_URL, formatDate } from "../../global";
import Loading from "../loading";
import NavBar from "../navbar";

function PersonTypePage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  async function loadData() {
    setLoading(true);
    await fetch(SYSTEM_URL + "withdraw_types/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        alert(error);
      });
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  const columns = [
    {
      dataField: "title",
      text: "اسم القيد",
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

  return (
    <>
      <NavBar />
      {loading ? (
        <Loading />
      ) : (
        <div className="container-fluid p-4 text-end">
          <div className="container text-center ">
            <h1> انواع القيود </h1>
          </div>

          <div className="container text-center">
            <div
              className="btn btn-dark text-light p-2 mt-2 mb-2"
              onClick={() => {
                navigate("/add_withdraw_type");
              }}
            >
              <h4>أضافة </h4>
            </div>
          </div>

          <BootstrapTable
            className="text-center"
            hover={true}
            bordered={true}
            bootstrap4
            keyField="id"
            columns={columns}
            data={data}
            pagination={pagination}
            filter={filterFactory()}
            // rowEvents={rowEvents}
          />
        </div>
      )}
    </>
  );
}

export default PersonTypePage;
