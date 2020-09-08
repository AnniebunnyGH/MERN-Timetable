const { Router } = require('express')
const config = require('config')
const Event = require('../models/Event');
const checkTokin = require('../functions/checkToken');

const router = Router();

router.post('/create', async (req, res) => {
  try {
    const user = await checkTokin(req, res);
    console.log(user)
    const { eventName, eventDate, eventStartTime, eventDuration, eventGroups, eventHost } = req.body;
    const event = new Event({ name: eventName, date: eventDate, start: eventStartTime, duration: eventDuration, groups: eventGroups, host: eventHost, creator: user._id });
    await event.save();
    res.json('Событие создано')
  } catch (e) {

  }
})


module.exports = router