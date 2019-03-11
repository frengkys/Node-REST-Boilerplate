import express from 'express'
import user from './modules/user.route'
import auth from './modules/auth.route'

const router = express.Router(); // eslint-disable-line new-cap

router.use('/test', user)
router.use('/auth', auth)

export default router
