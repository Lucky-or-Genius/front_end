export const formatNumber = (num) => {
  if (num == null) {
    return "0";
  }

  const absNum = Math.abs(num);
  if (absNum >= 1000000000) {
    return Math.round(num / 1000000000) + "B";
  } else if (absNum >= 1000000) {
    return Math.round(num / 1000000) + "M";
  } else if (absNum >= 1000) {
    return Math.round(num / 1000) + "K";
  } else {
    return Math.round(num).toString();
  }
};

// utils/validators.js

export const isValidYouTubeUrl = (url) => {
  // Regular expression pattern for YouTube URLs
  const youtubeUrlPattern =
    /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;

  // Test if the URL matches the pattern
  if (!youtubeUrlPattern.test(url)) {
    return false;
  }

  try {
    const urlObj = new URL(url);

    // Check for valid YouTube domains
    if (
      !["youtube.com", "www.youtube.com", "youtu.be"].includes(urlObj.hostname)
    ) {
      return false;
    }

    // For youtu.be links, ensure there's a video ID
    if (urlObj.hostname === "youtu.be" && urlObj.pathname.length <= 1) {
      return false;
    }

    // For youtube.com links, check for 'v' parameter or 'shorts' in the path
    if (urlObj.hostname.includes("youtube.com")) {
      const hasVideoParam = urlObj.searchParams.has("v");
      const isShorts = urlObj.pathname.startsWith("/shorts/");

      if (!hasVideoParam && !isShorts) {
        return false;
      }
    }

    return true;
  } catch (error) {
    // If URL parsing fails, it's not a valid URL
    return false;
  }
};
