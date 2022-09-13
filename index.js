const { setnx, get } = require('./function');
const fs = require('fs');

let key = 'key1';
let value = 'value1';

// let key = 'kk';
// let value = 'vv';
setnx(key, value, (err, res) => {
    console.log(err, res);
    get(key, (err, res) => {
        console.log(err, res);
    });
});
