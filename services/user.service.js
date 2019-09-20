const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../_helpers/db').User;

// import { SESSION_SECRET } from '../util/secrets';

module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: _delete
};

async function authenticate({ userName, password }) {
  const user = await User.findOne({ userName });
  if (user && bcrypt.compareSync(password, user.hash)) {
    // eslint-disable-next-line no-unused-vars
    const { hash, ...userWithoutHash } = user.toObject();
    const token = jwt.sign({ sub: user._id }, config.secret, { expiresIn: '24h' });
    return {
      ...userWithoutHash,
      token
    };
  }
}

async function getAll(query) {
  /*
   *
   * .populate({ path: "roles.organization", select: "organization" })
   */
  const reqQuery = query || {};
  return await User.apiQuery(reqQuery).select('-hash');
  //.select('userName email firstName lastName workPhone mobile loginAt active');
}

async function getById(id) {
  // .select('userName email firstName lastName workPhone mobile loginAt active')
  return await User.findById(id).select('-hash');
}

/*
 * exports.getByNameOrEmail = (req: Request, res: Response) => {
 *   userModel.find({
 *     $or: [{ userName: req.query.name }, { email: req.query.email }]
 *   })
 *     .then(user => {
 *       if (!user) return res.sendStatus(404);
 *       res.json(user);
 *     })
 *     .catch(err => {
 *       res.status(422).send(err.errors);
 *     });
 * };
 */

async function create(userParam) {
  // validate
  if (await User.findOne({ userName: userParam.userName })) {
    throw 'Username "' + userParam.userName + '" is already taken';
  }

  const user = new User(userParam);

  // hash password
  if (userParam.password) {
    user.hash = bcrypt.hashSync(userParam.password, 10);
  }

  // save user
  await user.save();
}

async function update(id, userParam) {
  const user = await User.findById(id);

  // validate
  if (!user) throw 'User not found';
  if (user.userName !== userParam.userName && (await User.findOne({ userName: userParam.userName }))) {
    throw 'Username "' + userParam.userName + '" is already taken';
  }

  // hash password if it was entered
  if (userParam.password) {
    // eslint-disable-next-line require-atomic-updates
    userParam.hash = bcrypt.hashSync(userParam.password, 10);
  }

  // copy userParam properties to user
  Object.assign(user, userParam);

  await user.save();
}

async function _delete(id) {
  await User.findByIdAndRemove(id);
}

/*
 * const login = async (req: Request, res: Response) => {
 *   const username = req.body.username;
 *   const password = req.body.password;
 *   if (username && password) {
 *     const user: any = await userModel.findOne({ userName: username });
 *     if (user && username === user.userName) {
 *       const valid = await user.verifyPassword(password);
 *       if (valid) {
 *         const token = jwt.sign({ username }, SESSION_SECRET, {
 *           expiresIn: '24h' // expires in 24 hours
 *         });
 *         // return the JWT token for the future API calls
 *         res.json({
 *           success: true,
 *           message: 'Authentication successful!',
 *           token
 *         });
 *       } else {
 *         res.status(403).json({
 *           success: false,
 *           message: 'Incorrect username or password'
 *         });
 *       }
 *     } else {
 *       res.status(403).json({
 *         success: false,
 *         message: 'Incorrect username or password'
 *       });
 *     }
 *   } else {
 *     res.status(400).json({
 *       success: false,
 *       message: 'Authentication failed! Please check the request'
 *     });
 *   }
 * };
 */

/*
 * export default { list, get, create, update, delete: deleteUser, login, register: create };
 * export { login, create }
 */
