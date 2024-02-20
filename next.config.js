module.exports = {
  env: {
    // Adjust the following values only if your environment or API structure changes
    LOCAL_HOST_BASE_API_URL:
      process.env.LOCAL_HOST_BASE_API_URL || "http://localhost:3000/api",
    // The default value assumes an "/api" prefix, modify as per your API structure
    VERCEL_BASE_API_URL: process.env.VERCEL_BASE_API_URL || "api",
    // The default value assumes an "api" prefix, modify as per your API structure
  },
};
