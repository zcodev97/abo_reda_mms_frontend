import NoPage from "./pages/NoPage";
import LoginPage from "./pages/login";
import ContainersPage from "./pages/containers/records";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ContainerDetailsPage from "./pages/containers/details";
import CompaniesPage from "./pages/companies/records";
import CompanyDetailsPage from "./pages/companies/details";
import WithdrawsPage from "./pages/withdraws/records";
import DepositsPage from "./pages/deposits/records";
import AddContainerPage from "./pages/containers/add";
import AddCompanyPage from "./pages/companies/add";
import AddWithdrawPage from "./pages/withdraws/add";
import AddDepositPage from "./pages/deposits/add";
import DepositDetailsPage from "./pages/deposits/details";
import WithDrawDetialsPage from "./pages/withdraws/details";
import PersonTypePage from "./pages/withdraw_types/records";
import AddPersonTypePage from "./pages/withdraw_types/add";
import WithDrawReportPage from "./pages/withdraws/report";
import DepositsReportPage from "./pages/deposits/report";

function App() {
  return (
    <div className="App">
      <div className="container-fluid bg-white" style={{ height: "100vh" }}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                localStorage.getItem("token") === undefined ||
                localStorage.getItem("token") === "" ||
                localStorage.getItem("token") === null ? (
                  <LoginPage />
                ) : (
                  <ContainersPage />
                )
              }
            />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/containers" element={<ContainersPage />} />
            <Route
              path="/container_details"
              element={<ContainerDetailsPage />}
            />
            <Route path="/add_container" element={<AddContainerPage />} />
            <Route path="/companies" element={<CompaniesPage />} />
            <Route path="/company_details" element={<CompanyDetailsPage />} />
            <Route path="/add_company" element={<AddCompanyPage />} />

            <Route path="/withdraws" element={<WithdrawsPage />} />
            <Route path="/withdraw_details" element={<WithDrawDetialsPage />} />
            <Route path="/withdraw_types" element={<PersonTypePage />} />
            <Route path="/add_withdraw_type" element={<AddPersonTypePage />} />
            <Route path="/add_withdraw" element={<AddWithdrawPage />} />
            <Route path="/withdraw_report" element={<WithDrawReportPage />} />
            <Route path="/deposits_report" element={<DepositsReportPage />} />
            {/*  */}
            <Route path="/deposits" element={<DepositsPage />} />
            <Route path="/deposit_details" element={<DepositDetailsPage />} />
            <Route path="/add_deposit" element={<AddDepositPage />} />

            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
