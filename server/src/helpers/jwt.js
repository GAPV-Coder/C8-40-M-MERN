import jwt from 'jsonwebtoken';
/* const jwt = require('jsonwebtoken'); */

const generateJWT = (uid, name, role) =>
  new Promise((resolve, reject) => {
    const payload = { uid, name, role };

    jwt.sign(
      payload,
      process.env.JWT_SEC,
      {
        expiresIn: '72h',
      },
      (err, token) => {
        if (err) {
          reject(Error('No se pudo generar el token'));
        }
        resolve(token);
      }
    );
  });

const validateJWT = (token) => {
  if (!token) {
    return {
      status: false,
      message: 'Token is requeried',
    };
  }
  try {
    const { uid, name, role } = jwt.verify(token, process.env.JWT_SEC);
    return {
      status: true,
      message: 'success',
      data: {
        uid,
        name,
        role,
      },
    };
  } catch (error) {
    return {
      status: false,
      message: 'Not valid Token',
    };
  }
};

export { generateJWT, validateJWT };
