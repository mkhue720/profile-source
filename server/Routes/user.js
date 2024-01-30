import express from "express";
import { updateUser, deleteUser, getAllUser, getSingleUser } from "../Controllers/userController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router()
router.get('/',authenticate, restrict(["admin"]), getAllUser)
router.get('/:id',authenticate, restrict(["admin"]), getSingleUser)
router.put('/:id',authenticate, restrict(["admin"]), updateUser)
router.delete('/:id',authenticate, restrict(["admin"]), deleteUser)
export default router