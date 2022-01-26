import express from "express";
import mssql from 'mssql';
import cors from 'cors';

import config from './config.js';
const port = config.app.port;
const host = config.app.host
const dbConfig = {
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    server: 'localhost',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
};

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

String.prototype.hashCode = function() {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr   = this.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

let faker = async () => {
    let data = {};
    let key = (Math.random() + 1).toString(36).substring(2);
    let value = (Math.random() + 1).toString(36).substring(2);
    data.key = key;
    data.value = value;
    data.hash = value.hashCode();
    return data;
};

const sqlQuery = async () => {
    try {
        await mssql.connect(dbConfig)
        const result = await mssql.query`select * from defaultTable`;
        console.dir(result);
        return result;
    } catch (err) {
        console.log(err)
    }
}
mssql.close();

app.get('/api', async (req, res) => {
    try {
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Origin", "*");
        const fakeJson = await faker();
        const sqlResult = await sqlQuery();
        console.log(fakeJson)
        let results = await fakeJson;
        
        return res.json({
            status: "ok",
            data: {results: results, sqlResult: sqlResult},
        })
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
});

app.post('/post', async(req, res) => {
    console.log(req);
    let data = req.body.data;
    try {
        for (let i of data) {
            console.log(i);
            res.json(`hello ${[i.k, i.v, i.h]}`)

        }
        // sql write
    } catch (error) {
        console.log(error);
    }
})

app.listen(port, host, () => {
    console.log(`Example app listening at ${host}:${port}`)
})