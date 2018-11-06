'strict mode'

import bcrypt from 'bcryptjs'
import Promise from 'bluebird'

import { c_user } from '../models'

class AuthService {

    async register( data ) {
        return new Promise(( resolve, reject) => {
            data['password']= bcrypt.hashSync( data.password , 8 )
            c_user.create( data ).then( user => {
                console.log('success')
                return resolve(user)
            })
            .catch( e => {
                console.log('gagal')
                reject( e )
                throw new Error('tai')
            })
        })
    }

    async login(data) {
        const { email, password } = data
        return await c_user.findOne({
            where: { email },
            attributes: ['id', 'username', 'password', 'fullname', 'email', 'phone', 'status', 'usertype', 'statverif', 'statapproval', 'verifcode']
        }).then(user => {
            return bcrypt.compareSync(password, user.password) ? 
                {
                    username: user.username,
                    fullname: user.fullname,
                    email: user.email,
                    phone: user.phone,
                    status: user.status,
                    usertype : user.usertype,
                    statverif : user.statverif,
                    statapproval : user.statapproval,
                    verifcode : user.verifcode
                } : false
        })
    }

}

export default new AuthService()