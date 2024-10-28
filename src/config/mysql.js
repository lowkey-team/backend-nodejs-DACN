import { env } from './environment';
import mysql from 'mysql2/promise';

const MYSQL_HOST = env.MYSQL_HOST;
const MYSQL_USER = env.MYSQL_USER;
const MYSQL_PASSWORD = env.MYSQL_PASSWORD;
const MYSQL_DATABASE = env.MYSQL_DATABASE;

let mysqlPool = null;

export const CONNECT_DB = async () => {
  try {
    console.log("Kết nối tới MySQL với thông tin:");
    console.log(`Host: ${MYSQL_HOST}`);
    console.log(`User: ${MYSQL_USER}`);
    console.log(`Database: ${MYSQL_DATABASE}`);

    mysqlPool = mysql.createPool({
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASE,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    console.log("Kết nối tới MySQL thành công");
    return mysqlPool;
  } catch (err) {
    console.error("Không thể kết nối tới MySQL:", err);
  }
};

export const GET_DB = () => {
  if (!mysqlPool) throw new Error("Phải kết nối tới cơ sở dữ liệu trước!");
  return mysqlPool;
};

export const CLOSE_DB = async () => {
  if (mysqlPool) {
    await mysqlPool.end();
    console.log("Đã đóng kết nối MySQL");
  }
};
