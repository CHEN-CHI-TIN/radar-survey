const server = "ea-sqlserver-hh.database.windows.net";
const database = "ea_db_test";
const port = 5000;
const user = "eauser";
const password = "Foxconn88";

export const config = {
  server,
  port,
  database,
  user,
  password,
  options: {
    encrypt: true,
  },
};
