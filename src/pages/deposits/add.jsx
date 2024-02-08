import { useEffect, useState } from "react";
import NavBar from "../navbar";
import { useNavigate } from "react-router-dom";
import { SYSTEM_URL, formatDate } from "../../global";
import Select from "react-select";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
function AddDepositPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [totalDinar, setTotalDinar] = useState(0);
  const [totalDollar, setTotalDollar] = useState(0);
  const [description, setDescription] = useState("");
  const [receivedFrom, setReceivedFrom] = useState("");
  const [recordDate, setRecordDate] = useState(new Date());

  // containers drop down menu
  const [selectedContainer, setSelectedContainer] = useState({});
  const [containersDropDownMenu, setContainersDropDownMenu] = useState([]);
  let dropdownMenuContainersTemp = [];

  async function loadContainers() {
    setLoading(true);

    fetch(SYSTEM_URL + "containers/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        response.forEach((i) => {
          dropdownMenuContainersTemp.push({
            label: i.name,
            value: i.id,
            total_dinar: i.total_dinar,
            total_dollar: i.total_dinar,
            created_by: i.created_by,
          });
        });
        setContainersDropDownMenu(dropdownMenuContainersTemp);
      })
      .catch((e) => {
        alert(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  // containers drop down menu
  const [selectedCompany, setSelectedCompany] = useState({});
  const [companiesDropDownMenu, setCompaniesDropDownMenu] = useState([]);
  let dropdownMenuCompaniesTemp = [];

  async function loadCompanies() {
    setLoading(true);

    fetch(SYSTEM_URL + "companies/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        response.forEach((i) => {
          dropdownMenuCompaniesTemp.push({
            label: i.title,
            value: i.id,
          });
        });
        setCompaniesDropDownMenu(dropdownMenuCompaniesTemp);
      })
      .catch((e) => {
        alert(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function addRecord() {
    if (window.confirm("هل انت متاكد ؟") == true) {
      setLoading(true);

      fetch(SYSTEM_URL + "create_deposit/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },

        body: JSON.stringify({
          container: selectedContainer.value,
          company_name: selectedCompany.value,
          price_in_dinar: totalDinar,
          price_in_dollar: totalDollar,
          received_from: receivedFrom,
          description: description,
          created_by: localStorage.getItem("user_id"),
          created_at: recordDate,
        }),
      })
        .then((response) => {
          console.log(response.content);
          if (response.status === 200) {
            return response.json();
          }
          return {};
        })
        .then((data) => {
          alert("تم اضافة سجل ");
          navigate("/deposits", { replace: true });
        })
        .catch((error) => {
          console.log(error);
          alert(error + "😕");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      alert("لقد الغيت عملية الأضافة");
    }
  }

  useEffect(() => {
    loadContainers();
    loadCompanies();
  }, []);

  return (
    <>
      <NavBar />

      <div className="container-fluid text-center">
        <div className="container border rounded m-1 p-1 ">
          <h2>
            <b> اضافة ايداع</b>
          </h2>
        </div>
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <td className="text-light bg-dark">
                <h3>الادخال</h3>
              </td>
              <td className="text-light bg-dark">
                <h3>العنوان</h3>
              </td>
            </tr>
          </thead>

          <tbody>
            {/*  */}
            <tr>
              <td>
                <input
                  onChange={(e) => {
                    setReceivedFrom(e.target.value);
                  }}
                  type="text"
                  className="form-control text-center border border-dark"
                  id="username"
                  style={{ fontSize: "20px" }}
                />
              </td>
              <td>
                <b> استلمت من </b>
              </td>
            </tr>
            {/*  */}
            {/*  */}
            <tr>
              <td>
                <div
                  className="container text-center"
                  style={{ display: "flex" }}
                >
                  <p>
                    {Number(totalDinar).toLocaleString("en-US", {
                      style: "currency",
                      currency: "IQD",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                  <div className="container" style={{ width: "100px" }}></div>
                  <input
                    onChange={(e) => {
                      setTotalDinar(e.target.value);
                    }}
                    type="number"
                    className="form-control text-center border border-dark"
                    id="username"
                    style={{ fontSize: "20px" }}
                  />
                </div>
              </td>
              <td>
                <b> مبلغ الدينار</b>
              </td>
            </tr>
            {/*  */}
            <tr>
              <td>
                <div
                  className="container text-center"
                  style={{ display: "flex" }}
                >
                  <p>
                    {Number(totalDollar).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                  <div className="container" style={{ width: "100px" }}></div>
                  <input
                    onChange={(e) => {
                      setTotalDollar(e.target.value);
                    }}
                    type="number"
                    className="form-control text-center border border-dark"
                    id="username"
                    style={{ fontSize: "20px" }}
                  />
                </div>
              </td>
              <td>
                <b>مبلغ الدولار</b>
              </td>
            </tr>
            {/*  */}
            {/*  */}
            <tr>
              <td style={{ fontWeight: "bold" }}>
                <div className="container border border-dark pt-2 pb-2 rounded">
                  <Select
                    defaultValue={selectedContainer}
                    options={containersDropDownMenu}
                    onChange={(opt) => setSelectedContainer(opt)}
                    placeholder={"القاصة"}
                  />
                </div>
              </td>
              <td>
                <b> القاصة </b>
              </td>
            </tr>
            {/*  */}
            {/*  */}
            <tr>
              <td style={{ fontWeight: "bold" }}>
                <div className="container border border-dark pt-2 pb-2 rounded">
                  <Select
                    defaultValue={selectedCompany}
                    options={companiesDropDownMenu}
                    onChange={(opt) => setSelectedCompany(opt)}
                    placeholder={"القاصة"}
                  />
                </div>
              </td>
              <td>
                <b> الشركة </b>
              </td>
            </tr>
            {/*  */}
            {/*  */}
            <tr>
              <td>
                <textarea
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  dir="rtl"
                  class="form-control"
                  rows="5"
                  id="comment"
                  style={{ fontSize: "20px" }}
                ></textarea>
              </td>
              <td>
                <b> التفاصيل </b>
              </td>
            </tr>
            {/*  */}

            <tr>
              <td>
                <div className="container border border-dark pt-2 pb-2 rounded">
                  <DateTimePicker
                    key={1}
                    clearIcon={null}
                    format={"y-MM-dd"}
                    onChange={setRecordDate}
                    value={recordDate}
                  />
                </div>
              </td>
              <td>
                <b> تاريخ السجل </b>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="row">
          <div className="col-md-6">
            <div
              className="btn btn-danger p-2 mt-2 mb-2"
              onClick={() => {
                navigate(-1);
              }}
            >
              <h4> رجوع 🔙</h4>
            </div>
          </div>
          <div className="col-md-6">
            <div className="btn btn-success p-2 mt-2 mb-2" onClick={addRecord}>
              <h4> حفظ القيد</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddDepositPage;
