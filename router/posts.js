import express from 'express'
import * as postController from '../controller/post.js'
import { isAuth } from '../middleware/auth.js'

const router = express.Router()

// default = /posts
// GET /posts
// GET /posts?category=:category
router.get('/', postController.getPosts)

// GET /posts/:id
router.get('/:id', postController.getPost)

// POST /posts
router.post('/', isAuth, postController.createPost)

// PUT /posts/:id
router.put('/:id', isAuth, postController.updatePost)

// DELETE /posts/:id
router.delete('/:id', isAuth, postController.deletePost)

export default router
