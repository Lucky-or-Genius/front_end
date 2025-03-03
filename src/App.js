import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import "./App.css";
import DashboardLayout from "./Pages/DashboardLayout";
import { Layout } from "./components/common";
import LandingPage from "./Pages/New-LandingPage";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import FAQ from "./Pages/Faq";
import routes from "./routes/routes";
import TermsConditions from "./Pages/TermsCondition";
import { AppContextProvider } from "./utils/appContext";
import Privacy from "./Pages/PrivacyPolicy";

function App() {
  return (
    <div>
      <HelmetProvider>
        <Router>
          <AppContextProvider>
            <Routes>
              <Route
                path="/"
                element={
                  <Layout>
                    <LandingPage />
                  </Layout>
                }
              />
              <Route
                path="/faq"
                element={
                  <Layout>
                    <FAQ />
                  </Layout>
                }
              />
              <Route
                path="/about"
                element={
                  <Layout>
                    <About />
                  </Layout>
                }
              />
              <Route
                path="/contact"
                element={
                  <Layout>
                    <Contact />
                  </Layout>
                }
              />
              <Route
                path="/termsConditions"
                element={
                  <Layout>
                    <TermsConditions />
                  </Layout>
                }
              />
              <Route
                path="/privacyPolicy"
                element={
                  <Layout>
                    <Privacy />
                  </Layout>
                }
              />

              {/* <Route element={<ProtectedRoutes />}> */}
              <Route element={<DashboardLayout />} path="/dashboard">
                {routes.map((route, index) => (
                  <Route
                    key={`route-item-${index}`}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Route>
              {/* </Route> */}
            </Routes>
            <Toaster />
          </AppContextProvider>
        </Router>
      </HelmetProvider>
    </div>
  );
}

export default App;
