import express from 'express'
const router = express.Router()
import bcrypt from 'bcrypt-nodejs'

import register from '../controllers/register'
import signin from '../controllers/signin'
import profile from '../controllers/profile'
import image from '../controllers/image'

import db from '../config/db'

// router.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})
router.post('/signin', signin.handleSignin(db, bcrypt))


router.post('/register', (req, res) => {register.handleRegister(req, res,db, bcrypt)})


router.get('/profile/:id', (req, res) => {profile.getProfile(req, res, db)})


router.put('/image', (req, res) => {image.increseEntries(req, res, db)})

router.post('/imageUrl', image.handleApiCall)

export default router