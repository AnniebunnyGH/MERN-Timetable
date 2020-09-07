const { Router } = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const router = Router();

//api/auth/register
router.post(
  '/register',
  [check('email', 'Неккоректный email').isEmail(),
  check('password', 'Минимальная длина пароля 6 символов').isLength({
    min: 1,
  })],
  async (req, res) => {
    try {
      console.log('Body: ' + req.body)

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные'
        })
      }
      const { email, password, sname, fname, rights, groups } = req.body

      const candidate = await User.findOne({ email })
      if (candidate) {
        res.status(400).json({ message: 'Такой пользователь уже существует' })
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword, sname, fname, rights, groups })

      await user.save();
      res.status(201).json({ message: 'Пользователь создан' })

    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
      console.log('Registr error: ' + e);
    }
  })

//api/auth/login
router.post(
  '/login',
  [check('email', 'Неккоректный email').normalizeEmail().isEmail(),
  check('password', 'Введите пароль').exists()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при входе'
        })
      }
      const { email, password } = req.body

      const candidate = await User.findOne({ email })
      if (!candidate) {
        return res.status(400).json({ message: 'Пользователь не найден' })
      }

      const isMatch = await bcrypt.compare(password, candidate.password)
      if (!isMatch) {
        return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
      }

      const token = jwt.sign(
        {
          userId: candidate.id,
        },
        config.get('jwtSecret'),
        { expiresIn: '1h' }
      )

      res.json({
        token,
        userId: candidate.id,
      })

    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
      console.log('Registr error: ' + e);
    }
  })

//api/auth/tokin
router.get(
  '/tokin',
  async (req, res) => {
    try {
      if (req.headers.authorization &&
        req.headers.authorization.split(' ')[0].includes('Basic')) {
        const token = req.headers.authorization.split(' ')[1];

        try {
          const decoded = jwt.verify(token, config.get('jwtSecret'), { maxAge: '1h' })
          console.log('userId: ' + decoded.userId)

          const user = await User.findOne({ '_id': decoded.userId })
          if (!user) {
            return res.status(400).json({ message: 'Пользователь не найден' })
          }

          res.json({ 'fname': user.fname, 'sname': user.sname, 'rights': user.rights });
          console.log(user)
        }
        catch (e) {
          return res.status(400).json({ message: 'Не очень рабочий токен' })
        }
      } else {
        return res.status(400).json({ message: 'Нет токена' })
      }
    } catch (e) {
      console.log('Registr error: ' + e);
      return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })

    }
  }


)


module.exports = router