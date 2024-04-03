/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
 
};

export default nextConfig;



//  env: {
//     GOOGLE_CLIENT_ID:
//       "721655896105-h3ib1enartcpv523qkhi5cn5h89motch.apps.googleusercontent.com",
//     GOOGLE_CLIENT_SECRET: "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",
//     NEXTAUTH_SECRET: "mQ46qpFwfE1BHuqMC+qlm19qBAD9fVPgh28werwe3ASFlAfnKjM=",
//     SUPABASE_KEY:
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5bmt3eWJlYXZ4eWZiY2t3eG1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3NzM2NjUsImV4cCI6MjAyNzM0OTY2NX0.QocDCd8dSWw1zJT8lOKJ1hcbeYY6xXTf8uI3ic8-xsI",
//     SUPABASE_URL: "https://tynkwybeavxyfbckwxml.supabase.co",
//   },