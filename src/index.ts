import { configDotenv } from 'dotenv';
import express, { Request, Response } from 'express';
configDotenv();

const app = express();
app.use(express.json());
app.use(express.urlencoded( { extended: false } ));

// ROUTES
import router from './routes/visa.route';

app.get('/', (req: Request, resp: Response) => resp.send('WELCOME') )
app.use(router)

const _PORT = process.env.PORT || 3000;
app.listen( _PORT, () => { console.log(`App is Running on PORT ${_PORT}`)} );
