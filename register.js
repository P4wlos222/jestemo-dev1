const db = require(__dirname + "/dbconnect.js");
const bcrypt = require('bcryptjs');
const saltRounds = 10;

function DbAppend(data){
    console.log(data);
    console.log(data.Password);
    hashedPassword = bcrypt.hash(data.Password, saltRounds, function(err, hash) {
        console.log(hash);
        return hash;
    });
    console.log(hashedPassword);
    db.query('INSERT INTO Users(UUID,Email,Phone,Password,FirstName,LastName,DisplayName) VALUES (UUID_TO_BIN(UUID()),?,?,?,?,?,?)',
    [data.Email,data.Phone,hashedPassword,data.FirstName,data.LastName,data.DisplayName],
    function(error){
        if (error) throw error;
    });
}

module.exports = DbAppend;