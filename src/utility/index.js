import jwt from 'jsonwebtoken'
import config from '../config/config' // eslint-no-console
import passport from 'passport'
// const cek = process.env.NODE_ENV || 'development' // eslint-disable-line no-unde
let key = config.production.secret || config.development.secret

export const auth = passport.authenticate('jwt', { session: false })

export function getToken(data) {
    const token= jwt.sign(data, key, { expiresIn: '1h' })
    return token
}

export async function userAccess(data, compId) {
    let token = data.split(' ')[1]
    // console.log('token ',token)
    let decoded = jwt.verify(token, key)
    console.log('decoded ',decoded)
    return decoded.company_id == compId
}