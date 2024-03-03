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

    localStorage.clear();

    setLoading(false);
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
      <nav
        className="navbar navbar-expand-sm navbar-dark  text-center rounded p-2"
        id="no-print"
      >
        <div
          className="container-fluid"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            margin: "0px",
            padding: "0px",
          }}
        >
          {/* Start of the main navbar content */}
          <div className="contaier-fluid">
            <button
              className="navbar-toggler bg-dark text-end"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse" id="navbarNav">
            {localStorage.getItem("user_type") === "admin" ? (
              <ul className="navbar-nav text-center">
                <li className="nav-item rounded m-1">
                  <Link className="nav-link text-primary" to="/containers">
                    <h3>
                      <b>حساباتي</b>
                    </h3>
                  </Link>
                </li>
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
            ) : localStorage.getItem("user_type") === "supervisor" ? (
              <ul className="navbar-nav">
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
            ) : (
              <ul className="navbar-nav">
                <li className="nav-item rounded border-4 m-1">
                  <Link className={navLinkClassName} to="/withdraws">
                    <h5>الصرفيات</h5>
                  </Link>
                </li>

                <li className="nav-item rounded border-4 m-1">
                  <Link className={navLinkClassName} to="/withdraw_types">
                    <h5> القيود</h5>
                  </Link>
                </li>
              </ul>
            )}

            <li className="nav-item btn m-1 p-2 border border-1 rounded">
              👤<b> {localStorage.getItem("username")}</b>
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
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
}

export default NavBar;
