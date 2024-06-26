'use strict';
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const hashedPass = await bcrypt.hash(password, 10);
    const tasks = {
      pending: [],
      inProgress: [],
      complete: [],
      doLater: [],
    };
    const user = await User.create({ username, password: hashedPass, tasks });
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send('Invalid login');
    }
    const isPassMatch = await bcrypt.compare(password, user.password);
    if (!isPassMatch) {
      return res.status(400).send('Invalid pass');
    }

    const secretKey = 'secretsecret';
    const payload = { userId: user._id };
    const options = { expiresIn: '12h' };
    const token = jsonwebtoken.sign(payload, secretKey, options);

    //const token = jsonwebtoken.sign({ userId: user._id }, "secretsecret");
    res.status(200).json({ token, username: user.username });
  } catch (error) {
    next(error);
  }
};

exports.verifyToken = (req, res) => {
  const secretKey = 'secretsecret';

  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }
  jsonwebtoken.verify(token, secretKey, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).send({ message: 'Token has expired!' });
      }
      return res.status(401).send({ message: 'Unauthorized!' });
    }
    res.status(200).send({ message: 'Token is valid', decoded });
  });
};
