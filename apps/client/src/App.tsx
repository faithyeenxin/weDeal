import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddDealPage from "./pages/AddDealPage";
import LoginRedirect from "./components/LoginRedirect";
import RegisterRedirect from "./components/RegisterRedirect";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Testing from "./pages/Testing";
import UserProfile from "./pages/UserProfile";
import LoggedOnNavBar from "./UIUX/LoggedOnNavBar";
import NavBar from "./UIUX/NavBar";
import PrivateRoute from "./UIUX/PrivateRoute";
import DealPage from "./pages/DealPage";
import DealPageEdittable from "./pages/DealPageEdittable";
import UserPage from "./pages/UserPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* for all */}
        <Route path="/" element={<NavBar />}>
          <Route index element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route path="/testing" element={<Testing />} />
        <Route path="/login-redirect" element={<LoginRedirect />} />
        <Route path="/register-redirect" element={<RegisterRedirect />} />

        {/* private routes */}
        <Route path="/" element={<PrivateRoute outlet={<LoggedOnNavBar />} />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/add-deal" element={<AddDealPage />} />
          <Route path="/deal/:dealid" element={<DealPage />} />
          <Route path="/user/:userid" element={<UserPage />} />
          <Route path="/deal-edit/:dealid" element={<DealPageEdittable />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
