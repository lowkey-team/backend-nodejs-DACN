// authRouter.js
import express from "express";
import { login } from "~/controllers/AuthController";
import { checkPermission } from "~/middlewares/authMiddleware";

const router = express.Router();

router.post("/login", login);

// Nếu bạn muốn kiểm tra quyền trước khi cho phép truy cập các route khác, có thể sử dụng middleware checkPermission như sau:
// router.post("/protected-route", checkPermission("some_permission"), someControllerFunction);

export const AuthRouter = router;
