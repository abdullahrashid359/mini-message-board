const net = require('node:net');
net.setDefaultAutoSelectFamily(false);
process.loadEnvFile('.env');

const express = require('express');
const path = require('node:path');
const indexRouter = require('./routes/indexRouter');

const app = express();

const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).send(err.message);
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
    if (error)
        throw error;

    console.log(`Server listening on port ${PORT}`);
});