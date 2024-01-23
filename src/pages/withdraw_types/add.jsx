import { useEffect, useState } from "react";
import NavBar from "../navbar";
import { useNavigate } from "react-router-dom";
import { SYSTEM_URL } from "../../global";
import Select from "react-select";

function AddPersonTypePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");

  function addPersonType() {
    if (window.confirm("هل انت متاكد ؟") == true) {
      setLoading(true);

      fetch(SYSTEM_URL + "create_withdraw_type/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.token}`,
        },

        body: JSON.stringify({
          title: name,
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
          navigate("/withdraw_types", { replace: true });
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
                <b> الاسم </b>
              </td>
            </tr>
            {/*  */}

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
            <div
              className="btn btn-success p-2 mt-2 mb-2"
              onClick={addPersonType}
            >
              <h4> حفظ القيد</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddPersonTypePage;
