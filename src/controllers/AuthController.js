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

    const [permissionsResults] = await db.query(
      `SELECT p.name FROM permissions p 
   JOIN role_permissions rp ON rp.permission_id = p.id
   JOIN employee_roles er ON er.role_id = rp.role_id
   WHERE er.employee_id = ? AND p.isDelete = 0`,
      [user.id]
    );

    const permissions = permissionsResults.map((row) => row.name);

    const [rolesResults] = await db.query(
      `SELECT GetRolesByEmployee(?) AS roles`,
      [user.id]
    );

    let roles = rolesResults[0].roles;

    res.send({
      token,
      id: user.id,
      fullName: user.FullName,
      permissions,
      roles,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Database error" });
  }
};

export { login };
