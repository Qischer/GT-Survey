const nedb = require('nedb');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`listening on port ${port}`); });

app.use(express.static(`public`));
app.use(express.json({limit : '1mb'}));

const db = new nedb('database.db');
db.loadDatabase();

app.get('/all', (req, res) => {
    db.find({}, (err,data) => {
        if (err) {
            res.end();
            return;
        }
        res.json(data);
    });
});

app.post('/api', (req, res) => {
    const data = req.body;
    let res_data = data;
    data.timestamp = Date.now();
    db.insert(data);
    console.log(data);

    app.get('/rd', (req,res) => {
        res.json(res_data);
    })
});




