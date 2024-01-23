import { useEffect } from "react";
import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Loading from "./loading";
import { SYSTEM_URL } from "../global";

// db password Qymbg5QhNbAzRn!

function NavBar() {
  const navigate = useNavigate();

  let navLinkClassName = "nav-link text-dark rounded border";

  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);

    window.token = "";
    window.username = "";
    window.user_id = "";
    window.email = "";
    setLoading(false);
    // console.log(showNavBar);
    navigate("/login", { replace: true });
  }

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark rounded p-2">
        <div className="container-fluid d-flex justify-content-between">
          {/* Start of the main navbar content */}
          <div>
            <div className="collapse navbar-collapse" id="navbarNav">
              <a className="navbar-brand text-primary p-2">
                <Link className="nav-link text-primary" to="/containers">
                  <h3>
                    <b>حساباتي</b>
                  </h3>
                </Link>
              </a>
              <button
                className="navbar-toggler bg-dark"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item rounded m-1">
                    <Link className={navLinkClassName} to="/containers">
                      <h5>القاصات</h5>
                    </Link>
                  </li>
                  <li className="nav-item rounded border-4 m-1">
                    <Link className={navLinkClassName} to="/companies">
                      <h5>الشركات</h5>
                    </Link>
                  </li>
                  <li className="nav-item rounded border-4 m-1">
                    <Link className={navLinkClassName} to="/withdraws">
                      <h5>الصرفيات</h5>
                    </Link>
                  </li>
                  <li className="nav-item rounded border-4 m-1">
                    <Link className={navLinkClassName} to="/deposits">
                      <h5>الايداعات</h5>
                    </Link>
                  </li>
                  <li className="nav-item rounded border-4 m-1">
                    <Link className={navLinkClassName} to="/withdraw_types">
                      <h5> القيود</h5>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* End of the main navbar content */}

          {/* Start of user/logout buttons */}
          <div>
            <ul className="navbar-nav">
              <li
                className="nav-item btn m-1 p-2 border border-1 rounded"
                onClick={() => {
                  navigate("/user_details", {
                    state: {
                      id: localStorage.getItem("id"),
                      email: localStorage.getItem("email"),
                      username: localStorage.getItem("username"),
                      firstName: localStorage.getItem("firstName"),
                      lastName: localStorage.getItem("lastName"),
                      phoneNumber: localStorage.getItem("phoneNumber"),
                      role: localStorage.getItem("role"),
                    },
                  });
                }}
              >
                👤<b> {window.username}</b>
              </li>
              <li className="nav-item rounded m-1">
                <Link
                  className="nav-link text-light bg-danger rounded p-2 border border-3 border-danger"
                  to="/login"
                  onClick={handleLogout}
                >
                  <b>خروج</b>
                </Link>
              </li>
            </ul>
          </div>
          {/* End of user/logout buttons */}
        </div>
      </nav>

      <Outlet />
    </>
  );
}

export default NavBar;
