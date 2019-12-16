const fs = require('fs');

/**
 * Метод принимающий 2 парамметра
 * @param {string} login - логин
 * @param {number} password - пароль
 */
function auth(req, res, next) {
    const {login, password} = req.body;
    if (!login || !password) {
        res.send({Error: 'NO PARAMS'})
    }
    console.log(login, password);

    const usersData = fs.readFileSync("users.txt", "utf8");
    if (usersData.includes(`login":"${login}","password":"${password}"`)){
        res.redirect('/public/index.html');
    } else {
        res.json({Success: false})
    }
}

/**
 * Метод, принимающий 3 парамметра
 * @param {string} login - логин
 * @param {string} email - почта
 * @param {number} password - пароль
 */
function register(req, res, next) {
    const {login, email, password} = req.body;
    if (login || email  || password) {
        res.send({Error: 'NO PARAMS'})
    }
    console.log(login, email, password);
    /*res.json({Success: true})*/


    const usersData = fs.readFileSync("users.txt", "utf8");
    if (usersData.includes(`name":"${login}"`)) {
        res.json({Error: 'Такой логин уже существует. Придумайте новый'});
    } else {
        let content = {
            name: login,
            password: password,
            email: email,
        };

        fs.appendFile("users.txt", JSON.stringify(content) + '\n', (error, data) => {
            if (error) throw error;
            console.log(data);
        });
        //res.json({Success: true});
        res.redirect('/public/index.html');
    }
}

module.exports = {
    auth,
    register
};