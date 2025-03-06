import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";

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
        {/* Add default meta tags here that will apply to all pages but can be overridden */}
        <Helmet>
          <title>Lucky or Genius - Do you trust your favourite influencer?</title>
          <meta name="description" content="AI-based accountability for predictions made by influencers and public figures. Prediction extraction and validation across any digital medium." />
          <meta property="og:title" content="Lucky or Genius - Do you trust your favourite influencer?" />
          <meta property="og:description" content="AI-based accountability for predictions made by influencers and public figures. Prediction extraction and validation across any digital medium." />
          <meta property="og:image" content="https://i.ibb.co/vsV4X0S/log.jpg" />
          <meta property="og:url" content="https://www.luckyorgenius.com" />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Lucky or Genius - Do you trust your favourite influencer?" />
          <meta name="twitter:description" content="AI-based accountability for predictions made by influencers and public figures. Prediction extraction and validation across any digital medium." />
          <meta name="twitter:image" content="https://i.ibb.co/vsV4X0S/log.jpg" />
        </Helmet>

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