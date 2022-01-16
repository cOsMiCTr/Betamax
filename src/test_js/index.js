const   url = require("url"),
        fs = require('fs'),
        http = require('http');

let addr = "http://localhost:8080/default.html?year=2017&month=february";

let q = url.parse(addr, true);


let yearToInt = parseInt(q.query.year);
console.log(yearToInt);
console.log(q.pathname);
console.log(q.search);
console.log(q.port);

let qdata = q.query;
console.log(qdata.q);
