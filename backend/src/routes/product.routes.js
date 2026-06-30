import { Router } from "express";
import { addProduct } from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getAllProducts, deleteProduct, getProductById, getProductsByCategory, getFeaturedProducts, updateProduct } from "../controllers/product.controller.js";

const router = Router();
router.get("/test", (req, res) => {
    res.send("Test Route Working");
});
router.route("/").post(
    verifyJWT,
    upload.array("images", 5),
    addProduct
);

router.route("/").get(getAllProducts);
router.route("/:productId").get(getProductById);
router.route("/category/:category").get(getProductsByCategory)
router.route("/featured/all").get(getFeaturedProducts)
router.route("/:productId")
.patch(
    verifyJWT,
    updateProduct
);
router.route("/:productId").delete(
    verifyJWT,
    deleteProduct
);

export default router;