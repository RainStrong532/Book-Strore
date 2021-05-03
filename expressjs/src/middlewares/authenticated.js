const jwt = require('jsonwebtoken');
const { ROLES, TOKEN_SECRET } = require('../../contants')

const authenticateToken = function (req, res, next) {
  const authHeader = req.headers['authorization']

  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.status(401).json({ message: "Token not found" })

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json(err)

    req.user = user

    next()
  })
}

const isVerify = (req, res, next) => {
  if(req.user.verify == 0) return res.status(400).json({message: "The account has not been verified"});
  next();
};


const isAdmin = (req, res, next) => {
  ROLE.findRoleByUserName(req.user.user_id).then(roles => {
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].role_name === ROLES.ADMIN) {
        next();
        return;
      }
    }

    res.status(403).json({
      message: `Require ${ROLES.ADMIN} Role!`
    });
    return;
  });
};

const isUser = (req, res, next) => {
  ROLE.findRoleByUserName(req.user.user_id).then(roles => {
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].role_name === ROLES.USER) {
        next();
        return;
      }
    }

    res.status(403).json({
      message: `Require ${ROLES.USER} Role!`
    });
    return;
  });
};
const isBoss = (req, res, next) => {
  ROLE.findRoleByUserName(req.user.user_id).then(roles => {
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].role_name === ROLES.BOSS) {
        next();
        return;
      }
    }

    res.status(403).json({
      message: `Require ${ROLES.BOSS} Role!`
    });
    return;
  });
};
module.exports = {
  authenticateToken,
  isAdmin,
  isUser,
  isBoss,
  isVerify
}