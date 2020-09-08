const { Router } = require('express')
const config = require('config')
const Group = require('../models/Group');
const checkTokin = require('../functions/checkToken');

const router = Router();

router.post('/create', async (req, res) => {
  try {
    const user = await checkTokin(req, res);
    const { name, tag, members, importedGroups } = req.body;
    const group = new Group({ name, tag, members, creator: user._id });
    await group.save();
    res.json('Группа создана')
  } catch (e) {

  }
})


module.exports = router