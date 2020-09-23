const { Router } = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const router = Router();

//api/auth/register
router.post(
  "/register",
  [
    check("email", "Неккоректный email").isEmail(),
    check("password", "Минимальная длина пароля 6 символов").isLength({
      min: 1,
    }),
  ],
  async (req, res) => {
    try {
      console.log("Body: " + req.body);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные",
        });
      }
      const { email, password, sname, fname, rights, groups } = req.body;

      const candidate = await User.findOne({ email });
      if (candidate) {
        res.status(400).json({ message: "Такой пользователь уже существует" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({
        email,
        password: hashedPassword,
        sname,
        fname,
        rights,
        groups,
      });

      await user.save();
      res.status(201).json({ message: "Пользователь создан" });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
      console.log("Registr error: " + e);
    }
  }
);

//api/auth/login
router.post(
  "/login",
  [
    check("email", "Неккоректный email").normalizeEmail().isEmail(),
    check("password", "Введите пароль").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные при входе",
        });
      }
      const { email, password } = req.body;

      const candidate = await User.findOne({ email });
      if (!candidate) {
        return res.status(400).json({ message: "Пользователь не найден" });
      }

      const isMatch = await bcrypt.compare(password, candidate.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Неверный пароль, попробуйте снова" });
      }

      const token = jwt.sign(
        {
          userId: candidate.id,
        },
        config.get("jwtSecret"),
        { expiresIn: "1h" }
      );

      res.json({
        message: "Токен получен",
        data: {
          token,
          userId: candidate.id,
        },
      });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
      console.log("Registr error: " + e);
    }
  }
);

module.exports = router;
