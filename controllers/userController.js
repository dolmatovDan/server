//Import Bio Model
const User = require('../models/userModel');

const bcrypt = require('bcrypt');


//For creating new bio
exports.add = async function (req, res) {
    const oldUser = await User.findOne({ name: req.body.login});
    if (oldUser) {
        return res.send({isLogin: false, message: "Такой пользователь уже есть"});
    }
    const user = new User();
    if(req.body.login && req.body.password) {
        user.name = req.body.login;
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        user.password = hashedPassword;

        user.save(function (err) {
            if (err)
                return res.json(err);
                
        res.json({
                message: "New User Added!",
                data: user,
                isLogin: true
            });
        });
    } else {
        return res.json({
            message: "Введите логин или пароль",
            isLogin: false
        })
    }
};
exports.signIn = async function(req, res) {
    
    const {login, password} = req.body;
    const user = await User.findOne({ name: login });
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