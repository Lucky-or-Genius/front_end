import React from "react";
import { Helmet } from "react-helmet-async";

const MetaData = ({
  title = "Lucky or Genius - Do you trust your favourite influencer?",
  description = "AI-based accountability for predictions made by influencers and public figures. Prediction extraction and validation across any digital medium.",
  canonical = "https://www.luckyorgenius.com/",
  image = "https://i.ibb.co/vsV4X0S/log.jpg", // Default fallback image
  type = "website",
  keywords = "predictions, influencers, accountability, AI",
}) => {
  // Ensure canonical URL has domain if it's a relative path
  const fullCanonical = canonical.startsWith('http') 
    ? canonical 
    : `https://www.luckyorgenius.com${canonical.startsWith('/') ? canonical : `/${canonical}`}`;

  // For debugging OG image URLs
  console.log("[MetaData] Using image URL:", image);

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullCanonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default MetaData;