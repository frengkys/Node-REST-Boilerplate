import model from '../models/'

/**
 * Get user
 * @returns {User}
 */

function getAll(req, res) {
    model.c_user.findAll().then(users => {
        return res.json(users);
    })
}

function addUser(req, res){
    model.c_user.create({ username: 'barfooz', password: '12345' }).then(user => {
        // let's assume the default of isAdmin is false:
        console.log(user.get({
          plain: true
        })) // => { username: 'barfooz', isAdmin: false }
      })

    res.send('ok')
}

export default {getAll, addUser}