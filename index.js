const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const {
    Pool
} = require("pg");
const PORT = process.env.PORT || 5000;
const connectionString = process.env.DATABASE_URL || 'postgres://djsrcdgmbslmsg:729f89f85d1123038716fb2f681540447c885fc0536ca15d8157db9ea27a7706@ec2-107-20-167-241.compute-1.amazonaws.com:5432/d9gj3kut76qi7u?ssl=true';

// require('dotenv').config();

const pool = new Pool({
    connectionString: connectionString
});

express()
    .use(express.static(path.join(__dirname, '/public')))
    .use(bodyParser.json())
    .set("views", __dirname + "/views")
    .set('view engine', 'ejs')
    .post('/bucket-list', (req, res) => {
        console.log(req.body.id);
        console.log(req.body.pw);
        pool.query(`SELECT * FROM users u WHERE u.username = '${req.body.id}' AND u.pw = '${req.body.pw}'`, function (err, result) {
            // If an error occurred...
            if (err) {
                console.log("Error in query: ")
                console.log(err);
            } else {
                if (result.rows.length === 0) {
                    res.json({error: 404})
                    console.error('Something is wrong here,  there should be only one person with this id')
                }
                console.log(result.rows[0]);
                res.json(result.rows[0])
            }
        })
    })
    .all('*', function (req, res) {

    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));