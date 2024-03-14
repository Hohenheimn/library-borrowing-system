import "dotenv/config";

const config = {
  PORT: process.env.PORT,
  secretKey: process.env.SECRET_KEY,
};

module.exports = config;
