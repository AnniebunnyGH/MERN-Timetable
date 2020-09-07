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

router.get('/getGroups', async (req, res) => {
  try {
    const user = await checkTokin(req);
    const userGroups = {
      created: [],
      joined: [],
    }
    userGroups.created = await Group.find({ creator: user._id });
    for (let i = 0; i < user.groups.length; i += 1) {
      const joinedGroups = await Group.findOne({ tag: user.groups[i] })
      userGroups.joined = userGroups.joined.concat(joinedGroups)
    }

    res.json(userGroups);

  } catch (e) {

  }
})

module.exports = router