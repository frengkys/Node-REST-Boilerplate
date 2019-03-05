import Promise from 'bluebird'
import { getToken } from '../../utility'
import authService from '../service/auth.service'

// or login
async function addUser(req, res) {
  // const {
  //     username_alias,
  //     first_name,
  //     last_name,
  //     dob,
  //     email,
  //     password,
  //     status,
  //     company_name,
  //     role_id
  // } = req.fields

  await authService.register(req.body)
    .then((data) => {
      console.log('data', data.email)
      return res.json({
        message: 'New user added ',
        token: getToken({ email: data.email }),
        data,
      })
    },
    (err) => {
      res.json({ message: `Error with server ${err}` })
      console.log(err) // Error: "It broke"
    })
}

async function login(req, res) {
  await authService.login(req.body)
    .then(data => res.json({
      message: 'successfully login',
      token: getToken({ email: data.email }),
      data,
    }),
    (err) => {
      res.json({ message: `failed to login ${err}` })
      console.log('err')
    })
}

export default { addUser, login }
