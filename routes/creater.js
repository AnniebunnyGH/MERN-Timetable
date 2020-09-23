const { Router } = require("express");
const config = require("config");
const User = require("../models/User");
const Event = require("../models/Event");
const Group = require("../models/Group");
const checkTokin = require("../functions/checkToken");
const router = Router();

router.get("/getData", async (req, res) => {
  try {
    const user = await checkTokin(req, res);
    const users = await User.find({});
    const groups = await Group.find({});
    res.json({ message: "Данные создателя получены", data: { users, groups } });
  } catch (e) {
    res.status(400).json({ message: "Что-то пошло не так" });
  }
});

router.post("/createGroup", async (req, res) => {
  try {
    const creater = await checkTokin(req, res);
    const { name, tag, importedGroups } = req.body;
    let { members } = req.body;

    for (let i = 0; i < importedGroups.length; i += 1) {
      const importedGroup = await Group.findOne({ tag: importedGroups[i] });
      if (importedGroup) {
        members = members.concat(importedGroup.members);
      }
    }

    const candidate = await Group.findOne({ tag });
    if (candidate) {
      return res.status(400).json({ message: "Такая группа уже существует" });
    }
    const group = new Group({ name, tag, members, creater: creater._id });
    await group.save();

    let isCreaterJoined = false;
    for (let i = 0; i < members.length; i += 1) {
      const user = await User.findOne({ _id: members[i] });
      if (!user.groups.includes(tag)) {
        user.groups.push(tag); //tag Новой группы должен быть уникальным!!!!!!!!!
      }
      await user.save();
      if (`${creater._id}` === `${user._id}`) {
        isCreaterJoined = true;
      }
    }

    return res.json({
      message: "Группа создана",
      data: { group, isCreaterJoined },
    });
  } catch (e) {}
});

router.post("/createEvent", async (req, res) => {
  try {
    const user = await checkTokin(req, res);
    const {
      eventName,
      eventDate,
      eventStartTime,
      eventDuration,
      eventGroups,
      eventHost,
    } = req.body;
    const event = new Event({
      name: eventName,
      date: eventDate,
      start: eventStartTime,
      duration: eventDuration,
      groups: eventGroups,
      host: eventHost,
      creater: user._id,
    });
    await event.save();
    res.json({ message: "Событие создано", data: event });
  } catch (e) {}
});

module.exports = router;
