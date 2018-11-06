'strict mode'
import Promise from 'bluebird'
import { c_user } from '../models'

class UserService {

    // create one
    async create( data ) {
        return new Promise (( resolve, reject ) => {

        })
    }

    // read one
    async getbyId( data ) {
        const { id } = data
        return new Promise (( resolve, reject ) => {
            return await c_user.findOne({
                where: { id },
                // attributes: ['id', 'username', 'password', 'fullname', 'email', 'phone', 'status', 'usertype', 'statverif', 'statapproval', 'verifcode']
            }).then( user => {
                resolve( user )
            }, function(err){
                reject(err)
            })
        })
    }

    // read all
    async getAll( ) {
        return new Promise (( resolve, reject ) => {
            return await c_user.findAll({
                // attributes: ['id', 'username', 'password', 'fullname', 'email', 'phone', 'status', 'usertype', 'statverif', 'statapproval', 'verifcode']
            }).then( users => {
                resolve( users )
            }, function(err){
                reject( err )
            })
        })
    }

    // update by user id
    async updateById( data ) {
        return new Promise (( resolve, reject ) => {

        })
    }

    // delete by user id
    async deleteById( data ) {
        return new Promise (( resolve, reject ) => {

        })
    }

}

export default new UserService()