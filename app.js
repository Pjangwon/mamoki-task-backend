const express = require('express');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');
const library = require('./utils/library');
const nunjucks = require('nunjucks');

dotenv.config();

const app = express();

app.set('port', process.env.PORT || 3000);

app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
nunjucks.configure('views', {
    express: app,
    watch: true,
});

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/library', (req, res, next) => {
    const stationName = req.query.stationName;
    library(stationName, (error, data) => {
        if (error) {
            return next(error);
        }
        res.json(data);
    });
});

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 존재하지 않음`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}에서 서버 작동중`);
});