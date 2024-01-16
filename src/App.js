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

function App() {
  return (
    <div className="App">
      <div className="container-fluid bg-white" style={{ height: "100vh" }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />

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
            <Route path="/add_withdraw" element={<AddWithdrawPage />} />
            {/*  */}
            <Route path="/deposits" element={<DepositsPage />} />
            <Route path="/add_deposit" element={<AddDepositPage />} />

            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
