const Dialogue = require('../models/dialogueModel');

exports.add = async function (req, res) {
    
    const dialogue = new Dialogue();
    if (req.body.name && req.body.admin) {
        dialogue.name = req.body.name;
        dialogue.admin = req.body.admin;    
        dialogue.users = req.body.users ? [...req.body.users, dialogue.admin] : [dialogue.admin];
        console.log(dialogue);
        dialogue.save(function (err, data) {
            console.log(err, "----------", data);
            if (err) {
                return res.json(err);
            }
            res.json({message: "OK"});
        });
    }   
    return res.json({message: "Вы не указали нужные данные для создания беседы"});
};