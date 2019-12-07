const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL || 'postgres://djsrcdgmbslmsg:729f89f85d1123038716fb2f681540447c885fc0536ca15d8157db9ea27a7706@ec2-107-20-167-241.compute-1.amazonaws.com:5432/d9gj3kut76qi7u?ssl=true';

const pool = new Pool({
connectionString: connectionString
});

// const bodyParser = require('body-parser');


function renderLogin(req,res) { 
    res.render("pages/login");
} 

function signUpSubmit(req, res)  {
    console.log(req.body);
    pool.query(`
    INSERT INTO USERS (first_name, last_name, username, pw)
    VALUES ('${req.body.fname}', '${req.body.lname}','${req.body.username}', '${req.body.pw}');`, function (err, result) {
        if (err) { 
            res.json({error: 404})
        } else { 
            res.json({result: "it worked"})
        }
    })
}

function getUser(req, res) {
    console.log(req.body);
    pool.query(`SELECT * FROM users u WHERE u.username = '${req.body.id}' AND u.pw = '${req.body.pw}'`, function (err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        } else {
            if (result.rows.length === 0) {
                res.json({error: 404})
                console.error('Something is wrong here. Found nothing')
            } else { 
                console.log(result.rows[0]);
                res.json(result.rows[0])
            }
           
        }
    })
}




module.exports = {
    loginUser: renderLogin,
    signUp: signUpSubmit,
    getUser: getUser
}