import express from "express";

import { create, get, getAll, remove, update } from "../controllers/product";
import { checkPermission } from "../middleWare/checkPermision";

const router = express.Router();
router.get("/products", getAll);
router.get("/products/:id", );
router.post("/products", create);
router.put("/products/:id",update);
router.delete("/products/:id",remove);

export default router;