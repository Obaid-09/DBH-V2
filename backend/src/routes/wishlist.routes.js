import { Router } from "express";
import {
    addToWishlist,
    getWishlist,
    removeFromWishlist
} from "../controllers/wishlist.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/")
.get(
    verifyJWT,
    getWishlist
);

router.route("/add")
.post(
    verifyJWT,
    addToWishlist
);

router.route("/:productId")
.delete(
    verifyJWT,
    removeFromWishlist
);

export default router;