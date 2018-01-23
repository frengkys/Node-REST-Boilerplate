/**
 * Get user
 * @returns {User}
 */

 import model from '../models/'

function getAll(req, res) {
    model.User.findAll().then(users => {
        return res.json(users);
    })
}

// async function list(req, res, next) {
//     try {
//          const data = await model.users.findAll({});
//          res.json({success: true, data});
//     } catch (err) {
//         next(err);
//     }
// }

export default {getAll}