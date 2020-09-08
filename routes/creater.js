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
    const { name, tag, importedGroups } = req.body;
    let {members} = req.body;
    
    for(let i=0; i<importedGroups.length;i+=1){
      const importedGroup = await Group.findOne({tag:importedGroups[i]})
      console.log(importedGroup)
      if(importedGroup){
        members = members.concat(importedGroup.members)
      }
    }

    const candidate = await Group.findOne({ tag })
    if (candidate) {
      res.status(400).json({ message: 'Такая группа уже существует' })
    }
    const group = new Group({ name, tag, members, creator: user._id });
    await group.save();

    for(let i=0;i<members.length;i+=1){
      const user = await User.findOne({ _id: members[i] })
      user.groups.push(tag); //tag Новой группы должен быть уникальным!!!!!!!!!
      await user.save();
    }

    res.json('Группа создана')
  } catch (e) {

  }
})


router.post('/createEvent', async (req, res) => {
  try {
    const user = await checkTokin(req, res);
    const { eventName, eventDate, eventStartTime, eventDuration, eventGroups, eventHost } = req.body;
    const event = new Event({ name: eventName, date: eventDate, start: eventStartTime, duration: eventDuration, groups: eventGroups, host: eventHost, creater: user._id });
    await event.save();
    res.json('Событие создано')
  } catch (e) {

  }
})


module.exports = router;