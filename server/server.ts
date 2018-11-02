import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as session from 'express-session';
import * as helmet from 'helmet';
import * as path from 'path';
import { Constants } from './config/constants';
import { AppRouter } from './router';

const app = express();
const port = Constants.NODE_PORT;
const baseUrl = `http://localhost:${port}`;
const sessionMiddleware = session({
  secret: Constants.SESSION_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 2 * 60 * 60 * 1000 // expire cookie in 2 hours
  }
});

// Setup middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // middleware to parse request body and expose it in req.body
app.use(helmet()); // security middleware
app.use(cookieParser(Constants.COOKIES_KEY));
app.use(sessionMiddleware);

app.use(express.static(path.join(__dirname, '../client'), { index: false }));
app.use('/assets', express.static(path.join(__dirname, '../client/assets'), { maxAge: 30 }));
app.use(AppRouter);

// Start the server
app.listen(port, () => {
  console.log(`Listening at ${baseUrl}`);
});
