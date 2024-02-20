import express from "express";
import { addComment, deleteComment, getAllComment, getComment, addReply } from "../Controllers/commentController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router()
router.post('/add/:blogId',authenticate, restrict(["user", "admin"]), addComment)
router.post('/reply/:id',authenticate, restrict(["user", "admin"]), addReply)
router.get('/:blogId', getComment)
router.delete('/:id',authenticate, restrict(["admin"]), deleteComment)
router.get('/',authenticate, restrict(["admin"]), getAllComment)
export default router