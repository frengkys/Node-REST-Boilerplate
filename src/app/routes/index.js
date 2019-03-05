import express from 'express'
import user from './user.route'
import auth from './auth.route'

const router = express.Router(); // eslint-disable-line new-cap

router.use('/test', user)
router.use('/auth', auth)

export default router
