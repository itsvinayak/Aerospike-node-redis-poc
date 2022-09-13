const Aerospike = require('aerospike');



let client = Aerospike.client({
    hosts: [
        {
            addr: 'localhost',
            port: 3000
        }
    ]
});

const connect = (cb) => {
    client.connect(function (err, connection) {
        if (err) {
            console.log(err);
            process.exit();
        }
        else {
            console.log('connected');
            return cb(connection);
        }
    });
};




// @ts-ignore
const set = (key, value, cb) => {
    key = new Aerospike.Key('test', 'demo', key);
    let bin = {};
    bin['values'] = value;
    // @ts-ignore
    connect((connection) => {
        connection.put(key, bin, (err, record) => {
            return cb(err, record);
        });
    });
}

const setnx = (key, value, ttl, cb) => {
    if (typeof ttl === 'function') {
        cb = ttl;
        ttl = -1;
    }
    key = new Aerospike.Key('test', 'demo', key);
    let bin = {};
    bin['value'] = value;
    // @ts-ignore
    connect((connection) => {
        const policy =
            new Aerospike.WritePolicy({
                exists: Aerospike.policy.exists.CREATE,
                totalTimeout: 3000,
                timeout: 3000,
                maxRetries: 2,
                socketTimeout: 3000,
                sleepBetweenRetries: 0
            });
        const meta = { ttl: ttl };
        connection.put(key, bin, meta, policy, (err, record) => {
            // connection.close();
            return cb(err, record);
        });
    });
};

const del = (key, cb) => {
    key = new Aerospike.Key('test', 'demo', key);
    // @ts-ignore
    connect((connection) => {
        connection.remove(key, (err, record) => {
            return cb(err, record);
        });
    });
};

const expire = (key, ttl, cb) => {
    key = new Aerospike.Key('test', 'demo', key);
    // @ts-ignore
    connect((connection) => {
        const meta = { ttl: ttl };
        connection.touch(key, meta, (err, record) => {
            return cb(err, record);
        });
    });
};




const get = (key, cb) => {
    key = new Aerospike.Key('test', 'demo', key);
    connect((connection) => {
        connection.get(key, (err, record) => {
            return cb(err, record.bins);
        });
    });
};


module.exports = {
    set: set,
    setnx: setnx,
    get: get,
    del: del,
    expire: expire
};
