import asyncHandler from "express-async-handler";
import User from "../models/User.js";

const birthdays = asyncHandler(async (req, res) => {
  try {
    const idsString = req.query.emails;
    const idArray = idsString.split(",").filter((id) => id);

    let groupedBirthdays = await User.aggregate([
      { $match: { email: { $in: idArray } } },
      {
        $group: {
          _id: {
            $month: "$dob",
          },
          dayOfMonth: {
            $push: { $dayOfMonth: "$dob" },
          },
          email: {
            $push: "$email",
          },
        },
      },
    ]);

    groupedBirthdays = groupedBirthdays.filter(
      (birthday) => birthday._id !== null
    );
    for (let index = 1; index <= 12; index++) {
      const dummyObj = {
        _id: index,
        dayOfMonth: [],
        email: [],
      };
      groupedBirthdays.push(dummyObj);
    }
    groupedBirthdays.sort((a, b) => a._id - b._id);

    let pairs = [];

    groupedBirthdays.forEach((item, index) => {
      for (let i = 0; i < item.dayOfMonth.length; i++) {
        pairs.push({
          dayOfMonth: item.dayOfMonth[i],
          email: item.email[i],
        });
      }
      pairs.sort((a, b) => a.dayOfMonth - b.dayOfMonth);
      for (let i = 0; i < pairs.length; i++) {
        const element = pairs[i];
        groupedBirthdays[index].dayOfMonth[i] = element.dayOfMonth;
        groupedBirthdays[index].email[i] = element.email;
      }
      pairs = [];
    });

    for (let index = 1; index < groupedBirthdays.length; index++) {
      if (groupedBirthdays[index]._id === groupedBirthdays[index - 1]._id) {
        groupedBirthdays.splice(index, 1);
      }
    }

    groupedBirthdays = groupedBirthdays.map((obj) => ({
      ...obj,
      name: [],
      profilePic: [],
    }));

    for (let index = 0; index < groupedBirthdays.length; index++) {
      for (let i = 0; i < groupedBirthdays[index].email.length; i++) {
        const emailToSend = groupedBirthdays[index].email[i];
        const user = await User.findOne(
          { email: emailToSend },
          "name profilePic"
        );
        if (user) {
          groupedBirthdays[index].name[i] = user.name;
          groupedBirthdays[index].profilePic[i] = user.profilePic;
        } else {
          console.log("not found " + emailToSend);
        }
      }
    }
    res.json(groupedBirthdays);
  } catch (error) {
    res.status(500).json({ message: "Error fetching grouped birthdays" });
  }
});

export default birthdays;
