// 1
// console.log('HELLO WORLD');

// 2

var total = 0;
for (let i = 2; i < process.argv.length; i++) {
    total += parseInt(process.argv[i]);
}
// console.log(total);

// 3

// var fs = require('fs');
// // console.log(fs);
// var path = process.argv[2];
// // console.log(path);
// var file = fs.readFileSync(path, 'UTF-8');
// // console.log(file);
// var string = file.toString();
// // console.log(string);
// var count = 0;
// for (let i = 0; i < string.length; i++) { 
//     if (string[i] == '\n') { 
//         count++;
//     }
// }
// console.log(count);

//4

var fs = require('fs');
var path = process.argv[2];
var totalLines = 0;

function readStuff(cb) {
    fs.readFile(path, 'UTF-8', function doSmtg(err, file) {
        if (err) cb(err);
        else {
        for (let i = 0; i < file.length; i++) {
            if (file[i] == '\n') totalLines++;
        }
        cb();
    }
    });
}

function printStuff(error) { 
if (error) console.log(error)
else console.log(totalLines);
}
readStuff(printStuff);
