// require('dotenv').config();
const config = {
    ENDPOINT: process.env.NEXT_PUBLIC_ENDPOINT,
    NEXT_PUBLIC_PROJECT_ID : process.env.NEXT_PUBLIC_PROJECT_ID,
    NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
    DATABASE_ID: process.env.DATABASE_ID,
    NEXT_PUBLIC_ACCESS_KEY: process.env.NEXT_PUBLIC_ACCESS_KEY,
    API_KEY:process.env.API_KEY
};
module.exports = config;