//Import Bio Model
const Bio = require('../models/model');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//For creating new bio
exports.add = async function (req, res) {
    const user = await Bio.findOne({ name: req.body.login});
    if (user) {
        return res.send({isLogin: false, message: "Такой пользователь уже есть"});
    }
    const bio = new Bio();
    bio.name = req.body.login;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    bio.password = hashedPassword;
    //Save and check error

    
    
    bio.save(function (err) {
        if (err)
            res.json(err);
    res.json({
            message: "New Bio Added!",
            data: bio
        });
    });
    
};
exports.signIn = async function(req, res) {
    
    const {login, password} = req.body;
    const user = await Bio.findOne({ name: login });
    try {
        if (!user) {
            res.send({isLogin: false, message: "Нет такого пользователя"});
        } else {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                res.send({isLogin: true, messgae: "OK"});
            }
        }
        
    }
    catch(e) {
        res.send({isLogin: false, message: "Неверный пароль"});
    }
    
}