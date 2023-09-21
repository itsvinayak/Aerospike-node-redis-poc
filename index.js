const { setnx, get } = require('./function');
const fs = require('fs');

let key = 'key1';
let value = 'value1';

setnx(key, value, (err, res) => {
    console.log(err, res);
    get(key, (err, res) => {
        console.log(err, res);
    });
});
