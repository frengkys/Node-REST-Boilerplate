import passportJWT from 'passport-jwt'
import { c_user } from '../app/models'

const { ExtractJwt } = passportJWT
const JwtStrategy = passportJWT.Strategy

const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = process.env.SECRET

module.exports = new JwtStrategy(jwtOptions, (async (jwtPayload, next) => {
  // console.log( 'jwt', jwtPayload )
  // const temp = await c_user.findOne({ where: { id: jwtPayload.id } })
  // return (!temp) ? done(temp) : done(null, temp)
  // find id, id_company, username, codeusertype from c_user
  const {
    companyId, companyUserId, companyUserUsername, codeusertype,
  } = jwtPayload;
  c_user.findOne({
    attributes: ['id', 'id_company', 'username', 'codeusertype'],
    where: {
      id: companyUserId,
      id_company: companyId,
      username: companyUserUsername,
      codeusertype,
    },
  }).then((user) => {
    // if user found return companyId, companyUserId, companyUserUsernamme,codeusertype
    if (user) {
      return next(null, {
        companyId,
        companyUserId,
        companyUserUsername,
        codeusertype,
      })
    }
    // if user not found return message user not found
    return next(new Error('user not found'), false);
  }).catch(err => next(err, false));
}))
