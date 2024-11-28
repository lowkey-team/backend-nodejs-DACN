import jwt from "jsonwebtoken";
import { GET_DB } from "~/config/mysql";

const login = async (req, res) => {
  const { phone, password } = req.body;

  try {
    const db = await GET_DB();

    const [results] = await db.query(
      "SELECT * FROM employees WHERE Phone = ? AND Passwords = ?",
      [phone, password]
    );

    if (results.length === 0) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    const user = results[0];

    const token = jwt.sign(
      { id: user.id, fullName: user.fullName },
      "your_secret_key",
      { expiresIn: "1h" }
    );

    res.send({
      token,
      id: user.id,
      fullName: user.FullName,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Database error" });
  }
};

export { login };
