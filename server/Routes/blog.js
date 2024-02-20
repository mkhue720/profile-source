import express from 'express';
import { addBlog, deleteBlog,updateBlog, getAllBlog, getSingleBlog } from '../Controllers/blogController.js';

const router = express.Router();
router.post('/add' , addBlog);
router.get('/', getAllBlog);
router.put('/:id' , updateBlog);
router.delete('/:id' , deleteBlog);
router.get('/:id', getSingleBlog);
export default router;