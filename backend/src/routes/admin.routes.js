import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";

import {
    getDashboardStats,
    getAllUsers,
    updateUserRole,
    deleteUser,
    getAnalytics
} from "../controllers/admin.controller.js";

const router = Router();

router.route("/dashboard")
.get(
    verifyJWT,
    verifyAdmin,
    getDashboardStats
);

router.route("/users")
.get(
    verifyJWT,
    verifyAdmin,
    getAllUsers
);

router.route("/users/:userId/role")
.patch(
    verifyJWT,
    verifyAdmin,
    updateUserRole
);

router.route("/users/:userId")
.delete(
    verifyJWT,
    verifyAdmin,
    deleteUser
);

router.route("/analytics")
.get(
    verifyJWT,
    verifyAdmin,
    getAnalytics
);

export default router;