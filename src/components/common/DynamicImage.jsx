// src/components/common/DynamicImage.jsx
import React, { useState } from 'react';

const DynamicImage = ({ 
  src, 
  fallbackSrc = "https://i.ibb.co/vsV4X0S/log.jpg", 
  alt = "", 
  className = "",
  width,
  height,
  ...props 
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      console.log(`Image failed to load: ${src}`);
      console.log(`Using fallback image: ${fallbackSrc}`);
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      onError={handleError}
      {...props}
    />
  );
};

export default DynamicImage;