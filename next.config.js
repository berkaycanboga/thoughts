module.exports = {
  env: {
    LOCAL_HOST_BASE_API_URL:
      process.env.LOCAL_HOST_BASE_API_URL || "http://localhost:3000/api",
    VERCEL_BASE_API_URL: process.env.VERCEL_BASE_API_URL || "api",
  },
};
