const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');

const app = express();
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));

app.use(
	methodOverride((req, res) => {
		if (req.body && req.body._method) {
			const method = req.body._method;
			return method;
		}
	}),
);

app.use(cookieParser());

app.use((request, response, next) => {
	const username = request.cookies.username;
	response.locals.loggedInUserName = username || '';
	next();
});

const cohortsRouter = require('./routes/cohortRouter');
app.use('/posts', cohortsRouter);

const baseRouter = require('./routes/baseRouter');
app.use('/', baseRouter);

// ------------
// RUN SERVER
// ------------
const PORT = 5000;
const HOST = 'localhost'; // 127.0.0.1
app.listen(PORT, HOST, () => {
	console.log(`Server is listening at http://${HOST}:${PORT}`);
});
