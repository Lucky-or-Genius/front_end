import React, { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import logoIcon from "../../assets/logo.png";

const Footer = () => {
  const location = useLocation();
  const GeneralLinks = [
    { src: "/", name: "Home" },
    { src: "/about", name: "About" },
    { src: "/dashboard/Feed", name: "Get Started" },
  ];
  const HelpLinks = [
    { src: "/contact", name: "Contact" },
    { src: "/faq", name: "FAQs" },
  ];
  const LegalLinks = [
    { src: "/privacyPolicy", name: "Privacy Policy" },
    { src: "/termsConditions", name: "Terms & Conditions" },
  ];

  const headings = ["General", "Help", "Legal"];

  useEffect(() => {
    if (
      location.pathname === "/about" ||
      location.pathname === "/" ||
      location.pathname === "/contact" ||
      location.pathname === "/termsConditions" ||
      location.pathname === "/privacyPolicy" ||
      location.pathname === "/faq"
    ) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname]);

  return (
    <div className="bg-[#000000] w-full flex items-center flex-col justify-center pt-10 px-4 pb-12">
      <div className="max-w-5xl items-center md:items-start flex flex-col md:flex-row justify-between w-full pb-6 gap-6">
        <Link className="" to={"/"}>
          <img
            className="w-56"
            alt="logo"
            src={logoIcon}
            width={100}
            height={80}
          />
        </Link>

        <div className="px-4">
          <div className="grid grid-cols-3 gap-4">
            {headings.map((item, i) => (
              <span className="text-white font-raleway font-semibold" key={i}>
                {item}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4">
            <ul className="pt-4">
              {GeneralLinks.map((route, i) => (
                <li
                  className="hover:text-white text-gray-500 transition-all ease-in-out"
                  key={i}
                >
                  <NavLink to={route.src}>{route.name}</NavLink>
                </li>
              ))}
            </ul>
            <ul className="pt-4">
              {HelpLinks.map((route, i) => (
                <li
                  className="hover:text-white text-gray-500 transition-all ease-in-out"
                  key={i}
                >
                  <NavLink to={route.src}>{route.name}</NavLink>
                </li>
              ))}
            </ul>
            <ul className="pt-4">
              {LegalLinks.map((route, i) => (
                <li
                  className="hover:text-white text-gray-500 transition-all ease-in-out"
                  key={i}
                >
                  <NavLink to={route.src}>{route.name}</NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-5xl pt-8 border-t border-gray-500 w-full">
        <div className="text-gray-500 order-2 md:order-1 text-center">
          © 2025, Lucky Or Genius
        </div>
      </div>
    </div>
  );
};

export default Footer;
