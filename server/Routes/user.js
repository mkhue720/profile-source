import express from "express";
import { updateUser, deleteUser, getAllUser, getSingleUser, getUserProfile } from "../Controllers/userController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router()
router.get('/',authenticate, restrict(["admin"]), getAllUser)
router.get('/:id',authenticate, restrict(["user", "admin"]), getSingleUser)
router.put('/:id',authenticate, restrict(["user", "admin"]), updateUser)
router.delete('/:id',authenticate, restrict(["user", "admin"]), deleteUser)
router.get('/profile/me',authenticate, restrict(["user", "admin"]), getUserProfile)
export default router