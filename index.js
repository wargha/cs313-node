process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


const PORT = process.env.PORT || 5000;
const connectionString = process.env.DATABASE_URL || 'postgres://djsrcdgmbslmsg:729f89f85d1123038716fb2f681540447c885fc0536ca15d8157db9ea27a7706@ec2-107-20-167-241.compute-1.amazonaws.com:5432/d9gj3kut76qi7u?ssl=true';
const { Pool } = require("pg");
const pool = new Pool({
connectionString: connectionString
});

var login = require('./modules/login.js');
var bucket = require('./modules/bucketList.js');

express()
    .use(express.static(__dirname + '/public'))

    .use(bodyParser.json())

    .set('views', __dirname + '/views')

    .set('view engine', 'ejs')

    .get('/login', login.loginUser)

    .post('/tryLogin', login.getUser)

    .post('/signup', login.signUp)

    .get('/bucketList', bucket.renderBucket)

    .post('/getList', bucket.getUserList)

    .post('/removeItem', bucket.removeItem)

    .post('/addItem', bucket.addItem)

    .put('/editItem', bucket.updateItem)

    .listen(PORT, () => console.log(`Listening on ${ PORT }`));