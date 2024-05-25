import bcrypt from 'bcrypt'
import {} from 'express-async-errors'
import jwt from 'jsonwebtoken'
import * as userRepository from '../data/auth.js'

const jwtSecretKey = 'F2dN7x8HVzBWaQuEEDnhsvHXRWqAR63z'
const jwtExpiresInDays = '2d'
const bcryptSaltRounds = 12

export async function signup(req, res) {
  const { email, password, nickname } = req.body

  const found = await userRepository.findByEmail(email)

  if (found) {
    return res.status(409).json({ message: `${email} already exists` })
  }

  const hashed = await bcrypt.hash(password, bcryptSaltRounds)

  const userId = await userRepository.createUser({
    nickname,
    password: hashed,
    email,
  })

  const token = createJwtToken(userId)
  res.status(201).json({ data: { token, nickname } })
}

export async function login(req, res) {
  const { email, password } = req.body

  const user = await userRepository.findByEmail(email)

  if (!user) {
    return res.status(401).json({ message: 'Invalid email' })
  }

  const isValidPassword = await bcrypt.compare(password, user.password)

  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid password' })
  }

  const token = createJwtToken(user.userId)

  res.status(200).json({ data: { token, email } })
}

function createJwtToken(userId) {
  return jwt.sign({ userId }, jwtSecretKey, { expiresIn: jwtExpiresInDays })
}

export async function me(req, res, next) {
  const user = await userRepository.findById(req.userId)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  res.status(200).json({ token: req.token, nickname: user.nickname })
}
