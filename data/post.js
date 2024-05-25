import MongoDb from 'mongodb'
import * as userRepository from '../data/auth.js'
import { getPosts } from '../database/database.js'
import { extractHashtags } from '../util/index.js'

const ObjectId = MongoDb.ObjectId

export async function getAll() {
  return getPosts().find().sort({ createdAt: -1 }).toArray().then(mapPosts)
}

export async function getAllByCategory(category) {
  return getPosts()
    .find({ category })
    .sort({ createdAt: -1 })
    .toArray()
    .then(mapPosts)
}

export async function getById(id) {
  return getPosts()
    .findOne({ _id: new ObjectId(id) })
    .then(mapOptionalPost)
}

export async function create(
  category,
  title,
  text,
  file,
  hashtag,
  comment,
  userId
) {
  let hashtagArray = extractHashtags(hashtag)

  const { nickname, email } = await userRepository.findById(userId)

  const post = {
    category,
    title,
    text,
    file,
    hashtag: hashtagArray,
    viewCount: 0,
    createdAt: new Date(),
    comment,
    userId,
    nickname: nickname,
    email: email,
  }

  return getPosts()
    .insertOne(post)
    .then((data) => mapOptionalPost({ ...post, _id: data.insertedId }))
}

export async function update(id, title, text, hashtag, file) {
  return getPosts()
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { title, text, hashtag, file } },
      { returnDocument: 'after' }
    )
    .then((result) => result.value)
    .then(mapOptionalPost)
}

export async function remove(id) {
  return getPosts().deleteOne({ _id: new ObjectId(id) })
}

function mapOptionalPost(post) {
  return post ? { ...post, id: post._id.toString() } : post
}

function mapPosts(posts) {
  return posts.map(mapOptionalPost)
}
