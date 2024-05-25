import 'express-async-errors'
import * as postRepository from '../data/post.js'

export async function getPosts(req, res) {
  const category = req.query.category

  const data = await (category
    ? postRepository.getAllByCategory(category)
    : postRepository.getAll())

  res.status(200).json(data)
}

export async function getPost(req, res) {
  const id = req.params.id
  const post = await postRepository.getById(id)

  if (post) {
    res.status(200).json(post)
  } else {
    res.status(404).json({ message: `post id(${id}) not found` })
  }
}

export async function createPost(req, res) {
  const { category, title, text, file, hashtag, comment } = req.body

  const post = await postRepository.create(
    category,
    title,
    text,
    file,
    hashtag,
    comment,
    req.userId
  )

  res.status(201).json(post)
}

export async function updatePost(req, res) {
  const id = req.params.id

  const { title, text, hashtag, file, comment } = req.body

  const post = await postRepository.update(
    id,
    title,
    text,
    hashtag,
    file,
    comment
  )

  if (post) {
    res.status(200).json(post)
  } else {
    res.status(404).json({ message: `post id(${id}) not found` })
  }
}

export async function deletePost(req, res) {
  const id = req.params.id

  await postRepository.remove(id)

  res.sendStatus(204)
}
