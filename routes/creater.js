const { Router } = require('express')
const config = require('config')
const User = require('../models/User')
const Group = require('../models/Group');
const router = Router();

router.get('/getData', async (req, res) => {
  try {
    const users = await User.find({});
    const groups = await Group.find({});

    res.json({ users, groups });

  } catch (e) {
    res.status(400).json({ message: 'Что-то пошло не так' })
  }


})

module.exports = router;