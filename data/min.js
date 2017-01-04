var fs = require('fs');
console.log(process.argv);
var file = process.argv[2];
var data = fs.readFileSync(file);
var obj = JSON.parse(data);
data = JSON.stringify(obj);
fs.writeFileSync('min_' + file, data);
