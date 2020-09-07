const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')


const checkTokin = async (req, res) => {
  if (req.headers.authorization &&
    req.headers.authorization.split(' ')[0].includes('Basic')) {
    const token = req.headers.authorization.split(' ')[1];

    try {
      const decoded = jwt.verify(token, config.get('jwtSecret'), { maxAge: '1h' })
      console.log(decoded)
      const user = await User.findOne({ '_id': decoded.userId })
      if (!user) {
        return res.status(400).json({ message: 'Пользователь не найден' })
      }
      return user;
    }
    catch (e) {
      return res.status(400).json({ message: 'Не очень рабочий токен' })
    }
  } else {
    return res.status(400).json({ message: 'Нет токена' })
  }
}

module.exports = checkTokin
