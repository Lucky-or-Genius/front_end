import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLocation } from "react-router-dom";

// Default metadata values
const defaultMeta = {
  title: "Lucky or Genius - Do you trust your favourite influencer?",
  description:
    "AI-based accountability for predictions made by influencers and public figures. Prediction extraction and validation across any digital medium.",
  image: "https://i.ibb.co/vsV4X0S/log.jpg",
  type: "website",
  keywords: "predictions, influencers, accountability, AI",
};

const Layout = ({ children, pageMeta }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Combine default metadata with page-specific metadata
  const meta = {
    ...defaultMeta,
    ...pageMeta,
    canonical: pageMeta?.canonical || `https://luckyorgenius.com${currentPath}`,
  };

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        <link rel="canonical" href={meta.canonical} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content={meta.type} />
        <meta property="og:url" content={meta.canonical} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={meta.image} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={meta.canonical} />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
      </Helmet>

      <main>{children}</main>
    </>
  );
};

export default Layout;
