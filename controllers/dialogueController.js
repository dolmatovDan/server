const User = require("../models/userModel");

const Dialogue = require("../models/dialogueModel");

exports.add = async function (req, res) {
  if (!req.body.name || !req.body.admin) {
    return res.json({
      message: "Вы не указали нужные данные для создания беседы",
    });
  }
  const dialogue = new Dialogue();
  dialogue.name = req.body.name;
  dialogue.admin = req.body.admin;
  dialogue.users = req.body.users
    ? [...req.body.users, dialogue.admin]
    : [dialogue.admin];

  for (let user of dialogue.users) {
    let curUser = await User.findOne({ login: user });
    if (!curUser) {
      return res.send({ message: "Нет одного из пользователей" });
    }
    curUser.dialogues = [...curUser.dialogues, dialogue._id];
    curUser
      .save()
      .then(() => {
        res.status(201).json({ success: true });
      })
      .catch(() => {
        res.status(500).json({ success: false });
      });
  }
  dialogue
    .save()
    .then(() => {
      res.status(201).json({ success: true });
    })
    .catch(() => {
      res.status(500).json({ success: false });
    });
};

exports.rename = async function (req, res) {
  if (req.body.role != "admin") {
    return res.status(403).send({ message: "У вас недостатончо прав" });
  }
  const dialogue = await Dialogue.findById(req.body.id);
  if (!dialogue) {
    return res.status(404).send({ message: "Такого диалога нет" });
  }
  dialogue.name = req.body.newName;
  dialogue
    .save()
    .then(() => {
      res.json({ message: "OK" });
    })
    .catch(() => {
      res.status(500).send("Произошла ошибка");
    });
};

exports.addUser = async function (req, res) {
  const dialogueID = req.body.dialogueID;
  const userID = req.body.userID;
  const dialogue = await Dialogue.findById(dialogueID);
  const user = await User.findById(userID);

  if (!dialogue) {
    return res.status(404).send({ message: "Нет такого диалога" });
  }
  if (!user) {
    return res.status(404).send({ message: "Нет такого пользователя" });
  }

  const users = dialogue.users;
  const userIndex = users.findIndex((el) => {
    return el == user.login;
  });
  if (userIndex != -1) {
    return res.status(200).send({ message: "Такой пользователь уже есть" });
  }
  users.push(user.login);
  dialogue
    .save()
    .then(() => {
      return res.json({ message: "OK" });
    })
    .catch(() => {
      return res.status(500).send("Произошла ошибка");
    });
};

exports.deleteUser = async function (req, res) {
  const dialogueID = req.body.dialogueID;
  const userID = req.body.userID;
  const dialogue = await Dialogue.findById(dialogueID);
  const user = await User.findById(userID);

  if (!dialogue) {
    return res.status(404).send({ message: "Нет такого диалога" });
  }
  if (!user) {
    return res.status(404).send({ message: "Нет такого пользователя" });
  }

  const users = dialogue.users;
  const userIndex = users.findIndex((el) => {
    return el == user.login;
  });

  if (userIndex == -1) {
    return res.send({ message: "Нет такого пользователся в беседе" });
  }
  users.splice(userIndex, 1);
  dialogue
    .save()
    .then(() => {
      return res.json({ message: "OK" });
    })
    .catch(() => {
      return res.status(500).send("Произошла ошибка");
    });
};
