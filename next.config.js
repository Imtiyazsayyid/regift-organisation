/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // BASE_URL: "http://localhost:8003/api/admin",
    // BASE_URL: "https://regift-backend.vercel.app/api/admin",
    BASE_URL:
      process.env.NODE_ENV === "production"
        ? "https://regift-backend.vercel.app/api/organisation"
        : "http://localhost:8003/api/organisation",
  },
};

module.exports = nextConfig;
