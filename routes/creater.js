const { Router } = require('express')
const config = require('config')
const User = require('../models/User')
const Event = require('../models/Event');
const Group = require('../models/Group');
const checkTokin = require('../functions/checkToken');
const router = Router();

router.get('/getData', async (req, res) => {
  try {
    const user = await checkTokin(req, res);
    const users = await User.find({});
    const groups = await Group.find({});
    res.json({ users, groups });
  } catch (e) {
    res.status(400).json({ message: 'Что-то пошло не так' })
  }

})

router.post('/createGroup', async (req, res) => {
  try {
    const user = await checkTokin(req, res);
    const { name, tag, members, importedGroups } = req.body;
    const group = new Group({ name, tag, members, creator: user._id });
    await group.save();
    res.json('Группа создана')
  } catch (e) {

  }
})


router.post('/createEvent', async (req, res) => {
  try {
    const user = await checkTokin(req, res);
    const { eventName, eventDate, eventStartTime, eventDuration, eventGroups, eventHost } = req.body;
    const event = new Event({ name: eventName, date: eventDate, start: eventStartTime, duration: eventDuration, groups: eventGroups, host: eventHost, creator: user._id });
    await event.save();
    res.json('Событие создано')
  } catch (e) {

  }
})


module.exports = router;