import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "../../pages/home";
import { PAGES } from "../../utils/pages";
import { Login } from "../../pages/login";
import { Signup } from "../../pages/signup";
import { Dashboard } from "../../pages/dashboard";
import { Admin } from "../../pages/admin";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PAGES.HOME} element={<Home />} />
        <Route path={PAGES.LOGIN} element={<Login />} />
        <Route path={PAGES.SIGNUP} element={<Signup />} />
        <Route path={PAGES.DASHBOARD} element={<Dashboard />} />
        <Route path={PAGES.ADMIN} element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
};
