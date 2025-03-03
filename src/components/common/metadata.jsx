import React from "react";
import { Helmet } from "react-helmet-async";

const MetaData = ({
  title = "Lucky or Genius - Do you trust your favourite influencer?",
  description = "AI-based accountability for predictions made by influencers and public figures. Prediction extraction and validation across any digital medium.",
  canonical = "https://www.luckyorgenius.com/",
  image = "https://i.ibb.co/vsV4X0S/log.jpg",
  type = "website",
  keywords = "predictions, influencers, accountability, AI",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default MetaData;
