const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL || 'postgres://djsrcdgmbslmsg:729f89f85d1123038716fb2f681540447c885fc0536ca15d8157db9ea27a7706@ec2-107-20-167-241.compute-1.amazonaws.com:5432/d9gj3kut76qi7u?ssl=true';

const pool = new Pool({
connectionString: connectionString
});



function getUser() {

}

module.exports = {
    loginUser: getUser
}