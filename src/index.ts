import express, { Request, Response, Application } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { AppDataSource } from './model/db';
import router from './routes/Route';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.use('/api/v1', router);
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

AppDataSource.initialize().then(() => {
    console.log('Connect to database');

    app.listen(PORT, () => {
        console.log(`Server is running on port: http://localhost:${PORT}`);
    });
})
.catch((err) => {
    console.error('Database connection failed: ', err);
});