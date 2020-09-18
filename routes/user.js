const { Router } = require("express");
const config = require("config");
const Group = require("../models/Group");
const Event = require("../models/Event");
const checkTokin = require("../functions/checkToken");

const router = Router();

router.get("/getData", async (req, res) => {
  try {
    const user = await checkTokin(req);
    const userData = {
      userInfo: { fname: user.fname, sname: user.sname, rights: user.rights },
      userGroups: {
        created: [],
        joined: [],
      },
      userEvents: [],
    };

    const groups = userData.userGroups;
    groups.created = await Group.find({ creator: user._id });
    for (let i = 0; i < user.groups.length; i += 1) {
      const joinedGroups = await Group.findOne({ tag: user.groups[i] });
      groups.joined = groups.joined.concat(joinedGroups);
    }

    let events = [];
    for (let i = 0; i < user.groups.length; i += 1) {
      const userEvents = await Event.find({ groups: user.groups[i] });
      console.log(userEvents);
      events = events.concat([userEvents][0]);
    }
    events.sort((a, b) => Date.UTC(a.date) - Date.UTC(b.date));
    userData.userEvents = events;

    res.json(userData);
  } catch (e) {
    res
      .status(400)
      .json({ message: "Не получилось получить данные пользователя" });
  }
});

module.exports = router;
