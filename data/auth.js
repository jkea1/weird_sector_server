import MongoDb from 'mongodb'
import { getUsers } from '../database/database.js'

export async function findByEmail(email) {
  return getUsers()
    .findOne({ email })
    .then((data) => {
      return mapOptionalUser(data)
    })
}

export async function findById(userId) {
  return getUsers()
    .findOne({ _id: new MongoDb.ObjectId(userId) })
    .then((data) => {
      return mapOptionalUser(data)
    })
}

export async function createUser(user) {
  return getUsers()
    .insertOne(user)
    .then((data) => {
      return data.insertedId.toString()
    })
}

function mapOptionalUser(user) {
  return user ? { ...user, userId: user._id } : user
}
