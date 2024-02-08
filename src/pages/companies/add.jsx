import { useEffect, useState } from "react";
import NavBar from "../navbar";
import { useNavigate } from "react-router-dom";
import { SYSTEM_URL } from "../../global";
import Select from "react-select";

function AddCompanyPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [totalDinar, setTotalDinar] = useState(0);
  const [totalDollar, setTotalDollar] = useState(0);

  // kitmans drop down menu
  const [selectedContainer, setSelectedContainer] = useState({});
  const [containersDropDownMenu, setContainersDropDownMenu] = useState([]);
  let dropdownMenuContainersTemp = [];

  async function loadContainers() {
    setLoading(true);

    fetch(SYSTEM_URL + "containers/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.token}`,
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

  function addCompany() {
    // if (window.confirm("هل انت متاكد ؟") == true) {

    // } else {
    //   alert("لقد الغيت عملية الأضافة");
    // }
    setLoading(true);

    fetch(SYSTEM_URL + "company_create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.token}`,
      },

      body: JSON.stringify({
        title: name,
        container: selectedContainer.value,
        total_dinar: 0,
        total_dollar: 0,
        created_by: window.user_id,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return {};
      })
      .then((data) => {
        alert("تم اضافة سجل ");
        navigate("/companies", { replace: true });
      })
      .catch((error) => {
        console.log(error);
        alert(error + "😕");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    loadContainers();
  }, []);

  return (
    <>
      <NavBar />

      <div className="container-fluid text-center">
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
                    setName(e.target.value);
                  }}
                  type="text"
                  className="form-control text-center border border-dark"
                  id="username"
                  style={{ fontSize: "20px" }}
                />
              </td>
              <td>
                <b> آسم الشركة</b>
              </td>
            </tr>
            {/*  */}
            {/*  */}
            {/* <tr>
              <td>
                <input
                  onChange={(e) => {
                    setTotalDinar(e.target.value);
                  }}
                  type="number"
                  className="form-control text-center border border-dark"
                  id="username"
                  style={{ fontSize: "20px" }}
                />
              </td>
              <td>
                <b> مبلغ الدينار</b>
              </td>
            </tr> */}
            {/*  */}
            {/* <tr>
              <td>
                <input
                  onChange={(e) => {
                    setTotalDollar(e.target.value);
                  }}
                  type="number"
                  className="form-control text-center border border-dark"
                  id="username"
                  style={{ fontSize: "20px" }}
                />
              </td>
              <td>
                <b> مبلغ الدولار</b>
              </td>
            </tr> */}
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
            <div className="btn btn-success p-2 mt-2 mb-2" onClick={addCompany}>
              <h4> حفظ القيد</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCompanyPage;
