const User = require("../models/userModel");

const Message = require("../models/messageModel");

const Dialogue = require("../models/dialogueModel");

exports.add = async function (req, res) {
  const dialogue = Dialogue.findById(req.body.dialogueID);
  const sender = User.findById(req.body.senderID);

  if (!sender) {
    return res.status(404).send({ message: "Нет такого пользователя" });
  }
  if (!dialogue) {
    return res.status(404).send({ message: "Нет такой беседы" });
  }
  const message = new Message();

  const text = req.body.text;
  const date = new Date();
  message.text = text;
  message.date = date;
  message.dialogue = dialogue;
  message.sender = sender;
  message
    .save()
    .then(() => res.status(200).send({ message: "OK" }))
    .catch(() => {
      return res.status(500).send({ message: "Wrong message" });
    });
  dialogue.messages.push(message._id);
  dialogue
    .save()
    .then(() => res.status(200).send({ message: "OK" }))
    .catch(() => {
      res.status(500).send({ message: "Wrong dialogue" });
    });
};
