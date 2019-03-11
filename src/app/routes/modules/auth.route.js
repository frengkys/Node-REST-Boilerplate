import express from 'express'
import auth from '../../controller/auth.ctrl'

const router = express.Router(); // eslint-disable-line new-cap

router.route('/adduser')
  .post(auth.addUser)

router.route('/login')
  .post(auth.login)

export default router
