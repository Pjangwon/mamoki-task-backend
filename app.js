const express = require('express');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 존재하지 않음`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE.env !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}에서 서버 작동중`);
});

//test용 주석