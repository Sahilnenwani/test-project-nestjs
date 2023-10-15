export default () => ({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,

  EXPIRESIN: process.env.EXPIRESIN,
  SECRETKEY: process.env.SECRETKEY,

  DB_CON_STRING: process.env.DB_CON_STRING,
});
