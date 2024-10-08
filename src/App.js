import React from "react";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Login from "./Pages/Login";
import DashboardLayout from "./Pages/DashboardLayout";
import LandingPage from "./Pages/New-LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import FAQ from "./Pages/Faq";
import routes from "./routes/routes";
import ProtectedRoutes from "./routes/protectedRoutes";
import { AppContextProvider } from "./utils/appContext";

function App() {
  return (
    <div>
      <Router>
        <AppContextProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedRoutes />}>
              <Route element={<DashboardLayout />} path="/dashboard">
                {routes.map((route, index) => (
                  <Route
                    key={`route-item-${index}`}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Route>
            </Route>
          </Routes>
          <Toaster />
        </AppContextProvider>
      </Router>
    </div>
  );
}

export default App;
