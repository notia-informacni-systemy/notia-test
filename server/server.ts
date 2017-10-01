import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as path from 'path';
import {Constants} from './config/constants';
import {AppRouter} from './router';
import {CsrfMiddleware} from './middlewares/csrf';

const app = express();
const port = Constants.NODE_PORT;
const baseUrl = `http://localhost:${port}`;
const sessionMiddleware = session({
  secret: 'SomeSecretKey',
  resave: false,
  saveUninitialized: true
});

// Setup middle-wares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); // middleware to parse request body and expose it in req.body
app.use(helmet()); // security middleware
app.use(cookieParser('SuperSecretSomething'));
app.use(sessionMiddleware);
app.use(CsrfMiddleware);

app.use(express.static(path.join(__dirname, '../client'), {index: false}));
app.use('/assets', express.static(path.join(__dirname, '../client/assets'), {maxAge: 30}));
app.use(AppRouter);

app.listen(port, () => {
  console.log(`Listening at ${baseUrl}`);
});
