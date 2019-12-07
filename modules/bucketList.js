const {
    Pool
} = require("pg");
const connectionString = process.env.DATABASE_URL || 'postgres://djsrcdgmbslmsg:729f89f85d1123038716fb2f681540447c885fc0536ca15d8157db9ea27a7706@ec2-107-20-167-241.compute-1.amazonaws.com:5432/d9gj3kut76qi7u?ssl=true';

const pool = new Pool({
    connectionString: connectionString
});



function getUserList(req, res) {
    var id = req.body.id;

    pool.query(`SELECT * FROM bucket b WHERE b.bucket_owner = '${id}'`, function (err, result) {
        // If an error occurred...
        if (err) console.log("Error in query: ", err);
        else {
            console.log(result.rows);
            res.json(result.rows)
        }
    })
}


function removeItem(req, res) {
    var id = req.body.id;

    pool.query(`DELETE FROM bucket WHERE id = ${id};`, function (err, result) {
        // If an error occurred...
        if (err) console.log("Error in query: ", err);
        else {
            console.log(result.rows);
            res.json(result.rows)
        }
    })
}

function renderBucket(req, res) {
    res.render("pages/index", {
        id: req.query.id
    });
}

function addItem(req, res) { 
    var id = req.body.id;
    var content = req.body.content;
    console.log(id);
    console.log(content);
    pool.query(`
    INSERT INTO bucket (bucket_name, bucket_owner)
    VALUES ('${content}', ${id})`, function (err, result) {
        // If an error occurred...
        if (err) { 
            console.log("Error in query: ", err); 
            res.json({result: "fail"})}
        else {
            console.log(result.rows);
            res.json({result: "success"})
        }
    })
}

module.exports = {
    getUserList: getUserList,
    renderBucket: renderBucket,
    removeItem: removeItem,
    addItem: addItem
}