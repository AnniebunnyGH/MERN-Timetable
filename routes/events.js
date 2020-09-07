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

router.get('/getEvents', async (req, res) => {
  try {
    const user = await checkTokin(req);
    let eventsForUser = [];
    for (let i = 0; i < user.groups.length; i += 1) {
      const userEvents = await Event.find({ groups: user.groups[i] });
      eventsForUser = eventsForUser.concat([userEvents]);
    }

    eventsForUser.sort((a, b) => Date.UTC(a.date) - Date.UTC(b.date))

    res.json(eventsForUser);

  } catch (e) {

  }
})

module.exports = router