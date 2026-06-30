import { Router } from "express";

import {
    addReview,
    getProductReviews
} from "../controllers/review.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/:productId")
    .post(
        verifyJWT,
        addReview
    )
    .get(
        getProductReviews
    );

export default router;