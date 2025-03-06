// src/utils/imageValidator.js

/**
 * Validates if an image URL exists and is accessible
 * @param {string} url - The URL to check
 * @param {number} timeout - Time in milliseconds to wait before timing out
 * @returns {Promise<boolean>} - Promise resolving to true if the image is valid
 */
export const validateImageUrl = (url, timeout = 5000) => {
    return new Promise((resolve) => {
      if (!url) {
        console.log("No URL provided to validateImageUrl");
        resolve(false);
        return;
      }
      
      const img = new Image();
      
      // Set up timeout
      const timer = setTimeout(() => {
        console.log(`Image load timed out for: ${url}`);
        img.src = "";  // Cancel image request
        resolve(false);
      }, timeout);
      
      img.onload = () => {
        console.log(`Image loaded successfully: ${url}`);
        clearTimeout(timer);
        resolve(true);
      };
      
      img.onerror = () => {
        console.log(`Image failed to load: ${url}`);
        clearTimeout(timer);
        resolve(false);
      };
      
      img.src = url;
    });
  };
  
  /**
   * Gets a valid image URL with fallback
   * @param {string} primaryUrl - The primary URL to try
   * @param {string} fallbackUrl - The fallback URL to use if primary fails
   * @returns {Promise<string>} - Promise resolving to the valid URL
   */
  export const getValidImageUrl = async (primaryUrl, fallbackUrl) => {
    console.log(`Checking image URL: ${primaryUrl}`);
    const isValid = await validateImageUrl(primaryUrl);
    
    if (isValid) {
      console.log(`Using primary image URL: ${primaryUrl}`);
      return primaryUrl;
    } else {
      console.log(`Using fallback image URL: ${fallbackUrl}`);
      return fallbackUrl;
    }
  };